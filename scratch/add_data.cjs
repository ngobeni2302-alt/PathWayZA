const fs = require('fs');
let content = fs.readFileSync('PathwayZA.jsx', 'utf8');

const newCareers = `,
  {
    id: 21, title: "Data Scientist", demand: 95, salary: "R40 000 – R100 000+/mo",
    field: "Technology", growth: "+35% by 2030", grade: null,
    subjects: ["Mathematics", "Information Technology", "Physical Sciences"],
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
  }
];`;

content = content.replace(/  \}\n\];\n\n\/\/ ── SUBJECTS/, newCareers + '\n\n// ── SUBJECTS');

const newOpportunities = `,
  {
    id: 6,
    title: "SA Youth Network (SAYouth.mobi)",
    type: "Platform",
    company: "National Youth Development Agency",
    stipend: "N/A",
    location: "Online / Nationwide",
    duration: "Ongoing",
    description: "A data-free national network for young people to access learning and earning opportunities. Great for learnerships, YES programmes, and entry-level jobs."
  },
  {
    id: 7,
    title: "Artisan Training Institute (ATI) Portal",
    type: "Platform",
    company: "ATI South Africa",
    stipend: "N/A",
    location: "Online",
    duration: "Ongoing",
    description: "Apply directly for artisan apprenticeships (fitting, turning, electrical, welding) and check for sponsored training programs and trade test dates."
  },
  {
    id: 8,
    title: "Pnet & Careers24",
    type: "Platform",
    company: "Online Job Boards",
    stipend: "N/A",
    location: "Online",
    duration: "Ongoing",
    description: "The largest online job portals in South Africa. Highly recommended for finding corporate learnerships, bursary listings, and entry-level graduate programmes."
  },
  {
    id: 9,
    title: "ZABursaries Portal",
    type: "Platform",
    company: "ZABursaries",
    stipend: "N/A",
    location: "Online",
    duration: "Ongoing",
    description: "A centralized, constantly updated database of all active bursaries and scholarships available to South African students across all fields of study."
  },
  {
    id: 10,
    title: "Lulaway Entry-Level Placements",
    type: "Platform",
    company: "Lulaway",
    stipend: "N/A",
    location: "Online / Nationwide",
    duration: "Ongoing",
    description: "Specializes in entry-level placements, artisan roles, and learnerships. They partner with government and large corporates to place youth in structured jobs."
  }
];`;

content = content.replace(/  \}\n\];\n\n\/\/ Helper to map bursaries/, newOpportunities + '\n\n// Helper to map bursaries');

fs.writeFileSync('PathwayZA.jsx', content);
console.log('Successfully added new careers and artisan platforms.');
