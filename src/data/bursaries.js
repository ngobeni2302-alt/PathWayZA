// Manually reviewed against the linked sources. This is not a live funding feed.
export const BURSARIES_REVIEWED = '2026-11-09';
export const BURSARIES = [
  {
    name: 'NSFAS', type: 'Government', year: '2027',
    fields: 'Approved programmes at public universities and TVET colleges',
    coverage: 'Funding depends on eligibility, institution and the applicable annual funding rules. No single annual award amount is guaranteed.',
    eligibility: 'Check the official funding rules for citizenship, household income, academic and programme requirements.',
    opens: '2026-09-18', closes: '2026-10-31',
    deadline: '18 September–31 October 2026',
    url: 'https://nsfas.org.za/content/how-to-apply.html',
  },
  {
    name: 'Funza Lushaka', type: 'Government', year: '2027', fields: 'Teaching in the programme’s priority areas',
    coverage: 'Funding is subject to programme terms and annual limits; confirm covered costs in the current application notes.',
    eligibility: 'First-time applicants must be 30 or younger. Priority teaching subjects, academic criteria and service obligations apply.',
    opens: '2026-10-01', closes: '2027-01-31',
    deadline: 'New applicants: 31 January 2027. Returning bursars: 30 November 2026. Opened 1 October 2026.',
    url: 'https://www.funzalushaka.doe.gov.za/Home/',
  },
  {
    name: 'Sasol Bursary Programme', type: 'Corporate', year: '2027', fields: 'Selected engineering and science degrees, including data science',
    coverage: 'Tuition and a living allowance, with student support; award terms apply.',
    eligibility: 'South African citizens by birth, permanently resident in SA, pursuing approved full-time undergraduate degrees at approved public universities. Subject marks and selection criteria apply; UNISA excluded.',
    opens: '2026-04-01', closes: '2026-05-17', deadline: '1 April–17 May 2026',
    url: 'https://www.sasol.com/media-centre/media-releases/sasol-bursaries-now-open-applications-invited-for-2027-engineering-and-science-studies',
  },
  {
    name: 'Sasol Foundation Bursary', type: 'Foundation', year: '2027', fields: 'STEM and selected accounting and financial sciences qualifications',
    coverage: 'Comprehensive undergraduate funding and student support, subject to selection and award terms.',
    eligibility: 'Targets eligible students from Sasol communities, children of employees and children of Khanyisa shareholders, including low-income and missing-middle households.',
    opens: '2026-08-01', closes: '2026-08-23', deadline: '1–23 August 2026',
    url: 'https://www.sasol.com/media-centre/media-releases/sasol-foundation-invites-applications-2027-bursaries',
  },
  {
    name: 'Nedbank External Bursary', type: 'Corporate', year: '2027 / next cycle 2028', fields: 'STEM and green economy qualifications',
    coverage: 'Funding for full-time undergraduate or honours study. A fixed rand amount is not confirmed on the source page.',
    eligibility: 'SA citizenship, demonstrated financial need, at least 65% and admission to a public university or university of technology. Mathematics Literacy does not qualify.',
    status: 'Closed', deadline: '2027 applications closed. Applications for 2028 funding open in 2027; exact dates not confirmed.',
    url: 'https://private.nedbank.co.za/content/nedbank/za/en/group/careers/graduates-and-bursaries.html',
  },
  {
    name: 'merSETA Funding', type: 'SETA', year: '2026/27 financial year', fields: 'Manufacturing, engineering and related sector programmes',
    coverage: 'Programme-based grants through eligible organisations and institutions; individual student funding depends on the implementing programme.',
    eligibility: 'The published grant windows target organisations. Students should enquire through their institution or participating provider.',
    status: 'Check provider', deadline: 'Separate grant windows apply; this is not a rolling individual bursary application.',
    url: 'https://www.merseta.org.za/wp-content/uploads/2026/05/merSETA_Notice_DG-Funding-Windows_2026-27.pdf',
  },
  {
    name: 'Vodacom External Bursary', type: 'Corporate', year: 'Current published round: 2026 deadline', fields: 'STEM, business and commercial fields',
    coverage: 'Registration, tuition, university accommodation, books and meals; private accommodation is capped. Programme terms apply.',
    eligibility: 'SA citizens by birth studying full-time undergraduate programmes. Grade 12 average of at least 70%, or at least 65% for current tertiary students.',
    closes: '2026-08-31', deadline: '31 August 2026',
    url: 'https://www.vodacom.com/bursary-programme.php',
  },
  {
    name: 'Department of Agriculture Bursary', type: 'Government', year: '2027 advert listed', fields: 'Selected agriculture-related qualifications',
    coverage: 'Consult the current official advert for funded expenses and award terms.',
    eligibility: 'Use the 2027 advert and undergraduate application form for the approved qualifications and selection requirements.',
    status: 'Dates unconfirmed', deadline: 'A 2027 advert is listed, but its closing date has not been verified here.',
    url: 'https://nda.gov.za/index.php/vacancies',
  },
  {
    name: 'SANRAL External Bursary', type: 'Government', year: '2027', fields: 'Approved undergraduate and postgraduate fields listed by SANRAL',
    coverage: 'Confirm covered expenses and conditions in the current official bursary terms.',
    eligibility: 'First-year 2027 undergraduates: minimum 70% average. Approved NQF 8 postgraduate applicants: minimum 60%. Approved fields and further selection criteria apply.',
    opens: '2026-07-01', closes: '2026-10-31', deadline: '1 July–31 October 2026',
    url: 'https://www.nra.co.za/Bursaries',
  },
  {
    name: 'SAICA Thuthuka Bursary', type: 'Professional Body', year: 'Confirm current intake on provider portal', fields: 'BCom Accounting towards the CA(SA) route',
    coverage: 'Tuition, books, meals, accommodation and academic and personal support, subject to award terms.',
    eligibility: 'Academically eligible African and Coloured students from disadvantaged backgrounds pursuing the supported accounting route. Confirm full criteria with Thuthuka.',
    status: 'Dates unconfirmed', deadline: 'Current closing date not verified. Check the application portal linked by SAICA.',
    url: 'https://www.saica.org.za/initiatives/thuthuka/apply-to-the-thuthuka-bursary-fund',
  },
  {
    name: 'ZABursaries Directory', type: 'Platform', year: 'Multiple intakes', fields: 'Third-party bursary listings across study fields',
    coverage: 'A discovery directory, not a funding provider. Each funder sets its own benefits.',
    eligibility: 'Varies by listing. Verify each opportunity directly with its funder before applying.',
    status: 'Directory', deadline: 'Varies by bursary; visiting this directory does not mean applications are open.',
    url: 'https://www.zabursaries.co.za',
  },
];

export function bursaryStatus(bursary, today) {
  if (bursary.status) return bursary.status;
  if (bursary.closes && today > bursary.closes) return 'Closed';
  if (bursary.opens && today < bursary.opens) return 'Upcoming';
  // An open label expires after 30 days unless the listing is reviewed again.
  const age = (Date.parse(today) - Date.parse(bursary.reviewedAt || BURSARIES_REVIEWED)) / 86400000;
  if (age > 30) return 'Recheck required';
  return bursary.opens && bursary.closes ? 'Within published dates' : 'Dates unconfirmed';
}
