/* ==========================================================================
   PathwayZA — Core Application Logic & Database
   ========================================================================== */

// 1. DATABASE CONSTRUCTS

const CAREER_DB = [
    {
        id: "soft-eng",
        name: "Software Engineer / Developer",
        sector: "Tech",
        description: "Design, build, and maintain computer systems, mobile applications, and enterprise software platforms.",
        demand: "Critical",
        demandDetails: "Over 12,000 vacant software developer roles currently listed across South Africa's tech hubs.",
        salary: "R300,000 - R850,000+ per year",
        subjects: ["Pure Mathematics", "Information Technology", "Physical Sciences"],
        tvetPath: "N4 - N6 Financial/Business Management + Coding Bootcamps, or N4 - N6 Engineering Studies.",
        uniPath: "BSc in Computer Science, BEng/BSc in Software Engineering, or Diploma in IT.",
        certifications: "AWS Certified Developer, Microsoft Certified Azure, Java, Python.",
        interests: ["coding", "business"],
        tvetUniversityBridge: true
    },
    {
        id: "data-sci",
        name: "Data Scientist / AI Engineer",
        sector: "Tech",
        description: "Analyze complex datasets and construct machine learning models to solve business problems and automate systems.",
        demand: "High",
        demandDetails: "Rapidly growing demand in South African banks, telecom companies, and e-commerce startups.",
        salary: "R400,000 - R1,100,000 per year",
        subjects: ["Pure Mathematics", "Information Technology", "Physical Sciences"],
        tvetPath: "Not typically offered at TVET level; requires strong mathematical foundation.",
        uniPath: "BSc in Data Science, BSc in Mathematical Statistics, or BSc in Computer Science.",
        certifications: "Google Professional Data Engineer, TensorFlow Developer.",
        interests: ["coding", "science"],
        tvetUniversityBridge: false
    },
    {
        id: "mech-eng",
        name: "Mechanical Engineer",
        sector: "Engineering",
        description: "Design, develop, install, and test mechanical components, machinery, engines, and thermodynamic devices.",
        demand: "Critical",
        demandDetails: "High demand in manufacturing, mining, energy production, and the automotive sector (SAPS, BMW, Mercedes-Benz SA).",
        salary: "R320,000 - R950,000 per year",
        subjects: ["Pure Mathematics", "Physical Sciences"],
        tvetPath: "N1 - N6 Mechanical Engineering Studies + 18-24 months work experience -> National N-Diploma.",
        uniPath: "BEng / BSc in Mechanical Engineering, or BTech / Advanced Diploma in Mechanical Engineering.",
        certifications: "ECSA Candidate Registration (Engineering Council of South Africa).",
        interests: ["building", "science"],
        tvetUniversityBridge: true
    },
    {
        id: "elec-eng",
        name: "Electrical Engineer",
        sector: "Engineering",
        description: "Supervise, design, and manage electricity distribution, electrical machinery control systems, and power grids.",
        demand: "Critical",
        demandDetails: "Critical sector gap due to Eskom grid expansion, renewable energy integration, and solar microgrid installations.",
        salary: "R340,000 - R980,000 per year",
        subjects: ["Pure Mathematics", "Physical Sciences"],
        tvetPath: "N1 - N6 Electrical Engineering Studies + Electrical Trade Test (Red Seal).",
        uniPath: "BEng / BSc in Electrical Engineering, or Advanced Diploma / BTech in Electrical Engineering.",
        certifications: "ECSA Candidate Registration, Installation Rules (Wireman's License).",
        interests: ["building", "coding"],
        tvetUniversityBridge: true
    },
    {
        id: "doctor",
        name: "Medical Doctor / General Practitioner",
        sector: "Health",
        description: "Diagnose, treat, and prevent human illnesses, injuries, and health disorders in public and private clinics.",
        demand: "Critical",
        demandDetails: "Severe shortage in rural public hospitals; high demand for primary care specialists.",
        salary: "R600,000 - R1,400,000+ per year",
        subjects: ["Pure Mathematics", "Physical Sciences", "Life Sciences"],
        tvetPath: "None available. Medical studies require university enrollment.",
        uniPath: "MBChB degree (Medicine & Bachelor of Surgery) - 6 years study + 2 years internship + 1 year community service.",
        certifications: "HPCSA registration (Health Professions Council of South Africa).",
        interests: ["people", "science"],
        tvetUniversityBridge: false
    },
    {
        id: "nurse",
        name: "Registered Nurse / Healthcare Specialist",
        sector: "Health",
        description: "Provide nursing care, assist doctors during medical procedures, administer treatments, and manage wards.",
        demand: "Critical",
        demandDetails: "High turnover and vacancy rates in hospitals. Nurses are in massive demand nationally.",
        salary: "R240,000 - R480,000 per year",
        subjects: ["Pure Mathematics", "Life Sciences", "Physical Sciences"],
        tvetPath: "Primary Healthcare certificates (lower tiers).",
        uniPath: "Bachelor of Nursing Science, or Diploma in Nursing (4-year program at accredited nursing college).",
        certifications: "SANC (South African Nursing Council) Registration.",
        interests: ["people", "science"],
        tvetUniversityBridge: true
    },
    {
        id: "chartered-acc",
        name: "Chartered Accountant (CA)",
        sector: "Finance",
        description: "Perform financial audits, strategic tax planning, accounting consulting, and corporate financial oversight.",
        demand: "High",
        demandDetails: "Consistently ranked as one of SA's most secure and high-earning financial careers.",
        salary: "R450,000 - R1,300,000+ per year",
        subjects: ["Pure Mathematics", "Accounting"],
        tvetPath: "N4 - N6 Business Management / Financial Management.",
        uniPath: "Bachelor of Accounting Science (BAccSc) + Postgrad Diploma in Accounting (PGDA) + SAICA Qualifying Board Exams.",
        certifications: "SAICA (South African Institute of Chartered Accountants) registration.",
        interests: ["business", "writing"],
        tvetUniversityBridge: true
    },
    {
        id: "financial-analyst",
        name: "Financial Analyst / Investment Analyst",
        sector: "Finance",
        description: "Analyze market trends, assess investment opportunities, build financial models, and advise corporate portfolios.",
        demand: "High",
        demandDetails: "Strong demand in Johannesburg and Cape Town financial districts (Allan Gray, Ninety One, big banks).",
        salary: "R350,000 - R900,000 per year",
        subjects: ["Pure Mathematics", "Accounting"],
        tvetPath: "N4 - N6 Financial Management.",
        uniPath: "BCom in Finance, BCom in Investment Management, or BSc in Quantitative Finance.",
        certifications: "CFA (Chartered Financial Analyst) Charter holder.",
        interests: ["business", "science"],
        tvetUniversityBridge: true
    },
    {
        id: "solar-tech",
        name: "Solar PV Technician / Electrician",
        sector: "Trades",
        description: "Assemble, install, configure, and repair solar photovoltaic panels and energy storage systems.",
        demand: "Critical",
        demandDetails: "Explosive demand due to grid load shedding and renewable energy switchover in SA.",
        salary: "R180,000 - R420,000 per year",
        subjects: ["Mathematical Literacy", "Information Technology"],
        tvetPath: "N1 - N3 Electrical Engineering or specialized solar PV courses at accredited TVET colleges.",
        uniPath: "Not required. Trade certificates are sufficient.",
        certifications: "SAPVIA PV GreenCard Installer Certification, Wireman's license.",
        interests: ["building", "coding"],
        tvetUniversityBridge: false
    },
    {
        id: "mechanic",
        name: "Automotive Mechanic / Diesel Technician",
        sector: "Trades",
        description: "Inspect, maintain, and repair light cars, commercial diesel trucks, and passenger vehicles.",
        demand: "High",
        demandDetails: "Essential trades sector; critical need in transport logistics, transport operators, and franchise dealerships.",
        salary: "R140,000 - R360,000 per year",
        subjects: ["Mathematical Literacy"],
        tvetPath: "N2 - N3 Motor Trade Theory + Apprenticeship + Trade Test.",
        uniPath: "Not required. Practical apprenticeships are the gold standard.",
        certifications: "MerSETA Trade Certificate (Red Seal Qualification).",
        interests: ["building"],
        tvetUniversityBridge: false
    },
    {
        id: "digital-designer",
        name: "UX/UI & Digital Designer",
        sector: "Tech",
        description: "Design interface flows, visual assets, layouts, and interactive mockups for digital products and websites.",
        demand: "High",
        demandDetails: "Strong growth in software development teams, creative agencies, and remote freelancing marketplaces.",
        salary: "R200,000 - R550,000 per year",
        subjects: ["Visual Arts / Design", "Computer Applications Tech"],
        tvetPath: "Art/Design programs (varies by college).",
        uniPath: "BA in Creative Brand Communication, Bachelor of Design (UX/UI), or BA in Fine Arts.",
        certifications: "Figma Academy Certifications, Google UX Design Professional.",
        interests: ["creative", "coding"],
        tvetUniversityBridge: true
    },
    {
        id: "educator",
        name: "High School Teacher (STEM / Languages)",
        sector: "Trades",
        description: "Educate high school students in specialized subjects, prepare lesson plans, and grade evaluations.",
        demand: "High",
        demandDetails: "Huge demand for Mathematics, Physical Science, and regional indigenous language educators.",
        salary: "R220,000 - R450,000 per year",
        subjects: ["History", "Geography"],
        tvetPath: "None. Requires formal university education.",
        uniPath: "Bachelor of Education (BEd) (4 years), or Bachelor's Degree + PGCE (Postgraduate Certificate in Education).",
        certifications: "SACE (South African Council for Educators) Registration.",
        interests: ["people", "writing"],
        tvetUniversityBridge: false
    }
];

