# database.py
# Core database definitions for PathwayZA

CAREER_DB = [
    {
        "id": "soft-eng",
        "name": "Software Engineer / Developer",
        "sector": "Tech",
        "description": "Design, build, and maintain computer systems, mobile applications, and enterprise software platforms.",
        "demand": "Critical",
        "demandDetails": "Over 12,000 vacant software developer roles currently listed across South Africa's tech hubs.",
        "salary": "R300,000 - R850,000+ per year",
        "subjects": ["Pure Mathematics", "Information Technology", "Physical Sciences"],
        "tvetPath": "N4 - N6 Financial/Business Management + Coding Bootcamps, or N4 - N6 Engineering Studies.",
        "uniPath": "BSc in Computer Science, BEng/BSc in Software Engineering, or Diploma in IT.",
        "certifications": "AWS Certified Developer, Microsoft Certified Azure, Java, Python.",
        "interests": ["coding", "business"],
        "tvetUniversityBridge": True
    },
    {
        "id": "data-sci",
        "name": "Data Scientist / AI Engineer",
        "sector": "Tech",
        "description": "Analyze complex datasets and construct machine learning models to solve business problems and automate systems.",
        "demand": "High",
        "demandDetails": "Rapidly growing demand in South African banks, telecom companies, and e-commerce startups.",
        "salary": "R400,000 - R1,100,000 per year",
        "subjects": ["Pure Mathematics", "Information Technology", "Physical Sciences"],
        "tvetPath": "Not typically offered at TVET level; requires strong mathematical foundation.",
        "uniPath": "BSc in Data Science, BSc in Mathematical Statistics, or BSc in Computer Science.",
        "certifications": "Google Professional Data Engineer, TensorFlow Developer.",
        "interests": ["coding", "science"],
        "tvetUniversityBridge": False
    },
    {
        "id": "mech-eng",
        "name": "Mechanical Engineer",
        "sector": "Engineering",
        "description": "Design, develop, install, and test mechanical components, machinery, engines, and thermodynamic devices.",
        "demand": "Critical",
        "demandDetails": "High demand in manufacturing, mining, energy production, and the automotive sector (SAPS, BMW, Mercedes-Benz SA).",
        "salary": "R320,000 - R950,000 per year",
        "subjects": ["Pure Mathematics", "Physical Sciences"],
        "tvetPath": "N1 - N6 Mechanical Engineering Studies + 18-24 months work experience -> National N-Diploma.",
        "uniPath": "BEng / BSc in Mechanical Engineering, or BTech / Advanced Diploma in Mechanical Engineering.",
        "certifications": "ECSA Candidate Registration (Engineering Council of South Africa).",
        "interests": ["building", "science"],
        "tvetUniversityBridge": True
    },
    {
        "id": "elec-eng",
        "name": "Electrical Engineer",
        "sector": "Engineering",
        "description": "Supervise, design, and manage electricity distribution, electrical machinery control systems, and power grids.",
        "demand": "Critical",
        "demandDetails": "Critical sector gap due to Eskom grid expansion, renewable energy integration, and solar microgrid installations.",
        "salary": "R340,000 - R980,000 per year",
        "subjects": ["Pure Mathematics", "Physical Sciences"],
        "tvetPath": "N1 - N6 Electrical Engineering Studies + Electrical Trade Test (Red Seal).",
        "uniPath": "BEng / BSc in Electrical Engineering, or Advanced Diploma / BTech in Electrical Engineering.",
        "certifications": "ECSA Candidate Registration, Installation Rules (Wireman's License).",
        "interests": ["building", "coding"],
        "tvetUniversityBridge": True
    },
    {
        "id": "doctor",
        "name": "Medical Doctor / General Practitioner",
        "sector": "Health",
        "description": "Diagnose, treat, and prevent human illnesses, injuries, and health disorders in public and private clinics.",
        "demand": "Critical",
        "demandDetails": "Severe shortage in rural public hospitals; high demand for primary care specialists.",
        "salary": "R600,000 - R1,400,000+ per year",
        "subjects": ["Pure Mathematics", "Physical Sciences", "Life Sciences"],
        "tvetPath": "None available. Medical studies require university enrollment.",
        "uniPath": "MBChB degree (Medicine & Bachelor of Surgery) - 6 years study + 2 years internship + 1 year community service.",
        "certifications": "HPCSA registration (Health Professions Council of South Africa).",
        "interests": ["people", "science"],
        "tvetUniversityBridge": False
    },
    {
        "id": "nurse",
        "name": "Registered Nurse / Healthcare Specialist",
        "sector": "Health",
        "description": "Provide nursing care, assist doctors during medical procedures, administer treatments, and manage wards.",
        "demand": "Critical",
        "demandDetails": "High turnover and vacancy rates in hospitals. Nurses are in massive demand nationally.",
        "salary": "R240,000 - R480,000 per year",
        "subjects": ["Pure Mathematics", "Life Sciences", "Physical Sciences"],
        "tvetPath": "Primary Healthcare certificates (lower tiers).",
        "uniPath": "Bachelor of Nursing Science, or Diploma in Nursing (4-year program at accredited nursing college).",
        "certifications": "SANC (South African Nursing Council) Registration.",
        "interests": ["people", "science"],
        "tvetUniversityBridge": True
    },
    {
        "id": "chartered-acc",
        "name": "Chartered Accountant (CA)",
        "sector": "Finance",
        "description": "Perform financial audits, strategic tax planning, accounting consulting, and corporate financial oversight.",
        "demand": "High",
        "demandDetails": "Consistently ranked as one of SA's most secure and high-earning financial careers.",
        "salary": "R450,000 - R1,300,000+ per year",
        "subjects": ["Pure Mathematics", "Accounting"],
        "tvetPath": "N4 - N6 Business Management / Financial Management.",
        "uniPath": "Bachelor of Accounting Science (BAccSc) + Postgrad Diploma in Accounting (PGDA) + SAICA Qualifying Board Exams.",
        "certifications": "SAICA (South African Institute of Chartered Accountants) registration.",
        "interests": ["business", "writing"],
        "tvetUniversityBridge": True
    },
    {
        "id": "financial-analyst",
        "name": "Financial Analyst / Investment Analyst",
        "sector": "Finance",
        "description": "Analyze market trends, assess investment opportunities, build financial models, and advise corporate portfolios.",
        "demand": "High",
        "demandDetails": "Strong demand in Johannesburg and Cape Town financial districts (Allan Gray, Ninety One, big banks).",
        "salary": "R350,000 - R900,000 per year",
        "subjects": ["Pure Mathematics", "Accounting"],
        "tvetPath": "N4 - N6 Financial Management.",
        "uniPath": "BCom in Finance, BCom in Investment Management, or BSc in Quantitative Finance.",
        "certifications": "CFA (Chartered Financial Analyst) Charter holder.",
        "interests": ["business", "science"],
        "tvetUniversityBridge": True
    },
    {
        "id": "solar-tech",
        "name": "Solar PV Technician / Electrician",
        "sector": "Trades",
        "description": "Assemble, install, configure, and repair solar photovoltaic panels and energy storage systems.",
        "demand": "Critical",
        "demandDetails": "Explosive demand due to grid load shedding and renewable energy switchover in SA.",
        "salary": "R180,000 - R420,000 per year",
        "subjects": ["Mathematical Literacy", "Information Technology"],
        "tvetPath": "N1 - N3 Electrical Engineering or specialized solar PV courses at accredited TVET colleges.",
        "uniPath": "Not required. Trade certificates are sufficient.",
        "certifications": "SAPVIA PV GreenCard Installer Certification, Wireman's license.",
        "interests": ["building", "coding"],
        "tvetUniversityBridge": False
    },
    {
        "id": "mechanic",
        "name": "Automotive Mechanic / Diesel Technician",
        "sector": "Trades",
        "description": "Inspect, maintain, and repair light cars, commercial diesel trucks, and passenger vehicles.",
        "demand": "High",
        "demandDetails": "Essential trades sector; critical need in transport logistics, transport operators, and franchise dealerships.",
        "salary": "R140,000 - R360,000 per year",
        "subjects": ["Mathematical Literacy"],
        "tvetPath": "N2 - N3 Motor Trade Theory + Apprenticeship + Trade Test.",
        "uniPath": "Not required. Practical apprenticeships are the gold standard.",
        "certifications": "MerSETA Trade Certificate (Red Seal Qualification).",
        "interests": ["building"],
        "tvetUniversityBridge": False
    },
    {
        "id": "digital-designer",
        "name": "UX/UI & Digital Designer",
        "sector": "Tech",
        "description": "Design interface flows, visual assets, layouts, and interactive mockups for digital products and websites.",
        "demand": "High",
        "demandDetails": "Strong growth in software development teams, creative agencies, and remote freelancing marketplaces.",
        "salary": "R200,000 - R550,000 per year",
        "subjects": ["Visual Arts / Design", "Computer Applications Tech"],
        "tvetPath": "Art/Design programs (varies by college).",
        "uniPath": "BA in Creative Brand Communication, Bachelor of Design (UX/UI), or BA in Fine Arts.",
        "certifications": "Figma Academy Certifications, Google UX Design Professional.",
        "interests": ["creative", "coding"],
        "tvetUniversityBridge": True
    },
    {
        "id": "educator",
        "name": "High School Teacher (STEM / Languages)",
        "sector": "Trades",
        "description": "Educate high school students in specialized subjects, prepare lesson plans, and grade evaluations.",
        "demand": "High",
        "demandDetails": "Huge demand for Mathematics, Physical Science, and regional indigenous language educators.",
        "salary": "R220,000 - R450,000 per year",
        "subjects": ["History", "Geography"],
        "tvetPath": "None. Requires formal university education.",
        "uniPath": "Bachelor of Education (BEd) (4 years), or Bachelor's Degree + PGCE (Postgraduate Certificate in Education).",
        "certifications": "SACE (South African Council for Educators) Registration.",
        "interests": ["people", "writing"],
        "tvetUniversityBridge": False
    }
]

