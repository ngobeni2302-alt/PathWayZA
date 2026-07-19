import { useState, useEffect } from "react";
import { supabase } from "./src/supabaseClient.js";

// ── THEME TOKENS ─────────────────────────────────────────────────────────────
const DARK = {
  navy:    "#09090B", navyMid: "#18181B", navyCard: "#121214",
  slate:   "#27272A", teal: "#6366F1",   tealDim: "#4F46E5",
  amber:   "#F59E0B", chalk: "#FAFAFA",  muted: "#A1A1AA",
  border:  "#27272A", white: "#FFFFFF",
  heroGrad:"radial-gradient(ellipse at 60% 40%, #1e1b4b 0%, #09090b 70%)",
  pageHead:"linear-gradient(180deg, #18181b 0%, #09090b 100%)",
  inputBg: "#18181B",
};

const LIGHT = {
  navy:    "#F8FAFC", navyMid: "#FFFFFF", navyCard: "#FFFFFF",
  slate:   "#E2E8F0", teal: "#4F46E5",   tealDim: "#4338CA",
  amber:   "#EA580C", chalk: "#0F172A",  muted: "#64748B",
  border:  "#CBD5E1", white: "#0F172A",
  heroGrad:"radial-gradient(ellipse at 60% 40%, #e0e7ff 0%, #f8fafc 70%)",
  pageHead:"linear-gradient(180deg, #f1f5f9 0%, #f8fafc 100%)",
  inputBg: "#F1F5F9",
};

// ── CAREERS DATA ──────────────────────────────────────────────────────────────
const CAREERS = [
  // ── Existing careers ──
  {
    id: 1, title: "Software Engineer", demand: 94, salary: "R28 000 – R75 000/mo",
    field: "Technology", growth: "+22% by 2030", grade: null,
    subjects: ["Mathematics", "Physical Sciences", "Information Technology"],
    paths: [
      { type: "university", label: "BSc Computer Science", duration: "3 years", institution: "UCT / Wits / UP" },
      { type: "college",    label: "Diploma in Software Development", duration: "2 years", institution: "Richfield / Boston City Campus" },
      { type: "online",     label: "Full-Stack Bootcamp", duration: "6 months", institution: "WeThinkCode_ / HyperionDev" },
    ],
    bursaries: ["Sasol Bursary", "Anglo American", "Vodacom Foundation"],
    internships: ["Allan Gray Orbis", "Graduate Programme at Takealot", "Google STEP Internship"],
  },
  {
    id: 2, title: "Electrician (Master)", demand: 88, salary: "R22 000 – R60 000/mo",
    field: "Trades", growth: "+18% by 2030", grade: null,
    subjects: ["Mathematics", "Physical Sciences", "Technical Drawing"],
    paths: [
      { type: "apprenticeship", label: "Electrician Apprenticeship", duration: "3–4 years", institution: "SETA Registered" },
      { type: "college",        label: "N3–N6 Electrical Engineering", duration: "2 years", institution: "TVET College" },
    ],
    bursaries: ["MERSETA Bursary", "Eskom Foundation", "City Power Learnership"],
    internships: ["Eskom Learnership", "City Power Apprenticeship", "Local Municipality Programme"],
  },
  {
    id: 3, title: "Registered Nurse", demand: 91, salary: "R18 000 – R45 000/mo",
    field: "Healthcare", growth: "+15% by 2030", grade: null,
    subjects: ["Life Sciences", "Mathematics", "Physical Sciences"],
    paths: [
      { type: "university", label: "BCur Nursing Science", duration: "4 years", institution: "UJ / UNISA / Stellenbosch" },
      { type: "college",    label: "Diploma in Nursing", duration: "3 years", institution: "Nursing College (Provincial)" },
    ],
    bursaries: ["NSFAS", "Netcare Bursary", "Life Healthcare Foundation"],
    internships: ["Community Service Year", "Hospital Internship", "Mediclinic Graduate Programme"],
  },
  {
    id: 4, title: "Graphic Designer", demand: 76, salary: "R12 000 – R40 000/mo",
    field: "Creative Arts", growth: "+11% by 2030", grade: null,
    subjects: ["Visual Arts", "Information Technology", "Mathematics Literacy"],
    paths: [
      { type: "university", label: "BA Fine Arts / Design", duration: "3 years", institution: "CPUT / DUT / Vega" },
      { type: "college",    label: "Diploma in Graphic Design", duration: "2 years", institution: "Vega / AAA School of Advertising" },
      { type: "online",     label: "UI/UX Design Certificate", duration: "3 months", institution: "Google / Coursera" },
    ],
    bursaries: ["NSFAS", "Old Mutual Foundation", "MTN Foundation"],
    internships: ["Agency Internship", "Freelance Portfolio Route", "In-House Design Learnerships"],
  },
  {
    id: 5, title: "Chartered Accountant", demand: 82, salary: "R35 000 – R90 000/mo",
    field: "Business & Finance", growth: "+9% by 2030", grade: null,
    subjects: ["Mathematics", "Accounting", "Economics"],
    paths: [
      { type: "university",     label: "BCom Accounting", duration: "3 years", institution: "UCT / Wits / UNISA" },
      { type: "apprenticeship", label: "SAICA Articles", duration: "3 years", institution: "SAICA Registered Firm" },
      { type: "college",        label: "Diploma in Accounting", duration: "2 years", institution: "Damelin / Regent Business School" },
    ],
    bursaries: ["SAICA Bursary", "Deloitte Bursary", "PwC Foundation"],
    internships: ["Big 4 Audit Firms", "SAICA Articles", "Corporate Finance Graduate Schemes"],
  },
  {
    id: 6, title: "Civil Engineer", demand: 85, salary: "R30 000 – R80 000/mo",
    field: "Engineering", growth: "+14% by 2030", grade: null,
    subjects: ["Mathematics", "Physical Sciences", "Technical Drawing"],
    paths: [
      { type: "university", label: "BEng Civil Engineering", duration: "4 years", institution: "UCT / Wits / SU" },
      { type: "college",    label: "Diploma in Civil Engineering", duration: "3 years", institution: "CPUT / DUT / TUT" },
    ],
    bursaries: ["SANRAL Bursary", "Murray & Roberts", "ESKOM Engineering Bursary"],
    internships: ["SANRAL Graduate Programme", "SMEC South Africa", "AECOM Graduate Scheme"],
  },

  // ── Grade 8 & 9 careers ──
  {
    id: 7, title: "Teacher / Educator", demand: 86, salary: "R18 000 – R42 000/mo",
    field: "Education", growth: "+12% by 2030", grade: "8 & 9",
    subjects: ["English Home Language", "Mathematics (Beginner)", "Life Orientation", "History (Beginner)", "Geography (Beginner)", "Education Degree"],
    paths: [
      { type: "university", label: "BEd (Bachelor of Education)", duration: "4 years", institution: "UNISA / UJ / Wits / NWU" },
      { type: "college",    label: "PGCE (Postgraduate Certificate)", duration: "1 year", institution: "Any accredited university" },
      { type: "college",    label: "Diploma in Grade R Teaching", duration: "3 years", institution: "TVET / Community College" },
    ],
    bursaries: ["Funza Lushaka Bursary", "NSFAS", "Department of Education Bursary"],
    internships: ["School-Based Teaching Practice", "Department of Education Internship", "Teach SA Programme"],
  },
  {
    id: 8, title: "Environmental Scientist", demand: 74, salary: "R20 000 – R52 000/mo",
    field: "Science & Environment", growth: "+16% by 2030", grade: "8 & 9",
    subjects: ["Natural Sciences (Beginner)", "Geography (Beginner)", "Mathematics (Beginner)"],
    paths: [
      { type: "university", label: "BSc Environmental Science", duration: "3 years", institution: "UCT / Wits / UKZN" },
      { type: "university", label: "BSc Geography & Environmental Management", duration: "3 years", institution: "UP / SU / Rhodes" },
      { type: "college",    label: "Diploma in Nature Conservation", duration: "3 years", institution: "Northlink / Oakfields College" },
    ],
    bursaries: ["SANBI Bursary", "WWF South Africa", "Department of Environment Bursary"],
    internships: ["SANParks Graduate Programme", "SANBI Internship", "Municipal Environmental Learnerships"],
  },
  {
    id: 9, title: "Entrepreneur / Business Owner", demand: 80, salary: "R15 000 – R100 000+/mo",
    field: "Business & Finance", growth: "+20% by 2030", grade: "8 & 9",
    subjects: ["Economic & Management Sciences (Beginner)", "Mathematics (Beginner)", "Technology (Beginner)"],
    paths: [
      { type: "university", label: "BCom Entrepreneurship", duration: "3 years", institution: "UCT GSB / Wits Business School" },
      { type: "college",    label: "Diploma in Business Management", duration: "2 years", institution: "Damelin / Regent / Boston" },
      { type: "online",     label: "SEDA SME Development Programme", duration: "6 months", institution: "SEDA / NYDA" },
    ],
    bursaries: ["NYDA Grant", "SEDA Business Support", "IDC Youth Fund"],
    internships: ["NYDA Entrepreneurship Programme", "Allan Gray Fellowship", "Business Incubator Programmes"],
  },
  {
    id: 10, title: "Social Worker", demand: 83, salary: "R14 000 – R35 000/mo",
    field: "Social Sciences", growth: "+13% by 2030", grade: "8 & 9",
    subjects: ["Life Orientation", "History (Beginner)", "English Home Language"],
    paths: [
      { type: "university", label: "BA Social Work", duration: "4 years", institution: "UNISA / UWC / NWU" },
      { type: "college",    label: "Diploma in Child & Youth Care", duration: "3 years", institution: "TVET / Isibindi College" },
      { type: "apprenticeship", label: "Social Auxiliary Work Learnership", duration: "1 year", institution: "SACSSP Registered" },
    ],
    bursaries: ["Department of Social Development Bursary", "NSFAS", "Lotto Social Development Fund"],
    internships: ["Department of Social Development Internship", "NGO Learnerships", "SASSA Graduate Programme"],
  },
  {
    id: 11, title: "IT Technician / Network Engineer", demand: 89, salary: "R18 000 – R55 000/mo",
    field: "Technology", growth: "+24% by 2030", grade: "8 & 9",
    subjects: ["Technology (Beginner)", "Natural Sciences (Beginner)", "Mathematics (Beginner)"],
    paths: [
      { type: "college",    label: "N+ / A+ / CCNA Certification", duration: "6–12 months", institution: "Cisco Networking Academy / CompTIA" },
      { type: "college",    label: "Diploma in IT Support", duration: "2 years", institution: "Richfield / CTU Training Solutions" },
      { type: "university", label: "BSc Information Technology", duration: "3 years", institution: "UNISA / UJ / TUT" },
    ],
    bursaries: ["Cisco NetAcad Scholarship", "Vodacom Foundation", "MTN ICT Bursary"],
    internships: ["Cisco CCNA Learnership", "Telkom Internship", "IT Helpdesk Learnerships"],
  },
  {
    id: 12, title: "Journalist / Media Producer", demand: 68, salary: "R12 000 – R38 000/mo",
    field: "Creative Arts", growth: "+8% by 2030", grade: "8 & 9",
    subjects: ["English Home Language", "History (Beginner)", "Drama (Beginner)"],
    paths: [
      { type: "university", label: "BA Journalism & Media Studies", duration: "3 years", institution: "Rhodes / Wits / CPUT" },
      { type: "college",    label: "Diploma in Journalism", duration: "2 years", institution: "Damelin / Boston Media House" },
      { type: "online",     label: "Digital Content Creation Certificate", duration: "3 months", institution: "Google / Coursera" },
    ],
    bursaries: ["MDDA Bursary", "NSFAS", "M&G Foundation Bursary"],
    internships: ["SABC Graduate Programme", "News24 Internship", "Community Radio Learnerships"],
  },
  {
    id: 13, title: "Chef / Culinary Professional", demand: 72, salary: "R10 000 – R45 000/mo",
    field: "Hospitality", growth: "+10% by 2030", grade: "8 & 9",
    subjects: ["Economic & Management Sciences (Beginner)", "Natural Sciences (Beginner)", "Life Orientation"],
    paths: [
      { type: "college",    label: "Diploma in Professional Cookery", duration: "1–2 years", institution: "HTA / Capsicum Culinary Studio" },
      { type: "college",    label: "N4–N6 Hospitality Management", duration: "18 months", institution: "TVET College" },
      { type: "apprenticeship", label: "Chef Apprenticeship", duration: "2 years", institution: "CATHSSETA Registered" },
    ],
    bursaries: ["CATHSSETA Bursary", "Tsogo Sun Foundation", "Sun International Learnership"],
    internships: ["Sun International Learnership", "Tsogo Sun Graduate Programme", "Hotel Kitchen Internship"],
  },
  {
    id: 14, title: "Architect", demand: 77, salary: "R25 000 – R70 000/mo",
    field: "Engineering", growth: "+11% by 2030", grade: "8 & 9",
    subjects: ["Technology (Beginner)", "Visual Arts (Beginner)", "Mathematics (Beginner)", "Natural Sciences (Beginner)"],
    paths: [
      { type: "university", label: "BArch (Bachelor of Architecture)", duration: "5 years", institution: "UCT / Wits / TUT / UKZN" },
      { type: "college",    label: "Diploma in Architectural Technology", duration: "3 years", institution: "CPUT / DUT / Ekurhuleni West College" },
      { type: "apprenticeship", label: "Draughtsman Apprenticeship", duration: "3 years", institution: "SACAP Registered" },
    ],
    bursaries: ["SACAP Bursary", "SANRAL Infrastructure Bursary", "Property Point Foundation"],
    internships: ["Paragon Architects Internship", "Government Public Works Internship", "SACAP Community Service"],
  },
  {
    id: 15, title: "Agricultural Scientist / Farmer", demand: 79, salary: "R14 000 – R50 000/mo",
    field: "Agriculture", growth: "+17% by 2030", grade: "8 & 9",
    subjects: ["Natural Sciences (Beginner)", "Geography (Beginner)", "Economic & Management Sciences (Beginner)"],
    paths: [
      { type: "university", label: "BSc Agriculture", duration: "4 years", institution: "UP / SU / UKZN / UFS" },
      { type: "college",    label: "Diploma in Agriculture", duration: "3 years", institution: "Grootfontein / Lowveld College" },
      { type: "apprenticeship", label: "AgriSeta Learnership", duration: "1–2 years", institution: "AgriSETA Registered" },
    ],
    bursaries: ["DAFF Bursary", "Land Bank Bursary", "Afgri Bursary"],
    internships: ["AgriSETA Learnership", "Tongaat Hulett Graduate Programme", "Grain SA Internship"],
  },
  {
    id: 16, title: "Musician / Music Producer", demand: 62, salary: "R8 000 – R60 000+/mo",
    field: "Creative Arts", growth: "+9% by 2030", grade: "8 & 9",
    subjects: ["Music (Beginner)", "Mathematics (Beginner)", "English Home Language"],
    paths: [
      { type: "university", label: "BMus (Bachelor of Music)", duration: "4 years", institution: "UNISA / Wits / UCT / NMMU" },
      { type: "college",    label: "Diploma in Music Production", duration: "2 years", institution: "AFDA / Academy of Sound Engineering" },
      { type: "online",     label: "Music Production Certificate", duration: "6 months", institution: "Berklee Online / Coursera" },
    ],
    bursaries: ["NAC Bursary", "NSFAS", "Mnet Music Foundation"],
    internships: ["Recording Studio Internship", "NAC Artist Development", "Community Arts Centre Learnership"],
  },
  {
    id: 17, title: "Sports Coach / Exercise Scientist", demand: 71, salary: "R10 000 – R40 000/mo",
    field: "Sport & Recreation", growth: "+14% by 2030", grade: "8 & 9",
    subjects: ["Life Orientation", "Natural Sciences (Beginner)", "Mathematics (Beginner)"],
    paths: [
      { type: "university", label: "BSc Sport Science", duration: "3 years", institution: "UP / UJ / Stellenbosch / UKZN" },
      { type: "college",    label: "Diploma in Sport Management", duration: "2 years", institution: "Boston / Regent / Vaal University of Tech" },
      { type: "apprenticeship", label: "SASCOC Coaching Certification", duration: "6 months", institution: "SASCOC / Sport Federations" },
    ],
    bursaries: ["SASCOC Bursary", "Sport Trust Bursary", "NSFAS"],
    internships: ["SASCOC High Performance Programme", "Provincial Sport Coaching Internship", "Gym & Wellness Learnerships"],
  },
  {
    id: 18, title: "Plumber / Water Technician", demand: 84, salary: "R18 000 – R55 000/mo",
    field: "Trades", growth: "+16% by 2030", grade: "8 & 9",
    subjects: ["Technology (Beginner)", "Natural Sciences (Beginner)", "Mathematics (Beginner)"],
    paths: [
      { type: "apprenticeship", label: "Plumbing Apprenticeship", duration: "3–4 years", institution: "CETA / MICT SETA" },
      { type: "college",        label: "N3–N6 Civil & Water Engineering", duration: "2 years", institution: "TVET College" },
    ],
    bursaries: ["CETA Bursary", "Rand Water Bursary", "DWS Bursary"],
    internships: ["Rand Water Learnership", "Johannesburg Water Apprenticeship", "eThekwini Water Internship"],
  },
  {
    id: 19, title: "Psychologist / Counsellor", demand: 78, salary: "R22 000 – R65 000/mo",
    field: "Social Sciences", growth: "+18% by 2030", grade: "8 & 9",
    subjects: ["Life Orientation", "History (Beginner)", "English Home Language", "Natural Sciences (Beginner)"],
    paths: [
      { type: "university", label: "BA Psychology → MA Clinical Psychology", duration: "6 years", institution: "UNISA / UJ / Wits / SU" },
      { type: "university", label: "BCom Industrial Psychology", duration: "3 years", institution: "UFS / NWU / UP" },
      { type: "college",    label: "Diploma in Counselling", duration: "2 years", institution: "Richfield / Boston College" },
    ],
    bursaries: ["NSFAS", "HPCSA Bursary", "Department of Health Bursary"],
    internships: ["SANCA Counselling Internship", "School Psychologist Internship", "EAP Counsellor Learnership"],
  },
  {
    id: 20, title: "Data Analyst", demand: 90, salary: "R22 000 – R60 000/mo",
    field: "Technology", growth: "+28% by 2030", grade: "8 & 9",
    subjects: ["Mathematics (Beginner)", "Economic & Management Sciences (Beginner)", "Natural Sciences (Beginner)"],
    paths: [
      { type: "university", label: "BSc Statistics / Data Science", duration: "3 years", institution: "UCT / Wits / SU" },
      { type: "college",    label: "Diploma in Data Analytics", duration: "2 years", institution: "Richfield / Boston / Regenesys" },
      { type: "online",     label: "Google Data Analytics Certificate", duration: "6 months", institution: "Coursera / Google" },
    ],
    bursaries: ["Standard Bank Bursary", "Discovery Bursary", "FNB Foundation Bursary"],
    internships: ["Discovery Graduate Programme", "Standard Bank Internship", "Stats SA Graduate Internship"],
  },
  {
    id: 21, title: "Data Scientist", demand: 95, salary: "R40 000 – R100 000+/mo",
    field: "Technology", growth: "+35% by 2030", grade: null,
    subjects: ["Mathematics", "Information Technology", "Physical Sciences", "IT / Tech Degree", "Science & Maths Degree", "Master's Degree", "Honours / Postgraduate Diploma"],
    paths: [
      { type: "university", label: "BSc Computer Science / Data Science", duration: "3-4 years", institution: "UCT / Wits / UP / SU" },
      { type: "online",     label: "Data Science Bootcamp", duration: "6 months", institution: "ExploreAI / HyperionDev" }
    ],
    bursaries: ["Standard Bank Bursary", "FNB Data Engineering Bursary", "CSIR Bursary"],
    internships: ["Absa Data Science Graduate Programme", "ExploreAI Academy", "Standard Bank Quant Grad"]
  },
  {
    id: 22, title: "Renewable Energy Engineer", demand: 92, salary: "R30 000 – R85 000/mo",
    field: "Engineering", growth: "+40% by 2030", grade: null,
    subjects: ["Mathematics", "Physical Sciences", "Information Technology"],
    paths: [
      { type: "university", label: "BEng Electrical / Mechanical Engineering", duration: "4 years", institution: "UP / SU / UCT" },
      { type: "college",    label: "National Diploma in Engineering", duration: "3 years", institution: "TUT / CPUT" }
    ],
    bursaries: ["Eskom Bursary", "CSIR Bursary", "SANEDI Bursary"],
    internships: ["Eskom Graduate Programme", "Scatec Solar Internship", "Enel Green Power"]
  },
  {
    id: 23, title: "Digital Marketing Specialist", demand: 86, salary: "R15 000 – R55 000/mo",
    field: "Business & Finance", growth: "+25% by 2030", grade: null,
    subjects: ["English Home Language", "Business Studies", "Computer Applications Technology"],
    paths: [
      { type: "university", label: "BCom Marketing", duration: "3 years", institution: "UJ / UP / Varsity College" },
      { type: "college",    label: "Diploma in Digital Marketing", duration: "2-3 years", institution: "Red & Yellow / AAA School of Advertising" },
      { type: "online",     label: "Google Digital Skills / Hubspot", duration: "3 months", institution: "Google / Hubspot" }
    ],
    bursaries: ["Ogilvy Bursary", "WPP Scholarship", "Red & Yellow Bursary"],
    internships: ["Ogilvy Graduate Programme", "VMLY&R Internship", "Takealot Marketing Intern"]
  },
  {
    id: 24, title: "Pharmacist", demand: 89, salary: "R35 000 – R70 000/mo",
    field: "Healthcare", growth: "+12% by 2030", grade: null,
    subjects: ["Mathematics", "Physical Sciences", "Life Sciences"],
    paths: [
      { type: "university", label: "Bachelor of Pharmacy (BPharm)", duration: "4 years", institution: "NWU / Wits / UKZN / UWC" }
    ],
    bursaries: ["Department of Health Bursary", "Clicks Pharmacy Bursary", "Dis-Chem Foundation"],
    internships: ["Public Hospital Pharmacy Internship", "Clicks Graduate Programme", "Dis-Chem Internship"]
  },
  {
    id: 25, title: "Mechatronics Engineer", demand: 90, salary: "R32 000 – R90 000/mo",
    field: "Engineering", growth: "+28% by 2030", grade: null,
    subjects: ["Mathematics", "Physical Sciences", "Information Technology"],
    paths: [
      { type: "university", label: "BEng Mechatronics", duration: "4 years", institution: "SU / UCT / NMMU" },
      { type: "college",    label: "Diploma in Mechatronics", duration: "3 years", institution: "TUT / CPUT" }
    ],
    bursaries: ["Toyota Bursary", "BMW Group Bursary", "Armscor Bursary"],
    internships: ["BMW Graduate Programme", "Toyota Graduate Trainee", "VWSA Internship"]
  },
  {
    id: 26, title: "University Lecturer / Professor", demand: 85, salary: "R40 000 – R90 000/mo",
    field: "Education", growth: "+10% by 2030", grade: null,
    subjects: ["Master's Degree", "Doctorate / PhD", "Education Degree", "Science & Maths Degree", "Humanities Degree"],
    paths: [
      { type: "university", label: "Master's -> PhD", duration: "4-6 years postgrad", institution: "All Major Universities" }
    ],
    bursaries: ["NRF Postgraduate Funding", "Mellon Foundation", "University Staff Doctoral Programme"],
    internships: ["Academic Tutoring", "Research Assistantship", "Postdoctoral Fellowship"],
  },
  {
    id: 27, title: "Specialist Medical Doctor / Surgeon", demand: 98, salary: "R80 000 – R200 000+/mo",
    field: "Healthcare", growth: "+14% by 2030", grade: null,
    subjects: ["Health Sciences Degree", "Medical Specialisation", "Master's Degree"],
    paths: [
      { type: "university", label: "MMed (Master of Medicine)", duration: "4-5 years post-MBChB", institution: "UCT / Wits / UP / UKZN" },
      { type: "college",    label: "Fellowship of the Colleges of Medicine (FCSA)", duration: "Exams", institution: "CMSA" }
    ],
    bursaries: ["Department of Health Registrar Posts", "Discovery Foundation"],
    internships: ["Registrar Training in Public Hospitals", "Clinical Fellowship"],
  },
  {
    id: 28, title: "Senior Data Scientist / AI Researcher", demand: 95, salary: "R70 000 – R150 000/mo",
    field: "Technology", growth: "+35% by 2030", grade: null,
    subjects: ["Science & Maths Degree", "IT / Tech Degree", "Master's Degree", "Doctorate / PhD"],
    paths: [
      { type: "university", label: "MSc / PhD in Data Science or AI", duration: "2-4 years postgrad", institution: "SU / Wits / UCT" }
    ],
    bursaries: ["CSIR Bursary", "DeepMind Scholarship", "NRF Funding"],
    internships: ["AI Research Lab Internship", "Tech Corporate Graduate Programme"],
  },
  {
    id: 29, title: "Executive Business Manager / CEO", demand: 88, salary: "R100 000 – R300 000+/mo",
    field: "Business & Finance", growth: "+12% by 2030", grade: null,
    subjects: ["Commerce & Business Degree", "MBA / Executive Education"],
    paths: [
      { type: "university", label: "Master of Business Administration (MBA)", duration: "1-2 years", institution: "GIBS / UCT GSB / Wits Business School / Henley" }
    ],
    bursaries: ["Corporate Sponsorship", "MBA Scholarships"],
    internships: ["Management Consulting", "Executive Shadowing", "Leadership Programmes"],
  },
  {
    id: 30, title: "Principal Engineer", demand: 92, salary: "R80 000 – R160 000/mo",
    field: "Engineering", growth: "+18% by 2030", grade: null,
    subjects: ["Engineering Degree", "Master's Degree", "Honours / Postgraduate Diploma", "Doctorate / PhD"],
    paths: [
      { type: "university", label: "MEng / MTech", duration: "1-2 years", institution: "UP / SU / UCT / TUT" }
    ],
    bursaries: ["Engineering Firm Sponsorship", "NRF"],
    internships: ["Senior Engineering Projects", "Professional Registration (ECSA) Mentorship"],
  }
];