const BURSARY_DB = [
    {
        name: "NSFAS (National Student Financial Aid Scheme)",
        provider: "Department of Higher Education & Training (DHET)",
        coverage: "100% Tuition, accommodation, book allowance, and monthly living stipend.",
        sectors: ["Tech", "Health", "Finance", "Engineering", "Trades"],
        requirements: "Combined household income under R350,000 per year (or under R600,000 for students with disabilities). South African citizen, studying at a public university or public TVET college.",
        link: "https://www.nsfas.org.za"
    },
    {
        name: "ISFAP (Ikusasa Student Financial Aid Programme)",
        provider: "ISFAP Foundation / Corporate Funders",
        coverage: "Tuition fees, accommodation, meals, study material, and active academic/psychosocial support.",
        sectors: ["Tech", "Health", "Finance", "Engineering"],
        requirements: "Targeted at 'missing middle' students (household income between R350,000 and R600,000). Must study accredited high-demand qualifications (e.g. Medicine, Engineering, Actuarial, Computer Science).",
        link: "https://www.isfap.co.za"
    },
    {
        name: "Standard Bank Bursary Programme",
        provider: "Standard Bank Group",
        coverage: "Full tuition, registration, residence accommodation, and computer allowance.",
        sectors: ["Tech", "Finance"],
        requirements: "Min 65% average in Grade 12. Must be studying Commerce, Economics, Information Technology, Computer Science, or Actuarial Science.",
        link: "https://www.standardbank.com"
    },
    {
        name: "Sasol Corporate Bursary Scheme",
        provider: "Sasol Limited",
        coverage: "All tuition, registration fees, accommodation, allowance for books and meals, and vacation work opportunities.",
        sectors: ["Engineering", "Tech"],
        requirements: "Requires 70% in Mathematics, 70% in Physical Sciences, and 60% in English in Matric. Funding for BSc Engineering, BSc Computer Science, and BSc Chemistry.",
        link: "https://www.sasolbursaries.com"
    },
    {
        name: "SETA Sector Education & Training Bursaries",
        provider: "Department of Higher Education (various SETAs e.g., MICTSETA, HWSETA, EWSETA)",
        coverage: "Tuition support, research allowances, and work-integrated learning placement links.",
        sectors: ["Tech", "Engineering", "Trades"],
        requirements: "SA citizens, unemployed youth, studying qualifications relevant to specific SETA sectors (e.g., green tech, electrical, digital marketing).",
        link: "https://www.dhet.gov.za"
    }
];

const OPPORTUNITIES_DB = [
    {
        title: "Apprentice Electrician (Solar Energy Focus)",
        type: "Apprenticeship",
        company: "Rubicon Clean Energy SA",
        stipend: "R5,500 / month",
        location: "Gauteng (Midrand)",
        duration: "36 Months",
        description: "Gain hands-on experience under master electricians. Focuses on commercial solar installation, inverter diagnostics, and smart grid automation. Prepares for the Red Seal trade test."
    },
    {
        title: "Learnership: IT Systems Development (NQF 5)",
        type: "Learnership",
        company: "BCX South Africa",
        stipend: "R4,800 / month",
        location: "Cape Town",
        duration: "12 Months",
        description: "Combination of theoretical classroom training (NQF 5 Systems Development certificate) and practical application. Covers database schemas, software testing, and core web languages."
    },
    {
        title: "Software Engineering Graduate Internship",
        type: "Internship",
        company: "First National Bank (FNB)",
        stipend: "R12,500 / month",
        location: "Johannesburg",
        duration: "12 Months",
        description: "Open to recent graduates holding a Diploma or BSc in Computer Science. Work inside active sprint teams building banking solutions. High likelihood of permanent placement."
    },
    {
        title: "Apprentice Diesel Fitter / Mechanic",
        type: "Apprenticeship",
        company: "Transnet Engineering",
        stipend: "R6,200 / month",
        location: "Durban",
        duration: "48 Months",
        description: "Structured artisan training at Transnet workshops. Focuses on repair and maintenance of massive rail diesel locomotives and heavy machinery. Prepares for red seal trade test."
    },
    {
        title: "Learnership: Wealth Management & Banking",
        type: "Learnership",
        company: "Nedbank Group",
        stipend: "R4,500 / month",
        location: "Gauteng",
        duration: "12 Months",
        description: "Earn a Wealth Management NQF level 5 certification while working in retail branch operations and advisor support. Matric with Maths/MathLit required."
    }
];

