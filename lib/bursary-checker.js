import { createHash } from 'node:crypto';
import { BURSARIES } from '../src/data/bursaries.js';

// Only explicitly configured provider domains can be fetched, including redirects.
const hosts = new Set(BURSARIES.filter(b => b.type !== 'Platform').flatMap(b => {
  const host = new URL(b.url).hostname.replace(/^www\./, '');
  return [host, `www.${host}`];
}));
export function allowedSource(value) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.port || !hosts.has(url.hostname)) {
    throw new Error('Source host is not approved');
  }
  return url;
}
export function normalizeSource(html) {
  return html.replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|nav|header|footer)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|amp|quot|apos|lt|gt);/gi, value => ({
      '&nbsp;': ' ', '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>'
    })[value.toLowerCase()])
    .replace(/&#(x[0-9a-f]+|\d+);/gi, (_, value) => {
      const n = value[0].toLowerCase() === 'x' ? parseInt(value.slice(1), 16) : Number(value);
      return n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : ' ';
    }).replace(/\s+/g, ' ').trim();
}
export const sourceHash = text => createHash('sha256').update(text).digest('hex');

export async function fetchSource(source, fetchImpl = fetch, jobSignal) {
  let url = allowedSource(source);
  const timeout = AbortSignal.timeout(8000);
  const signal = jobSignal ? AbortSignal.any([timeout, jobSignal]) : timeout;
  for (let hop = 0; hop < 4; hop++) {
    const response = await fetchImpl(url.href, {
      signal, redirect: 'manual',
      headers: { 'User-Agent': 'PathWise-BursaryChecker/1.0', Accept: 'text/html,application/pdf' }
    });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      await response.body?.cancel();
      const location = response.headers.get('location');
      if (!location) throw new Error('Source redirect has no destination');
      url = allowedSource(new URL(location, url).href);
      continue;
    }
    if (!response.ok) { await response.body?.cancel(); throw new Error(`Source returned HTTP ${response.status}`); }
    const type = response.headers.get('content-type')?.split(';')[0].trim();
    if (!['text/html', 'application/xhtml+xml', 'application/pdf'].includes(type)) {
      await response.body?.cancel(); throw new Error('Unsupported source format');
    }
    const chunks = []; let length = 0;
    const reader = response.body.getReader();
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        length += value.byteLength;
        if (length > 1500000) { await reader.cancel(); throw new Error('Source exceeds size limit'); }
        chunks.push(Buffer.from(value));
      }
    } finally { reader.releaseLock(); }
    const bytes = Buffer.concat(chunks);
    if (type === 'application/pdf') {
      if (!bytes.subarray(0, 5).equals(Buffer.from('%PDF-'))) throw new Error('Invalid PDF response');
      return { hash: sourceHash(bytes), excerpt: 'PDF source changed. Open the official document to review its dates and terms.', text: null };
    }
    const text = normalizeSource(bytes.toString('utf8'));
    if (text.length < 250 || /just a moment|verify you are human|access denied|captcha|page not found/i.test(text)) {
      throw new Error('Source returned an incomplete page or access challenge');
    }
    return { hash: sourceHash(text), excerpt: text.slice(0, 24000), text };
  }
  throw new Error('Too many source redirects');
}