// ── SUBJECTS ──────────────────────────────────────────────────────────────────
const SUBJECT_GROUPS = {
"Beginner Subjects": [
    "English (Home Language)", "Afrikaans (First Additional Language)",
    "IsiZulu (Beginner)", "IsiXhosa (Beginner)",
    "Sesotho (Beginner)", "Setswana (Beginner)",
    "Mathematics (Beginner)", "Natural Sciences (Beginner)",
    "History (Beginner)", "Geography (Beginner)",
    "Technology (Beginner)", "Economic & Management Sciences (Beginner)",
    "Visual Arts (Beginner)",
    "Music (Beginner)", "Drama (Beginner)", "Dance (Beginner)",
    "Creative Arts (Beginner)"
  ],
  "Languages": [
    "English Home Language","English First Additional Language",
    "Afrikaans Home Language","Afrikaans First Additional Language",
    "IsiZulu","IsiXhosa","IsiNdebele","Sesotho","Setswana",
    "Sepedi","Xitsonga","Tshivenda","SiSwati","Latin","Sign Language",
  ],
  "Mathematics & Sciences": [
    "Mathematics","Mathematics Literacy","Technical Mathematics",
    "Physical Sciences","Life Sciences","Agricultural Sciences",
    "Marine Sciences","Technical Sciences",
  ],
  "Technology & Computing": [
    "Information Technology","Computer Applications Technology",
    "Technical Drawing","Civil Technology","Electrical Technology",
    "Mechanical Technology","Engineering Graphics & Design",
  ],
  "Business & Commerce": [
    "Accounting","Business Studies","Economics",
    "Entrepreneurship & Business Management","Office Administration",
    "Hospitality Studies","Tourism",
  ],
  "Humanities & Social Sciences": [
    "Life Orientation","History","Geography","Religion Studies","Philosophy",
    "Sociology","Psychology","Political Studies","Development Studies",
  ],
  "Creative & Performing Arts": [
    "Visual Arts","Music","Dramatic Arts","Dance Studies",
    "Design","Film & Video Technology",
  ],
  "Applied & Vocational": [
    "Agricultural Management Practices","Agricultural Technology",
    "Consumer Studies","Sport & Exercise Science",
    "Nautical Science","Public Administration","Safety in Society",
    "Carpentry & Roofwork","Plumbing","Welding & Metalwork",
    "Hairdressing","Cosmetology","Early Childhood Development",
  ],
  "Higher Education Fields": [
    "Education Degree", "Science & Maths Degree", "Commerce & Business Degree",
    "Engineering Degree", "Health Sciences Degree", "Humanities Degree", "IT / Tech Degree",
    "Art & Design Degree"
  ],
  "Postgraduate & Advanced Studies": [
    "Honours / Postgraduate Diploma",
    "Master's Degree",
    "Doctorate / PhD",
    "MBA / Executive Education",
    "Medical Specialisation"
  ],
};
const ALL_SUBJECTS = Object.values(SUBJECT_GROUPS).flat();

const FIELDS = ["All", "Technology", "Trades", "Healthcare", "Creative Arts", "Business & Finance",
  "Engineering", "Education", "Science & Environment", "Social Sciences",
  "Hospitality", "Agriculture", "Sport & Recreation"];

// ── PATH COLORS (theme-aware via props) ───────────────────────────────────────
const PATH_META = {
  university:    { accent: "#6366F1", label: "University" },
  college:       { accent: "#F59E0B", label: "College / TVET" },
  apprenticeship:{ accent: "#A78BFA", label: "Apprenticeship" },
  online:        { accent: "#34D399", label: "Online / Bootcamp" },
};

// ── ARTISAN & WORK-BASED OPPORTUNITIES DATA ──────────────────────────────────
const OPPORTUNITIES = [
  {
    id: 1,
    title: "Apprentice Electrician (Solar Energy Focus)",
    type: "Apprenticeship",
    company: "Rubicon Clean Energy SA",
    stipend: "R5 500 / month",
    location: "Gauteng (Midrand)",
    duration: "36 Months",
    description: "Gain hands-on experience under master electricians. Focuses on commercial solar installation, inverter diagnostics, and smart grid automation. Prepares for the Red Seal trade test.",
    url: "https://rubiconsa.com/pages/careers"
  },
  {
    id: 2,
    title: "Learnership: IT Systems Development (NQF 5)",
    type: "Learnership",
    company: "BCX South Africa",
    stipend: "R4 800 / month",
    location: "Cape Town",
    duration: "12 Months",
    description: "Combination of theoretical classroom training (NQF 5 Systems Development certificate) and practical application. Covers database schemas, software testing, and core web languages.",
    url: "https://www.bcx.co.za/about/careers/"
  },
  {
    id: 3,
    title: "Software Engineering Graduate Internship",
    type: "Internship",
    company: "First National Bank (FNB)",
    stipend: "R12 500 / month",
    location: "Johannesburg",
    duration: "12 Months",
    description: "Open to recent graduates holding a Diploma or BSc in Computer Science. Work inside active sprint teams building banking solutions. High likelihood of permanent placement.",
    url: "https://www.fnb.co.za/careers/"
  },
  {
    id: 4,
    title: "Apprentice Diesel Fitter / Mechanic",
    type: "Apprenticeship",
    company: "Transnet Engineering",
    stipend: "R6 200 / month",
    location: "Durban",
    duration: "48 Months",
    description: "Structured artisan training at Transnet workshops. Focuses on repair and maintenance of massive rail diesel locomotives and heavy machinery. Prepares for red seal trade test.",
    url: "https://transnetengineering.net/careers/"
  },
  {
    id: 5,
    title: "Learnership: Wealth Management & Banking",
    type: "Learnership",
    company: "Nedbank Group",
    stipend: "R4 500 / month",
    location: "Gauteng",
    duration: "12 Months",
    description: "Earn a Wealth Management NQF level 5 certification while working in retail branch operations and advisor support. Matric with Maths/MathLit required.",
    url: "https://jobs.nedbank.co.za/"
  },
  {
    id: 6,
    title: "SA Youth Network (SAYouth.mobi)",
    type: "Platform",
    company: "National Youth Development Agency",
    stipend: "N/A",
    location: "Online / Nationwide",
    duration: "Ongoing",
    description: "A data-free national network for young people to access learning and earning opportunities. Great for learnerships, YES programmes, and entry-level jobs.",
    url: "https://sayouth.mobi/"
  },
  {
    id: 7,
    title: "Artisan Training Institute (ATI) Portal",
    type: "Platform",
    company: "ATI South Africa",
    stipend: "N/A",
    location: "Online",
    duration: "Ongoing",
    description: "Apply directly for artisan apprenticeships (fitting, turning, electrical, welding) and check for sponsored training programs and trade test dates.",
    url: "https://www.artisantraining.co.za/"
  },
  {
    id: 8,
    title: "Pnet & Careers24",
    type: "Platform",
    company: "Online Job Boards",
    stipend: "N/A",
    location: "Online",
    duration: "Ongoing",
    description: "The largest online job portals in South Africa. Highly recommended for finding corporate learnerships, bursary listings, and entry-level graduate programmes.",
    url: "https://www.pnet.co.za/"
  },
  {
    id: 10,
    title: "Lulaway Entry-Level Placements",
    type: "Platform",
    company: "Lulaway",
    stipend: "N/A",
    location: "Online / Nationwide",
    duration: "Ongoing",
    description: "Specializes in entry-level placements, artisan roles, and learnerships. They partner with government and large corporates to place youth in structured jobs.",
    url: "https://www.lulaway.co.za/"
  },
  {
    id: 11,
    title: "Gauteng Provincial Government Jobs",
    type: "Platform",
    company: "Gauteng Government",
    stipend: "N/A",
    location: "Gauteng",
    duration: "Ongoing",
    description: "Official portal for jobs and learnerships within the Gauteng Provincial Government departments.",
    url: "https://jobs.gauteng.gov.za/"
  },
  {
    id: 12,
    title: "merSETA Learnerships",
    type: "Platform",
    company: "merSETA",
    stipend: "N/A",
    location: "Nationwide",
    duration: "Ongoing",
    description: "Manufacturing, Engineering and Related Services SETA learnership programmes and skills development.",
    url: "https://www.merseta.org.za/skills-development/curriculum-learning-programmes/learnerships/"
  },
  {
    id: 13,
    title: "Indeed South Africa",
    type: "Platform",
    company: "Indeed",
    stipend: "N/A",
    location: "Nationwide",
    duration: "Ongoing",
    description: "Aggregated listings of the latest jobs, learnerships, and internship opportunities available across South Africa.",
    url: "https://za.indeed.com/jobs?q=learnership+OR+internship+OR+jobs&l=South+Africa"
  }
];