const INSTITUTION_DB = {
    accredited: [
        // 26 Public Universities
        { name: "University of Cape Town", type: "University", code: "UCT", status: "Fully Accredited", saqaId: "SAQA-U-UCT" },
        { name: "University of the Witwatersrand", type: "University", code: "WITS", status: "Fully Accredited", saqaId: "SAQA-U-WITS" },
        { name: "University of Johannesburg", type: "University", code: "UJ", status: "Fully Accredited", saqaId: "SAQA-U-UJ" },
        { name: "Tshwane University of Technology", type: "University of Technology", code: "TUT", status: "Fully Accredited", saqaId: "SAQA-U-TUT" },
        { name: "Cape Peninsula University of Technology", type: "University of Technology", code: "CPUT", status: "Fully Accredited", saqaId: "SAQA-U-CPUT" },
        { name: "Central University of Technology", type: "University of Technology", code: "CUT", status: "Fully Accredited", saqaId: "SAQA-U-CUT" },
        { name: "Durban University of Technology", type: "University of Technology", code: "DUT", status: "Fully Accredited", saqaId: "SAQA-U-DUT" },
        { name: "Mangosuthu University of Technology", type: "University of Technology", code: "MUT", status: "Fully Accredited", saqaId: "SAQA-U-MUT" },
        { name: "Nelson Mandela University", type: "Comprehensive University", code: "NMU", status: "Fully Accredited", saqaId: "SAQA-U-NMU" },
        { name: "North-West University", type: "University", code: "NWU", status: "Fully Accredited", saqaId: "SAQA-U-NWU" },
        { name: "Rhodes University", type: "University", code: "RU", status: "Fully Accredited", saqaId: "SAQA-U-RU" },
        { name: "Sefako Makgatho Health Sciences University", type: "Health Sciences University", code: "SMU", status: "Fully Accredited", saqaId: "SAQA-U-SMU" },
        { name: "Sol Plaatje University", type: "University", code: "SPU", status: "Fully Accredited", saqaId: "SAQA-U-SPU" },
        { name: "University of Fort Hare", type: "University", code: "UFH", status: "Fully Accredited", saqaId: "SAQA-U-UFH" },
        { name: "University of KwaZulu-Natal", type: "University", code: "UKZN", status: "Fully Accredited", saqaId: "SAQA-U-UKZN" },
        { name: "University of Limpopo", type: "University", code: "UL", status: "Fully Accredited", saqaId: "SAQA-U-UL" },
        { name: "University of Mpumalanga", type: "University", code: "UMP", status: "Fully Accredited", saqaId: "SAQA-U-UMP" },
        { name: "University of Pretoria", type: "University", code: "UP", status: "Fully Accredited", saqaId: "SAQA-U-UP" },
        { name: "University of South Africa", type: "Comprehensive University (ODL)", code: "UNISA", status: "Fully Accredited", saqaId: "SAQA-U-UNISA" },
        { name: "University of Stellenbosch", type: "University", code: "SUN", status: "Fully Accredited", saqaId: "SAQA-U-SUN" },
        { name: "University of the Free State", type: "University", code: "UFS", status: "Fully Accredited", saqaId: "SAQA-U-UFS" },
        { name: "University of the Western Cape", type: "University", code: "UWC", status: "Fully Accredited", saqaId: "SAQA-U-UWC" },
        { name: "University of Venda", type: "Comprehensive University", code: "UNIVEN", status: "Fully Accredited", saqaId: "SAQA-U-UNIVEN" },
        { name: "University of Zululand", type: "Comprehensive University", code: "UNIZULU", status: "Fully Accredited", saqaId: "SAQA-U-UNIZULU" },
        { name: "Vaal University of Technology", type: "University of Technology", code: "VUT", status: "Fully Accredited", saqaId: "SAQA-U-VUT" },
        { name: "Walter Sisulu University", type: "Comprehensive University", code: "WSU", status: "Fully Accredited", saqaId: "SAQA-U-WSU" },

        // 50 Public TVET Colleges
        // Eastern Cape
        { name: "Port Elizabeth TVET College", type: "Public TVET College", code: "PETVET", status: "Fully Accredited", saqaId: "DHET-TVET-EC-PE" },
        { name: "East Cape Midlands TVET College", type: "Public TVET College", code: "ECMTVET", status: "Fully Accredited", saqaId: "DHET-TVET-EC-ECM" },
        { name: "Buffalo City TVET College", type: "Public TVET College", code: "BCTVET", status: "Fully Accredited", saqaId: "DHET-TVET-EC-BC" },
        { name: "Lovedale TVET College", type: "Public TVET College", code: "LOVEDALE", status: "Fully Accredited", saqaId: "DHET-TVET-EC-LD" },
        { name: "King Sabata Dalindyebo TVET College", type: "Public TVET College", code: "KSDTVET", status: "Fully Accredited", saqaId: "DHET-TVET-EC-KSD" },
        { name: "Ingwe TVET College", type: "Public TVET College", code: "INGWE", status: "Fully Accredited", saqaId: "DHET-TVET-EC-IW" },
        { name: "Ikhala TVET College", type: "Public TVET College", code: "IKHALA", status: "Fully Accredited", saqaId: "DHET-TVET-EC-IK" },
        { name: "King Hintsa TVET College", type: "Public TVET College", code: "KHINTSA", status: "Fully Accredited", saqaId: "DHET-TVET-EC-KH" },
        
        // Free State
        { name: "Goldfields TVET College", type: "Public TVET College", code: "GOLDFIELDS", status: "Fully Accredited", saqaId: "DHET-TVET-FS-GF" },
        { name: "Motheo TVET College", type: "Public TVET College", code: "MOTHEO", status: "Fully Accredited", saqaId: "DHET-TVET-FS-MO" },
        { name: "Maluti TVET College", type: "Public TVET College", code: "MALUTI", status: "Fully Accredited", saqaId: "DHET-TVET-FS-ML" },
        { name: "Flavius Mareka TVET College", type: "Public TVET College", code: "FLAVIUS", status: "Fully Accredited", saqaId: "DHET-TVET-FS-FM" },
        
        // Gauteng
        { name: "Tshwane South TVET College", type: "Public TVET College", code: "TSTVET", status: "Fully Accredited", saqaId: "DHET-TVET-GP-TS" },
        { name: "Tshwane North TVET College", type: "Public TVET College", code: "TNTVET", status: "Fully Accredited", saqaId: "DHET-TVET-GP-TN" },
        { name: "Ekurhuleni West TVET College", type: "Public TVET College", code: "EWTVET", status: "Fully Accredited", saqaId: "DHET-TVET-GP-EW" },
        { name: "Ekurhuleni East TVET College", type: "Public TVET College", code: "EETVET", status: "Fully Accredited", saqaId: "DHET-TVET-GP-EE" },
        { name: "South West Gauteng TVET College", type: "Public TVET College", code: "SWGTVET", status: "Fully Accredited", saqaId: "DHET-TVET-GP-SWG" },
        { name: "Central Johannesburg TVET College", type: "Public TVET College", code: "CJTVET", status: "Fully Accredited", saqaId: "DHET-TVET-GP-CJ" },
        { name: "Western College (Westcol) TVET", type: "Public TVET College", code: "WESTCOL", status: "Fully Accredited", saqaId: "DHET-TVET-GP-WC" },
        { name: "Sedibeng TVET College", type: "Public TVET College", code: "SEDIBENG", status: "Fully Accredited", saqaId: "DHET-TVET-GP-SD" },
        
        // KwaZulu-Natal
        { name: "Mthashana TVET College", type: "Public TVET College", code: "MTHASHANA", status: "Fully Accredited", saqaId: "DHET-TVET-KZN-MS" },
        { name: "Umfolozi TVET College", type: "Public TVET College", code: "UMFOLOZI", status: "Fully Accredited", saqaId: "DHET-TVET-KZN-UF" },
        { name: "Majuba TVET College", type: "Public TVET College", code: "MAJUBA", status: "Fully Accredited", saqaId: "DHET-TVET-KZN-MJ" },
        { name: "Mnambithi TVET College", type: "Public TVET College", code: "MNAMBITHI", status: "Fully Accredited", saqaId: "DHET-TVET-KZN-MN" },
        { name: "Elangeni TVET College", type: "Public TVET College", code: "ELANGENI", status: "Fully Accredited", saqaId: "DHET-TVET-KZN-EL" },
        { name: "Coastal KZN TVET College", type: "Public TVET College", code: "COASTAL", status: "Fully Accredited", saqaId: "DHET-TVET-KZN-CK" },
        { name: "Thekwini TVET College", type: "Public TVET College", code: "THEKWINI", status: "Fully Accredited", saqaId: "DHET-TVET-KZN-TK" },
        { name: "Umgungundlovu TVET College", type: "Public TVET College", code: "UMGUNGUNDLOVU", status: "Fully Accredited", saqaId: "DHET-TVET-KZN-UM" },
        { name: "Esayidi TVET College", type: "Public TVET College", code: "ESAYIDI", status: "Fully Accredited", saqaId: "DHET-TVET-KZN-ES" },
        
        // Limpopo
        { name: "Lephalale TVET College", type: "Public TVET College", code: "LEPHALALE", status: "Fully Accredited", saqaId: "DHET-TVET-LP-LP" },
        { name: "Capricorn TVET College", type: "Public TVET College", code: "CAPRICORN", status: "Fully Accredited", saqaId: "DHET-TVET-LP-CP" },
        { name: "Waterberg TVET College", type: "Public TVET College", code: "WATERBERG", status: "Fully Accredited", saqaId: "DHET-TVET-LP-WB" },
        { name: "Vhembe TVET College", type: "Public TVET College", code: "VHEMBE", status: "Fully Accredited", saqaId: "DHET-TVET-LP-VH" },
        { name: "Mopani South East TVET College", type: "Public TVET College", code: "MOPANI", status: "Fully Accredited", saqaId: "DHET-TVET-LP-MP" },
        { name: "Letaba TVET College", type: "Public TVET College", code: "LETABA", status: "Fully Accredited", saqaId: "DHET-TVET-LP-LT" },
        { name: "Sekhukhune TVET College", type: "Public TVET College", code: "SEKHUKHUNE", status: "Fully Accredited", saqaId: "DHET-TVET-LP-SK" },
        
        // Mpumalanga
        { name: "Ehlanzeni TVET College", type: "Public TVET College", code: "EHLANZENI", status: "Fully Accredited", saqaId: "DHET-TVET-MP-EH" },
        { name: "Nkangala TVET College", type: "Public TVET College", code: "NKANGALA", status: "Fully Accredited", saqaId: "DHET-TVET-MP-NK" },
        { name: "Gert Sibande TVET College", type: "Public TVET College", code: "GERT", status: "Fully Accredited", saqaId: "DHET-TVET-MP-GS" },
        
        // Northern Cape
        { name: "Northern Cape Urban TVET College", type: "Public TVET College", code: "NCURBAN", status: "Fully Accredited", saqaId: "DHET-TVET-NC-NCU" },
        { name: "Northern Cape Rural TVET College", type: "Public TVET College", code: "NCRURAL", status: "Fully Accredited", saqaId: "DHET-TVET-NC-NCR" },
        
        // North West
        { name: "Taletso TVET College", type: "Public TVET College", code: "TALETSO", status: "Fully Accredited", saqaId: "DHET-TVET-NW-TL" },
        { name: "Vuselela TVET College", type: "Public TVET College", code: "VUSELELA", status: "Fully Accredited", saqaId: "DHET-TVET-NW-VS" },
        { name: "Orbit TVET College", type: "Public TVET College", code: "ORBIT", status: "Fully Accredited", saqaId: "DHET-TVET-NW-OB" },
        
        // Western Cape
        { name: "West Coast TVET College", type: "Public TVET College", code: "WESTCOAST", status: "Fully Accredited", saqaId: "DHET-TVET-WC-WC" },
        { name: "Boland TVET College", type: "Public TVET College", code: "BOLAND", status: "Fully Accredited", saqaId: "DHET-TVET-WC-BL" },
        { name: "South Cape TVET College", type: "Public TVET College", code: "SOUTHCAPE", status: "Fully Accredited", saqaId: "DHET-TVET-WC-SC" },
        { name: "Northlink TVET College", type: "Public TVET College", code: "NORTHLINK", status: "Fully Accredited", saqaId: "DHET-TVET-WC-NL" },
        { name: "College of Cape Town TVET", type: "Public TVET College", code: "CCTTVET", status: "Fully Accredited", saqaId: "DHET-TVET-WC-CCT" },
        { name: "False Bay TVET College", type: "Public TVET College", code: "FALSEBAY", status: "Fully Accredited", saqaId: "DHET-TVET-WC-FB" },

        // Selected accredited private institutions
        { name: "Damelin College", type: "Private College (Selected Programs)", code: "DAM", status: "Accredited (With program restrictions, check registration certificate)", saqaId: "SAQA-REG-74" },
        { name: "Varsity College", type: "Private Higher Education Institution", code: "VC", status: "Fully Accredited", saqaId: "SAQA-REG-52" },
        { name: "Richfield Graduate Institute", type: "Private HE Institution", code: "RICH", status: "Fully Accredited", saqaId: "SAQA-REG-98" }
    ],
    unaccredited: [
        { name: "Fake SA College", type: "Private Academy", code: "FSA", status: "UNACCREDITED", warningCode: "LOW-VALUE-FLAG", details: "This institution is not registered with the DHET or SAQA. Degrees awarded here will not be recognized in the South African jobs market or for credit transfers." },
        { name: "Apex Institute of Africa", type: "Online Diploma Provider", code: "APX", status: "UNACCREDITED", warningCode: "LOW-VALUE-FLAG", details: "Currently operating without a valid Council on Higher Education (CHE) program registration. Listed on DHET bogus college alerts." },
        { name: "Central Durban University of Technology", type: "Bogus University", code: "CDUT", status: "BOGUS INSTITUTION", warningCode: "CRITICAL-SCAM-FLAG", details: "Deliberately using a name similar to Durban University of Technology (DUT) to mislead matriculants. Completely unaccredited." }
    ]
};