BURSARY_DB = [
    {
        "name": "NSFAS (National Student Financial Aid Scheme)",
        "provider": "Department of Higher Education & Training (DHET)",
        "coverage": "100% Tuition, accommodation, book allowance, and monthly living stipend.",
        "sectors": ["Tech", "Health", "Finance", "Engineering", "Trades"],
        "requirements": "Combined household income under R350,000 per year (or under R600,000 for students with disabilities). South African citizen, studying at a public university or public TVET college.",
        "link": "https://www.nsfas.org.za"
    },
    {
        "name": "ISFAP (Ikusasa Student Financial Aid Programme)",
        "provider": "ISFAP Foundation / Corporate Funders",
        "coverage": "Tuition fees, accommodation, meals, study material, and active academic/psychosocial support.",
        "sectors": ["Tech", "Health", "Finance", "Engineering"],
        "requirements": "Targeted at 'missing middle' students (household income between R350,000 and R600,000). Must study accredited high-demand qualifications (e.g. Medicine, Engineering, Actuarial, Computer Science).",
        "link": "https://www.isfap.co.za"
    },
    {
        "name": "Standard Bank Bursary Programme",
        "provider": "Standard Bank Group",
        "coverage": "Full tuition, registration, residence accommodation, and computer allowance.",
        "sectors": ["Tech", "Finance"],
        "requirements": "Min 65% average in Grade 12. Must be studying Commerce, Economics, Information Technology, Computer Science, or Actuarial Science.",
        "link": "https://www.standardbank.com"
    },
    {
        "name": "Sasol Corporate Bursary Scheme",
        "provider": "Sasol Limited",
        "coverage": "All tuition, registration fees, accommodation, allowance for books and meals, and vacation work opportunities.",
        "sectors": ["Engineering", "Tech"],
        "requirements": "Requires 70% in Mathematics, 70% in Physical Sciences, and 60% in English in Matric. Funding for BSc Engineering, BSc Computer Science, and BSc Chemistry.",
        "link": "https://www.sasolbursaries.com"
    },
    {
        "name": "SETA Sector Education & Training Bursaries",
        "provider": "Department of Higher Education (various SETAs e.g., MICTSETA, HWSETA, EWSETA)",
        "coverage": "Tuition support, research allowances, and work-integrated learning placement links.",
        "sectors": ["Tech", "Engineering", "Trades"],
        "requirements": "SA citizens, unemployed youth, studying qualifications relevant to specific SETA sectors (e.g., green tech, electrical, digital marketing).",
        "link": "https://www.dhet.gov.za"
    }
]