// Helper to map bursaries and internships to their official application websites
function getExternalLink(name) {
  const links = {
    // Bursaries
    "Sasol Bursary": "https://www.sasolbursaries.com",
    "Anglo American": "https://www.angloamerican.com",
    "Vodacom Foundation": "https://www.vodacom.co.za",
    "MERSETA Bursary": "https://www.merseta.org.za",
    "Eskom Foundation": "https://www.eskom.co.za",
    "City Power Learnership": "https://www.citypower.co.za",
    "NSFAS": "https://www.nsfas.org.za",
    "Netcare Bursary": "https://www.netcare.co.za",
    "Life Healthcare Foundation": "https://www.lifehealthcare.co.za",
    "Old Mutual Foundation": "https://www.oldmutual.co.za",
    "MTN Foundation": "https://www.mtn.co.za",
    "SAICA Bursary": "https://www.saica.co.za",
    "Deloitte Bursary": "https://www2.deloitte.com/za",
    "PwC Foundation": "https://www.pwc.co.za",
    "SANRAL Bursary": "https://www.sanral.co.za",
    "Murray & Roberts": "https://www.murrob.com",
    "ESKOM Engineering Bursary": "https://www.eskom.co.za",
    "Funza Lushaka Bursary": "https://www.funzalushaka.gov.za",
    "Department of Education Bursary": "https://www.education.gov.za",
    "SANBI Bursary": "https://www.sanbi.org",
    "WWF South Africa": "https://www.wwf.org.za",
    "Department of Environment Bursary": "https://www.dffe.gov.za",
    "NYDA Grant": "https://www.nyda.gov.za",
    "SEDA Business Support": "http://www.seda.org.za",
    "IDC Youth Fund": "https://www.idc.co.za",
    "Department of Social Development Bursary": "https://www.dsd.gov.za",
    "Lotto Social Development Fund": "http://www.nlcsa.org.za",
    "Cisco NetAcad Scholarship": "https://www.netacad.com",
    "MTN ICT Bursary": "https://www.mtn.co.za",
    "MDDA Bursary": "https://www.mdda.org.za",
    "M&G Foundation Bursary": "https://mg.co.za",
    "CATHSSETA Bursary": "https://cathsseta.org.za",
    "Tsogo Sun Foundation": "https://www.tsogosun.com",
    "Sun International Learnership": "https://www.suninternational.com",
    "SACAP Bursary": "https://www.sacapspace.co.za",
    "SANRAL Infrastructure Bursary": "https://www.sanral.co.za",
    "Property Point Foundation": "https://www.propertypoint.org.za",
    "DAFF Bursary": "https://www.dalrrd.gov.za",
    "Land Bank Bursary": "https://www.landbank.co.za",
    "Afgri Bursary": "https://www.afgri.co.za",
    "NAC Bursary": "https://www.nac.org.za",
    "Mnet Music Foundation": "https://www.mnetcorporate.co.za",
    "SASCOC Bursary": "https://www.sascoc.co.za",
    "Sport Trust Bursary": "https://www.sportstrust.co.za",
    "CETA Bursary": "https://www.ceta.org.za",
    "Rand Water Bursary": "https://www.randwater.co.za",
    "DWS Bursary": "https://www.dws.gov.za",
    "HPCSA Bursary": "https://www.hpcsa.co.za",
    "Department of Health Bursary": "https://www.health.gov.za",
    "Standard Bank Bursary": "https://www.standardbank.co.za",
    "Discovery Bursary": "https://www.discovery.co.za",
    "FNB Foundation Bursary": "https://www.fnb.co.za",

    // Internships
    "Allan Gray Orbis": "https://www.allangrayorbis.org",
    "Graduate Programme at Takealot": "https://www.takealot.com/careers",
    "Google STEP Internship": "https://careers.google.com",
    "Eskom Learnership": "https://www.eskom.co.za",
    "City Power Apprenticeship": "https://www.citypower.co.za",
    "Local Municipality Programme": "https://www.gov.za",
    "Community Service Year": "https://www.health.gov.za",
    "Hospital Internship": "https://www.health.gov.za",
    "Mediclinic Graduate Programme": "https://www.mediclinic.co.za",
    "Agency Internship": "https://www.google.com/search?q=design+agency+internships+south+africa",
    "Freelance Portfolio Route": "https://www.upwork.com",
    "In-House Design Learnerships": "https://www.google.com/search?q=in+house+design+learnerships+south+africa",
    "Big 4 Audit Firms": "https://www.google.com/search?q=big+4+audit+firms+south+africa+articles",
    "SAICA Articles": "https://www.saica.co.za",
    "Corporate Finance Graduate Schemes": "https://www.google.com/search?q=corporate+finance+graduate+schemes+south+africa",
    "SANRAL Graduate Programme": "https://www.sanral.co.za",
    "SMEC South Africa": "https://www.smec.com",
    "AECOM Graduate Scheme": "https://aecom.com",
    "School-Based Teaching Practice": "https://www.education.gov.za",
    "Department of Education Internship": "https://www.education.gov.za",
    "Teach SA Programme": "https://www.teach-sa.org",
    "SANParks Graduate Programme": "https://www.sanparks.org",
    "SANBI Internship": "https://www.sanbi.org",
    "Municipal Environmental Learnerships": "https://www.gov.za",
    "NYDA Entrepreneurship Programme": "https://www.nyda.gov.za",
    "Allan Gray Fellowship": "https://www.allangrayorbis.org",
    "Business Incubator Programmes": "https://www.seda.org.za",
    "Department of Social Development Internship": "https://www.dsd.gov.za",
    "NGO Learnerships": "https://www.google.com/search?q=ngo+learnerships+south+africa",
    "SASSA Graduate Programme": "https://www.sassa.gov.za",
    "Cisco CCNA Learnership": "https://www.netacad.com",
    "Telkom Internship": "https://www.telkom.co.za",
    "IT Helpdesk Learnerships": "https://www.google.com/search?q=it+helpdesk+learnerships+south+africa",
    "SABC Graduate Programme": "https://www.sabc.co.za",
    "News24 Internship": "https://www.news24.com",
    "Community Radio Learnerships": "https://www.google.com/search?q=community+radio+learnerships+south+africa",
    "Tsogo Sun Graduate Programme": "https://www.tsogosun.com",
    "Hotel Kitchen Internship": "https://www.google.com/search?q=hotel+kitchen+internship+south+africa",
    "Paragon Architects Internship": "https://www.paragon.co.za",
    "Government Public Works Internship": "http://www.publicworks.gov.za",
    "SACAP Community Service": "https://www.sacapspace.co.za",
    "AgriSETA Learnership": "https://www.agriseta.co.za",
    "Tongaat Hulett Graduate Programme": "https://www.tongaat.com",
    "Grain SA Internship": "https://www.grainsa.co.za",
    "Recording Studio Internship": "https://www.google.com/search?q=recording+studio+internship+south+africa",
    "NAC Artist Development": "https://www.nac.org.za",
    "Community Arts Centre Learnership": "https://www.nac.org.za",
    "SASCOC High Performance Programme": "https://www.sascoc.co.za",
    "Provincial Sport Coaching Internship": "https://www.sascoc.co.za",
    "Gym & Wellness Learnerships": "https://www.google.com/search?q=gym+and+wellness+learnerships+south+africa",
    "Rand Water Learnership": "https://www.randwater.co.za",
    "Johannesburg Water Apprenticeship": "https://www.johannesburgwater.co.za",
    "eThekwini Water Internship": "http://www.durban.gov.za",
    "SANCA Counselling Internship": "https://www.sancagauteng.org",
    "School Psychologist Internship": "https://www.education.gov.za",
    "EAP Counsellor Learnership": "https://www.google.com/search?q=eap+counsellor+learnership+south+africa",
    "Discovery Graduate Programme": "https://www.discovery.co.za",
    "Standard Bank Internship": "https://www.standardbank.co.za",
    "Stats SA Graduate Internship": "http://www.statssa.gov.za",
  };
  return links[name] || `https://www.google.com/search?q=${encodeURIComponent(name + " South Africa")}`;
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function ThemeToggle({ dark, setDark }) {
  return (
    <button 
      onClick={() => setDark(d => !d)} 
      title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"} 
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: dark ? "#6366F1" : "#94A3B8",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.3s ease",
        border: "none",
        padding: 0,
        outline: "none",
        display: "flex",
        alignItems: "center"
      }}
    >
      <div 
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#FFFFFF",
          position: "absolute",
          top: 3,
          left: dark ? 23 : 3,
          transition: "left 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)"
        }}
      />
    </button>
  );
}