// 2. APP STATE & LOCALSTORAGE (SSO SIMULATION)
let studentProfile = {
    name: "Ntsako Ngobeni",
    level: "Grade 12",
    province: "Gauteng",
    loggedSubjects: ["English Home Language", "Life Orientation"], // compulsory
    interests: []
};

// Check for existing profile in LocalStorage
function loadProfileFromSSO() {
    const saved = localStorage.getItem("PATHWAY_SSO_PROFILE");
    if (saved) {
        studentProfile = JSON.parse(saved);
    } else {
        localStorage.setItem("PATHWAY_SSO_PROFILE", JSON.stringify(studentProfile));
    }
    updateSSOVisualState();
}

function updateSSOVisualState() {
    // Update sidebar profile
    document.getElementById("profile-name-display").textContent = studentProfile.name;
    document.getElementById("profile-avatar").textContent = studentProfile.name.charAt(0);
    
    // Update dashboard statistics
    const subjectCount = studentProfile.loggedSubjects.length;
    document.getElementById("dash-subjects-val").textContent = `${subjectCount} / 7`;
    
    // Calculate profile completeness score
    let score = 20; // Default status
    if (studentProfile.loggedSubjects.length > 2) score += 40;
    if (studentProfile.interests.length > 0) score += 20;
    if (studentProfile.name !== "Guest Student") score += 20;
    
    document.getElementById("dash-completion-val").textContent = `${score}%`;
    document.getElementById("dash-completion-bar").style.width = `${score}%`;
    
    // Display JWT SSO Token
    const jwtHeader = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const jwtPayload = btoa(JSON.stringify({
        sub: studentProfile.name,
        level: studentProfile.level,
        prov: studentProfile.province,
        subjects: studentProfile.loggedSubjects,
        interests: studentProfile.interests,
        iss: "pathway.co.za",
        exp: Math.floor(Date.now() / 1000) + 3600
    }));
    const signature = "SIGNATURE_HASH";
    const generatedToken = `${jwtHeader}.${jwtPayload}.${signature}`;
    
    document.getElementById("sso-token-display").textContent = generatedToken;
}


// 3. NAVIGATION / ROUTER
const navItems = document.querySelectorAll(".nav-item");
const panels = document.querySelectorAll(".content-panel");

navItems.forEach(item => {
    item.addEventListener("click", () => {
        const target = item.getAttribute("data-target");
        
        // Update active nav class
        navItems.forEach(n => n.classList.remove("active"));
        item.classList.add("active");
        
        // Show corresponding panel
        panels.forEach(panel => {
            panel.classList.remove("active");
            if (panel.id === target) {
                panel.classList.add("active");
            }
        });

        // Trigger dynamic rendering based on active tab
        if (target === "explorer") {
            renderExplorerCards();
        } else if (target === "funding") {
            renderBursaryList();
        } else if (target === "opportunities") {
            renderOpportunitiesList();
        }
    });
});


// 4. CHART.JS VISUALIZATION (ECONOMIC TREND FORECASTING)
let trendsChartInstance = null;

const SECTOR_TREND_DATA = {
    all: {
        labels: ["2026", "2028", "2030", "2032", "2034", "2036"],
        datasets: [
            { label: "Technology & ICT", data: [12, 28, 48, 72, 95, 120], borderColor: "#00F2FE", backgroundColor: "rgba(0, 242, 254, 0.05)", fill: true },
            { label: "Green Energy & Solar", data: [25, 55, 90, 115, 130, 145], borderColor: "#38EF7D", backgroundColor: "rgba(56, 239, 125, 0.05)", fill: true },
            { label: "Healthcare & Biotech", data: [8, 14, 25, 38, 52, 65], borderColor: "#E100FF", backgroundColor: "rgba(225, 0, 255, 0.05)", fill: true },
            { label: "Engineering Studies", data: [5, 12, 19, 28, 38, 48], borderColor: "#3B82F6", backgroundColor: "rgba(59, 130, 246, 0.05)", fill: true }
        ],
        insight: "Green Energy and Technology lead growth sectors, with solar expansion and AI integrations driving immediate job vacancies."
    },
    technology: {
        labels: ["2026", "2028", "2030", "2032", "2034", "2036"],
        datasets: [{ label: "Tech Job Vacancies (Index)", data: [100, 140, 210, 310, 440, 580], borderColor: "#00F2FE", backgroundColor: "rgba(0, 242, 254, 0.1)", fill: true }],
        insight: "Software Development, Cloud Architecture, and Data Science will see a 480% vacancy index expansion by 2036."
    },
    engineering: {
        labels: ["2026", "2028", "2030", "2032", "2034", "2036"],
        datasets: [{ label: "Engineering Growth Index", data: [100, 115, 132, 155, 185, 220], borderColor: "#3B82F6", backgroundColor: "rgba(59, 130, 246, 0.1)", fill: true }],
        insight: "Infrastructure maintenance, clean water grid designs, and automotive production upgrades drive civil and mechanical demand."
    },
    healthcare: {
        labels: ["2026", "2028", "2030", "2032", "2034", "2036"],
        datasets: [{ label: "Healthcare Workforce Needs", data: [100, 120, 145, 178, 215, 260], borderColor: "#E100FF", backgroundColor: "rgba(225, 0, 255, 0.1)", fill: true }],
        insight: "National Health Insurance (NHI) implementation will double demand for registered nurses and primary care practitioners."
    },
    finance: {
        labels: ["2026", "2028", "2030", "2032", "2034", "2036"],
        datasets: [{ label: "Financial Services Demand", data: [100, 110, 125, 142, 165, 190], borderColor: "#F59E0B", backgroundColor: "rgba(245, 158, 11, 0.1)", fill: true }],
        insight: "Fintech startups and regulatory compliance drive consistent demand for Chartered Accountants and Financial Auditors."
    },
    green: {
        labels: ["2026", "2028", "2030", "2032", "2034", "2036"],
        datasets: [{ label: "Solar & Wind Installers (Growth %)", data: [100, 190, 310, 420, 510, 590], borderColor: "#38EF7D", backgroundColor: "rgba(56, 239, 125, 0.1)", fill: true }],
        insight: "Private microgrid investments and Eskom wind/solar connection bridges create massive artisan and technician roles."
    }
};