OPPORTUNITIES_DB = [
    {
        "title": "Apprentice Electrician (Solar Energy Focus)",
        "type": "Apprenticeship",
        "company": "Rubicon Clean Energy SA",
        "stipend": "R5,500 / month",
        "location": "Gauteng (Midrand)",
        "duration": "36 Months",
        "description": "Gain hands-on experience under master electricians. Focuses on commercial solar installation, inverter diagnostics, and smart grid automation. Prepares for the Red Seal trade test."
    },
    {
        "title": "Learnership: IT Systems Development (NQF 5)",
        "type": "Learnership",
        "company": "BCX South Africa",
        "stipend": "R4,800 / month",
        "location": "Cape Town",
        "duration": "12 Months",
        "description": "Combination of theoretical classroom training (NQF 5 Systems Development certificate) and practical application. Covers database schemas, software testing, and core web languages."
    },
    {
        "title": "Software Engineering Graduate Internship",
        "type": "Internship",
        "company": "First National Bank (FNB)",
        "stipend": "R12,500 / month",
        "location": "Johannesburg",
        "duration": "12 Months",
        "description": "Open to recent graduates holding a Diploma or BSc in Computer Science. Work inside active sprint teams building banking solutions. High likelihood of permanent placement."
    },
    {
        "title": "Apprentice Diesel Fitter / Mechanic",
        "type": "Apprenticeship",
        "company": "Transnet Engineering",
        "stipend": "R6,200 / month",
        "location": "Durban",
        "duration": "48 Months",
        "description": "Structured artisan training at Transnet workshops. Focuses on repair and maintenance of massive rail diesel locomotives and heavy machinery. Prepares for red seal trade test."
    },
    {
        "title": "Learnership: Wealth Management & Banking",
        "type": "Learnership",
        "company": "Nedbank Group",
        "stipend": "R4,500 / month",
        "location": "Gauteng",
        "duration": "12 Months",
        "description": "Earn a Wealth Management NQF level 5 certification while working in retail branch operations and advisor support. Matric with Maths/MathLit required."
    }
]

