-- Run this entire file in the Supabase SQL Editor.
-- Adds new tables only; existing authentication and other app tables are unchanged.
begin;

create table if not exists public.bursaries (
  id text primary key,
  display_order integer not null default 0,
  details jsonb not null check (jsonb_typeof(details) = 'object'),
  reviewed_at date not null,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.bursary_source_checks (
  id bigint generated always as identity primary key,
  bursary_id text not null references public.bursaries(id),
  checked_at timestamptz not null default now(),
  source_url text not null,
  content_hash text,
  outcome text not null check (outcome in ('unchanged', 'changed', 'error', 'initial')),
  error_message text
);

create table if not exists public.bursary_update_reviews (
  id bigint generated always as identity primary key,
  bursary_id text not null references public.bursaries(id),
  source_check_id bigint references public.bursary_source_checks(id),
  proposed_details jsonb,
  source_excerpt text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

alter table public.bursaries enable row level security;
alter table public.bursary_source_checks enable row level security;
alter table public.bursary_update_reviews enable row level security;

drop policy if exists "Public can read published bursaries" on public.bursaries;
create policy "Public can read published bursaries"
  on public.bursaries for select to anon, authenticated using (published = true);

-- Visitors can read published entries, but cannot change funding data or inspect the private review queue.
revoke all on public.bursaries from anon, authenticated;
grant select on public.bursaries to anon, authenticated;
revoke all on public.bursary_source_checks from anon, authenticated;
revoke all on public.bursary_update_reviews from anon, authenticated;
grant all on public.bursaries, public.bursary_source_checks, public.bursary_update_reviews to service_role;
grant usage, select on sequence public.bursary_source_checks_id_seq, public.bursary_update_reviews_id_seq to service_role;

create index if not exists bursary_checks_latest on public.bursary_source_checks (bursary_id, checked_at desc);
create index if not exists bursary_reviews_pending on public.bursary_update_reviews (status, created_at);

-- Re-running this migration will not overwrite later edits.
insert into public.bursaries (id, display_order, details, reviewed_at) values
('bursary-1', 1, '{"name":"NSFAS","type":"Government","year":"2027","fields":"Approved programmes at public universities and TVET colleges","coverage":"Funding depends on eligibility, institution and the applicable annual funding rules. No single annual award amount is guaranteed.","eligibility":"Check the official funding rules for citizenship, household income, academic and programme requirements.","opens":"2026-09-18","closes":"2026-10-31","deadline":"18 September–31 October 2026","url":"https://nsfas.org.za/content/how-to-apply.html"}'::jsonb, '2026-11-09'::date),
('bursary-2', 2, '{"name":"Funza Lushaka","type":"Government","year":"2027","fields":"Teaching in the programme’s priority areas","coverage":"Funding is subject to programme terms and annual limits; confirm covered costs in the current application notes.","eligibility":"First-time applicants must be 30 or younger. Priority teaching subjects, academic criteria and service obligations apply.","opens":"2026-10-01","closes":"2027-01-31","deadline":"New applicants: 31 January 2027. Returning bursars: 30 November 2026. Opened 1 October 2026.","url":"https://www.funzalushaka.doe.gov.za/Home/"}'::jsonb, '2026-11-09'::date),
('bursary-3', 3, '{"name":"Sasol Bursary Programme","type":"Corporate","year":"2027","fields":"Selected engineering and science degrees, including data science","coverage":"Tuition and a living allowance, with student support; award terms apply.","eligibility":"South African citizens by birth, permanently resident in SA, pursuing approved full-time undergraduate degrees at approved public universities. Subject marks and selection criteria apply; UNISA excluded.","opens":"2026-04-01","closes":"2026-05-17","deadline":"1 April–17 May 2026","url":"https://www.sasol.com/media-centre/media-releases/sasol-bursaries-now-open-applications-invited-for-2027-engineering-and-science-studies"}'::jsonb, '2026-11-09'::date),
('bursary-4', 4, '{"name":"Sasol Foundation Bursary","type":"Foundation","year":"2027","fields":"STEM and selected accounting and financial sciences qualifications","coverage":"Comprehensive undergraduate funding and student support, subject to selection and award terms.","eligibility":"Targets eligible students from Sasol communities, children of employees and children of Khanyisa shareholders, including low-income and missing-middle households.","opens":"2026-08-01","closes":"2026-08-23","deadline":"1–23 August 2026","url":"https://www.sasol.com/media-centre/media-releases/sasol-foundation-invites-applications-2027-bursaries"}'::jsonb, '2026-11-09'::date),
('bursary-5', 5, '{"name":"Nedbank External Bursary","type":"Corporate","year":"2027 / next cycle 2028","fields":"STEM and green economy qualifications","coverage":"Funding for full-time undergraduate or honours study. A fixed rand amount is not confirmed on the source page.","eligibility":"SA citizenship, demonstrated financial need, at least 65% and admission to a public university or university of technology. Mathematics Literacy does not qualify.","status":"Closed","deadline":"2027 applications closed. Applications for 2028 funding open in 2027; exact dates not confirmed.","url":"https://private.nedbank.co.za/content/nedbank/za/en/group/careers/graduates-and-bursaries.html"}'::jsonb, '2026-11-09'::date),
('bursary-6', 6, '{"name":"merSETA Funding","type":"SETA","year":"2026/27 financial year","fields":"Manufacturing, engineering and related sector programmes","coverage":"Programme-based grants through eligible organisations and institutions; individual student funding depends on the implementing programme.","eligibility":"The published grant windows target organisations. Students should enquire through their institution or participating provider.","status":"Check provider","deadline":"Separate grant windows apply; this is not a rolling individual bursary application.","url":"https://www.merseta.org.za/wp-content/uploads/2026/05/merSETA_Notice_DG-Funding-Windows_2026-27.pdf"}'::jsonb, '2026-11-09'::date),
('bursary-7', 7, '{"name":"Vodacom External Bursary","type":"Corporate","year":"Current published round: 2026 deadline","fields":"STEM, business and commercial fields","coverage":"Registration, tuition, university accommodation, books and meals; private accommodation is capped. Programme terms apply.","eligibility":"SA citizens by birth studying full-time undergraduate programmes. Grade 12 average of at least 70%, or at least 65% for current tertiary students.","closes":"2026-08-31","deadline":"31 August 2026","url":"https://www.vodacom.com/bursary-programme.php"}'::jsonb, '2026-11-09'::date),
('bursary-8', 8, '{"name":"Department of Agriculture Bursary","type":"Government","year":"2027 advert listed","fields":"Selected agriculture-related qualifications","coverage":"Consult the current official advert for funded expenses and award terms.","eligibility":"Use the 2027 advert and undergraduate application form for the approved qualifications and selection requirements.","status":"Dates unconfirmed","deadline":"A 2027 advert is listed, but its closing date has not been verified here.","url":"https://nda.gov.za/index.php/vacancies"}'::jsonb, '2026-11-09'::date),
('bursary-9', 9, '{"name":"SANRAL External Bursary","type":"Government","year":"2027","fields":"Approved undergraduate and postgraduate fields listed by SANRAL","coverage":"Confirm covered expenses and conditions in the current official bursary terms.","eligibility":"First-year 2027 undergraduates: minimum 70% average. Approved NQF 8 postgraduate applicants: minimum 60%. Approved fields and further selection criteria apply.","opens":"2026-07-01","closes":"2026-10-31","deadline":"1 July–31 October 2026","url":"https://www.nra.co.za/Bursaries"}'::jsonb, '2026-11-09'::date),
('bursary-10', 10, '{"name":"SAICA Thuthuka Bursary","type":"Professional Body","year":"Confirm current intake on provider portal","fields":"BCom Accounting towards the CA(SA) route","coverage":"Tuition, books, meals, accommodation and academic and personal support, subject to award terms.","eligibility":"Academically eligible African and Coloured students from disadvantaged backgrounds pursuing the supported accounting route. Confirm full criteria with Thuthuka.","status":"Dates unconfirmed","deadline":"Current closing date not verified. Check the application portal linked by SAICA.","url":"https://www.saica.org.za/initiatives/thuthuka/apply-to-the-thuthuka-bursary-fund"}'::jsonb, '2026-11-09'::date),
('bursary-11', 11, '{"name":"ZABursaries Directory","type":"Platform","year":"Multiple intakes","fields":"Third-party bursary listings across study fields","coverage":"A discovery directory, not a funding provider. Each funder sets its own benefits.","eligibility":"Varies by listing. Verify each opportunity directly with its funder before applying.","status":"Directory","deadline":"Varies by bursary; visiting this directory does not mean applications are open.","url":"https://www.zabursaries.co.za"}'::jsonb, '2026-11-09'::date)
on conflict (id) do nothing;

commit;

-- Expected result: 11 on the first run.
select count(*) as published_bursaries from public.bursaries where published = true;