function initializeTrendsChart(sectorKey = "all") {
    const ctx = document.getElementById("trendsChart").getContext("2d");
    const dataConfig = SECTOR_TREND_DATA[sectorKey];

    if (trendsChartInstance) {
        trendsChartInstance.destroy();
    }

    trendsChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataConfig.labels,
            datasets: dataConfig.datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#F3F4F6', font: { family: 'Outfit', size: 12 } }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#9CA3AF', font: { family: 'Outfit' } }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#9CA3AF', font: { family: 'Outfit' } }
                }
            }
        }
    });

    // Update insights panel
    document.getElementById("trend-insights-box").innerHTML = `
        <div class="insight-item">
            <span class="insight-badge high">Insight</span>
            <p>${dataConfig.insight}</p>
        </div>
    `;
}

// Chart Dropdown Selector
document.getElementById("trend-sector-select").addEventListener("change", (e) => {
    initializeTrendsChart(e.target.value);
});


// 5. SUBJECT-TO-CAREER MATCHER SYSTEM
const subjectCheckboxes = document.querySelectorAll('.subject-checkbox-card input[type="checkbox"]');
const interestButtons = document.querySelectorAll(".interest-btn");

// Subject select event styling
subjectCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        const card = checkbox.closest(".subject-checkbox-card");
        if (checkbox.checked) {
            card.classList.add("selected");
        } else {
            card.classList.remove("selected");
        }
        recalculateCareerMatches();
    });
});

// Interest click event styling
interestButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("selected");
        recalculateCareerMatches();
    });
});

function getSelectedSubjects() {
    const list = ["English Home Language", "Life Orientation"]; // always compulsory
    subjectCheckboxes.forEach(box => {
        if (box.checked && box.id !== "sub-english" && box.id !== "sub-lo") {
            // Map element IDs to database terminology
            let label = "";
            if (box.id === "sub-maths") label = "Pure Mathematics";
            else if (box.id === "sub-mathlit") label = "Mathematical Literacy";
            else if (box.id === "sub-physics") label = "Physical Sciences";
            else if (box.id === "sub-lifesci") label = "Life Sciences";
            else if (box.id === "sub-it") label = "Information Technology";
            else if (box.id === "sub-cat") label = "Computer Applications Tech";
            else if (box.id === "sub-acc") label = "Accounting";
            else if (box.id === "sub-history") label = "History";
            else if (box.id === "sub-geography") label = "Geography";
            else if (box.id === "sub-art") label = "Visual Arts / Design";
            
            if (label) list.push(label);
        }
    });
    return list;
}

function getSelectedInterests() {
    const list = [];
    interestButtons.forEach(btn => {
        if (btn.classList.contains("selected")) {
            list.push(btn.getAttribute("data-interest"));
        }
    });
    return list;
}

function recalculateCareerMatches() {
    const selectedSubs = getSelectedSubjects();
    const selectedInts = getSelectedInterests();
    
    // Update local profile and sync with SSO
    studentProfile.loggedSubjects = selectedSubs;
    studentProfile.interests = selectedInts;
    localStorage.setItem("PATHWAY_SSO_PROFILE", JSON.stringify(studentProfile));
    updateSSOVisualState();
    
    const resultsContainer = document.getElementById("matcher-results-list");
    resultsContainer.innerHTML = "";
    
    let scores = [];
    
    CAREER_DB.forEach(career => {
        let score = 0;
        let requirementsMetCount = 0;
        
        // Subject calculations
        career.subjects.forEach(sub => {
            if (selectedSubs.includes(sub)) {
                requirementsMetCount++;
            }
        });
        
        // Math requirements lock logic (Pure Math vs Math Lit)
        let mathLockout = false;
        if (career.subjects.includes("Pure Mathematics") && selectedSubs.includes("Mathematical Literacy")) {
            mathLockout = true;
        }
        
        // Base match ratio
        let subScorePart = (requirementsMetCount / career.subjects.length) * 50;
        
        // Interest match ratio
        let interestScorePart = 0;
        let matchingInterests = 0;
        career.interests.forEach(interest => {
            if (selectedInts.includes(interest)) {
                matchingInterests++;
            }
        });
        if (career.interests.length > 0) {
            interestScorePart = (matchingInterests / career.interests.length) * 50;
        } else {
            interestScorePart = 50; // default if no interests specified
        }
        
        score = Math.round(subScorePart + interestScorePart);
        
        // Math lockout caps
        if (mathLockout) {
            score = Math.min(score, 50); // Hard cap for university math requirements
        }
        
        scores.push({ career, score, mathLockout });
    });
    
    // Sort scores descending
    scores.sort((a, b) => b.score - a.score);
    
    // Update dashboard recommendation based on top match
    if (scores.length > 0 && (selectedSubs.length > 2 || selectedInts.length > 0)) {
        const topMatch = scores[0];
        document.getElementById("dash-recommend-val").textContent = topMatch.career.name;
        document.getElementById("dash-recommend-sub").textContent = `Match Score: ${topMatch.score}% (${topMatch.career.sector} Cluster)`;
    } else {
        document.getElementById("dash-recommend-val").textContent = "None Yet";
        document.getElementById("dash-recommend-sub").textContent = "Use matcher to compute score";
    }
    
    // Render results
    if (selectedSubs.length <= 2 && selectedInts.length === 0) {
        resultsContainer.innerHTML = `
            <div class="empty-state-text">
                <p>Select subjects and interest tags to see your scoring matchups.</p>
            </div>
        `;
        return;
    }
    
    scores.forEach(item => {
        let fitLabel = "Low Fit";
        let fitClass = "low-fit";
        if (item.score >= 80) {
            fitLabel = "Excellent Fit";
            fitClass = "high-fit";
        } else if (item.score >= 50) {
            fitLabel = "Moderate Fit";
            fitClass = "mod-fit";
        }
        
        const card = document.createElement("div");
        card.className = "match-item-card";
        card.innerHTML = `
            <div class="match-item-details">
                <span class="match-title">${item.career.name}</span>
                <span class="match-sector">${item.career.sector} | Demand: ${item.career.demand}</span>
                <span class="match-requirements">Requires: ${item.career.subjects.join(", ")}</span>
                ${item.mathLockout ? '<span class="match-requirements" style="color: #EF4444; font-weight: 500;">⚠️ Requires Pure Mathematics for university entry.</span>' : ''}
            </div>
            <div class="match-score-badge">
                <span class="score-number ${fitClass}">${item.score}%</span>
                <span class="score-label">${fitLabel}</span>
            </div>
        `;
        
        card.addEventListener("click", () => {
            // Switch tab to Explorer and filter to this career or search it
            document.querySelector('[data-target="explorer"]').click();
            document.getElementById("global-search").value = item.career.name;
            renderExplorerCards(item.career.name);
        });
        
        resultsContainer.appendChild(card);
    });
}


// 6. CAREER EXPLORER RENDERING
const explorerContainer = document.getElementById("explorer-cards-container");
const filterSector = document.getElementById("filter-sector");
const filterDemand = document.getElementById("filter-demand");

filterSector.addEventListener("change", () => renderExplorerCards());
filterDemand.addEventListener("change", () => renderExplorerCards());

