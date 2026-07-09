import { useState, useEffect } from "react";
import { supabase } from "./src/supabaseClient.js";

// ── THEME TOKENS ─────────────────────────────────────────────────────────────
const DARK = {
  navy:    "#0A0F1E", navyMid: "#111827", navyCard: "#161D2F",
  slate:   "#1E2A40", teal: "#00C2A8",   tealDim: "#00967F",
  amber:   "#F59E0B", chalk: "#F0F4FF",  muted: "#7A8BA8",
  border:  "#1E2D45", white: "#FFFFFF",
  heroGrad:"radial-gradient(ellipse at 60% 40%, #0d1f3c 0%, #0A0F1E 70%)",
  pageHead:"linear-gradient(180deg, #0d1a30 0%, #0A0F1E 100%)",
  inputBg: "#1E2A40",
};

const LIGHT = {
  navy:    "#F0F4FF", navyMid: "#E4EAF8", navyCard: "#FFFFFF",
  slate:   "#DDE4F0", teal: "#007A6B",   tealDim: "#005C51",
  amber:   "#C47D0A", chalk: "#0A0F1E",  muted: "#4A5568",
  border:  "#C8D4E8", white: "#0A0F1E",
  heroGrad:"radial-gradient(ellipse at 60% 40%, #C8DCF8 0%, #F0F4FF 70%)",
  pageHead:"linear-gradient(180deg, #DCE8F8 0%, #F0F4FF 100%)",
  inputBg: "#DDE4F0",
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
    subjects: ["English Home Language", "Mathematics (Grade 8 & 9)", "Life Orientation (Grade 8 & 9)", "Social Sciences — History (Grade 8 & 9)", "Social Sciences — Geography (Grade 8 & 9)"],
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
    subjects: ["Natural Sciences (Grade 8 & 9)", "Social Sciences — Geography (Grade 8 & 9)", "Mathematics (Grade 8 & 9)"],
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
    subjects: ["Economic & Management Sciences (Grade 8 & 9)", "Mathematics (Grade 8 & 9)", "Technology (Grade 8 & 9)"],
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
    subjects: ["Life Orientation (Grade 8 & 9)", "Social Sciences — History (Grade 8 & 9)", "English Home Language"],
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
    subjects: ["Technology (Grade 8 & 9)", "Natural Sciences (Grade 8 & 9)", "Mathematics (Grade 8 & 9)"],
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
    subjects: ["English Home Language", "Social Sciences — History (Grade 8 & 9)", "Arts & Culture — Drama (Grade 8 & 9)"],
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
    subjects: ["Economic & Management Sciences (Grade 8 & 9)", "Natural Sciences (Grade 8 & 9)", "Life Orientation (Grade 8 & 9)"],
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
    subjects: ["Technology (Grade 8 & 9)", "Arts & Culture — Visual Art (Grade 8 & 9)", "Mathematics (Grade 8 & 9)", "Natural Sciences (Grade 8 & 9)"],
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
    subjects: ["Natural Sciences (Grade 8 & 9)", "Social Sciences — Geography (Grade 8 & 9)", "Economic & Management Sciences (Grade 8 & 9)"],
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
    subjects: ["Arts & Culture — Music (Grade 8 & 9)", "Mathematics (Grade 8 & 9)", "English Home Language"],
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
    subjects: ["Life Orientation (Grade 8 & 9)", "Natural Sciences (Grade 8 & 9)", "Mathematics (Grade 8 & 9)"],
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
    subjects: ["Technology (Grade 8 & 9)", "Natural Sciences (Grade 8 & 9)", "Mathematics (Grade 8 & 9)"],
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
    subjects: ["Life Orientation (Grade 8 & 9)", "Social Sciences — History (Grade 8 & 9)", "English Home Language", "Natural Sciences (Grade 8 & 9)"],
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
    subjects: ["Mathematics (Grade 8 & 9)", "Economic & Management Sciences (Grade 8 & 9)", "Natural Sciences (Grade 8 & 9)"],
    paths: [
      { type: "university", label: "BSc Statistics / Data Science", duration: "3 years", institution: "UCT / Wits / SU" },
      { type: "college",    label: "Diploma in Data Analytics", duration: "2 years", institution: "Richfield / Boston / Regenesys" },
      { type: "online",     label: "Google Data Analytics Certificate", duration: "6 months", institution: "Coursera / Google" },
    ],
    bursaries: ["Standard Bank Bursary", "Discovery Bursary", "FNB Foundation Bursary"],
    internships: ["Discovery Graduate Programme", "Standard Bank Internship", "Stats SA Graduate Internship"],
  },
];