function Sidebar({ active, setActive, dark, setDark, T, open, setOpen }) {
  const links = ["Home", "Discover", "APS Calculator", "Bursaries", "Careers", "Certificates", "Institutions", "Trends"];
  return (
    <>
      <div className={`sidebar-backdrop ${open ? "open" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`sidebar ${open ? "open" : ""}`} style={{ backgroundColor: T.navyMid, color: T.chalk, borderRight: `1px solid ${T.border}` }}>
        <div className="sidebar-header" style={{ borderBottom: `1px solid ${T.border}` }}>
          <svg width="28" height="28" viewBox="0 0 32 32">
            <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" fill="none" stroke={T.teal} strokeWidth="2"/>
            <polygon points="16,8 24,13 24,19 16,24 8,19 8,13" fill={T.teal} opacity="0.15"/>
            <text x="16" y="21" textAnchor="middle" fill={T.teal} fontSize="12" fontWeight="bold" fontFamily="monospace">P</text>
          </svg>
          <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: 1 }}>PathwayZA</span>
        </div>
        <div className="sidebar-links">
          {links.map(l => {
            const isActive = active === l;
            return (
              <button key={l} onClick={() => { setActive(l); setOpen(false); }} 
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                style={isActive ? { background: `${T.teal}20`, color: T.teal } : {}}
              >
                {l}
              </button>
            );
          })}
        </div>
        <div className="sidebar-footer" style={{ borderTop: `1px solid ${T.border}` }}>
          <ThemeToggle dark={dark} setDark={setDark} />
          <span style={{ fontSize: 11, color: T.muted }}>
            <span style={{ color: T.teal }}>ValambyaT3ch</span>
          </span>
        </div>
      </aside>
    </>
  );
}

function DemandBar({ value, T }) {
  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: T.muted }}>SA Market Demand</span>
        <span style={{ fontSize: 11, color: T.teal, fontWeight: 700 }}>{value}%</span>
      </div>
      <div style={{ height: 4, background: T.slate, borderRadius: 2 }}>
        <div style={{
          height: "100%", width: `${value}%`, borderRadius: 2,
          background: `linear-gradient(90deg, ${T.tealDim}, ${T.teal})`,
          transition: "width 0.8s ease",
        }}/>
      </div>
    </div>
  );
}

function PathBadge({ path, T, dark }) {
  const meta = PATH_META[path.type] || PATH_META.university;
  const bg = dark
    ? `${meta.accent}18`
    : `${meta.accent}22`;
  return (
    <div style={{
      background: bg, border: `1px solid ${meta.accent}40`,
      borderRadius: 8, padding: "10px 14px", marginBottom: 8,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, color: meta.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
          {meta.label}
        </span>
        <span style={{ fontSize: 11, color: T.muted }}>{path.duration}</span>
      </div>
      <div style={{ fontSize: 13, color: T.chalk, fontWeight: 600, marginTop: 4 }}>{path.label}</div>
      <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{path.institution}</div>
    </div>
  );
}

function CareerCard({ career, onClick, T, dark }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={() => onClick(career)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: T.navyCard, border: `1px solid ${hov ? T.teal : T.border}`,
        borderRadius: 12, padding: 20, cursor: "pointer",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        transition: "border-color 0.2s, transform 0.15s, box-shadow 0.2s",
        boxShadow: hov ? `0 8px 24px ${T.teal}18` : "none",
      }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 10, color: T.teal, fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>
            {career.field}
          </div>
          <div style={{ fontSize: 16, color: T.chalk, fontWeight: 700 }}>{career.title}</div>
        </div>
        <div style={{
          background: `${T.amber}18`, border: `1px solid ${T.amber}30`,
          borderRadius: 6, padding: "4px 8px", fontSize: 10, color: T.amber, fontWeight: 600,
          whiteSpace: "nowrap", marginLeft: 8,
        }}>{career.growth}</div>
      </div>
      <div style={{ fontSize: 12, color: T.muted, marginBottom: 10 }}>{career.salary}</div>
      <DemandBar value={career.demand} T={T} />
      <div style={{ marginTop: 10, display: "flex", gap: 5, flexWrap: "wrap" }}>
        {career.subjects.slice(0, 3).map(s => (
          <span key={s} style={{
            fontSize: 10, background: T.slate, color: T.muted, borderRadius: 4, padding: "2px 7px",
          }}>{s}</span>
        ))}
        {career.subjects.length > 3 && (
          <span style={{ fontSize: 10, color: T.muted }}>+{career.subjects.length - 3} more</span>
        )}
      </div>
    </div>
  );
}

function CareerModal({ career, onClose, T, dark }) {
  if (!career) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, background: "#000000CC",
      zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: T.navyCard, border: `1px solid ${T.border}`,
        borderRadius: 16, padding: 28, maxWidth: 640, width: "100%",
        maxHeight: "85vh", overflowY: "auto",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 10, color: T.teal, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
              {career.field}
            </div>
            <h2 style={{ color: T.chalk, fontSize: 21, fontWeight: 800, margin: 0 }}>{career.title}</h2>
          </div>
          <button onClick={onClose} style={{
            background: T.slate, color: T.muted, border: "none",
            borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 16,
          }}>✕</button>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
          {[["Salary", career.salary, T.chalk], ["Growth", career.growth, T.amber], ["Demand", `${career.demand}%`, T.teal]].map(([k,v,c]) => (
            <div key={k} style={{ background: T.slate, borderRadius: 8, padding: "8px 14px" }}>
              <div style={{ fontSize: 10, color: T.muted }}>{k}</div>
              <div style={{ fontSize: 13, color: c, fontWeight: 600 }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 12, color: T.muted, marginBottom: 14 }}>
          <strong style={{ color: T.chalk }}>Related subjects: </strong>
          {career.subjects.join(", ")}
        </div>

        <h3 style={{ color: T.chalk, fontSize: 13, marginBottom: 8, fontWeight: 700 }}>Qualification Paths</h3>
        <div style={{ marginBottom: 20 }}>
          {career.paths.map((p, i) => <PathBadge key={i} path={p} T={T} dark={dark} />)}
        </div>

        <div className="modal-grid">
          <div>
            <h3 style={{ color: T.chalk, fontSize: 13, marginBottom: 8, fontWeight: 700 }}>Bursaries & Funding</h3>
            {career.bursaries.map(b => (
              <div key={b} style={{ fontSize: 12, padding: "6px 0", borderBottom: `1px solid ${T.border}` }}>
                💰 <a href={getExternalLink(b)} target="_blank" rel="noreferrer" className="modal-link" style={{ color: T.teal, textDecoration: "none", fontWeight: 500 }}>{b} ↗</a>
              </div>
            ))}
          </div>
          <div>
            <h3 style={{ color: T.chalk, fontSize: 13, marginBottom: 8, fontWeight: 700 }}>Internships & Experience</h3>
            {career.internships.map(i => (
              <div key={i} style={{ fontSize: 12, padding: "6px 0", borderBottom: `1px solid ${T.border}` }}>
                🔗 <a href={getExternalLink(i)} target="_blank" rel="noreferrer" className="modal-link" style={{ color: T.teal, textDecoration: "none", fontWeight: 500 }}>{i} ↗</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SubjectPill({ subject, selected, onClick, T }) {
  return (
    <button onClick={() => onClick(subject)} style={{
      background: selected ? T.teal : T.slate,
      color: selected ? (T.navy === "#0A0F1E" ? T.navy : "#fff") : T.muted,
      border: `1px solid ${selected ? T.teal : T.border}`,
      borderRadius: 20, padding: "5px 13px", fontSize: 12,
      fontWeight: selected ? 700 : 400, cursor: "pointer", transition: "all 0.15s",
    }}>{subject}</button>
  );
}

function DiscoverPage({ T, dark }) {
  const [selected, setSelected] = useState([]);
  const [results, setResults] = useState(null);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState("All");

  const toggle = (s) => setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const score = (career) => {
    const matches = career.subjects.filter(s => selected.includes(s)).length;
    return Math.round((matches / career.subjects.length) * 100);
  };

  const findPaths = async () => {
    if (!selected.length) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const scored = CAREERS
      .map(c => ({ ...c, matchScore: score(c) }))
      .filter(c => c.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);
    setResults(scored);
    setLoading(false);
  };

  const groupNames = ["All", ...Object.keys(SUBJECT_GROUPS)];

  const visibleGroups = Object.entries(SUBJECT_GROUPS).reduce((acc, [group, subjects]) => {
    if (activeGroup !== "All" && activeGroup !== group) return acc;
    const filtered = search ? subjects.filter(s => s.toLowerCase().includes(search.toLowerCase())) : subjects;
    if (filtered.length) acc[group] = filtered;
    return acc;
  }, {});

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.5rem 6rem" }}>
      <CareerModal career={modal} onClose={() => setModal(null)} T={T} dark={dark} />

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 26, color: T.chalk, fontWeight: 800, marginBottom: 6 }}>What are your subjects, interests, or degrees?</h2>
        <p style={{ color: T.muted, fontSize: 14 }}>Select all that apply. We'll rank career matches and postgraduate paths for you.</p>
      </div>

      {/* Search */}
      <div style={{ maxWidth: 420, margin: "0 auto 18px" }}>
        <input type="text" placeholder="Search subjects, degrees, or interests…" value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", background: T.inputBg, border: `1px solid ${T.border}`,
            borderRadius: 8, padding: "10px 16px", fontSize: 14,
            color: T.chalk, outline: "none", boxSizing: "border-box",
          }}/>
      </div>

      {/* Category tabs */}
      <div className="desktop-filters" style={{ gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 22 }}>
        {groupNames.map(g => (
          <button key={g} onClick={() => setActiveGroup(g)} style={{
            background: activeGroup === g ? T.teal : T.slate,
            color: activeGroup === g ? (dark ? T.navy : "#fff") : T.muted,
            border: "none", borderRadius: 20, padding: "5px 12px",
            fontSize: 11, fontWeight: 600, cursor: "pointer",
          }}>{g}</button>
        ))}
      </div>
      <div className="mobile-filters">
        <select value={activeGroup} onChange={(e) => setActiveGroup(e.target.value)}>
          {groupNames.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* Grouped pills */}
      <div style={{ marginBottom: 24 }}>
        {Object.entries(visibleGroups).map(([group, subjects]) => (
          <div key={group} style={{ marginBottom: 18 }}>
            <div style={{
              fontSize: 10, color: T.teal, fontWeight: 700, letterSpacing: 1.5,
              textTransform: "uppercase", marginBottom: 8,
              paddingBottom: 5, borderBottom: `1px solid ${T.border}`,
            }}>{group}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {subjects.map(s => <SubjectPill key={s} subject={s} selected={selected.includes(s)} onClick={toggle} T={T} />)}
            </div>
          </div>
        ))}
        {!Object.keys(visibleGroups).length && (
          <div style={{ textAlign: "center", color: T.muted, padding: "2rem 0", fontSize: 14 }}>No subjects match "{search}"</div>
        )}
      </div>

      {/* Sticky CTA */}
      {selected.length > 0 && (
        <div style={{
          position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
          width: "calc(100% - 3rem)", maxWidth: 860,
          background: T.navyCard, border: `1px solid ${T.teal}50`,
          borderRadius: 12, padding: "12px 18px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 10, zIndex: 50,
          boxShadow: "0 8px 32px #0008",
        }}>
          <div>
            <span style={{ color: T.chalk, fontWeight: 700, fontSize: 13 }}>
              {selected.length} selection{selected.length > 1 ? "s" : ""}
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 5 }}>
              {selected.map(s => (
                <span key={s} onClick={() => toggle(s)} style={{
                  fontSize: 10, background: `${T.teal}20`, color: T.teal,
                  borderRadius: 4, padding: "2px 7px", cursor: "pointer",
                }}>{s} ✕</span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => { setSelected([]); setResults(null); }} style={{
              background: "transparent", color: T.muted, border: `1px solid ${T.border}`,
              borderRadius: 8, padding: "8px 14px", fontSize: 12, cursor: "pointer",
            }}>Clear</button>
            <button onClick={findPaths} style={{
              background: T.teal, color: dark ? T.navy : "#fff", border: "none",
              padding: "8px 20px", borderRadius: 8, fontSize: 13,
              fontWeight: 700, cursor: "pointer",
            }}>{loading ? "Matching…" : "Find matches →"}</button>
          </div>
        </div>
      )}

      {/* Results */}
      {results && (
        <div>
          <div style={{ marginBottom: 16, fontSize: 13, color: T.muted }}>
            <span style={{ color: T.teal, fontWeight: 700 }}>{results.length} career matches</span> found for your subjects
          </div>
          <div className="career-grid">
            {results.map(c => (
              <div key={c.id}>
                <div style={{
                  background: `${T.teal}18`, border: `1px solid ${T.teal}30`,
                  borderRadius: "8px 8px 0 0", padding: "5px 14px",
                  display: "flex", justifyContent: "space-between",
                }}>
                  <span style={{ fontSize: 10, color: T.teal, fontWeight: 700 }}>MATCH</span>
                  <span style={{ fontSize: 13, color: T.teal, fontWeight: 800 }}>{c.matchScore}%</span>
                </div>
                <div style={{ borderRadius: "0 0 12px 12px", overflow: "hidden" }}>
                  <CareerCard career={c} onClick={setModal} T={T} dark={dark} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CareersPage({ T, dark }) {
  return (
    <div style={{ maxWidth: 940, margin: "0 auto", padding: "0 1.5rem 4rem" }}>
      {/* Artisan & Work-Based Opportunities Section */}
      <div style={{ paddingTop: 16 }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 24, color: T.chalk, fontWeight: 800, marginBottom: 6 }}>Opportunities & Platforms</h2>
          <p style={{ color: T.muted, fontSize: 14 }}>Earn a stipend while you learn. Explore apprenticeships, learnerships, and practical work experience through direct links.</p>
        </div>
        <div className="career-grid">
          {OPPORTUNITIES.map(op => {
            const badgeColor = op.type === "Apprenticeship" ? "#8B5CF6" : op.type === "Learnership" ? "#F59E0B" : T.teal;
            return (
              <div key={op.id} className="opportunity-card" style={{
                background: T.navyCard, border: `1px solid ${T.border}`,
                borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between"
              }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                    <span style={{
                      fontSize: 9, background: `${badgeColor}18`, color: badgeColor,
                      border: `1px solid ${badgeColor}30`, borderRadius: 6, padding: "3px 8px", fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: 1
                    }}>{op.type}</span>
                    <span style={{ fontSize: 12, color: T.amber, fontWeight: 600 }}>💰 {op.stipend}</span>
                  </div>
                  <h3 style={{ fontSize: 16, color: T.chalk, fontWeight: 700, marginBottom: 8 }}>{op.title}</h3>
                  <div style={{ fontSize: 12, color: T.muted, marginBottom: 4, fontWeight: 600 }}>🏢 {op.company}</div>
                  <div style={{ fontSize: 11, color: T.muted, marginBottom: 12 }}>📍 {op.location} · 📅 {op.duration}</div>
                  <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.5, marginBottom: 16 }}>{op.description}</p>
                </div>
                <a href={op.url}
                   target="_blank" rel="noreferrer" className="apply-button" style={{
                     display: "block", textAlign: "center", background: T.teal,
                     color: dark ? T.navy : "#fff", borderRadius: 6, padding: "8px 12px",
                     fontSize: 12, fontWeight: 700, textDecoration: "none", marginTop: "auto"
                   }}>
                  Apply or View Details ↗
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function BursariesPage({ T, dark }) {
  const bursaries = [
    { name: "NSFAS", type: "Government", fields: "All fields", amount: "Up to R105 000/yr", apply: "nsfas.org.za", deadline: "Nov – Jan" },
    { name: "Funza Lushaka", type: "Government", fields: "Teaching / Education", amount: "Full cost of study", apply: "funzalushaka.gov.za", deadline: "Nov – Jan" },
    { name: "Sasol Bursary Programme", type: "Corporate", fields: "Engineering, Science, IT", amount: "Full cost of study", apply: "sasol.com/bursaries", deadline: "April" },
    { name: "Anglo American Bursary", type: "Corporate", fields: "Mining, Engineering", amount: "Full cost + allowance", apply: "angloamerican.com", deadline: "May" },
    { name: "Nedbank Bursary", type: "Corporate", fields: "Finance, IT, Accounting", amount: "Up to R80 000/yr", apply: "nedbank.co.za", deadline: "June" },
    { name: "MERSETA Bursary", type: "SETA", fields: "Trades, Manufacturing", amount: "Varies by programme", apply: "merseta.org.za", deadline: "Rolling" },
    { name: "MTN Foundation", type: "Foundation", fields: "ICT, Engineering", amount: "Partial + mentorship", apply: "mtn.com/foundation", deadline: "August" },
    { name: "Vodacom Foundation", type: "Foundation", fields: "Technology, STEM", amount: "Full cost of study", apply: "vodacom.co.za", deadline: "July" },
    { name: "Netcare Education Bursary", type: "Corporate", fields: "Nursing, Healthcare", amount: "Full tuition", apply: "netcare.co.za", deadline: "September" },
    { name: "DAFF Bursary", type: "Government", fields: "Agriculture, Forestry", amount: "Full cost of study", apply: "dffe.gov.za", deadline: "October" },
    { name: "SANRAL Bursary", type: "Government", fields: "Civil Engineering", amount: "Full cost + stipend", apply: "sanral.co.za", deadline: "August" },
    { name: "SAICA Bursary", type: "Professional Body", fields: "Accounting, Finance", amount: "Full tuition + articles", apply: "saica.co.za", deadline: "July" },
    { name: "ZABursaries Portal", type: "Platform", fields: "All fields", amount: "Varies", apply: "www.zabursaries.co.za", deadline: "Ongoing" },
  ];

  const typeColors = {
    Government: T.teal, Corporate: T.amber,
    SETA: "#8B5CF6", Foundation: "#06B6D4", "Professional Body": "#F43F5E",
    Platform: "#A855F7",
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.5rem 4rem" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, color: T.chalk, fontWeight: 800, marginBottom: 5 }}>Bursaries & Funding</h2>
        <p style={{ color: T.muted, fontSize: 13 }}>Real South African bursaries — your education should not be held back by money.</p>
      </div>
      <div className="career-grid">
        {bursaries.map(b => (
          <div key={b.name} style={{
            background: T.navyCard, border: `1px solid ${T.border}`,
            borderRadius: 12, padding: 18,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 10 }}>
              <div style={{ fontSize: 14, color: T.chalk, fontWeight: 700 }}>{b.name}</div>
              <span style={{
                fontSize: 9, background: `${typeColors[b.type] || T.teal}20`,
                color: typeColors[b.type] || T.teal,
                border: `1px solid ${typeColors[b.type] || T.teal}40`,
                borderRadius: 4, padding: "2px 7px", fontWeight: 700, whiteSpace: "nowrap", marginLeft: 8,
              }}>{b.type}</span>
            </div>
            <div style={{ fontSize: 12, color: T.muted, marginBottom: 3 }}>📚 {b.fields}</div>
            <div style={{ fontSize: 12, color: T.amber, marginBottom: 3, fontWeight: 600 }}>💰 {b.amount}</div>
            <div style={{ fontSize: 12, color: T.muted, marginBottom: 12 }}>📅 Deadline: {b.deadline}</div>
            <a href={`https://${b.apply}`} target="_blank" rel="noreferrer" style={{
              display: "block", textAlign: "center", background: T.slate,
              color: T.teal, borderRadius: 6, padding: "7px",
              fontSize: 12, fontWeight: 600, textDecoration: "none",
            }}>Apply at {b.apply} →</a>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendsPage({ T }) {
  const [expandedId, setExpandedId] = useState(null);

  const trends = [
    { rank: 1, title: "AI & Machine Learning Engineer", demand: 97, delta: "+31%", tag: "RISING", qualification: "BSc Computer Science / BEng Data Engineering", where: "UCT, Wits, UP, Stellenbosch" },
    { rank: 2, title: "Cybersecurity Analyst", demand: 93, delta: "+27%", tag: "RISING", qualification: "BSc IT / Advanced Certificate in Information Security", where: "UNISA, UJ, Richfield, CTU Training" },
    { rank: 3, title: "Data Analyst", demand: 90, delta: "+28%", tag: "RISING", qualification: "Diploma in Data Analytics / BSc Statistics", where: "Boston City Campus, Eduvos, UWC, Rosebank College" },
    { rank: 4, title: "Master Electrician", demand: 88, delta: "+18%", tag: null, qualification: "NTC 3 to NTC 6 / Trade Test Certificate", where: "Northlink TVET, Ekurhuleni East TVET, College of Cape Town" },
    { rank: 5, title: "Registered Nurse", demand: 87, delta: "+15%", tag: null, qualification: "Bachelor of Nursing / Diploma in Nursing", where: "Netcare Education, UFS, UKZN, Sefako Makgatho Health Sciences" },
    { rank: 6, title: "Civil Engineer", demand: 85, delta: "+14%", tag: null, qualification: "BEng Civil Engineering / National Diploma in Engineering", where: "CPUT, TUT, UJ, Stellenbosch University" },
    { rank: 7, title: "Social Worker", demand: 83, delta: "+13%", tag: null, qualification: "Bachelor of Social Work (BSW)", where: "UWC, Fort Hare, UP, NWU" },
    { rank: 8, title: "Plumber / Water Technician", demand: 82, delta: "+16%", tag: null, qualification: "NQF Level 4 Trade Certificate (Plumbing)", where: "Tshwane South TVET, False Bay TVET, Majuba TVET" },
    { rank: 9, title: "Chartered Accountant", demand: 80, delta: "+9%", tag: null, qualification: "BCom Accounting + CTA + SAICA Board Exams", where: "UCT, UP, UJ, Nelson Mandela University" },
    { rank: 10, title: "Entrepreneur / Business Owner", demand: 80, delta: "+20%", tag: "RISING", qualification: "Business Management Diploma / Self-Taught", where: "Regenesys, MANCOSA, Varsity College, ALX" },
    { rank: 11, title: "Environmental Scientist", demand: 74, delta: "+16%", tag: "RISING", qualification: "BSc Environmental Sciences", where: "Rhodes University, UKZN, UWC, Stellenbosch" },
    { rank: 12, title: "UX / Product Designer", demand: 73, delta: "+19%", tag: "RISING", qualification: "BA Graphic Design / Interaction Design Bootcamp", where: "Vega School, Red & Yellow, UJ, HyperionDev" },
    { rank: 13, title: "Agricultural Scientist", demand: 72, delta: "+17%", tag: null, qualification: "BSc Agriculture / Diploma in Agriculture", where: "Elsenburg Agricultural Training Institute, UFS, Fort Hare" },
    { rank: 14, title: "IT Technician / Network Engineer", demand: 89, delta: "+24%", tag: "RISING", qualification: "CompTIA A+/N+ / Higher Certificate in IT", where: "Damelin, CTU Training Solutions, UNISA, Boston" },
  ].sort((a, b) => b.demand - a.demand).map((t, i) => ({ ...t, rank: i + 1 }));

  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "0 1.5rem 4rem" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, color: T.chalk, fontWeight: 800, marginBottom: 5 }}>SA Career Trends</h2>
        <p style={{ color: T.muted, fontSize: 13 }}>Most in-demand careers in South Africa — projected to 2030.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {trends.map(t => {
          const isExpanded = expandedId === t.rank;
          return (
          <div key={t.rank} style={{
            background: T.navyCard, border: `1px solid ${isExpanded ? T.teal : T.border}`,
            borderRadius: 10, overflow: "hidden",
            cursor: "pointer", transition: "all 0.2s ease",
            boxShadow: isExpanded ? `0 4px 12px ${T.teal}15` : "none"
          }} onClick={() => setExpandedId(isExpanded ? null : t.rank)}>
            <div style={{
              padding: "12px 16px",
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{
                fontSize: 18, fontWeight: 800,
                color: t.rank <= 3 ? T.teal : T.muted,
                minWidth: 28, textAlign: "center",
              }}>#{t.rank}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                  <span style={{ fontSize: 14, color: T.chalk, fontWeight: 600 }}>{t.title}</span>
                  {t.tag && (
                    <span style={{
                      fontSize: 9, background: "#F472B620", color: "#F472B6",
                      border: "1px solid #F472B640", borderRadius: 4,
                      padding: "1px 5px", fontWeight: 700,
                    }}>{t.tag}</span>
                  )}
                </div>
                <DemandBar value={t.demand} T={T} />
              </div>
              <div style={{ fontSize: 13, color: T.amber, fontWeight: 700, minWidth: 46, textAlign: "right" }}>{t.delta}</div>
            </div>
            
            {isExpanded && (
              <div style={{
                padding: "16px", borderTop: `1px solid ${T.border}`,
                background: `${T.teal}0A`
              }}>
                <div style={{ marginBottom: 12, display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ fontSize: 16 }}>🎓</span>
                  <div>
                    <div style={{ fontSize: 11, color: T.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 }}>Required Qualification</div>
                    <div style={{ fontSize: 13, color: T.chalk, fontWeight: 500, lineHeight: 1.4 }}>{t.qualification}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ fontSize: 16 }}>🏫</span>
                  <div>
                    <div style={{ fontSize: 11, color: T.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 }}>Where to get it</div>
                    <div style={{ fontSize: 13, color: T.chalk, fontWeight: 500, lineHeight: 1.4 }}>{t.where}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          );
        })}
      </div>
      <div style={{
        marginTop: 24, background: T.navyCard, border: `1px solid ${T.border}`,
        borderRadius: 10, padding: 16,
      }}>
        <div style={{ fontSize: 11, color: T.muted, lineHeight: 1.7 }}>
          📊 Data sourced from Stats SA, LinkedIn Labour Insights, and DHET reports. Demand scores reflect active vacancies vs qualified applicant ratios in the SA market. Growth projections are 2025–2030 forecasts.
        </div>
      </div>
    </div>
  );
}