function renderExplorerCards(searchQuery = "") {
    explorerContainer.innerHTML = "";
    const sectorVal = filterSector.value;
    const demandVal = filterDemand.value;
    
    const filtered = CAREER_DB.filter(c => {
        // Sector filter
        if (sectorVal !== "all" && c.sector !== sectorVal) return false;
        
        // Demand filter
        if (demandVal !== "all" && c.demand !== demandVal) return false;
        
        // Search query
        if (searchQuery !== "") {
            return c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                   c.description.toLowerCase().includes(searchQuery.toLowerCase());
        }
        
        return true;
    });
    
    if (filtered.length === 0) {
        explorerContainer.innerHTML = `
            <div class="empty-state-text" style="grid-column: span 3;">
                <p>No career paths found matching the specified filters.</p>
            </div>
        `;
        return;
    }
    
    filtered.forEach(c => {
        const card = document.createElement("div");
        card.className = "career-card";
        
        let demandClass = "moderate";
        if (c.demand === "Critical") demandClass = "critical";
        else if (c.demand === "High") demandClass = "high";
        
        card.innerHTML = `
            <div>
                <div class="career-header-row">
                    <span class="career-sector-tag">${c.sector}</span>
                    <span class="career-demand-badge ${demandClass}">${c.demand} Demand</span>
                </div>
                <h3>${c.name}</h3>
                <p class="career-description">${c.description}</p>
                <div class="career-details-list">
                    <div class="c-detail">
                        <span>Salary Benchmark:</span>
                        <span>${c.salary}</span>
                    </div>
                    <div class="c-detail">
                        <span>School Subjects:</span>
                        <span>${c.subjects.join(", ")}</span>
                    </div>
                </div>
            </div>
            <div class="career-card-actions">
                <button class="btn btn-secondary btn-full-width btn-explore-pathway" data-id="${c.id}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    View Details
                </button>
            </div>
        `;
        
        // Detail viewer click
        card.querySelector(".btn-explore-pathway").addEventListener("click", () => {
            showCareerDetailsModal(c);
        });
        
        explorerContainer.appendChild(card);
    });
}

function showCareerDetailsModal(career) {
    // Generate detail markup and trigger simulated AI prompt or details pop-up.
    // For premium experience, let's open details in a modular modal or route to Claude Assistant asking about this career.
    const confirmAsk = confirm(`Would you like to open the Claude Career Assistant to ask details about: "${career.name}"?`);
    if (confirmAsk) {
        document.querySelector('[data-target="chat"]').click();
        triggerClaudeQuery(`Explain the complete study roadmap, average SA salaries, and NSFAS funding details for becoming a: ${career.name}`);
    }
}


// 7. FUNDING & BURSARY CHECKER ENGINE
const nsfasForm = document.getElementById("nsfas-form");
const nsfasResultBox = document.getElementById("nsfas-result-box");

nsfasForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const income = document.getElementById("nsfas-income").value;
    const citizen = document.getElementById("nsfas-citizen").value;
    const institution = document.getElementById("nsfas-institution").value;
    
    nsfasResultBox.classList.remove("hidden", "success", "warning", "danger");
    
    if (citizen === "no") {
        nsfasResultBox.classList.add("danger");
        nsfasResultBox.innerHTML = `
            <div class="res-header">❌ Diagnostic Outcome: Ineligible</div>
            <div class="res-body">NSFAS only funds South African citizens and Permanent Residents. However, you can look for international scholarships or corporate private grants in our bursaries tab.</div>
        `;
        return;
    }
    
    if (institution === "private") {
        nsfasResultBox.classList.add("warning");
        nsfasResultBox.innerHTML = `
            <div class="res-header">⚠️ Warning: Limited Funding</div>
            <div class="res-body">NSFAS does not fund students registered at private colleges or private universities. You must register at one of the 26 public SA universities or 50 public TVET colleges to secure NSFAS funding.</div>
        `;
        return;
    }
    
    if (income === "over350") {
        nsfasResultBox.classList.add("warning");
        nsfasResultBox.innerHTML = `
            <div class="res-header">⚠️ Missing Middle Status</div>
            <div class="res-body">Your household income exceeds the R350,000 threshold. You do not qualify for standard NSFAS funding, but you are categorized as "Missing Middle". We highly recommend applying for **ISFAP funding** or corporate bursaries listed in the database.</div>
        `;
    } else {
        nsfasResultBox.classList.add("success");
        nsfasResultBox.innerHTML = `
            <div class="res-header">✅ Provisionally Eligible</div>
            <div class="res-body">Based on your household income and citizenship, you satisfy the baseline criteria for NSFAS. Make sure to submit certified copies of parent IDs, proof of income/SASSA grant documentation, and your matric certificate upon application opening.</div>
        `;
    }
});

// Render Bursary List
const searchBursaryInput = document.getElementById("search-bursary");
searchBursaryInput.addEventListener("input", () => renderBursaryList());