// ── SUBJECTS ──────────────────────────────────────────────────────────────────
const SUBJECT_GROUPS = {
  "Grade 7 (Primary School)": [
    "English (Home Language)","Afrikaans (First Additional Language)",
    "IsiZulu (Home Language)","IsiXhosa (Home Language)",
    "Sesotho (Home Language)","Setswana (Home Language)",
    "Mathematics (Grade 7)","Natural Sciences (Grade 7)",
    "Social Sciences — History (Grade 7)","Social Sciences — Geography (Grade 7)",
    "Technology (Grade 7)","Economic & Management Sciences (Grade 7)",
    "Life Orientation (Grade 7)","Arts & Culture — Visual Art (Grade 7)",
    "Arts & Culture — Music (Grade 7)","Arts & Culture — Drama (Grade 7)",
    "Arts & Culture — Dance (Grade 7)",
  ],
  "Grade 8 & 9 (High School — Junior)": [
    "English Home Language","Afrikaans First Additional Language",
    "IsiZulu (Grade 8 & 9)","IsiXhosa (Grade 8 & 9)",
    "Mathematics (Grade 8 & 9)","Natural Sciences (Grade 8 & 9)",
    "Social Sciences — History (Grade 8 & 9)","Social Sciences — Geography (Grade 8 & 9)",
    "Technology (Grade 8 & 9)","Economic & Management Sciences (Grade 8 & 9)",
    "Life Orientation (Grade 8 & 9)","Arts & Culture — Visual Art (Grade 8 & 9)",
    "Arts & Culture — Music (Grade 8 & 9)","Arts & Culture — Drama (Grade 8 & 9)",
    "Arts & Culture — Dance (Grade 8 & 9)","Creative Arts (Grade 8 & 9)",
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
    "History","Geography","Religion Studies","Philosophy",
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
};
const ALL_SUBJECTS = Object.values(SUBJECT_GROUPS).flat();

const FIELDS = ["All", "Technology", "Trades", "Healthcare", "Creative Arts", "Business & Finance",
  "Engineering", "Education", "Science & Environment", "Social Sciences",
  "Hospitality", "Agriculture", "Sport & Recreation", "Grade 8 & 9 Careers"];

// ── PATH COLORS (theme-aware via props) ───────────────────────────────────────
const PATH_META = {
  university:    { accent: "#00C2A8", label: "University" },
  college:       { accent: "#F59E0B", label: "College / TVET" },
  apprenticeship:{ accent: "#A78BFA", label: "Apprenticeship" },
  online:        { accent: "#34D399", label: "Online / Bootcamp" },
};

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function ThemeToggle({ dark, setDark }) {
  return (
    <button onClick={() => setDark(d => !d)} title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"} style={{
      background: "none", border: "none", cursor: "pointer",
      fontSize: 20, lineHeight: 1, padding: "4px 6px", borderRadius: 8,
    }}>
      {dark ? "☀️" : "🌙"}
    </button>
  );
}