// Candidates are review suggestions only. Multiple dates, a new intake or altered
// requirements must never silently reopen a closed funding round.
export function deadlineSuggestion(details, text) {
  if (!text || !/^20\d{2}$/.test(details.year)) return null;
  if (!new RegExp(`\\b${details.year}\\b`).test(text)) return null;
  const pattern = /(?:applications?\s+(?:will\s+)?close(?:s)?(?:\s+on)?|closing\s+date\s*:?)[\s:–-]*(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(20\d{2})/gi;
  const months = ['january','february','march','april','may','june','july','august','september','october','november','december'];
  const dates = [...text.matchAll(pattern)].map(match => {
    const iso = `${match[3]}-${String(months.indexOf(match[2].toLowerCase()) + 1).padStart(2, '0')}-${match[1].padStart(2, '0')}`;
    return { iso, evidence: match[0] };
  }).filter(({ iso }) => Number.isFinite(Date.parse(iso)) && new Date(iso).toISOString().slice(0, 10) === iso);
  if (!dates.length || new Set(dates.map(d => d.iso)).size !== 1) return null;
  const { iso, evidence } = dates[0];
  if (iso === details.closes || (details.opens && iso < details.opens)) return null;
  // Do not suggest a different academic intake by carrying over its old eligibility.
  if (![Number(details.year), Number(details.year) - 1].includes(Number(iso.slice(0, 4)))) return null;
  const candidate = { ...details, closes: iso, deadline: `Closing date: ${iso}. Confirm separate deadlines for any applicant categories.` };
  delete candidate.status;
  return { candidate, evidence };
}

const unwrap = result => {
  if (result.error) throw new Error('Bursary database operation failed');
  return result.data;
};
export async function checkBursary(db, row, fetchImpl = fetch, jobSignal) {
  if (row.details.type === 'Platform') return { id: row.id, outcome: 'skipped' };
  let snapshot;
  try { snapshot = await fetchSource(row.details.url, fetchImpl, jobSignal); }
  catch (error) {
    unwrap(await db.from('bursary_source_checks').insert({
      bursary_id: row.id, source_url: row.details.url, outcome: 'error',
      error_message: error.name === 'TimeoutError' ? 'Source timed out' : error.message.slice(0, 200)
    }));
    return { id: row.id, outcome: 'error' };
  }
  const previous = unwrap(await db.from('bursary_source_checks').select('content_hash,source_url')
    .eq('bursary_id', row.id).neq('outcome', 'error').order('checked_at', { ascending: false }).limit(1));
  const last = previous[0];
  const outcome = !last ? 'initial' : last.content_hash === snapshot.hash && last.source_url === row.details.url ? 'unchanged' : 'changed';
  const checks = unwrap(await db.from('bursary_source_checks').insert({
    bursary_id: row.id, source_url: row.details.url, content_hash: snapshot.hash, outcome
  }).select('id'));
  // Reconcile a missing review even if a previous run recorded the check but
  // failed to write its review. Already-reviewed snapshots are not queued again.
  {
    const existing = unwrap(await db.from('bursary_update_reviews').select('id').eq('bursary_id', row.id)
      .contains('proposed_details', { source_hash: snapshot.hash, source_url: row.details.url }).limit(1));
    if (!existing.length) {
      const suggestion = deadlineSuggestion(row.details, snapshot.text);
      unwrap(await db.from('bursary_update_reviews').insert({
        bursary_id: row.id, source_check_id: checks[0].id,
        proposed_details: {
          source_hash: snapshot.hash, source_url: row.details.url, previous_details: row.details,
          candidate_details: suggestion?.candidate || null,
          evidence: suggestion?.evidence || null,
          reason: outcome === 'initial' ? 'Establish and review the first source snapshot.' : 'Official source content changed; verify the full funding terms.'
        },
        source_excerpt: snapshot.excerpt
      }));
    }
  }
  // A successful fetch is not a human review. Never change reviewed_at here.
  return { id: row.id, outcome };
}
export async function runBursaryChecks(db, fetchImpl = fetch, jobSignal) {
  const rows = unwrap(await db.from('bursaries').select('id,details').eq('published', true));
  const results = [];
  for (let offset = 0; offset < rows.length; offset += 3) {
    if (jobSignal?.aborted) {
      rows.slice(offset).forEach(row => results.push({ id: row.id, outcome: 'time_budget_exceeded' }));
      break;
    }
    const group = await Promise.allSettled(rows.slice(offset, offset + 3).map(row => checkBursary(db, row, fetchImpl, jobSignal)));
    group.forEach((result, i) => results.push(result.status === 'fulfilled' ? result.value : {
      id: rows[offset + i].id, outcome: 'database_error'
    }));
  }
  return results;
}