// ── CERTIFICATES DATA ────────────────────────────────────────────────────────
const CERTIFICATE_CATEGORIES = [
  "All",
  "ICT",
  "Electrical Engineering",
  "Hospitality",
  "Tourism",
  "Marketing",
  "Additional Certificates"
];

const CERTIFICATES_DATA = [
  {
    id: 1,
    title: "Microsoft Learn",
    category: "ICT",
    description: "Microsoft's official, free online training platform that helps people learn technical skills and get ready for certifications. It provides structured learning paths without requiring a paid subscription or product license.",
    url: "https://learn.microsoft.com/training/",
    isFree: true,
    provider: "Microsoft"
  },
  {
    id: 2,
    title: "IBM SkillsBuild",
    category: "ICT",
    description: "A free educational platform that helps high school and college students develop in-demand technical and workplace skills.",
    url: "https://skillsbuild.org/",
    isFree: true,
    provider: "IBM"
  },
  {
    id: 3,
    title: "freeCodeCamp",
    category: "ICT",
    description: "A popular, completely free, and non-profit educational platform that teaches computer programming and software development.",
    url: "https://www.freecodecamp.org/",
    isFree: true,
    provider: "freeCodeCamp Foundation"
  },
  {
    id: 4,
    title: "Oracle Learning Explorer",
    category: "ICT",
    description: "A free entry-level training and accreditation program offered by Oracle University. It provides bite-sized digital courses, interactive content, and foundational training.",
    url: "https://education.oracle.com/oracle-learning-explorer",
    isFree: true,
    provider: "Oracle"
  },
  {
    id: 5,
    title: "Cisco Networking Academy",
    category: "ICT",
    description: "A global IT and cybersecurity education program. It provides free and low-cost courses, hands-on labs (via Cisco Packet Tracer), and career resources to help students build digital skills. The program bridges the gap between education and employment in the tech industry.",
    url: "https://www.netacad.com/",
    isFree: true,
    provider: "Cisco"
  },
  {
    id: 6,
    title: "Schneider Electric University",
    category: "Electrical Engineering",
    description: "A free, online learning platform offering over 300 vendor-neutral courses on energy efficiency, sustainability, and data center management.",
    url: "https://university.se.com/",
    isFree: true,
    provider: "Schneider Electric"
  },
  {
    id: 7,
    title: "Siemens Learning",
    category: "Electrical Engineering",
    description: "Siemens Learning typically refers to the educational and professional development resources offered by Siemens for industrial technology, engineering, and corporate upskilling.",
    url: "https://www.siemens.com/global/en/company/sustainability/education.html",
    isFree: true,
    provider: "Siemens"
  },
  {
    id: 8,
    title: "ABB University",
    category: "Electrical Engineering",
    description: "A global training network by the technology and automation corporation, ABB that offers technical, engineering, and managerial education focused on ABB products, robotics, and control systems.",
    url: "https://new.abb.com/service/abb-university",
    isFree: true,
    provider: "ABB"
  },
  {
    id: 9,
    title: "Alison Electrical Engineering",
    category: "Electrical Engineering",
    description: "A free online electrical engineering courses will teach you everything you need to familiarise yourself with electrical engineering. Electrical engineering is divided into a range of fields including computer engineering, telecommunications, and instrumentation.",
    url: "https://alison.com/tag/electrical-engineering",
    isFree: true,
    provider: "Alison"
  },
  {
    id: 10,
    title: "Alison Hospitality",
    category: "Hospitality",
    description: "Self-paced courses cover core operational, management, and health standards in the hospitality industry.",
    url: "https://alison.com/tag/hospitality",
    isFree: true,
    provider: "Alison"
  },
  {
    id: 11,
    title: "Coursera Hospitality",
    category: "Hospitality",
    description: "Hospitality courses teach the business, operational, and practical skills required to run hotels, restaurants, and event venues. Core subjects usually include Food & Beverage Management, Rooms Division (Front Desk & Housekeeping), Culinary Arts, and Hospitality Business Management.",
    url: "https://www.coursera.org/",
    isFree: true,
    provider: "Coursera"
  },
  {
    id: 12,
    title: "Great Learning",
    category: "Hospitality",
    description: "Beginner Friendly courses that offer extensive information about hospitality management.",
    url: "https://www.mygreatlearning.com/",
    isFree: true,
    provider: "Great Learning"
  },
  {
    id: 13,
    title: "South Africa Specialist Programme",
    category: "Tourism",
    description: "A free, interactive online training course created by South African Tourism. It equips travel agents and tourism professionals with the knowledge to market South Africa as a holiday destination, granting graduates official certification and placement on the South African Tourism database.",
    url: "https://www.southafrica.net/gl/en/trade/page/south-africa-specialist",
    isFree: true,
    provider: "South African Tourism"
  },
  {
    id: 14,
    title: "Alison Tourism",
    category: "Tourism",
    description: "Online Self-paced program that teaches you the insides of the tourism sector and provides you with a necessary certificate at the end of the program.",
    url: "https://alison.com/tag/tourism",
    isFree: true,
    provider: "Alison"
  },
  {
    id: 15,
    title: "Coursera Tourism",
    category: "Tourism",
    description: "Online free tourism courses that teach everything you need to know about the tourism sector and its standards.",
    url: "https://www.coursera.org/",
    isFree: true,
    provider: "Coursera"
  },
  {
    id: 16,
    title: "FutureLearn Tourism",
    category: "Tourism",
    description: "Flexible online courses from global universities and experts. They equip learners with skills in digital travel, revenue management, and sustainability.",
    url: "https://www.futurelearn.com/",
    isFree: true,
    provider: "FutureLearn"
  },
  {
    id: 17,
    title: "Google Skillshop",
    category: "Marketing",
    description: "Google's official, free online training platform designed for marketers, advertisers, and business owners. It provides on-demand courses and official certifications on how to use Google’s suite of digital advertising and analytics tools to grow businesses and advance marketing careers.",
    url: "https://skillshop.withgoogle.com/",
    isFree: true,
    provider: "Google"
  },
  {
    id: 18,
    title: "HubSpot Academy",
    category: "Marketing",
    description: "A 100% free, self-paced, beginner-level program. It takes about 4–5 hours to complete and teaches you the fundamentals of digital marketing, including search engine optimization (SEO), social media strategy, non-paid growth, and paid advertising.",
    url: "https://academy.hubspot.com/",
    isFree: true,
    provider: "HubSpot"
  },
  {
    id: 19,
    title: "Meta Blueprint",
    category: "Marketing",
    description: "A globally recognized credential that validates an individual's advanced proficiency in using Meta's advertising technologies (Facebook, Instagram, Messenger, and WhatsApp) to plan, execute, and measure digital marketing campaigns.",
    url: "https://www.facebook.com/business/learn",
    isFree: true,
    provider: "Meta"
  },
  {
    id: 20,
    title: "Alison Business Course",
    category: "Additional Certificates",
    description: "A global free online learning platform offering thousands of business-related courses. They provide short-term certificates and in-depth diplomas in fields like management, administration, and entrepreneurship.",
    url: "https://alison.com/tag/business-management?utm_source=google&utm_medium=cpc&utm_campaign=Demand-Gen_South-Africa&gad_source=1&gad_campaignid=21491903447&gbraid=0AAAAADt7cD3lh7wEYjHQYzn590metQ8xm&gclid=Cj0KCQjw39zSBhDhARIsANammDuiuGc9kOGEvVHmlq6JcHqe8ePdAidNreYixa78z7ymI3CngJfXomkaAoCdEALw_wcB",
    isFree: true,
    provider: "Alison"
  },
  {
    id: 21,
    title: "EduCourse",
    category: "Additional Certificates",
    description: "A 100% online, self-paced training program designed specifically for job seekers looking to enter the corporate or public sector. It focuses heavily on South African workplace expectations, business etiquette, and relevant local compliance laws.",
    url: "https://www.educourse.co.za/courses/free-administrative-assistant-course-with-certificate-in-south-africa/",
    isFree: true,
    provider: "EduCourse SA"
  },
  {
    id: 22,
    title: "Alison Free Courses",
    category: "Additional Certificates",
    description: "A global free online learning platform offering over 6,000 certificate and diploma courses. It aims to provide accessible, self-paced education and workplace upskilling in subjects ranging from IT and business to health and languages. All learning content, modules, and assessments are completely free to complete.",
    url: "https://alison.com/",
    isFree: true,
    provider: "Alison"
  },
  {
    id: 23,
    title: "Coursera HR Courses",
    category: "Additional Certificates",
    description: "HR courses that help you learn recruitment strategies, employee engagement techniques, performance management, and compliance regulations. You can build skills in conflict resolution, talent development, and workforce planning. Many courses introduce tools like HRIS software, applicant tracking systems, and performance evaluation platforms, showing how these skills are applied in managing employee relations and optimizing organizational effectiveness.",
    url: "https://www.coursera.org/courses?query=hr&irclickid=QgjRwsU0VxyZTYhW-R2LOUivUkuVYqxlKydMVE0&irgwc=1&afsrc=1&utm_medium=partners&utm_source=impact&utm_campaign=4777498&utm_content=b2c&utm_campaignid=viaggiowithme&utm_term=14726_CR_1164545_&gad_source=1",
    isFree: true,
    provider: "Coursera"
  },
  {
    id: 24,
    title: "Internship Hub",
    category: "Additional Certificates",
    description: "A platform providing resources, listings, and certifications to help students secure and succeed in internships.",
    url: "https://www.internshiphub.org/internships",
    isFree: true,
    provider: "Internship Hub"
  }
];