function Sidebar({ active, setActive, dark, setDark, T, open, setOpen }) {
  const links = ["Home", "Discover", "Careers", "Bursaries", "Institutions", "APS Calculator", "Trends"];
  return (
    <>
      <div className={`sidebar-backdrop ${open ? "open" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <svg width="28" height="28" viewBox="0 0 32 32">
            <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" fill="none" stroke={T.teal} strokeWidth="2"/>
            <polygon points="16,8 24,13 24,19 16,24 8,19 8,13" fill={T.teal} opacity="0.15"/>
            <text x="16" y="21" textAnchor="middle" fill={T.teal} fontSize="12" fontWeight="bold" fontFamily="monospace">P</text>
          </svg>
          <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: 1 }}>PathwayZA</span>
        </div>
        <div className="sidebar-links">
          {links.map(l => (
            <button key={l} onClick={() => { setActive(l); setOpen(false); }} className={`sidebar-link ${active === l ? 'active' : ''}`}>
              {l}
            </button>
          ))}
        </div>
        <div className="sidebar-footer">
          <ThemeToggle dark={dark} setDark={setDark} />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
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
            {career.field}{career.grade ? ` · Grade ${career.grade}` : ""}
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
              {career.field}{career.grade ? ` · Grade ${career.grade} Career` : ""}
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

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <h3 style={{ color: T.chalk, fontSize: 13, marginBottom: 8, fontWeight: 700 }}>Bursaries & Funding</h3>
            {career.bursaries.map(b => (
              <div key={b} style={{ fontSize: 12, color: T.muted, padding: "4px 0", borderBottom: `1px solid ${T.border}` }}>
                💰 {b}
              </div>
            ))}
          </div>
          <div>
            <h3 style={{ color: T.chalk, fontSize: 13, marginBottom: 8, fontWeight: 700 }}>Internships & Experience</h3>
            {career.internships.map(i => (
              <div key={i} style={{ fontSize: 12, color: T.muted, padding: "4px 0", borderBottom: `1px solid ${T.border}` }}>
                🔗 {i}
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
        <h2 style={{ fontSize: 26, color: T.chalk, fontWeight: 800, marginBottom: 6 }}>What subjects are you taking?</h2>
        <p style={{ color: T.muted, fontSize: 14 }}>Select all that apply. We'll rank career matches for you.</p>
      </div>

      {/* Search */}
      <div style={{ maxWidth: 420, margin: "0 auto 18px" }}>
        <input type="text" placeholder="Search subjects…" value={search}
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
              {selected.length} subject{selected.length > 1 ? "s" : ""} selected
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
  const [field, setField] = useState("All");
  const [modal, setModal] = useState(null);

  const filtered = field === "All"
    ? CAREERS
    : field === "Grade 8 & 9 Careers"
    ? CAREERS.filter(c => c.grade === "8 & 9")
    : CAREERS.filter(c => c.field === field);

  return (
    <div style={{ maxWidth: 940, margin: "0 auto", padding: "0 1.5rem 4rem" }}>
      <CareerModal career={modal} onClose={() => setModal(null)} T={T} dark={dark} />
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: 24, color: T.chalk, fontWeight: 800, marginBottom: 5 }}>Career Explorer</h2>
        <p style={{ color: T.muted, fontSize: 13 }}>Browse all careers. Click any card for paths, bursaries, and internships.</p>
      </div>
      <div className="desktop-filters" style={{ gap: 6, flexWrap: "wrap", marginBottom: 22 }}>
        {FIELDS.map(f => (
          <button key={f} onClick={() => setField(f)} style={{
            background: field === f ? T.teal : T.slate,
            color: field === f ? (dark ? T.navy : "#fff") : T.muted,
            border: "none", borderRadius: 6, padding: "5px 12px",
            fontSize: 11, fontWeight: 600, cursor: "pointer",
          }}>{f}</button>
        ))}
      </div>
      <div className="mobile-filters">
        <select value={field} onChange={(e) => setField(e.target.value)}>
          {FIELDS.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: 12, fontSize: 12, color: T.muted }}>
        Showing <span style={{ color: T.teal, fontWeight: 700 }}>{filtered.length}</span> careers
      </div>
      <div className="career-grid">
        {filtered.map(c => <CareerCard key={c.id} career={c} onClick={setModal} T={T} dark={dark} />)}
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
  ];

  const typeColors = {
    Government: T.teal, Corporate: T.amber,
    SETA: "#A78BFA", Foundation: "#34D399", "Professional Body": "#F87171",
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
  const trends = [
    { rank: 1, title: "AI & Machine Learning Engineer", demand: 97, delta: "+31%", tag: "RISING" },
    { rank: 2, title: "Cybersecurity Analyst", demand: 93, delta: "+27%", tag: "RISING" },
    { rank: 3, title: "Data Analyst", demand: 90, delta: "+28%", tag: "RISING" },
    { rank: 4, title: "Master Electrician", demand: 88, delta: "+18%", tag: null },
    { rank: 5, title: "Registered Nurse", demand: 87, delta: "+15%", tag: null },
    { rank: 6, title: "Civil Engineer", demand: 85, delta: "+14%", tag: null },
    { rank: 7, title: "Social Worker", demand: 83, delta: "+13%", tag: null },
    { rank: 8, title: "Plumber / Water Technician", demand: 82, delta: "+16%", tag: null },
    { rank: 9, title: "Chartered Accountant", demand: 80, delta: "+9%", tag: null },
    { rank: 10, title: "Entrepreneur / Business Owner", demand: 80, delta: "+20%", tag: "RISING" },
    { rank: 11, title: "Environmental Scientist", demand: 74, delta: "+16%", tag: "RISING" },
    { rank: 12, title: "UX / Product Designer", demand: 73, delta: "+19%", tag: "RISING" },
    { rank: 13, title: "Agricultural Scientist", demand: 72, delta: "+17%", tag: null },
    { rank: 14, title: "IT Technician / Network Engineer", demand: 89, delta: "+24%", tag: "RISING" },
  ].sort((a, b) => b.demand - a.demand).map((t, i) => ({ ...t, rank: i + 1 }));

  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "0 1.5rem 4rem" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, color: T.chalk, fontWeight: 800, marginBottom: 5 }}>SA Career Trends</h2>
        <p style={{ color: T.muted, fontSize: 13 }}>Most in-demand careers in South Africa — projected to 2030.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {trends.map(t => (
          <div key={t.rank} style={{
            background: T.navyCard, border: `1px solid ${T.border}`,
            borderRadius: 10, padding: "12px 16px",
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
                    fontSize: 9, background: "#7C3AED20", color: "#A78BFA",
                    border: "1px solid #7C3AED40", borderRadius: 4,
                    padding: "1px 5px", fontWeight: 700,
                  }}>{t.tag}</span>
                )}
              </div>
              <DemandBar value={t.demand} T={T} />
            </div>
            <div style={{ fontSize: 13, color: T.amber, fontWeight: 700, minWidth: 46, textAlign: "right" }}>{t.delta}</div>
          </div>
        ))}
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
              
              <div style={{ 
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, 
                borderTop: `1px solid ${T.border}`, paddingTop: 20, textAlign: "left"
              }}>
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

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 1.5rem 4rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 28 }} className="calculator-layout">
        
        {/* Left Form: Inputs */}
        <div style={{
          background: T.navyCard, border: `1px solid ${T.border}`,
          borderRadius: 16, padding: "24px 28px", boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
        }}>
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
              <div key={idx} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <select
                  value={sub.name}
                  onChange={e => handleSubjectChange(idx, "name", e.target.value)}
                  style={{
                    flex: 2, padding: "10px 14px", borderRadius: 8,
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
                  style={{
                    width: 70, padding: "10px 10px", borderRadius: 8, textAlign: "center",
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
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <h5 style={{ fontSize: 14, fontWeight: 700, color: T.chalk }}>{inst.details.name}</h5>
                        <span style={{ 
                          background: inst.details.type.includes("Public") ? `${T.teal}22` : "rgba(255, 165, 0, 0.2)",
                          color: inst.details.type.includes("Public") ? T.teal : "orange",
                          fontSize: 10, fontWeight: 700, padding: "3px 6px", borderRadius: 4
                        }}>{inst.details.type}</span>
                      </div>
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {inst.courses.map(course => (
                          <div key={course.name} style={{
                            background: dark ? "rgba(255,255,255,0.02)" : "#f9fafb",
                            border: `1px solid ${T.border}`, borderRadius: 8, padding: "10px 12px",
                            display: "flex", justifyContent: "space-between", alignItems: "center"
                          }}>
                            <div>
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
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const [dark, setDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
        <div className="mobile-header">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="24" height="24" viewBox="0 0 32 32">
              <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" fill="none" stroke={T.teal} strokeWidth="2"/>
              <text x="16" y="21" textAnchor="middle" fill={T.teal} fontSize="12" fontWeight="bold" fontFamily="monospace">P</text>
            </svg>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>PathwayZA</span>
          </div>
          <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>☰</button>
        </div>

        <div>
          {page === "Home"     && <Hero setPage={setPage} T={T} dark={dark} />}
          {page === "Discover" && <>{pageHeader("Find Your Career Path", "Select your subjects and see where they lead.")}<DiscoverPage T={T} dark={dark} /></>}
          {page === "Careers"  && <>{pageHeader("Career Explorer", "Browse every career — with all paths to get there.")}<CareersPage T={T} dark={dark} /></>}
          {page === "Bursaries"&& <>{pageHeader("Bursaries & Funding", "Find money for your studies before you need it.")}<BursariesPage T={T} dark={dark} /></>}
          {page === "Institutions"&& <>{pageHeader("Institution Validator", "Verify if a university or college is registered (Public vs Private).")}<InstitutionsPage T={T} dark={dark} /></>}
          {page === "APS Calculator"&& <>{pageHeader("APS Calculator & Course Matcher", "Input your subjects and marks to see which courses you qualify for.")}<ApsCalculatorPage T={T} dark={dark} /></>}
          {page === "Trends"   && <>{pageHeader("SA Career Trends", "What South Africa needs most — right now and in 2030.")}<TrendsPage T={T} /></>}
        </div>
      </div>
    </div>
  );
}
