import test from 'node:test';
import assert from 'node:assert/strict';
import { BURSARIES, bursaryStatus } from '../src/data/bursaries.js';
import { mapBursaryRows, southAfricaDate } from '../src/data/bursary-records.js';
import { allowedSource, normalizeSource, fetchSource, sourceHash, deadlineSuggestion, checkBursary, runBursaryChecks } from '../lib/bursary-checker.js';
import { authorized, makeHandler } from '../api/check-bursaries.js';

const text = 'Funding rules for the 2027 academic year. '.repeat(10) + 'Applications close on 31 January 2027.';
const htmlResponse = body => new Response(`<html><main>${body}</main></html>`, { headers: { 'content-type': 'text/html' } });
const row = { id: 'test-1', details: BURSARIES[1] };
function fakeDb({ previous = [], reviews = [], failReview = false, rows = [row] } = {}) {
  const writes = [];
  return { writes, from(table) {
    let operation = 'select', value;
    const query = {
      select() { return this; }, eq() { return this; }, neq() { return this; },
      order() { return this; }, limit() { return this; }, contains() { return this; },
      insert(data) { operation = 'insert'; value = data; return this; },
      then(resolve, reject) {
        if (operation === 'insert') {
          writes.push({ table, value });
          return Promise.resolve(failReview && table === 'bursary_update_reviews'
            ? { error: { message: 'failed' } } : { data: [{ id: 1 }], error: null }).then(resolve, reject);
        }
        return Promise.resolve({ data: table === 'bursaries' ? rows : table === 'bursary_source_checks' ? previous : reviews, error: null }).then(resolve, reject);
      }
    };
    return query;
  } };
}
test('status uses each record review date and SA midnight', () => {
  assert.equal(southAfricaDate(new Date('2026-11-09T22:01:00Z')), '2026-11-10');
  assert.equal(bursaryStatus({ ...row.details, reviewedAt: '2026-12-14' }, '2026-12-15'), 'Within published dates');
  assert.equal(bursaryStatus(row.details, '2026-12-15'), 'Recheck required');
  assert.equal(bursaryStatus(row.details, '2027-02-01'), 'Closed');
});
test('database mapping allows empty published set, rejects unsafe URLs and malformed records', () => {
  assert.deepEqual(mapBursaryRows([]), []);
  assert.equal(mapBursaryRows([{ ...row, reviewed_at: '2026-11-09' }])[0].reviewedAt, '2026-11-09');
  assert.throws(() => mapBursaryRows([{ ...row, details: { ...row.details, url: 'javascript:alert(1)' } }]));
  assert.throws(() => mapBursaryRows([{ ...row, details: { ...row.details, closes: '2027-02-31' }, reviewed_at: '2026-11-09' }]));
});
test('source checker refuses unapproved targets and redirects', async () => {
  for (const url of ['http://nsfas.org.za', 'https://127.0.0.1', 'https://nsfas.org.za.evil.test', 'https://user@nsfas.org.za']) assert.throws(() => allowedSource(url));
  await assert.rejects(fetchSource(row.details.url, async () => new Response(null, { status: 302, headers: { location: 'http://169.254.169.254/' } })), /not approved/);
});
test('normalization ignores scripts and menus; challenges are not funding updates', async () => {
  assert.equal(normalizeSource('<nav>Menu</nav><script>fake</script><p>Tuition &amp; books</p>'), 'Tuition & books');
  await assert.rejects(fetchSource(row.details.url, async () => htmlResponse('Access denied '.repeat(50))), /incomplete/);
  await assert.rejects(fetchSource(row.details.url, async () => new Response('No', { status: 503 })), /HTTP 503/);
  const snapshot = await fetchSource(row.details.url, async () => htmlResponse(text));
  assert.equal(snapshot.hash, sourceHash(text));
});
test('PDF snapshots validate magic bytes and never invent extracted text', async () => {
  await assert.rejects(fetchSource(row.details.url, async () => new Response('not a PDF', { headers: { 'content-type': 'application/pdf' } })), /Invalid PDF/);
  const pdf = await fetchSource(row.details.url, async () => new Response('%PDF-1.7\nexample', { headers: { 'content-type': 'application/pdf' } }));
  assert.equal(pdf.text, null);
});
test('date suggestions refuse ambiguous dates and impossible calendar dates', () => {
  const details = { ...row.details, closes: '2027-01-01' };
  assert.equal(deadlineSuggestion(details, text).candidate.closes, '2027-01-31');
  assert.equal(deadlineSuggestion(details, text + ' Applications close on 30 November 2026.'), null);
  assert.equal(deadlineSuggestion(details, '2027 applications close on 31 February 2027.'), null);
  assert.equal(deadlineSuggestion(details, '2028 applications close on 31 January 2028.'), null);
});
test('first source snapshot is queued privately without updating published details', async () => {
  const db = fakeDb();
  assert.equal((await checkBursary(db, row, async () => htmlResponse(text))).outcome, 'initial');
  assert.deepEqual(db.writes.map(w => w.table), ['bursary_source_checks', 'bursary_update_reviews']);
  assert.equal(db.writes[1].value.proposed_details.candidate_details, null);
});
test('unchanged sources do not duplicate known reviews; missing reviews are recovered', async () => {
  const previous = [{ content_hash: sourceHash(text), source_url: row.details.url }];
  const db = fakeDb({ previous, reviews: [{ id: 1 }] });
  assert.equal((await checkBursary(db, row, async () => htmlResponse(text))).outcome, 'unchanged');
  assert.equal(db.writes.length, 1);
  const recovered = fakeDb({ previous });
  await checkBursary(recovered, row, async () => htmlResponse(text));
  assert.equal(recovered.writes.length, 2);
});
test('changed sources queue candidates, while source failures preserve published data', async () => {
  const db = fakeDb({ previous: [{ content_hash: 'old', source_url: row.details.url }] });
  const changed = text.replace('31 January 2027', '30 January 2027');
  assert.equal((await checkBursary(db, row, async () => htmlResponse(changed))).outcome, 'changed');
  assert.equal(db.writes[1].value.proposed_details.candidate_details.closes, '2027-01-30');
  const failed = fakeDb();
  assert.equal((await checkBursary(failed, row, async () => { throw new Error('network failed'); })).outcome, 'error');
  assert.equal(failed.writes.length, 1);
  assert.equal(failed.writes[0].value.outcome, 'error');
});
test('database errors are reported and third-party directories are skipped', async () => {
  const results = await runBursaryChecks(fakeDb({ failReview: true }), async () => htmlResponse(text));
  assert.equal(results[0].outcome, 'database_error');
  assert.equal((await checkBursary(fakeDb(), { id: 'directory', details: BURSARIES.at(-1) })).outcome, 'skipped');
});
function responseMock() {
  return { headers: {}, code: 200, setHeader(k,v) { this.headers[k] = v; }, status(v) { this.code = v; return this; }, json(value) { this.body = value; return this; } };
}
test('cron rejects missing or incorrect credentials before database access', async () => {
  assert.equal(authorized('Bearer abc', 'abc'), true);
  assert.equal(authorized('Bearer abc', ''), false);
  const handler = makeHandler({ env: { CRON_SECRET: 'abc' }, client() { throw new Error('Must not access database'); } });
  const res = responseMock();
  await handler({ method: 'GET', headers: {} }, res);
  assert.equal(res.code, 401);
  await handler({ method: 'POST', headers: {} }, res);
  assert.equal(res.code, 405);
});
test('cron reports configuration failures and partial source failures', async () => {
  const res = responseMock();
  await makeHandler({ env: { CRON_SECRET: 'abc' } })({ method: 'GET', headers: { authorization: 'Bearer abc' } }, res);
  assert.equal(res.code, 503);
  const env = { CRON_SECRET: 'abc', SUPABASE_URL: 'https://example.supabase.co', SUPABASE_SECRET_KEY: 'private' };
  await makeHandler({ env, client: () => ({}), run: async () => [{ id: '1', outcome: 'error' }] })({ method: 'GET', headers: { authorization: 'Bearer abc' } }, res);
  assert.equal(res.code, 207);
  assert.ok(!JSON.stringify(res.body).includes('private'));
});
test('job stops fetching new groups when its time budget expires', async () => {
  const controller = new AbortController();
  controller.abort();
  const results = await runBursaryChecks(fakeDb(), () => { throw new Error('Should not fetch'); }, controller.signal);
  assert.equal(results[0].outcome, 'time_budget_exceeded');
});