function renderBursaryList() {
    const container = document.getElementById("bursary-list-container");
    container.innerHTML = "";
    
    const query = searchBursaryInput.value.toLowerCase();
    
    const filtered = BURSARY_DB.filter(b => {
        return b.name.toLowerCase().includes(query) || 
               b.provider.toLowerCase().includes(query) || 
               b.requirements.toLowerCase().includes(query);
    });
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state-text">
                <p>No bursary matches found in database.</p>
            </div>
        `;
        return;
    }
    
    filtered.forEach(b => {
        const item = document.createElement("div");
        item.className = "bursary-item";
        item.innerHTML = `
            <div class="bursary-details">
                <span class="bursary-name">${b.name}</span>
                <span class="bursary-provider">Provided by: ${b.provider}</span>
                <span class="bursary-coverage">Coverage: ${b.coverage}</span>
                <span class="bursary-requirements">Academic Criteria: ${b.requirements}</span>
            </div>
            <a href="${b.link}" target="_blank" class="btn btn-secondary btn-sm" style="padding: 6px 12px; font-size: 0.75rem;">
                Apply External
            </a>
        `;
        container.appendChild(item);
    });
}


// 8. WORK-BASED OPPORTUNITIES LIST
function renderOpportunitiesList(filterType = "all") {
    const container = document.getElementById("opportunities-container");
    container.innerHTML = "";
    
    const filtered = OPPORTUNITIES_DB.filter(op => {
        if (filterType !== "all" && op.type !== filterType) return false;
        return true;
    });
    
    filtered.forEach(op => {
        const card = document.createElement("div");
        card.className = "opportunity-card";
        
        let typeClass = "internship";
        if (op.type === "Apprenticeship") typeClass = "apprenticeship";
        else if (op.type === "Learnership") typeClass = "learnership";
        
        card.innerHTML = `
            <div>
                <div class="op-header">
                    <span class="op-type-tag ${typeClass}">${op.type}</span>
                    <span class="op-duration">${op.duration}</span>
                </div>
                <h4>${op.title}</h4>
                <p class="op-company">${op.company}</p>
                <p class="op-description">${op.description}</p>
            </div>
            <div>
                <div class="op-footer-details">
                    <span class="op-stipend">${op.stipend}</span>
                    <span class="op-location">📍 ${op.location}</span>
                </div>
                <button class="btn btn-primary btn-full-width btn-apply-op">
                    Submit SSO Profile Apply
                </button>
            </div>
        `;
        
        card.querySelector(".btn-apply-op").addEventListener("click", () => {
            alert(`Application Submitted! Linked your SSO profile data (${studentProfile.name}, Grade: ${studentProfile.level}) to ${op.company}.`);
        });
        
        container.appendChild(card);
    });
}

// Op Filter events
const opFilterBtns = document.querySelectorAll(".ops-filter-btn");
opFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        opFilterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderOpportunitiesList(btn.getAttribute("data-type"));
    });
});


// 9. RPL PATHWAY MAPPER VISUALIZATION
const btnMapRpl = document.getElementById("btn-map-rpl");
const rplDiagramBox = document.getElementById("rpl-diagram-box");

btnMapRpl.addEventListener("click", () => {
    const field = document.getElementById("rpl-tvet-course").value;
    
    if (!field) {
        alert("Please select a TVET field first.");
        return;
    }
    
    rplDiagramBox.innerHTML = "";
    
    let pathInfo = {
        startTitle: "",
        startDesc: "",
        bridgeTitle: "",
        bridgeDesc: "",
        endTitle: "",
        endDesc: ""
    };
    
    if (field === "mech") {
        pathInfo = {
            startTitle: "TVET N4 - N6 Mechanical",
            startDesc: "Study mechanical theory, fluid mechanics, and drawings.",
            bridgeTitle: "Trade Test / Work Experience",
            bridgeDesc: "18-24 months work logging + Red Seal trade test (Artisan qualification).",
            endTitle: "BEng Tech (University)",
            endDesc: "Exemptions for Engineering Mathematics and drawings. Direct entry to Advanced Diploma."
        };
    } else if (field === "elec") {
        pathInfo = {
            startTitle: "TVET N4 - N6 Electrical",
            startDesc: "Electrical theory, industrial electronics, logic systems.",
            bridgeTitle: "Wireman's & Red Seal Test",
            bridgeDesc: "Register as candidate electrician + trade installation verification cert.",
            endTitle: "BTech / Adv. Diploma",
            endDesc: "Transition to university of technology degree. Exemption for electronics credits."
        };
    } else if (field === "business") {
        pathInfo = {
            startTitle: "TVET N6 Business Admin",
            startDesc: "Management theory, personnel logs, public relations studies.",
            bridgeTitle: "18-Month Internship",
            bridgeDesc: "SETA-aligned internship placement logs in commercial firms.",
            endTitle: "BCom Management Bridge",
            endDesc: "Articulation to 2nd year BCom degrees at selected universities of technology."
        };
    } else if (field === "hospitality") {
        pathInfo = {
            startTitle: "TVET N6 Catering Studies",
            startDesc: "Nutrition, food prep, catering theory, cost checks.",
            bridgeTitle: "Practical Work Log",
            bridgeDesc: "Kitchen and restaurant operations logging under chef guidance.",
            endTitle: "Diploma in Food Tech",
            endDesc: "Exemptions for food science fundamentals at universities of technology."
        };
    }
    
    rplDiagramBox.innerHTML = `
        <div class="rpl-flowchart">
            <div class="rpl-node tvet">
                <div class="rpl-node-title">${pathInfo.startTitle}</div>
                <div class="rpl-node-desc">${pathInfo.startDesc}</div>
            </div>
            
            <div class="rpl-arrow-line"></div>
            
            <div class="rpl-node bridge">
                <div class="rpl-node-title">${pathInfo.bridgeTitle}</div>
                <div class="rpl-node-desc">${pathInfo.bridgeDesc}</div>
            </div>
            
            <div class="rpl-arrow-line"></div>
            
            <div class="rpl-node university">
                <div class="rpl-node-title">${pathInfo.endTitle}</div>
                <div class="rpl-node-desc">${pathInfo.endDesc}</div>
            </div>
        </div>
    `;
});


// 10. COURSE VALIDATOR ENGINE
const btnValidate = document.getElementById("btn-validate-course");
const valResultBox = document.getElementById("validator-results-box");

btnValidate.addEventListener("click", () => {
    const institution = document.getElementById("val-institution-name").value.trim();
    const qualification = document.getElementById("val-qualification-name").value.trim();
    
    if (!institution || !qualification) {
        alert("Please fill in both the institution and qualification fields.");
        return;
    }
    
    valResultBox.innerHTML = "";
    
    // Check unaccredited DB first (exact or partial name match)
    const isUnaccredited = INSTITUTION_DB.unaccredited.find(item => {
        return institution.toLowerCase().includes(item.name.toLowerCase()) || 
               item.name.toLowerCase().includes(institution.toLowerCase());
    });
    
    // Check accredited DB
    const isAccredited = INSTITUTION_DB.accredited.find(item => {
        return institution.toLowerCase().includes(item.name.toLowerCase()) || 
               item.name.toLowerCase().includes(institution.toLowerCase());
    });
    
    if (isUnaccredited) {
        valResultBox.innerHTML = `
            <div class="v-result-container">
                <div class="v-result-badge invalid">
                    <span class="v-result-icon">⚠️</span>
                    <div>
                        <div class="v-result-title">WARNING: Unaccredited Institution</div>
                        <div class="v-result-sub">DHET Registry Status: ${isUnaccredited.status}</div>
                    </div>
                </div>
                <div class="v-details-box">
                    <h4>Accreditation Diagnostic Reports</h4>
                    <p class="card-sub" style="color: #EF4444; margin-bottom: 12px; font-weight: 500;">Warning Code: ${isUnaccredited.warningCode}</p>
                    <p style="font-size: 0.85rem; line-height: 1.4; color: var(--text-muted);">${isUnaccredited.details}</p>
                </div>
            </div>
        `;
    } else if (isAccredited) {
        valResultBox.innerHTML = `
            <div class="v-result-container">
                <div class="v-result-badge valid">
                    <span class="v-result-icon">✓</span>
                    <div>
                        <div class="v-result-title">Accredited Institution</div>
                        <div class="v-result-sub">DHET Registry Status: ${isAccredited.status}</div>
                    </div>
                </div>
                <div class="v-details-box">
                    <h4>Accreditation Registry Specifications</h4>
                    <div class="v-details-list">
                        <div class="vd-row">
                            <span>SAQA Registered ID</span>
                            <span>${isAccredited.saqaId}</span>
                        </div>
                        <div class="vd-row">
                            <span>Institution Type</span>
                            <span>${isAccredited.type}</span>
                        </div>
                        <div class="vd-row">
                            <span>Code Reference</span>
                            <span>${isAccredited.code}</span>
                        </div>
                        <div class="vd-row">
                            <span>Validation Status</span>
                            <span style="color: #10B981;">Valid & Registered</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Fallback: Default warning about checking accreditation manually
        valResultBox.innerHTML = `
            <div class="v-result-container">
                <div class="v-result-badge invalid" style="background: rgba(245,158,11,0.08); border-color: rgba(245,158,11,0.25); color: #F59E0B;">
                    <span class="v-result-icon">❓</span>
                    <div>
                        <div class="v-result-title">Verification Pending / Unlisted</div>
                        <div class="v-result-sub">Could not locate "${institution}" in our primary DHET database.</div>
                    </div>
                </div>
                <div class="v-details-box">
                    <h4>Accreditation Warning Instructions</h4>
                    <p style="font-size: 0.85rem; line-height: 1.4; color: var(--text-muted); margin-bottom: 12px;">
                        Before registering or paying fees, protect yourself:
                    </p>
                    <ol style="font-size: 0.82rem; color: var(--text-muted); padding-left: 20px; line-height: 1.5;">
                        <li>Verify if they have a physical registered campus.</li>
                        <li>Ask the institution for their <strong>DHET Registration Number</strong> and their specific <strong>SAQA Qualification ID</strong>.</li>
                        <li>Verify this ID directly on the SAQA database (saqa.org.za).</li>
                    </ol>
                </div>
            </div>
        `;
    }
});


// 11. CLAUDE AI ASSISTANT SIMULATOR
const btnSendChat = document.getElementById("btn-chat-send");
const chatInputText = document.getElementById("chat-input-text");
const chatMessagesBox = document.getElementById("chat-messages-box");
const promptPills = document.querySelectorAll(".prompt-pill");

btnSendChat.addEventListener("click", () => {
    const query = chatInputText.value.trim();
    if (query) {
        submitUserChat(query);
    }
});

chatInputText.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const query = chatInputText.value.trim();
        if (query) {
            submitUserChat(query);
        }
    }
});

promptPills.forEach(pill => {
    pill.addEventListener("click", () => {
        const query = pill.getAttribute("data-query");
        submitUserChat(query);
    });
});

function submitUserChat(query) {
    // Append User message
    appendChatMessage(query, "user");
    chatInputText.value = "";
    
    // Scroll to bottom
    chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;
    
    // Add typing indicator
    const typingElement = document.createElement("div");
    typingElement.className = "chat-message bot typing-indicator-msg";
    typingElement.innerHTML = `
        <div class="message-content">
            <div class="typing-indicator">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        </div>
    `;
    chatMessagesBox.appendChild(typingElement);
    chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;
    
    // Delay bot response to simulate Claude API latency
    setTimeout(() => {
        // Remove typing indicator
        const typingMsg = chatMessagesBox.querySelector(".typing-indicator-msg");
        if (typingMsg) typingMsg.remove();
        
        const responseText = generateClaudeResponse(query);
        appendChatMessage(responseText, "bot");
        chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;
    }, 1200);
}

function triggerClaudeQuery(query) {
    submitUserChat(query);
}

