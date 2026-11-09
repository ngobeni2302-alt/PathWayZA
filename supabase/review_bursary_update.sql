-- OPTIONAL: use this only after reading the official source and reviewing a queue entry.
-- 1. In Table Editor > bursary_update_reviews, inspect source_excerpt and proposed_details.
-- 2. If needed, edit proposed_details.candidate_details to contain the complete, verified
--    bursary object (same fields as public.bursaries.details). A null candidate means
--    you checked the source and confirmed the existing published details are correct.
-- 3. Replace 0 below with that review's numeric id and run this whole query.
--    A result of 0 means nothing was published (missing review, stale data or invalid candidate).
--    Do not mark a row approved directly: that alone does not publish its candidate.
begin;
set local time zone 'Africa/Johannesburg';
with selected_review as (
  select * from public.bursary_update_reviews where id = 0 and status = 'pending' for update
), published as (
  update public.bursaries b
  set details = coalesce(nullif(r.proposed_details->'candidate_details', 'null'::jsonb), b.details),
      reviewed_at = current_date,
      updated_at = now()
  from selected_review r
  where b.id = r.bursary_id
    and b.details = r.proposed_details->'previous_details'
    and b.details->>'url' = r.proposed_details->>'source_url'
    and (
      r.proposed_details->'candidate_details' = 'null'::jsonb
      or (
        jsonb_typeof(r.proposed_details->'candidate_details') = 'object'
        and (r.proposed_details->'candidate_details') ?& array['name','type','year','fields','coverage','eligibility','deadline','url']
        and (r.proposed_details->'candidate_details'->>'url') like 'https://%'
      )
    )
  returning b.id
), marked as (
  update public.bursary_update_reviews r set status = 'approved', reviewed_at = now()
  where r.id in (select id from selected_review)
    and r.bursary_id in (select id from published)
  returning r.id
)
select count(*) as reviews_published from marked;
commit;