# Comprehensive Institutional Database
# Covering 26 Public Universities, 50 Public TVET Colleges, 
# and expanding Accredited/Unaccredited Private Colleges.
INSTITUTION_DB = {
    "accredited": [
        # --- 26 Public Universities ---
        {"name": "University of Cape Town", "type": "Public University", "code": "UCT", "status": "Fully Accredited", "saqaId": "SAQA-U-UCT"},
        {"name": "University of the Witwatersrand", "type": "Public University", "code": "WITS", "status": "Fully Accredited", "saqaId": "SAQA-U-WITS"},
        {"name": "University of Johannesburg", "type": "Public University", "code": "UJ", "status": "Fully Accredited", "saqaId": "SAQA-U-UJ"},
        {"name": "Tshwane University of Technology", "type": "Public University of Technology", "code": "TUT", "status": "Fully Accredited", "saqaId": "SAQA-U-TUT"},
        {"name": "Cape Peninsula University of Technology", "type": "Public University of Technology", "code": "CPUT", "status": "Fully Accredited", "saqaId": "SAQA-U-CPUT"},
        {"name": "Central University of Technology", "type": "Public University of Technology", "code": "CUT", "status": "Fully Accredited", "saqaId": "SAQA-U-CUT"},
        {"name": "Durban University of Technology", "type": "Public University of Technology", "code": "DUT", "status": "Fully Accredited", "saqaId": "SAQA-U-DUT"},
        {"name": "Mangosuthu University of Technology", "type": "Public University of Technology", "code": "MUT", "status": "Fully Accredited", "saqaId": "SAQA-U-MUT"},
        {"name": "Nelson Mandela University", "type": "Public Comprehensive University", "code": "NMU", "status": "Fully Accredited", "saqaId": "SAQA-U-NMU"},
        {"name": "North-West University", "type": "Public University", "code": "NWU", "status": "Fully Accredited", "saqaId": "SAQA-U-NWU"},
        {"name": "Rhodes University", "type": "Public University", "code": "RU", "status": "Fully Accredited", "saqaId": "SAQA-U-RU"},
        {"name": "Sefako Makgatho Health Sciences University", "type": "Public Health Sciences University", "code": "SMU", "status": "Fully Accredited", "saqaId": "SAQA-U-SMU"},
        {"name": "Sol Plaatje University", "type": "Public University", "code": "SPU", "status": "Fully Accredited", "saqaId": "SAQA-U-SPU"},
        {"name": "University of Fort Hare", "type": "Public University", "code": "UFH", "status": "Fully Accredited", "saqaId": "SAQA-U-UFH"},
        {"name": "University of KwaZulu-Natal", "type": "Public University", "code": "UKZN", "status": "Fully Accredited", "saqaId": "SAQA-U-UKZN"},
        {"name": "University of Limpopo", "type": "Public University", "code": "UL", "status": "Fully Accredited", "saqaId": "SAQA-U-UL"},
        {"name": "University of Mpumalanga", "type": "Public University", "code": "UMP", "status": "Fully Accredited", "saqaId": "SAQA-U-UMP"},
        {"name": "University of Pretoria", "type": "Public University", "code": "UP", "status": "Fully Accredited", "saqaId": "SAQA-U-UP"},
        {"name": "University of South Africa", "type": "Public Comprehensive University (ODL)", "code": "UNISA", "status": "Fully Accredited", "saqaId": "SAQA-U-UNISA"},
        {"name": "University of Stellenbosch", "type": "Public University", "code": "SUN", "status": "Fully Accredited", "saqaId": "SAQA-U-SUN"},
        {"name": "University of the Free State", "type": "Public University", "code": "UFS", "status": "Fully Accredited", "saqaId": "SAQA-U-UFS"},
        {"name": "University of the Western Cape", "type": "Public University", "code": "UWC", "status": "Fully Accredited", "saqaId": "SAQA-U-UWC"},
        {"name": "University of Venda", "type": "Public Comprehensive University", "code": "UNIVEN", "status": "Fully Accredited", "saqaId": "SAQA-U-UNIVEN"},
        {"name": "University of Zululand", "type": "Public Comprehensive University", "code": "UNIZULU", "status": "Fully Accredited", "saqaId": "SAQA-U-UNIZULU"},
        {"name": "Vaal University of Technology", "type": "Public University of Technology", "code": "VUT", "status": "Fully Accredited", "saqaId": "SAQA-U-VUT"},
        {"name": "Walter Sisulu University", "type": "Public Comprehensive University", "code": "WSU", "status": "Fully Accredited", "saqaId": "SAQA-U-WSU"},

        # --- 50 Public TVET Colleges ---
        # Eastern Cape
        {"name": "Port Elizabeth TVET College", "type": "Public TVET College", "code": "PETVET", "status": "Fully Accredited", "saqaId": "DHET-TVET-EC-PE"},
        {"name": "East Cape Midlands TVET College", "type": "Public TVET College", "code": "ECMTVET", "status": "Fully Accredited", "saqaId": "DHET-TVET-EC-ECM"},
        {"name": "Buffalo City TVET College", "type": "Public TVET College", "code": "BCTVET", "status": "Fully Accredited", "saqaId": "DHET-TVET-EC-BC"},
        {"name": "Lovedale TVET College", "type": "Public TVET College", "code": "LOVEDALE", "status": "Fully Accredited", "saqaId": "DHET-TVET-EC-LD"},
        {"name": "King Sabata Dalindyebo TVET College", "type": "Public TVET College", "code": "KSDTVET", "status": "Fully Accredited", "saqaId": "DHET-TVET-EC-KSD"},
        {"name": "Ingwe TVET College", "type": "Public TVET College", "code": "INGWE", "status": "Fully Accredited", "saqaId": "DHET-TVET-EC-IW"},
        {"name": "Ikhala TVET College", "type": "Public TVET College", "code": "IKHALA", "status": "Fully Accredited", "saqaId": "DHET-TVET-EC-IK"},
        {"name": "King Hintsa TVET College", "type": "Public TVET College", "code": "KHINTSA", "status": "Fully Accredited", "saqaId": "DHET-TVET-EC-KH"},
        # Free State
        {"name": "Goldfields TVET College", "type": "Public TVET College", "code": "GOLDFIELDS", "status": "Fully Accredited", "saqaId": "DHET-TVET-FS-GF"},
        {"name": "Motheo TVET College", "type": "Public TVET College", "code": "MOTHEO", "status": "Fully Accredited", "saqaId": "DHET-TVET-FS-MO"},
        {"name": "Maluti TVET College", "type": "Public TVET College", "code": "MALUTI", "status": "Fully Accredited", "saqaId": "DHET-TVET-FS-ML"},
        {"name": "Flavius Mareka TVET College", "type": "Public TVET College", "code": "FLAVIUS", "status": "Fully Accredited", "saqaId": "DHET-TVET-FS-FM"},
        # Gauteng
        {"name": "Tshwane South TVET College", "type": "Public TVET College", "code": "TSTVET", "status": "Fully Accredited", "saqaId": "DHET-TVET-GP-TS"},
        {"name": "Tshwane North TVET College", "type": "Public TVET College", "code": "TNTVET", "status": "Fully Accredited", "saqaId": "DHET-TVET-GP-TN"},
        {"name": "Ekurhuleni West TVET College", "type": "Public TVET College", "code": "EWTVET", "status": "Fully Accredited", "saqaId": "DHET-TVET-GP-EW"},
        {"name": "Ekurhuleni East TVET College", "type": "Public TVET College", "code": "EETVET", "status": "Fully Accredited", "saqaId": "DHET-TVET-GP-EE"},
        {"name": "South West Gauteng TVET College", "type": "Public TVET College", "code": "SWGTVET", "status": "Fully Accredited", "saqaId": "DHET-TVET-GP-SWG"},
        {"name": "Central Johannesburg TVET College", "type": "Public TVET College", "code": "CJTVET", "status": "Fully Accredited", "saqaId": "DHET-TVET-GP-CJ"},
        {"name": "Western College (Westcol) TVET", "type": "Public TVET College", "code": "WESTCOL", "status": "Fully Accredited", "saqaId": "DHET-TVET-GP-WC"},
        {"name": "Sedibeng TVET College", "type": "Public TVET College", "code": "SEDIBENG", "status": "Fully Accredited", "saqaId": "DHET-TVET-GP-SD"},
        # KwaZulu-Natal
        {"name": "Mthashana TVET College", "type": "Public TVET College", "code": "MTHASHANA", "status": "Fully Accredited", "saqaId": "DHET-TVET-KZN-MS"},
        {"name": "Umfolozi TVET College", "type": "Public TVET College", "code": "UMFOLOZI", "status": "Fully Accredited", "saqaId": "DHET-TVET-KZN-UF"},
        {"name": "Majuba TVET College", "type": "Public TVET College", "code": "MAJUBA", "status": "Fully Accredited", "saqaId": "DHET-TVET-KZN-MJ"},
        {"name": "Mnambithi TVET College", "type": "Public TVET College", "code": "MNAMBITHI", "status": "Fully Accredited", "saqaId": "DHET-TVET-KZN-MN"},
        {"name": "Elangeni TVET College", "type": "Public TVET College", "code": "ELANGENI", "status": "Fully Accredited", "saqaId": "DHET-TVET-KZN-EL"},
        {"name": "Coastal KZN TVET College", "type": "Public TVET College", "code": "COASTAL", "status": "Fully Accredited", "saqaId": "DHET-TVET-KZN-CK"},
        {"name": "Thekwini TVET College", "type": "Public TVET College", "code": "THEKWINI", "status": "Fully Accredited", "saqaId": "DHET-TVET-KZN-TK"},
        {"name": "Umgungundlovu TVET College", "type": "Public TVET College", "code": "UMGUNGUNDLOVU", "status": "Fully Accredited", "saqaId": "DHET-TVET-KZN-UM"},
        {"name": "Esayidi TVET College", "type": "Public TVET College", "code": "ESAYIDI", "status": "Fully Accredited", "saqaId": "DHET-TVET-KZN-ES"},
        # Limpopo
        {"name": "Lephalale TVET College", "type": "Public TVET College", "code": "LEPHALALE", "status": "Fully Accredited", "saqaId": "DHET-TVET-LP-LP"},
        {"name": "Capricorn TVET College", "type": "Public TVET College", "code": "CAPRICORN", "status": "Fully Accredited", "saqaId": "DHET-TVET-LP-CP"},
        {"name": "Waterberg TVET College", "type": "Public TVET College", "code": "WATERBERG", "status": "Fully Accredited", "saqaId": "DHET-TVET-LP-WB"},
        {"name": "Vhembe TVET College", "type": "Public TVET College", "code": "VHEMBE", "status": "Fully Accredited", "saqaId": "DHET-TVET-LP-VH"},
        {"name": "Mopani South East TVET College", "type": "Public TVET College", "code": "MOPANI", "status": "Fully Accredited", "saqaId": "DHET-TVET-LP-MP"},
        {"name": "Letaba TVET College", "type": "Public TVET College", "code": "LETABA", "status": "Fully Accredited", "saqaId": "DHET-TVET-LP-LT"},
        {"name": "Sekhukhune TVET College", "type": "Public TVET College", "code": "SEKHUKHUNE", "status": "Fully Accredited", "saqaId": "DHET-TVET-LP-SK"},
        # Mpumalanga
        {"name": "Ehlanzeni TVET College", "type": "Public TVET College", "code": "EHLANZENI", "status": "Fully Accredited", "saqaId": "DHET-TVET-MP-EH"},
        {"name": "Nkangala TVET College", "type": "Public TVET College", "code": "NKANGALA", "status": "Fully Accredited", "saqaId": "DHET-TVET-MP-NK"},
        {"name": "Gert Sibande TVET College", "type": "Public TVET College", "code": "GERT", "status": "Fully Accredited", "saqaId": "DHET-TVET-MP-GS"},
        # Northern Cape
        {"name": "Northern Cape Urban TVET College", "type": "Public TVET College", "code": "NCURBAN", "status": "Fully Accredited", "saqaId": "DHET-TVET-NC-NCU"},
        {"name": "Northern Cape Rural TVET College", "type": "Public TVET College", "code": "NCRURAL", "status": "Fully Accredited", "saqaId": "DHET-TVET-NC-NCR"},
        # North West
        {"name": "Taletso TVET College", "type": "Public TVET College", "code": "TALETSO", "status": "Fully Accredited", "saqaId": "DHET-TVET-NW-TL"},
        {"name": "Vuselela TVET College", "type": "Public TVET College", "code": "VUSELELA", "status": "Fully Accredited", "saqaId": "DHET-TVET-NW-VS"},
        {"name": "Orbit TVET College", "type": "Public TVET College", "code": "ORBIT", "status": "Fully Accredited", "saqaId": "DHET-TVET-NW-OB"},
        # Western Cape
        {"name": "West Coast TVET College", "type": "Public TVET College", "code": "WESTCOAST", "status": "Fully Accredited", "saqaId": "DHET-TVET-WC-WC"},
        {"name": "Boland TVET College", "type": "Public TVET College", "code": "BOLAND", "status": "Fully Accredited", "saqaId": "DHET-TVET-WC-BL"},
        {"name": "South Cape TVET College", "type": "Public TVET College", "code": "SOUTHCAPE", "status": "Fully Accredited", "saqaId": "DHET-TVET-WC-SC"},
        {"name": "Northlink TVET College", "type": "Public TVET College", "code": "NORTHLINK", "status": "Fully Accredited", "saqaId": "DHET-TVET-WC-NL"},
        {"name": "College of Cape Town TVET", "type": "Public TVET College", "code": "CCTTVET", "status": "Fully Accredited", "saqaId": "DHET-TVET-WC-CCT"},
        {"name": "False Bay TVET College", "type": "Public TVET College", "code": "FALSEBAY", "status": "Fully Accredited", "saqaId": "DHET-TVET-WC-FB"},

        # --- Accredited Private Colleges & HEIs ---
        {"name": "Damelin College", "type": "Private College", "code": "DAM", "status": "Accredited (With program restrictions, check registration certificate)", "saqaId": "SAQA-REG-74"},
        {"name": "Varsity College", "type": "Private Higher Education Institution", "code": "VC", "status": "Fully Accredited", "saqaId": "SAQA-REG-52"},
        {"name": "Richfield Graduate Institute", "type": "Private HE Institution", "code": "RICH", "status": "Fully Accredited", "saqaId": "SAQA-REG-98"},
        {"name": "MANCOSA", "type": "Private Higher Education Institution", "code": "MANCOSA", "status": "Fully Accredited", "saqaId": "SAQA-REG-104"},
        {"name": "Rosebank College", "type": "Private Higher Education Institution", "code": "RC", "status": "Fully Accredited", "saqaId": "SAQA-REG-87"},
        {"name": "Eduvos", "type": "Private Higher Education Institution", "code": "EDUVOS", "status": "Fully Accredited", "saqaId": "SAQA-REG-66"},
        {"name": "Regent Business School", "type": "Private HE Institution", "code": "RBS", "status": "Fully Accredited", "saqaId": "SAQA-REG-112"},
        {"name": "Boston City Campus", "type": "Private Higher Education Institution", "code": "BOSTON", "status": "Fully Accredited", "saqaId": "SAQA-REG-43"},
        {"name": "Stadio", "type": "Private Higher Education Institution", "code": "STADIO", "status": "Fully Accredited", "saqaId": "SAQA-REG-159"},
        {"name": "Milpark Education", "type": "Private College", "code": "MILPARK", "status": "Fully Accredited", "saqaId": "SAQA-REG-211"}
    ],
    "unaccredited": [
        # Bogus or unaccredited institutions
        {"name": "Fake SA College", "type": "Private Academy", "code": "FSA", "status": "UNACCREDITED", "warningCode": "LOW-VALUE-FLAG", "details": "This institution is not registered with the DHET or SAQA. Degrees awarded here will not be recognized in the South African jobs market or for credit transfers."},
        {"name": "Apex Institute of Africa", "type": "Online Diploma Provider", "code": "APX", "status": "UNACCREDITED", "warningCode": "LOW-VALUE-FLAG", "details": "Currently operating without a valid Council on Higher Education (CHE) program registration. Listed on DHET bogus college alerts."},
        {"name": "Central Durban University of Technology", "type": "Bogus University", "code": "CDUT", "status": "BOGUS INSTITUTION", "warningCode": "CRITICAL-SCAM-FLAG", "details": "Deliberately using a name similar to Durban University of Technology (DUT) to mislead matriculants. Completely unaccredited."},
        {"name": "Sandton Technical College", "type": "Unaccredited Academy", "code": "STC", "status": "UNACCREDITED", "warningCode": "LOW-VALUE-FLAG", "details": "Flagged by DHET as operating without valid registration or offering courses beyond its accredited scope."},
        {"name": "Pretoria City College", "type": "Bogus Academy", "code": "PCC", "status": "BOGUS INSTITUTION", "warningCode": "CRITICAL-SCAM-FLAG", "details": "Not registered with the DHET as a private college or private higher education provider. Unaccredited qualifications."}
    ]
}