function appendChatMessage(text, sender) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msg = document.createElement("div");
    msg.className = `chat-message ${sender}`;
    msg.innerHTML = `
        <div class="message-content">
            <p>${text.replace(/\n/g, '<br>')}</p>
        </div>
        <span class="message-time">${time}</span>
    `;
    chatMessagesBox.appendChild(msg);
}

function generateClaudeResponse(query) {
    const q = query.toLowerCase();
    
    if (q.includes("tvet to beng") || q.includes("tvet college to a university") || q.includes("tvet") && q.includes("university")) {
        return `Aweh! The transition from a TVET college to a university engineering degree (like a BEng or BTech) is a popular articulation pathway in South Africa:
        
        1. **Complete your N-Diploma**: You must complete your N4, N5, and N6 Engineering Certificates, followed by 18 to 24 months of verified practical experience, yielding your National N-Diploma (NQF Level 6).
        2. **University Entry Requirements**: Most Universities of Technology (like TUT, CUT, CPUT, DUT) accept an N-Diploma for entry into their Advanced Diploma or BTech courses in engineering.
        3. **Credit Exemptions**: Depending on your grades in N5/N6 Mathematics and Science, you can be exempted from specific foundational modules, shaving up to 1 year off your university study time.
        
        Make sure to check our **RPL Pathway Map** tab to visualize how this bridge works step-by-step!`;
    }
    
    if (q.includes("nsfas vs isfap") || q.includes("nsfas") && q.includes("isfap") || q.includes("difference between nsfas")) {
        return `Great question! While both NSFAS and ISFAP fund students at South African universities, their target groups and criteria differ:
        
        *   **NSFAS (State Funded)**: For families with a combined household income under **R350,000** per year. It covers 100% of tuition, accommodation, and provides a monthly living stipend. Only applies to public universities and TVET colleges.
        *   **ISFAP (Corporate Funded)**: Specifically targeted at the "Missing Middle" (household income between **R350,000 and R600,000** per year). It funds specific high-demand career paths (Medicine, Engineering, Actuarial, Accounting, IT). It includes study mentorship and psychosocial coaching alongside tuition support.
        
        Use the **Funding & NSFAS** tab to run a quick diagnostic check on your household eligibility!`;
    }
    
    if (q.includes("medicine") || q.includes("study medicine") || q.includes("wits") || q.includes("uct")) {
        return `Studying Medicine (MBChB) at top SA universities like Wits, UCT, UP, or UKZN is extremely competitive. Here are the core academic requirements:
        
        1. **School Subjects**: You MUST take **Mathematics (Pure)**, **Physical Sciences**, and **Life Sciences**. Mathematical Literacy is not accepted.
        2. **Academic Threshold**: You typically need a minimum of 75%-80% in Mathematics and Science, with an overall Matric average of 85% or above to be competitive.
        3. **NBTs**: Most universities require you to write the National Benchmark Tests (Academic Literacy, Quantitative Literacy, and Mathematics).
        4. **Community Work**: Having volunteer hours at clinics or community projects strongly improves your selection score.`;
    }
    
    if (q.includes("apprenticeships better") || q.includes("apprenticeship") && q.includes("degree")) {
        return `This depends on your career goals and learning preferences! Here is a South African perspective:
        
        *   **Apprenticeships (Artisan Routes)**: Focus on hands-on practical skills (e.g., Solar Electrician, Welder, Toolmaker, Diesel Mechanic). You get paid a stipend while learning, skip massive student debt, and can pass a **Red Seal Trade Test** in 3-4 years. Very high employment rate due to local technical shortages.
        *   **University Degrees**: Better suited for academic, analytical, or corporate leadership paths (e.g., Software Architecture, Financial Analytics, Medicine). It requires significant financial investment, takes 3-6 years of classroom study, and entry requirements are high.
        
        Check out the **Opportunities** tab to view live apprenticeships and learnerships!`;
    }
    
    if (q.includes("verify") && q.includes("college") || q.includes("fake college") || q.includes("unaccredited")) {
        return `Spotting unregistered colleges is crucial to protect your future. Here is how to verify a college in South Africa:
        
        1. **Check SAQA Registry**: Ask the college for their specific SAQA Qualification ID number. Search this ID on the SAQA website (saqa.org.za).
        2. **Look for DHET registration**: Every private college must display their registration certificate showing their DHET registration number (e.g., 2018/FE07/005).
        3. **Look up UMALUSI**: For Matric rewrites or technical N-diplomas, ensure the center is accredited by Umalusi or a Quality Council (like QCTO).
        
        Try entering the college name into our **Course Validator** tool to run a quick diagnostic test!`;
    }
    
    if (q.includes("software engineering") || q.includes("programmer") || q.includes("developer")) {
        return `Excellent choice. Software Engineering is one of the highest-demand careers in South Africa. Here is your roadmap:
        
        1. **High School Subjects**: Pure Mathematics is highly recommended (min 60% for university degree entry). Physical Sciences and IT are helpful, but not always compulsory.
        2. **University Options**:
            *   *BSc in Computer Science* (focuses on algorithms, logic, theory)
            *   *BEng in Software Engineering* (focuses on architecture, system builds)
            *   *National Diploma in IT* (more practical coding emphasis)
        3. **Alternative Routes**: Bootcamps (WeThinkCode_, HyperionDev) or TVET N4-N6 in systems development.
        
        Check out the **Career Explorer** for detailed salary benchmarks and linked bursaries for Software Developers!`;
    }

    // Default reply
    return `Sharp! Thanks for asking. I can guide you on:
    *   Subject requirements for engineering, finance, or medicine.
    *   Bridging TVET N-Diplomas to university degrees (RPL).
    *   NSFAS and ISFAP funding eligibility.
    *   Identifying unaccredited colleges and fake degrees.
    
    What specific career or funding question do you want to tackle next?`;
}


// 12. SSO PROFILE EDIT & MODAL CONTROL
const sidebarProfileBtn = document.getElementById("sidebar-profile-btn");
const ssoSyncBtn = document.getElementById("sso-sync-btn");
const profileModal = document.getElementById("profile-modal");
const modalCloseBtn = document.getElementById("modal-close-btn");
const btnSaveProfile = document.getElementById("btn-save-profile");
const btnExportProfile = document.getElementById("btn-export-profile");

function openProfileModal() {
    // Populate form fields
    document.getElementById("setup-student-name").value = studentProfile.name;
    document.getElementById("setup-student-grade").value = studentProfile.level;
    document.getElementById("setup-student-province").value = studentProfile.province;
    profileModal.classList.remove("hidden");
}

function closeProfileModal() {
    profileModal.classList.add("hidden");
}

sidebarProfileBtn.addEventListener("click", openProfileModal);
ssoSyncBtn.addEventListener("click", openProfileModal);
modalCloseBtn.addEventListener("click", closeProfileModal);

// Close on background click
window.addEventListener("click", (e) => {
    if (e.target === profileModal) {
        closeProfileModal();
    }
});

btnSaveProfile.addEventListener("click", () => {
    const name = document.getElementById("setup-student-name").value.trim();
    const grade = document.getElementById("setup-student-grade").value;
    const province = document.getElementById("setup-student-province").value;
    
    if (!name) {
        alert("Please enter a valid name.");
        return;
    }
    
    studentProfile.name = name;
    studentProfile.level = grade;
    studentProfile.province = province;
    
    localStorage.setItem("PATHWAY_SSO_PROFILE", JSON.stringify(studentProfile));
    updateSSOVisualState();
    recalculateCareerMatches();
    
    alert("Profile saved successfully and synced via SSO to all ecosystem applications!");
    closeProfileModal();
});

btnExportProfile.addEventListener("click", () => {
    const token = document.getElementById("sso-token-display").textContent;
    navigator.clipboard.writeText(token);
    alert("SSO Token Copied to Clipboard! You can now load this token in the Certification Hub or Job Board to import your profile instantly.");
});


// 13. GLOBAL INITIALIZER ON DOM LOAD
document.addEventListener("DOMContentLoaded", () => {
    loadProfileFromSSO();
    initializeTrendsChart("all");
    
    // Check if global search triggers explorer filtering
    const globalSearch = document.getElementById("global-search");
    globalSearch.addEventListener("input", (e) => {
        const query = e.target.value;
        if (query) {
            // Force navigate to explorer tab
            document.querySelector('[data-target="explorer"]').click();
            document.getElementById("global-search").value = query;
            renderExplorerCards(query);
        }
    });

    // Default message trigger in Chat
    // To populate the interface nicely on start
});
