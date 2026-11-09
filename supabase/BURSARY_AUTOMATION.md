# Bursary updates

The website reads published entries from `public.bursaries` with the existing public
Supabase client. It refreshes on page entry, window focus and every five minutes.
Published changes do not require rebuilding the website. If the database cannot be
loaded, it keeps the last available entries and displays an availability notice.

## Activate on Vercel

The initial migration `migrations/20261109_bursary_updates.sql` must already have run.
Set these server variables in the Vercel project's **Production** environment:

- `SUPABASE_URL`: the existing project URL.
- `SUPABASE_SECRET_KEY`: a Supabase secret key (or legacy service-role key).
- `CRON_SECRET`: a random secret, for example generated with `openssl rand -hex 32`.

Keep the existing `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for the browser.
Never put either server secret in a `VITE_` variable or commit it to Git.

Deploy the updated code. In Vercel, open **Settings > Cron Jobs** and run
`/api/check-bursaries` once. Inspect its logs. A 200 response means all sources were
checked; 207 means some checks failed; 401 means the cron secret was absent or did
not match; 503 means server variables are missing; 500 means database access failed.
A partial run still records successful checks and source errors.

The schedule is `0 4 * * *` (daily at 04:00 UTC, around 06:00 SAST).
Hobby scheduling may run within the scheduled hour. The old ten-minute keep-alive
cron has been replaced; the daily checker also accesses Supabase.
Only production deployments schedule cron jobs. Vite's local development server
serves the frontend, not the Vercel API function.

## What updates automatically

- Published Supabase changes appear on the site without another deployment.
- Date-based statuses change as opening and closing dates pass.
- Official source HTML or PDF fingerprints are checked daily and recorded privately
  in `bursary_source_checks`. Errors do not replace published funding details.
- New or changed source snapshots create private `bursary_update_reviews` entries.
  For simple, unambiguous dates in an existing intake, the checker can suggest a
  revised closing date. Suggestions are not automatically published.

This is source monitoring with reviewed publication, not unrestricted automatic
extraction of funding facts. New programmes, new intake years, eligibility and
award amounts still need human verification. A source returning HTTP 200 is not
proof that its contents match the published entry; successful checks never reset
`reviewed_at`. The first run creates baseline reviews so the source snapshots can
be confirmed. Failed sources remain in check history for investigation. There are
no email notifications; inspect the review queue and Vercel logs.

## Review and publish

1. Open Supabase **Table Editor > bursary_update_reviews** and filter `status` to
   `pending`. Read `source_excerpt`, then open the official `source_url` from
   `proposed_details`. PDFs require opening the document; their text is not parsed.
2. Check dates, academic year, eligibility, costs and any separate applicant deadlines.
   If the current published entry is correct, leave `candidate_details` as null.
   Otherwise edit `candidate_details` to a complete, verified bursary object.
   Date candidates are suggestions only; change the intake or other fields as needed.
3. Open `review_bursary_update.sql`, replace `id = 0` with the review's ID, and run it
   in SQL Editor. It publishes and approves the review in one transaction, provided
   the existing details still match the version that was checked. Expect
   `reviews_published = 1`. A stale candidate needs a new review of current data.
4. For a false alarm, set the queue entry's status to `rejected` and its `reviewed_at`
   to the current timestamp. Rejected content is not republished.
5. Add entirely new programmes in `bursaries` after verification, with a unique ID,
   complete `details`, display order and actual review date. Their official domain
   must also be added to the checker's allowlist (derived from the bundled provider
   list) before source monitoring can fetch it.

The checker checks only the configured source pages. It does not crawl a provider's
whole website for new announcements. Date-specific press releases and PDFs remain
historical sources until a reviewer points the entry at the new official round.
Review the check history for blocked sites, redirects or out-of-date source URLs.

## Verification

Run `node --test tests/bursary-updates.test.js` and `npm run build`.
The tests use fixtures; they do not modify the production database or contact providers.