SECTOR_TREND_DATA = {
    "all": {
        "labels": ["2026", "2028", "2030", "2032", "2034", "2036"],
        "datasets": [
            { "label": "Technology & ICT", "data": [12, 28, 48, 72, 95, 120], "borderColor": "#00F2FE", "backgroundColor": "rgba(0, 242, 254, 0.05)", "fill": True },
            { "label": "Green Energy & Solar", "data": [25, 55, 90, 115, 130, 145], "borderColor": "#38EF7D", "backgroundColor": "rgba(56, 239, 125, 0.05)", "fill": True },
            { "label": "Healthcare & Biotech", "data": [8, 14, 25, 38, 52, 65], "borderColor": "#E100FF", "backgroundColor": "rgba(225, 0, 255, 0.05)", "fill": True },
            { "label": "Engineering Studies", "data": [5, 12, 19, 28, 38, 48], "borderColor": "#3B82F6", "backgroundColor": "rgba(59, 130, 246, 0.05)", "fill": True }
        ],
        "insight": "Green Energy and Technology lead growth sectors, with solar expansion and AI integrations driving immediate job vacancies."
    },
    "technology": {
        "labels": ["2026", "2028", "2030", "2032", "2034", "2036"],
        "datasets": [{ "label": "Tech Job Vacancies (Index)", "data": [100, 140, 210, 310, 440, 580], "borderColor": "#00F2FE", "backgroundColor": "rgba(0, 242, 254, 0.1)", "fill": True }],
        "insight": "Software Development, Cloud Architecture, and Data Science will see a 480% vacancy index expansion by 2036."
    },
    "engineering": {
        "labels": ["2026", "2028", "2030", "2032", "2034", "2036"],
        "datasets": [{ "label": "Engineering Growth Index", "data": [100, 115, 132, 155, 185, 220], "borderColor": "#3B82F6", "backgroundColor": "rgba(59, 130, 246, 0.1)", "fill": True }],
        "insight": "Infrastructure maintenance, clean water grid designs, and automotive production upgrades drive civil and mechanical demand."
    },
    "healthcare": {
        "labels": ["2026", "2028", "2030", "2032", "2034", "2036"],
        "datasets": [{ "label": "Healthcare Workforce Needs", "data": [100, 120, 145, 178, 215, 260], "borderColor": "#E100FF", "backgroundColor": "rgba(225, 0, 255, 0.1)", "fill": True }],
        "insight": "National Health Insurance (NHI) implementation will double demand for registered nurses and primary care practitioners."
    },
    "finance": {
        "labels": ["2026", "2028", "2030", "2032", "2034", "2036"],
        "datasets": [{ "label": "Financial Services Demand", "data": [100, 110, 125, 142, 165, 190], "borderColor": "#F59E0B", "backgroundColor": "rgba(245, 158, 11, 0.1)", "fill": True }],
        "insight": "Fintech startups and regulatory compliance drive consistent demand for Chartered Accountants and Financial Auditors."
    },
    "green": {
        "labels": ["2026", "2028", "2030", "2032", "2034", "2036"],
        "datasets": [{ "label": "Solar & Wind Installers (Growth %)", "data": [100, 190, 310, 420, 510, 590], "borderColor": "#38EF7D", "backgroundColor": "rgba(56, 239, 125, 0.1)", "fill": True }],
        "insight": "Private microgrid investments and Eskom wind/solar connection bridges create massive artisan and technician roles."
    }
}