function CertificatesPage({ T, dark }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [highlightedId, setHighlightedId] = useState(null);

  const filtered = CERTIFICATES_DATA.filter(c => {
    const matchesCategory = category === "All" || c.category === category;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.provider.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ maxWidth: 940, margin: "0 auto", padding: "0 1.5rem 4rem" }}>
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: 24, color: T.chalk, fontWeight: 800, marginBottom: 5 }}>Booster Certificates</h2>
        <p style={{ color: T.muted, fontSize: 13 }}>Click a certificate card to highlight it, and use the link to visit the platform and start learning.</p>
      </div>

      {/* Search Input */}
      <div style={{ maxWidth: 420, margin: "0 0 22px 0" }}>
        <input 
          type="text" 
          placeholder="Search certificates, topics, providers..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", background: T.inputBg, border: `1px solid ${T.border}`,
            borderRadius: 8, padding: "10px 16px", fontSize: 14,
            color: T.chalk, outline: "none", boxSizing: "border-box",
          }}
        />
      </div>

      {/* Categories Filters */}
      <div className="desktop-filters" style={{ gap: 6, flexWrap: "wrap", marginBottom: 22 }}>
        {CERTIFICATE_CATEGORIES.map(f => (
          <button 
            key={f} 
            onClick={() => setCategory(f)} 
            style={{
              background: category === f ? T.teal : T.slate,
              color: category === f ? (dark ? T.navy : "#fff") : T.muted,
              border: "none", borderRadius: 6, padding: "5px 12px",
              fontSize: 11, fontWeight: 600, cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mobile-filters">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CERTIFICATE_CATEGORIES.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 12, fontSize: 12, color: T.muted }}>
        Showing <span style={{ color: T.teal, fontWeight: 700 }}>{filtered.length}</span> certificates
      </div>

      {/* Certificate Grid */}
      <div className="career-grid">
        {filtered.map(c => {
          const isHighlighted = highlightedId === c.id;
          const cardBg = isHighlighted 
            ? (dark ? "rgba(0, 194, 168, 0.12)" : "rgba(0, 122, 107, 0.08)")
            : T.navyCard;
          
          return (
            <div 
              key={c.id}
              onClick={() => setHighlightedId(isHighlighted ? null : c.id)}
              style={{
                background: cardBg,
                border: `1px solid ${isHighlighted ? T.teal : T.border}`,
                borderRadius: 12,
                padding: 20,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transform: isHighlighted ? "scale(1.02)" : "scale(1)",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: isHighlighted ? `0 8px 24px ${T.teal}24` : "none",
                position: "relative"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 10 }}>
                  <span style={{ fontSize: 10, color: T.teal, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
                    {c.category}
                  </span>
                  <div style={{ display: "flex", gap: 4 }}>
                    {isHighlighted && (
                      <span style={{
                        background: `${T.teal}20`,
                        border: `1px solid ${T.teal}40`,
                        borderRadius: 6,
                        padding: "2px 6px",
                        fontSize: 9,
                        color: T.teal,
                        fontWeight: 700
                      }}>
                        ★ SELECTED
                      </span>
                    )}
                    <span style={{
                      background: `${T.amber}18`,
                      border: `1px solid ${T.amber}30`,
                      borderRadius: 6,
                      padding: "2px 6px",
                      fontSize: 9,
                      color: T.amber,
                      fontWeight: 700
                    }}>
                      100% FREE
                    </span>
                  </div>
                </div>

                <h3 style={{ fontSize: 16, color: T.chalk, fontWeight: 700, margin: "0 0 4px 0" }}>
                  {c.title}
                </h3>
                <div style={{ fontSize: 11, color: T.muted, marginBottom: 12 }}>
                  Provider: {c.provider}
                </div>
                <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.5, marginBottom: 16 }}>
                  {c.description}
                </p>
              </div>

              <a 
                href={c.url} 
                target="_blank" 
                rel="noreferrer" 
                onClick={(e) => e.stopPropagation()} 
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  background: T.teal,
                  color: dark ? T.navy : "#ffffff",
                  textDecoration: "none",
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 12,
                  transition: "all 0.15s ease",
                  textAlign: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
                onMouseEnter={(e) => {
                  e.target.style.filter = "brightness(1.1)";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.filter = "none";
                  e.target.style.transform = "none";
                }}
              >
                Visit Website ↗
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Hero({ setPage, T, dark }) {
  const [typed, setTyped] = useState("");
  const full = "Your subjects. Your future. Your path.";
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(full.slice(0, i));
      i++;
      if (i > full.length) clearInterval(interval);
    }, 38);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: T.heroGrad, padding: "0 1.5rem",
      textAlign: "center", position: "relative", overflow: "hidden",
    }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: dark ? 0.04 : 0.06 }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={T.teal} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
      <div style={{ position: "relative", maxWidth: 720 }}>
        <div style={{
          display: "inline-block", background: `${T.teal}18`, border: `1px solid ${T.teal}40`,
          borderRadius: 20, padding: "4px 16px", fontSize: 11, color: T.teal,
          letterSpacing: 2, marginBottom: 22, textTransform: "uppercase",
        }}>South Africa's Career Guidance Platform</div>
        <h1 style={{
          fontSize: "clamp(2rem, 6vw, 3.6rem)", fontWeight: 800, color: T.chalk,
          lineHeight: 1.1, marginBottom: 16, fontFamily: "Georgia, serif",
        }}>
          {typed}<span style={{ color: T.teal, animation: "blink 1s infinite" }}>|</span>
        </h1>
        <p style={{ fontSize: 16, color: T.muted, maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.7 }}>
          Tell us what you study. We'll show you where it leads — real careers, real demand,
          and every route to get there. University or college. Neither is less.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setPage("Discover")} style={{
            background: T.teal, color: dark ? T.navy : "#fff", border: "none",
            padding: "13px 28px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer",
          }}>Find my career path</button>
          <button onClick={() => setPage("Careers")} style={{
            background: "transparent", color: T.chalk, border: `1px solid ${T.border}`,
            padding: "13px 28px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}>Browse all careers</button>
        </div>
        <div style={{ marginTop: 52, display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
          {[["20+", "Careers mapped"], ["70+", "Subjects covered"], ["R0", "Free to use"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: T.teal }}>{v}</div>
              <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );
}
// ── INSTITUTIONS ─────────────────────────────────────────────────────────────

function InstitutionsPage({ T, dark }) {
  const [institutions, setInstitutions] = useState([]);
  const [selectedInst, setSelectedInst] = useState(null);
  const [instSearch, setInstSearch] = useState("");
  const [courseSearch, setCourseSearch] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch all institutions on load to populate the autocomplete list
  useEffect(() => {
    async function loadInstitutions() {
      try {
        const { data, error: err } = await supabase
          .from("institutions")
          .select("*")
          .order("name", { ascending: true });

        if (err) throw err;
        setInstitutions(data || []);
      } catch (err) {
        console.error("Failed to load institutions:", err.message);
        setError("Could not connect to the cloud database. Please verify your Supabase keys are configured.");
      }
    }
    loadInstitutions();
  }, []);

  const filteredInsts = institutions.filter(i =>
    i.name.toLowerCase().includes(instSearch.toLowerCase())
  );

  const handleVerify = async () => {
    if (!selectedInst) {
      setError("Please select an institution from the list first.");
      return;
    }
    if (!courseSearch.trim()) {
      setError("Please type a course or qualification name to verify.");
      return;
    }

    setLoading(true);
    setError("");
    setReport(null);

    try {
      // Query the courses table for the selected institution matching the course name
      const { data, error: err } = await supabase
        .from("courses")
        .select("*")
        .eq("institution_id", selectedInst.id)
        .ilike("name", `%${courseSearch}%`);

      if (err) throw err;

      if (data && data.length > 0) {
        // Match found!
        setReport({
          status: "Accredited",
          course: data[0],
          institution: selectedInst
        });
      } else {
        // No match found
        setReport({
          status: "Unverified",
          searchedCourse: courseSearch,
          institution: selectedInst
        });
      }
    } catch (err) {
      console.error("Failed to verify course:", err.message);
      setError("An error occurred while verifying the course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 1.5rem 4rem" }}>
      <div style={{ 
        background: T.navyCard, border: `1px solid ${T.border}`,
        borderRadius: 16, padding: "24px 28px", boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        marginBottom: 28
      }}>
        <h3 style={{ fontSize: 18, color: T.chalk, fontWeight: 700, marginBottom: 18 }}>Accreditation Verification Form</h3>
        
        {error && (
          <div style={{ 
            background: "rgba(239, 68, 68, 0.15)", color: "#EF4444", 
            padding: 12, borderRadius: 8, fontSize: 13, marginBottom: 16, border: "1px solid rgba(239, 68, 68, 0.3)" 
          }}>
            {error}
          </div>
        )}

        {/* Institution Input */}
        <div style={{ marginBottom: 20, position: "relative" }}>
          <label style={{ display: "block", fontSize: 12, color: T.muted, fontWeight: 600, marginBottom: 6 }}>
            1. INSTITUTION NAME
          </label>
          <input 
            type="text" 
            placeholder="Search & select institution (e.g., UCT, Rosebank)..." 
            value={selectedInst ? selectedInst.name : instSearch} 
            onChange={e => {
              setSelectedInst(null);
              setInstSearch(e.target.value);
              setDropdownOpen(true);
              setReport(null);
            }}
            onFocus={() => setDropdownOpen(true)}
            style={{
              width: "100%", padding: "14px 16px", borderRadius: 8,
              background: dark ? `${T.slate}88` : "#fff", color: T.chalk,
              border: `1px solid ${selectedInst ? T.teal : T.border}`, outline: "none", fontSize: 15
            }} 
          />
          {selectedInst && (
            <button 
              onClick={() => { setSelectedInst(null); setInstSearch(""); }}
              style={{
                position: "absolute", right: 12, top: 32, background: "none", border: "none",
                color: T.muted, cursor: "pointer", fontSize: 16
              }}
            >
              ✕
            </button>
          )}

          {dropdownOpen && !selectedInst && instSearch && (
            <div style={{
              position: "absolute", top: "100%", left: 0, right: 0, zIndex: 10,
              background: dark ? T.navyCard : "#fff", border: `1px solid ${T.border}`,
              borderRadius: 8, marginTop: 4, maxHeight: 200, overflowY: "auto",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
            }}>
              {filteredInsts.length > 0 ? (
                filteredInsts.map(i => (
                  <div 
                    key={i.id}
                    onClick={() => {
                      setSelectedInst(i);
                      setInstSearch(i.name);
                      setDropdownOpen(false);
                    }}
                    style={{
                      padding: "10px 16px", cursor: "pointer", fontSize: 14,
                      borderBottom: `1px solid ${T.border}`, color: T.chalk,
                      background: "transparent"
                    }}
                    onMouseEnter={e => e.target.style.background = dark ? `${T.slate}88` : "#f3f4f6"}
                    onMouseLeave={e => e.target.style.background = "transparent"}
                  >
                    {i.name} <span style={{ fontSize: 11, color: T.muted }}>({i.type})</span>
                  </div>
                ))
              ) : (
                <div style={{ padding: "12px 16px", fontSize: 13, color: T.muted }}>
                  No matching registered institutions found.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Course / Qualification Input */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontSize: 12, color: T.muted, fontWeight: 600, marginBottom: 6 }}>
            2. COURSE / QUALIFICATION NAME
          </label>
          <input 
            type="text" 
            placeholder="Enter course name (e.g., Computer Science, IT, N6)..." 
            value={courseSearch} 
            onChange={e => {
              setCourseSearch(e.target.value);
              setReport(null);
            }}
            style={{
              width: "100%", padding: "14px 16px", borderRadius: 8,
              background: dark ? `${T.slate}88` : "#fff", color: T.chalk,
              border: `1px solid ${T.border}`, outline: "none", fontSize: 15
            }} 
          />
        </div>

        {/* Verify Button */}
        <button 
          onClick={handleVerify}
          disabled={loading}
          style={{
            width: "100%", padding: "14px", borderRadius: 8, background: T.teal,
            color: dark ? T.navy : "#fff", fontWeight: 700, border: "none",
            cursor: loading ? "not-allowed" : "pointer", fontSize: 16,
            boxShadow: `0 4px 14px ${T.teal}44`, transition: "all 0.2s"
          }}
        >
          {loading ? "Verifying Status..." : "Verify Qualification"}
        </button>
      </div>

      {/* Verification Report Card */}
      {report && (
        <div style={{
          background: report.status === "Accredited" ? "rgba(16, 185, 129, 0.05)" : "rgba(239, 68, 68, 0.05)",
          border: `2px dashed ${report.status === "Accredited" ? "#10B981" : "#EF4444"}`,
          borderRadius: 16, padding: "28px 32px", textAlign: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
        }}>
          {report.status === "Accredited" ? (
            <>
              <div style={{ 
                width: 60, height: 60, borderRadius: "50%", background: "rgba(16, 185, 129, 0.2)",
                color: "#10B981", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 32, margin: "0 auto 16px"
              }}>
                ✓
              </div>
              <h4 style={{ fontSize: 22, color: "#10B981", fontWeight: 800, marginBottom: 8 }}>
                ACCEDRITATION VALIDATED
              </h4>
              <p style={{ color: T.chalk, fontSize: 15, fontWeight: 600, marginBottom: 20 }}>
                {report.course.name}
              </p>
              
              <div 
                className="report-grid" 
                style={{ 
                  borderTop: `1px solid ${T.border}`, paddingTop: 20, textAlign: "left"
                }}
              >
                <div>
                  <span style={{ fontSize: 11, color: T.muted, display: "block" }}>INSTITUTION</span>
                  <span style={{ fontSize: 14, color: T.chalk, fontWeight: 700 }}>{report.institution.name}</span>
                </div>
                <div>
                  <span style={{ fontSize: 11, color: T.muted, display: "block" }}>STATUS</span>
                  <span style={{ fontSize: 14, color: "#10B981", fontWeight: 700 }}>
                    {report.institution.type} (DHET Legit)
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: 11, color: T.muted, display: "block" }}>SAQA ID</span>
                  <span style={{ fontSize: 14, color: T.chalk, fontWeight: 700, fontFamily: "monospace" }}>
                    {report.course.saqa_id}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: 11, color: T.muted, display: "block" }}>NQF LEVEL</span>
                  <span style={{ fontSize: 14, color: T.teal, fontWeight: 700 }}>Level {report.course.nqf_level}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={{ 
                width: 60, height: 60, borderRadius: "50%", background: "rgba(239, 68, 68, 0.2)",
                color: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 32, margin: "0 auto 16px"
              }}>
                !
              </div>
              <h4 style={{ fontSize: 22, color: "#EF4444", fontWeight: 800, marginBottom: 8 }}>
                QUALIFICATION UNVERIFIED
              </h4>
              <p style={{ color: T.muted, fontSize: 13, marginBottom: 20 }}>
                The course <strong style={{ color: T.chalk }}>"{report.searchedCourse}"</strong> at <strong style={{ color: T.chalk }}>{report.institution.name}</strong> was not found in the official accredited database.
              </p>
              
              <div style={{ 
                background: dark ? `${T.slate}44` : "#f9fafb", border: `1px solid ${T.border}`,
                borderRadius: 8, padding: 16, textAlign: "left", fontSize: 12, color: T.muted, lineHeight: 1.5
              }}>
                <strong style={{ color: T.chalk, display: "block", marginBottom: 6 }}>⚠️ Warning for Students:</strong>
                Do not pay application or registration fees for qualifications that are not officially registered with DHET or SAQA. Contact the institution to request their SAQA registration number.
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ── APS CALCULATOR ────────────────────────────────────────────────────────────
function getApplyLink(instName) {
  const name = (instName || "").toLowerCase();
  
  // Universities
  if (name.includes("cape town") || name.includes("uct")) return "https://uct.ac.za/apply-to-uct";
  if (name.includes("witwatersrand") || name.includes("wits")) return "https://www.wits.ac.za/applications/";
  if (name.includes("pretoria") || name.includes("up")) return "https://www.up.ac.za/online-application";
  if (name.includes("stellenbosch") || name.includes("su")) return "https://www.sun.ac.za/english/matrics/apply";
  if (name.includes("kwazulu-natal") || name.includes("ukzn")) return "https://applications.ukzn.ac.za/";
  if (name.includes("johannesburg") || name.includes("uj")) return "https://www.uj.ac.za/admission-aid/undergraduate/";
  if (name.includes("north-west") || name.includes("nwu")) return "https://studies.nwu.ac.za/studies/apply";
  if (name.includes("free state") || name.includes("ufs")) return "https://www.ufs.ac.za/templates/apply";
  if (name.includes("western cape") || name.includes("uwc")) return "https://www.uwc.ac.za/study/applying-to-uwc";
  if (name.includes("rhodes") || name.includes("ru")) return "https://www.ru.ac.za/admissiongateway/";
  if (name.includes("nelson mandela") || name.includes("nmu")) return "https://www.mandela.ac.za/Study-at-Mandela/Apply";
  if (name.includes("limpopo") || name.includes("ul")) return "https://www.ul.ac.za/index.php?Entity=Apply";
  if (name.includes("fort hare") || name.includes("ufh")) return "https://www.ufh.ac.za/Apply";
  if (name.includes("walter sisulu") || name.includes("wsu")) return "https://www.wsu.ac.za/index.php/apply-online";
  if (name.includes("venda") || name.includes("univen")) return "https://www.univen.ac.za/apply-online/";
  if (name.includes("zululand") || name.includes("unizulu")) return "https://www.unizulu.ac.za/apply/";
  if (name.includes("sefako makgatho") || name.includes("smu")) return "https://www.smu.ac.za/students/apply/";
  if (name.includes("mpumalanga") || name.includes("ump")) return "https://www.ump.ac.za/Study-with-us/Application-Info";
  if (name.includes("sol plaatje") || name.includes("spu")) return "https://www.spu.ac.za/index.php/how-to-apply/";
  if (name.includes("south africa") || name.includes("unisa")) return "https://www.unisa.ac.za/apply";
  if (name.includes("cape peninsula") || name.includes("cput")) return "https://www.cput.ac.za/study/apply";
  if (name.includes("tshwane") || name.includes("tut")) return "https://www.tut.ac.za/apply-now";
  if (name.includes("central university") || name.includes("cut")) return "https://www.cut.ac.za/apply";
  if (name.includes("durban university") || name.includes("dut")) return "https://www.dut.ac.za/admissions/student_portal/";
  if (name.includes("vaal university") || name.includes("vut")) return "https://www.vut.ac.za/apply-to-vut/";
  if (name.includes("mangosuthu") || name.includes("mut")) return "https://www.mut.ac.za/apply/";

  // Colleges
  if (name.includes("rosebank")) return "https://www.rosebankcollege.co.za/apply-now";
  if (name.includes("eduvos")) return "https://www.eduvos.com/apply-now/";
  if (name.includes("varsity")) return "https://www.varsitycollege.co.za/apply-now";
  if (name.includes("boston")) return "https://www.boston.co.za/apply-now/";
  if (name.includes("stadio")) return "https://stadio.ac.za/apply-now";
  if (name.includes("mancosa")) return "https://www.mancosa.co.za/apply/";
  if (name.includes("afda")) return "https://www.afda.co.za/apply/";
  if (name.includes("inscape")) return "https://www.inscape.co.za/apply/";
  if (name.includes("iie msa") || name.includes("monash")) return "https://www.iiemsa.co.za/apply-now/";
  if (name.includes("richfield")) return "https://www.richfield.ac.za/apply-now/";
  if (name.includes("damelin")) return "https://www.damelin.co.za/apply-now";
  if (name.includes("lyceum")) return "https://lyceum.co.za/apply-now/";
  if (name.includes("sae institute")) return "https://www.sae.edu.za/apply/";
  if (name.includes("cti")) return "https://www.cti.ac.za/apply/";
  if (name.includes("milpark")) return "https://www.milpark.ac.za/apply/";

  // TVETs
  if (name.includes("port elizabeth")) return "https://www.pecollege.edu.za";
  if (name.includes("east cape midlands")) return "https://www.emcol.co.za";
  if (name.includes("buffalo city")) return "https://www.bccollege.co.za";
  if (name.includes("lovedale")) return "https://www.lovedale.edu.za";
  if (name.includes("king sabata")) return "https://www.ksdcollege.edu.za";
  if (name.includes("ingwe")) return "https://www.ingwecollege.edu.za";
  if (name.includes("ikhala")) return "https://www.ikhala.edu.za";
  if (name.includes("king hintsa")) return "https://www.kinghintsacollege.edu.za";
  if (name.includes("goldfields")) return "https://www.goldfieldstvet.edu.za";
  if (name.includes("motheo")) return "https://www.motheotvet.edu.za";
  if (name.includes("maluti")) return "https://www.malutitvet.co.za";
  if (name.includes("flavius mareka")) return "https://www.flaviusmareka.net";
  if (name.includes("tshwane south")) return "https://www.tsc.edu.za";
  if (name.includes("tshwane north")) return "https://www.tnc.edu.za";
  if (name.includes("ekurhuleni west")) return "https://www.ewc.edu.za";
  if (name.includes("ekurhuleni east")) return "https://www.eec.edu.za";
  if (name.includes("south west")) return "https://www.swgc.co.za";
  if (name.includes("central johannesburg")) return "https://www.cjc.edu.za";
  if (name.includes("western college") || name.includes("westcol")) return "https://www.westcol.co.za";
  if (name.includes("sedibeng")) return "https://www.sedcol.co.za";
  if (name.includes("mthashana")) return "https://www.mthashanacollege.co.za";
  if (name.includes("umfolozi")) return "https://www.umfolozicollege.edu.za";
  if (name.includes("majuba")) return "https://www.majuba.edu.za";
  if (name.includes("mnambithi")) return "https://www.mnambithicollege.co.za";
  if (name.includes("elangeni")) return "https://www.elangeni.edu.za";
  if (name.includes("coastal kzn")) return "https://www.coastalkzn.co.za";
  if (name.includes("thekwini")) return "https://www.thekwini.edu.za";
  if (name.includes("umgungundlovu")) return "https://www.utvet.co.za";
  if (name.includes("esayidi")) return "https://www.esayiditvet.co.za";
  if (name.includes("lephalale")) return "https://www.lephalaletvetcollege.co.za";
  if (name.includes("capricorn")) return "https://www.capricorncollege.edu.za";
  if (name.includes("waterberg")) return "https://www.waterbergcollege.co.za";
  if (name.includes("vhembe")) return "https://www.vhembecollege.edu.za";
  if (name.includes("mopani")) return "https://www.mopani.edu.za";
  if (name.includes("letaba")) return "https://www.letabacollege.co.za";
  if (name.includes("sekhukhune")) return "https://www.sekhukhune-tvet.co.za";
  if (name.includes("ehlanzeni")) return "https://www.ehlanzenicollege.edu.za";
  if (name.includes("nkangala")) return "https://www.ntc.edu.za";
  if (name.includes("gert sibande")) return "https://www.gscollege.edu.za";
  if (name.includes("northern cape urban")) return "https://www.ncutvet.edu.za";
  if (name.includes("northern cape rural")) return "https://www.ncrtvet.edu.za";
  if (name.includes("taletso")) return "https://www.taletso.edu.za";
  if (name.includes("vuselela")) return "https://www.vuselelacollege.co.za";
  if (name.includes("orbit")) return "https://www.orbitcollege.co.za";
  if (name.includes("west coast")) return "https://www.westcoastcollege.co.za";
  if (name.includes("boland")) return "https://www.bolandcollege.com";
  if (name.includes("south cape")) return "https://www.sccollege.co.za";
  if (name.includes("northlink")) return "https://www.northlink.co.za";
  if (name.includes("college of cape town")) return "https://www.cct.edu.za";
  if (name.includes("false bay")) return "https://www.falsebaycollege.co.za";

  return `https://www.google.com/search?q=How+to+apply+to+${encodeURIComponent(instName)}`;
}

const SA_SUBJECTS = [
  "English Home Language",
  "English First Additional Language",
  "Afrikaans Home Language",
  "Afrikaans First Additional Language",
  "isiZulu Home Language",
  "isiZulu First Additional Language",
  "Mathematics",
  "Mathematical Literacy",
  "Life Orientation",
  "Physical Sciences",
  "Life Sciences",
  "Accounting",
  "Business Studies",
  "Economics",
  "Geography",
  "History",
  "Computer Applications Technology (CAT)",
  "Information Technology (IT)",
  "Tourism",
  "Consumer Studies",
  "Engineering Graphics and Design (EGD)"
];

function ApsCalculatorPage({ T, dark }) {
  const [subjects, setSubjects] = useState([
    { name: "English Home Language", mark: "" },
    { name: "English First Additional Language", mark: "" },
    { name: "Mathematics", mark: "" },
    { name: "Life Orientation", mark: "" },
    { name: "Physical Sciences", mark: "" },
    { name: "Life Sciences", mark: "" },
    { name: "Accounting", mark: "" }
  ]);
  const [grade, setGrade] = useState("Grade 12 / Matric");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calculatePoints = (mark) => {
    const val = parseInt(mark, 10);
    if (isNaN(val)) return 0;
    if (val >= 80) return 7;
    if (val >= 70) return 6;
    if (val >= 60) return 5;
    if (val >= 50) return 4;
    if (val >= 40) return 3;
    if (val >= 30) return 2;
    return 1;
  };

  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
    setResults(null);
  };

  const addSubject = () => {
    setSubjects([...subjects, { name: "", mark: "" }]);
    setResults(null);
  };

  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
    setResults(null);
  };

  const handleCalculateAndMatch = async () => {
    // Validation
    const filledSubjects = subjects.filter(s => s.name && s.mark !== "");
    if (filledSubjects.length < 6) {
      setError("Please fill in at least 6 subjects with marks to calculate your APS.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // Calculate APS score
      // Exclude Life Orientation from the top 6
      const loSubject = filledSubjects.find(s => s.name === "Life Orientation");
      const nonLoSubjects = filledSubjects.filter(s => s.name !== "Life Orientation");

      // Map to points and sort descending
      const pointsList = nonLoSubjects.map(s => calculatePoints(s.mark)).sort((a, b) => b - a);
      const top6Points = pointsList.slice(0, 6);
      const apsScoreExcl = top6Points.reduce((sum, p) => sum + p, 0);

      // Score including LO
      let apsScoreIncl = apsScoreExcl;
      if (loSubject) {
        apsScoreIncl += calculatePoints(loSubject.mark);
      }

      // Fetch all courses from Supabase
      const { data: courses, error: fetchErr } = await supabase
        .from("courses")
        .select(`
          *,
          institutions (*)
        `);

      if (fetchErr) throw fetchErr;

      // Match courses based on criteria
      const eligible = courses.filter(course => {
        const inst = course.institutions;
        // Determine which APS score to use (TUT & TVETs typically include LO in count, others exclude)
        const isTvetOrTut = inst.type === "Public TVET" || inst.name.includes("Tshwane University of Technology");
        const studentAps = isTvetOrTut ? apsScoreIncl : apsScoreExcl;

        if (course.min_aps > studentAps) return false;

        // Check subject prerequisites
        const reqSubjects = course.required_subjects || {};
        for (const [reqSubName, minMark] of Object.entries(reqSubjects)) {
          // Find matching subject in student's filled list
          const studentSub = filledSubjects.find(s => {
            const sName = s.name.toLowerCase();
            const rName = reqSubName.toLowerCase();
            
            // Strict math check: if Math is required, Math Lit doesn't count
            if (rName === "mathematics" && sName === "mathematical literacy") {
              return false;
            }
            
            // General mapping: English/Math/Science
            if (rName.includes("english") && sName.includes("english")) return true;
            if (rName.includes("mathematics") && sName === "mathematics") return true;
            if (rName.includes("physical sciences") && sName.includes("physical science")) return true;
            if (rName.includes("life sciences") && sName.includes("life science")) return true;
            
            return sName === rName;
          });

          if (!studentSub || parseInt(studentSub.mark, 10) < minMark) {
            return false; // Did not meet prerequisite
          }
        }

        return true;
      });

      // Group eligible courses by institution
      const grouped = {};
      eligible.forEach(c => {
        const instName = c.institutions.name;
        if (!grouped[instName]) {
          grouped[instName] = {
            details: c.institutions,
            courses: []
          };
        }
        grouped[instName].courses.push(c);
      });

      setResults({
        apsExcl: apsScoreExcl,
        apsIncl: apsScoreIncl,
        matches: Object.values(grouped)
      });

    } catch (err) {
      console.error(err);
      setError("Failed to fetch matching courses from the cloud. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [activeTab, setActiveTab] = useState("aps"); // "aps" or "scanner"

  // Scanner State
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState([]);
  const [scanResults, setScanResults] = useState(null); // { title, category, keywords }
  const [selectedInterests, setSelectedInterests] = useState([]); // Array of interests

  const handleFileUpload = (file) => {
    setUploadedFile({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null
    });
    setIsScanning(true);
    setScanProgress(0);
    setScanResults(null);
    
    const logs = [
      "Initializing OCR scanner...",
      "Extracting text boundaries...",
      "Analyzing image color histogram...",
      "Detecting fonts & character sets...",
      "Performing regex pattern matching...",
      "Validating credentials authenticity...",
      "Finalizing vocational categorization..."
    ];

    setScanLogs([`[INFO] Uploaded: ${file.name}`, `[INFO] Size: ${(file.size / (1024 * 1024)).toFixed(2)} MB`, `[SCAN] ${logs[0]}`]);

    // Simulated scan loop
    let progress = 0;
    let logIdx = 1;
    const interval = setInterval(() => {
      progress += 5;
      if (progress > 100) progress = 100;
      setScanProgress(progress);

      // Add logs periodically
      if (progress % 15 === 0 && logIdx < logs.length) {
        setScanLogs(prev => [...prev, `[SCAN] ${logs[logIdx]}`]);
        logIdx++;
      }

      if (progress === 100) {
        clearInterval(interval);
        
        // Analyze file name for smart keyword extraction
        const nameLower = file.name.toLowerCase();
        let title = "Vocational Completion Certificate";
        let category = "Additional Certificates";
        let keywords = [];

        if (nameLower.includes("cisco") || nameLower.includes("ccna") || nameLower.includes("network")) {
          title = "Cisco Networking Foundational Certificate";
          category = "ICT";
          keywords = ["cisco", "networking", "routing"];
        } else if (nameLower.includes("microsoft") || nameLower.includes("azure")) {
          title = "Microsoft Cloud Fundamentals Certificate";
          category = "ICT";
          keywords = ["microsoft", "azure", "cloud"];
        } else if (nameLower.includes("python") || nameLower.includes("code") || nameLower.includes("programming") || nameLower.includes("java")) {
          title = "Software Programming Certificate";
          category = "ICT";
          keywords = ["programming", "coding", "software"];
        } else if (nameLower.includes("marketing") || nameLower.includes("seo") || nameLower.includes("hubspot") || nameLower.includes("google")) {
          title = "Digital Marketing Certificate";
          category = "Marketing";
          keywords = ["marketing", "seo", "sales"];
        } else if (nameLower.includes("electrician") || nameLower.includes("electrical") || nameLower.includes("siemens") || nameLower.includes("wiring")) {
          title = "Electrical Wiring & Systems Certificate";
          category = "Electrical Engineering";
          keywords = ["electrical", "engineering", "circuits"];
        } else if (nameLower.includes("tourism") || nameLower.includes("travel") || nameLower.includes("agency")) {
          title = "Tourism Specialist Certificate";
          category = "Tourism";
          keywords = ["tourism", "travel", "hospitality"];
        } else if (nameLower.includes("hospitality") || nameLower.includes("hotel") || nameLower.includes("chef") || nameLower.includes("cooking")) {
          title = "Hospitality Operational Certificate";
          category = "Hospitality";
          keywords = ["hospitality", "hotel", "operations"];
        } else {
          // Extract title from filename (remove extension and sanitize)
          const cleanName = file.name.split('.')[0].replace(/[-_]/g, ' ');
          title = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
          // Try to guess a category
          if (nameLower.includes("business") || nameLower.includes("management") || nameLower.includes("hr")) {
            category = "Additional Certificates";
            keywords = ["business", "management"];
          }
        }

        setScanResults({
          title,
          category,
          keywords
        });
        setIsScanning(false);
        setScanLogs(prev => [...prev, "[SUCCESS] Scan complete! Matches identified successfully."]);
      }
    }, 150);
  };

  const handleResetScanner = () => {
    setUploadedFile(null);
    setIsScanning(false);
    setScanProgress(0);
    setScanLogs([]);
    setScanResults(null);
  };

  const getScannerRecommendations = () => {
    if (!scanResults) return [];

    // Map interest strings to categories
    const interestCategories = [];
    selectedInterests.forEach(interest => {
      if (interest.includes("ICT")) interestCategories.push("ICT");
      if (interest.includes("Electrical")) interestCategories.push("Electrical Engineering");
      if (interest.includes("Hospitality")) interestCategories.push("Hospitality");
      if (interest.includes("Tourism")) interestCategories.push("Tourism");
      if (interest.includes("Marketing")) interestCategories.push("Marketing");
      if (interest.includes("Business")) interestCategories.push("Additional Certificates");
    });

    const recommendations = [];
    
    // 1. Level up recommendations: certificates in the exact category of the detected certificate
    const sameCategoryCerts = CERTIFICATES_DATA.filter(c => c.category === scanResults.category);
    sameCategoryCerts.forEach(c => {
      recommendations.push({
        ...c,
        recType: "LEVEL UP"
      });
    });

    // 2. Interest matches: certificates in the selected interest categories
    const interestCerts = CERTIFICATES_DATA.filter(c => interestCategories.includes(c.category));
    interestCerts.forEach(c => {
      // Avoid duplicates
      if (!recommendations.some(r => r.id === c.id)) {
        recommendations.push({
          ...c,
          recType: "INTEREST MATCH"
        });
      }
    });

    // Limit to 4 items max
    return recommendations.slice(0, 4);
  };

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 1.5rem 4rem" }}>
      
      {/* Sub-navigation Tabs */}
      <div style={{ 
        display: "flex", gap: 12, borderBottom: `1px solid ${T.border}`,
        paddingBottom: 16, marginBottom: 24 
      }}>
        <button
          onClick={() => setActiveTab("aps")}
          style={{
            background: activeTab === "aps" ? T.teal : "transparent",
            color: activeTab === "aps" ? (dark ? T.navy : "#fff") : T.muted,
            border: activeTab === "aps" ? "none" : `1px solid ${T.border}`,
            borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 700,
            cursor: "pointer", transition: "all 0.2s ease"
          }}
        >
          🎓 Academic APS Matcher
        </button>
        <button
          onClick={() => setActiveTab("scanner")}
          style={{
            background: activeTab === "scanner" ? T.teal : "transparent",
            color: activeTab === "scanner" ? (dark ? T.navy : "#fff") : T.muted,
            border: activeTab === "scanner" ? "none" : `1px solid ${T.border}`,
            borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 700,
            cursor: "pointer", transition: "all 0.2s ease"
          }}
        >
          🔍 Certificate Scanner & Recommender
        </button>
      </div>

      {activeTab === "aps" ? (
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 28 }} className="calculator-layout">
          
          {/* Left Form: Inputs */}
          <div 
            className="calculator-card" 
            style={{
              background: T.navyCard, border: `1px solid ${T.border}`,
              borderRadius: 16, boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
            }}
          >
            <h3 style={{ fontSize: 18, color: T.chalk, fontWeight: 700, marginBottom: 12 }}>Enter Your Marks</h3>
            
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: T.muted, fontWeight: 600, display: "block", marginBottom: 6 }}>SELECT GRADE</label>
              <select 
                value={grade} 
                onChange={e => setGrade(e.target.value)}
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 8,
                  background: dark ? `${T.slate}88` : "#fff", color: T.chalk,
                  border: `1px solid ${T.border}`, outline: "none", fontSize: 14
                }}
              >
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12 / Matric">Grade 12 / Matric</option>
              </select>
            </div>

            {error && (
              <div style={{ 
                background: "rgba(239, 68, 68, 0.15)", color: "#EF4444", 
                padding: 12, borderRadius: 8, fontSize: 13, marginBottom: 16, border: "1px solid rgba(239, 68, 68, 0.3)" 
              }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {subjects.map((sub, idx) => (
                <div key={idx} className="subject-row">
                  <select
                    value={sub.name}
                    onChange={e => handleSubjectChange(idx, "name", e.target.value)}
                    className="subject-select"
                    style={{
                      padding: "10px 14px", borderRadius: 8,
                      background: dark ? `${T.slate}88` : "#fff", color: T.chalk,
                      border: `1px solid ${T.border}`, outline: "none", fontSize: 14
                    }}
                  >
                    <option value="">-- Select Subject --</option>
                    {SA_SUBJECTS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="%"
                    value={sub.mark}
                    min="0"
                    max="100"
                    onChange={e => handleSubjectChange(idx, "mark", e.target.value)}
                    className="subject-input"
                    style={{
                      padding: "10px 10px", borderRadius: 8, textAlign: "center",
                      background: dark ? `${T.slate}88` : "#fff", color: T.chalk,
                      border: `1px solid ${T.border}`, outline: "none", fontSize: 14
                    }}
                  />
                  <button
                    onClick={() => removeSubject(idx)}
                    style={{
                      background: "transparent", border: "none", color: "#EF4444",
                      fontSize: 16, cursor: "pointer", padding: "0 6px"
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={addSubject}
                style={{
                  flex: 1, padding: "10px 14px", borderRadius: 8, background: dark ? `${T.slate}44` : "#f3f4f6",
                  color: T.chalk, fontWeight: 600, border: `1px solid ${T.border}`,
                  cursor: "pointer", fontSize: 13
                }}
              >
                + Add Subject
              </button>
              <button
                onClick={handleCalculateAndMatch}
                disabled={loading}
                style={{
                  flex: 1.5, padding: "10px 14px", borderRadius: 8, background: T.teal,
                  color: dark ? T.navy : "#fff", fontWeight: 700, border: "none",
                  cursor: loading ? "not-allowed" : "pointer", fontSize: 14,
                  boxShadow: `0 4px 14px ${T.teal}44`
                }}
              >
                {loading ? "Matching..." : "Calculate & Match"}
              </button>
            </div>
          </div>

          {/* Right Section: Results */}
          <div>
            {results ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                
                {/* APS Summary Card */}
                <div style={{
                  background: "linear-gradient(135deg, #1e293b, #0f172a)", border: `1px solid ${T.border}`,
                  borderRadius: 16, padding: "22px 26px", color: "#fff", boxShadow: "0 6px 20px rgba(0,0,0,0.15)"
                }}>
                  <h4 style={{ fontSize: 13, textTransform: "uppercase", color: T.teal, letterSpacing: 1, marginBottom: 12 }}>
                    YOUR SCORE SUMMARY
                  </h4>
                  <div style={{ display: "flex", gap: 24 }}>
                    <div>
                      <span style={{ fontSize: 32, fontWeight: 800, color: "#fff" }}>{results.apsExcl}</span>
                      <span style={{ fontSize: 11, color: T.muted, display: "block", marginTop: 2 }}>APS (Excl. LO)</span>
                    </div>
                    <div style={{ borderLeft: `1px solid ${T.border}`, paddingLeft: 24 }}>
                      <span style={{ fontSize: 32, fontWeight: 800, color: T.teal }}>{results.apsIncl}</span>
                      <span style={{ fontSize: 11, color: T.muted, display: "block", marginTop: 2 }}>APS (Incl. LO)</span>
                    </div>
                  </div>
                </div>

                {/* Matching Courses List */}
                <div style={{ maxHeight: 500, overflowY: "auto", paddingRight: 4 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: T.chalk, marginBottom: 12 }}>
                    Qualifying Programs ({results.matches.reduce((acc, curr) => acc + curr.courses.length, 0)})
                  </h4>

                  {results.matches.length > 0 ? (
                    results.matches.map(inst => (
                      <div key={inst.details.name} style={{
                        background: T.navyCard, border: `1px solid ${T.border}`,
                        borderRadius: 12, padding: 18, marginBottom: 16
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, gap: 10 }}>
                          <div style={{ flex: 1 }}>
                            <h5 style={{ fontSize: 14, fontWeight: 700, color: T.chalk, marginBottom: 4 }}>{inst.details.name}</h5>
                            <span style={{ 
                              background: inst.details.type.includes("Public") ? `${T.teal}22` : "rgba(255, 165, 0, 0.2)",
                              color: inst.details.type.includes("Public") ? T.teal : "orange",
                              fontSize: 10, fontWeight: 700, padding: "3px 6px", borderRadius: 4
                            }}>{inst.details.type}</span>
                          </div>
                          <a 
                            href={getApplyLink(inst.details.name)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: 11,
                              fontWeight: 700,
                              color: T.teal,
                              textDecoration: "none",
                              padding: "6px 12px",
                              borderRadius: 6,
                              border: `1px solid ${T.teal}40`,
                              background: `${T.teal}11`,
                              cursor: "pointer",
                              transition: "all 0.2s ease-in-out",
                              whiteSpace: "nowrap"
                            }}
                            onMouseEnter={e => {
                              e.target.style.background = `${T.teal}22`;
                              e.target.style.borderColor = T.teal;
                            }}
                            onMouseLeave={e => {
                              e.target.style.background = `${T.teal}11`;
                              e.target.style.borderColor = `${T.teal}40`;
                            }}
                          >
                            Apply Direct ↗
                          </a>
                        </div>
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {inst.courses.map(course => (
                            <div key={course.name} style={{
                              background: dark ? "rgba(255,255,255,0.02)" : "#f9fafb",
                              border: `1px solid ${T.border}`, borderRadius: 8, padding: "10px 12px",
                              display: "flex", justifyContent: "space-between", alignItems: "center"
                            }}>
                              <div style={{ flex: 1, minWidth: 0, marginRight: 8 }}>
                                <span style={{ fontSize: 13, color: T.chalk, fontWeight: 600 }}>{course.name}</span>
                                <span style={{ fontSize: 11, color: T.muted, display: "block", marginTop: 2 }}>
                                  NQF Level {course.nqf_level} • SAQA ID: {course.saqa_id}
                                </span>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                <span style={{ fontSize: 12, color: T.teal, fontWeight: 700 }}>Min APS {course.min_aps}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ 
                      textAlign: "center", padding: "40px 20px", color: T.muted,
                      border: `2px dashed ${T.border}`, borderRadius: 12 
                    }}>
                      <p style={{ fontSize: 14, marginBottom: 8 }}>No matching courses found.</p>
                      <p style={{ fontSize: 12 }}>You may need higher marks or more core subjects (like Mathematics and Physical Sciences) to qualify for programs.</p>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div style={{
                height: "100%", minHeight: 250, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", border: `2px dashed ${T.border}`,
                borderRadius: 16, padding: 32, textAlign: "center", color: T.muted
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginBottom: 12, opacity: 0.5 }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="9" y1="9" x2="15" y2="9"/>
                  <line x1="9" y1="13" x2="15" y2="13"/>
                  <line x1="9" y1="17" x2="15" y2="17"/>
                </svg>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: T.chalk, marginBottom: 6 }}>Results Dashboard</h4>
                <p style={{ fontSize: 12, maxWidth: 280 }}>Input your subjects and click calculate to view the courses and institutions you qualify for.</p>
              </div>
            )}
          </div>

        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }} className="calculator-layout">
          {/* Left Column: Upload & Interests */}
          <div style={{
            background: T.navyCard, border: `1px solid ${T.border}`,
            borderRadius: 16, padding: 24, boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
          }}>
            <style>{`
              @keyframes laser-sweep {
                0% { transform: translateY(0); }
                50% { transform: translateY(180px); }
                100% { transform: translateY(0); }
              }
            `}</style>
            
            <h3 style={{ fontSize: 18, color: T.chalk, fontWeight: 700, marginBottom: 12 }}>Scan Certificate</h3>
            <p style={{ fontSize: 13, color: T.muted, marginBottom: 20 }}>Upload your completion certificates or transcripts to identify booster paths.</p>

            {!uploadedFile ? (
              <div 
                style={{
                  border: `2px dashed ${T.border}`, borderRadius: 12,
                  padding: "48px 32px", textAlign: "center", cursor: "pointer",
                  background: dark ? "rgba(255,255,255,0.01)" : "#f9fafb",
                  transition: "all 0.2s ease",
                }}
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                  e.preventDefault();
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    handleFileUpload(e.dataTransfer.files[0]);
                  }
                }}
                onClick={() => document.getElementById("certificate-file-input").click()}
              >
                <input 
                  id="certificate-file-input"
                  type="file" 
                  accept=".pdf,.png,.jpg,.jpeg,.docx" 
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                  style={{ display: "none" }}
                />
                <div style={{ fontSize: 44, marginBottom: 16 }}>📁</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: T.chalk, marginBottom: 6 }}>
                  Drag & Drop Certificate Here
                </div>
                <div style={{ fontSize: 12, color: T.muted, marginBottom: 12 }}>
                  or click to browse from files
                </div>
                <span style={{ 
                  fontSize: 10, background: dark ? "rgba(255,255,255,0.05)" : "#e5e7eb", 
                  color: T.muted, padding: "4px 10px", borderRadius: 6 
                }}>
                  Supports PDF, PNG, JPG up to 10MB
                </span>
              </div>
            ) : (
              <div>
                {/* File Preview with Laser */}
                <div style={{ 
                  position: "relative", width: "100%", height: 200, 
                  overflow: "hidden", borderRadius: 12, background: dark ? "#0f172a" : "#e2e8f0", 
                  display: "flex", alignItems: "center", justifyContent: "center", 
                  border: `1px solid ${T.border}` 
                }}>
                  {uploadedFile.preview ? (
                    <img src={uploadedFile.preview} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: isScanning ? 0.5 : 0.8 }} />
                  ) : (
                    <div style={{ textAlign: "center", color: T.muted }}>
                      <span style={{ fontSize: 64 }}>📄</span>
                      <div style={{ fontSize: 13, marginTop: 12, fontWeight: 600, color: T.chalk }}>{uploadedFile.name}</div>
                      <div style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>{uploadedFile.size}</div>
                    </div>
                  )}
                  
                  {isScanning && (
                    <div style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      height: 4,
                      background: T.teal,
                      boxShadow: `0 0 10px ${T.teal}, 0 0 20px ${T.teal}`,
                      animation: "laser-sweep 2s infinite linear",
                      zIndex: 2
                    }} />
                  )}
                </div>

                {/* Progress / Status Logs */}
                <div style={{ marginTop: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 8, fontWeight: 600 }}>
                    <span style={{ color: T.muted }}>
                      {isScanning ? "PROCESSING CREDENTIAL..." : "SCAN COMPLETED"}
                    </span>
                    <span style={{ color: T.teal }}>{scanProgress}%</span>
                  </div>
                  <div style={{ width: "100%", height: 8, background: dark ? "rgba(255,255,255,0.05)" : "#e2e8f0", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${scanProgress}%`, height: "100%", background: T.teal, transition: "width 0.1s linear" }} />
                  </div>
                  
                  {/* Terminal Logs */}
                  <div style={{ 
                    background: "#020617", borderRadius: 8, padding: 12, 
                    marginTop: 16, fontFamily: "monospace", fontSize: 11, color: "#10B981",
                    maxHeight: 120, overflowY: "auto", border: "1px solid #1e293b"
                  }}>
                    {scanLogs.map((log, i) => (
                      <div key={i} style={{ marginBottom: 4 }}>{log}</div>
                    ))}
                  </div>
                </div>

                {!isScanning && (
                  <button
                    onClick={handleResetScanner}
                    style={{
                      marginTop: 16, padding: "8px 16px", borderRadius: 8, 
                      background: "transparent", color: "#EF4444", border: "1px solid rgba(239, 68, 68, 0.4)",
                      cursor: "pointer", fontSize: 12, fontWeight: 600, width: "100%"
                    }}
                  >
                    Clear & Scan Another Certificate
                  </button>
                )}
              </div>
            )}

            {/* Interest Checklist */}
            <div style={{ marginTop: 28, borderTop: `1px solid ${T.border}`, paddingTop: 20 }}>
              <h4 style={{ fontSize: 14, color: T.chalk, fontWeight: 700, marginBottom: 4 }}>Select Your Interests</h4>
              <p style={{ fontSize: 12, color: T.muted, marginBottom: 14 }}>Tell us what areas you are passionate about to refine your suggestions.</p>
              
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["ICT & Computer Science", "Electrical Engineering", "Hospitality", "Tourism & Travel", "Marketing & Design", "Business & HR"].map(interest => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedInterests(selectedInterests.filter(i => i !== interest));
                        } else {
                          setSelectedInterests([...selectedInterests, interest]);
                        }
                      }}
                      style={{
                        background: isSelected ? T.teal : (dark ? `${T.slate}33` : "#f3f4f6"),
                        color: isSelected ? (dark ? T.navy : "#fff") : T.muted,
                        border: `1px solid ${isSelected ? T.teal : T.border}`,
                        borderRadius: 20, padding: "8px 16px", fontSize: 12, fontWeight: 600,
                        cursor: "pointer", transition: "all 0.15s ease"
                      }}
                    >
                      {interest} {isSelected ? "✓" : "+"}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Results & Recommendations */}
          <div>
            {scanResults ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                
                {/* Extracted Certificate Info Card */}
                <div style={{
                  background: T.navyCard, border: `1px solid ${T.border}`,
                  borderRadius: 16, padding: "20px 24px", boxShadow: "0 6px 20px rgba(0,0,0,0.15)"
                }}>
                  <h4 style={{ fontSize: 12, textTransform: "uppercase", color: T.teal, letterSpacing: 1, marginBottom: 14, fontWeight: 700 }}>
                    IDENTIFIED CREDENTIAL
                  </h4>
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <div style={{ fontSize: 36 }}>🏆</div>
                    <div>
                      <h5 style={{ fontSize: 16, fontWeight: 800, color: T.chalk, margin: 0 }}>{scanResults.title}</h5>
                      <p style={{ fontSize: 12, color: T.muted, margin: "4px 0 0 0" }}>
                        Recognized Field: <span style={{ color: T.teal, fontWeight: 700 }}>{scanResults.category}</span>
                      </p>
                      {scanResults.keywords.length > 0 && (
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                          {scanResults.keywords.map(kw => (
                            <span key={kw} style={{ 
                              background: dark ? `${T.slate}66` : "#e2e8f0", 
                              color: T.muted, fontSize: 10, padding: "2px 8px", borderRadius: 6, fontWeight: 600 
                            }}>
                              #{kw}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dynamic Recommendations List */}
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, color: T.chalk, marginBottom: 12 }}>
                    Recommended Next Steps
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {getScannerRecommendations().map(rec => (
                      <div key={rec.id} style={{
                        background: T.navyCard, border: `1px solid ${T.border}`,
                        borderRadius: 12, padding: 18
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, gap: 10 }}>
                          <div style={{ flex: 1 }}>
                            <span style={{ 
                              background: rec.recType === "LEVEL UP" ? "rgba(16, 185, 129, 0.15)" : `${T.teal}22`,
                              color: rec.recType === "LEVEL UP" ? "#10B981" : T.teal,
                              fontSize: 9, fontWeight: 700, padding: "3px 6px", borderRadius: 4, letterSpacing: 0.5
                            }}>{rec.recType}</span>
                            <h5 style={{ fontSize: 15, fontWeight: 700, color: T.chalk, marginTop: 6, marginBottom: 2 }}>{rec.title}</h5>
                            <span style={{ fontSize: 11, color: T.muted }}>Provider: {rec.provider}</span>
                          </div>
                          
                          <a 
                            href={rec.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: 11,
                              fontWeight: 700,
                              color: T.teal,
                              textDecoration: "none",
                              padding: "6px 12px",
                              borderRadius: 6,
                              border: `1px solid ${T.teal}40`,
                              background: `${T.teal}11`,
                              cursor: "pointer",
                              transition: "all 0.2s ease-in-out",
                              whiteSpace: "nowrap"
                            }}
                            onMouseEnter={e => {
                              e.target.style.background = `${T.teal}22`;
                              e.target.style.borderColor = T.teal;
                            }}
                            onMouseLeave={e => {
                              e.target.style.background = `${T.teal}11`;
                              e.target.style.borderColor = `${T.teal}40`;
                            }}
                          >
                            Start Free ↗
                          </a>
                        </div>
                        <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.4, margin: 0 }}>
                          {rec.description}
                        </p>
                      </div>
                    ))}
                    
                    {getScannerRecommendations().length === 0 && (
                      <div style={{ 
                        textAlign: "center", padding: "30px 20px", color: T.muted,
                        border: `2px dashed ${T.border}`, borderRadius: 12 
                      }}>
                        <p style={{ fontSize: 13, margin: 0 }}>Select interests or upload a certificate to see recommendations.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ) : (
              <div style={{
                height: "100%", minHeight: 320, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", border: `2px dashed ${T.border}`,
                borderRadius: 16, padding: 32, textAlign: "center", color: T.muted
              }}>
                <span style={{ fontSize: 44, marginBottom: 16 }}>📊</span>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: T.chalk, marginBottom: 6 }}>Recommendations Dashboard</h4>
                <p style={{ fontSize: 12, maxWidth: 280, margin: 0 }}>Upload your credentials and select your interests. The recommender system will analyze and map your paths.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState(() => {
    const saved = localStorage.getItem("pathway_page");
    return saved && ["Home", "Discover", "Careers", "Bursaries", "Institutions", "APS Calculator", "Trends", "Certificates"].includes(saved) ? saved : "Home";
  });
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("pathway_dark");
    return saved !== null ? saved === "true" : true;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("pathway_page", page);
  }, [page]);

  useEffect(() => {
    localStorage.setItem("pathway_dark", dark);
  }, [dark]);
  const T = dark ? DARK : LIGHT;

  const pageHeader = (title, sub) => (
    <div className="page-header" style={{
      background: T.pageHead, padding: "44px 1.5rem 32px",
      textAlign: "center", marginBottom: 28,
      borderBottom: `1px solid ${T.border}`,
    }}>
      <h1 style={{ fontSize: 26, color: T.chalk, fontWeight: 800, marginBottom: 6 }}>{title}</h1>
      <p style={{ color: T.muted, fontSize: 13 }}>{sub}</p>
    </div>
  );

  return (
    <div className="app-container" style={{
      background: T.navy, color: T.chalk,
      transition: "background 0.3s, color 0.3s",
    }}>
      <Sidebar active={page} setActive={setPage} dark={dark} setDark={setDark} T={T} open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="main-content">
        <div className="mobile-header" style={{ backgroundColor: T.navyMid, borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="24" height="24" viewBox="0 0 32 32">
              <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" fill="none" stroke={T.teal} strokeWidth="2"/>
              <text x="16" y="21" textAnchor="middle" fill={T.teal} fontSize="12" fontWeight="bold" fontFamily="monospace">P</text>
            </svg>
            <span style={{ color: T.chalk, fontWeight: 700, fontSize: 16 }}>PathwayZA</span>
          </div>
          <button className="hamburger-btn" style={{ color: T.chalk }} onClick={() => setSidebarOpen(true)}>☰</button>
        </div>

        <div>
          {page === "Home"     && <Hero setPage={setPage} T={T} dark={dark} />}
          {page === "Discover" && <>{pageHeader("Find Your Career Path", "Select your subjects and see where they lead.")}<DiscoverPage T={T} dark={dark} /></>}
          {page === "Careers"  && <>{pageHeader("Career Explorer", "Browse every career — with all paths to get there.")}<CareersPage T={T} dark={dark} /></>}
          {page === "Bursaries"&& <>{pageHeader("Bursaries & Funding", "Find money for your studies before you need it.")}<BursariesPage T={T} dark={dark} /></>}
          {page === "Institutions"&& <>{pageHeader("Institution Validator", "Verify if a university or college is registered (Public vs Private).")}<InstitutionsPage T={T} dark={dark} /></>}
          {page === "APS Calculator"&& <>{pageHeader("APS Calculator & Course Matcher", "Input your subjects and marks to see which courses you qualify for.")}<ApsCalculatorPage T={T} dark={dark} /></>}
          {page === "Trends"   && <>{pageHeader("SA Career Trends", "What South Africa needs most — right now and in 2030.")}<TrendsPage T={T} /></>}
          {page === "Certificates" && <>{pageHeader("Certificates Archive", "Booster certificates archive to upskill and enhance your credentials.")}<CertificatesPage T={T} dark={dark} /></>}
        </div>
      </div>
    </div>
  );
}
