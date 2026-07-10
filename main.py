# main.py
import base64
import json
import hmac
import hashlib
import time
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel

from database import CAREER_DB, BURSARY_DB, OPPORTUNITIES_DB, INSTITUTION_DB, SECTOR_TREND_DATA

app = FastAPI(title="PathwayZA API", description="FastAPI Backend for PathwayZA Career Guidance Hub")

SECRET_KEY = "pathwayza_secret_key_12345_secure_key"

# Models
class MatcherRequest(BaseModel):
    subjects: List[str]
    interests: List[str]

class ValidationRequest(BaseModel):
    institution: str
    qualification: str

class ChatRequest(BaseModel):
    message: str

class TokenRequest(BaseModel):
    name: str
    level: str
    province: str
    subjects: List[str]
    interests: List[str]

# JWT Helpers
def generate_jwt(payload: dict) -> str:
    header = {"alg": "HS256", "typ": "JWT"}
    
    # Helper to encode json to base64url string without padding
    def b64url_encode(data: dict) -> str:
        data_str = json.dumps(data)
        encoded = base64.urlsafe_b64encode(data_str.encode()).decode()
        return encoded.rstrip("=")

    header_b64 = b64url_encode(header)
    payload_b64 = b64url_encode(payload)
    
    signature_base = f"{header_b64}.{payload_b64}"
    sig = hmac.new(
        SECRET_KEY.encode(),
        signature_base.encode(),
        hashlib.sha256
    ).digest()
    sig_b64 = base64.urlsafe_b64encode(sig).decode().rstrip("=")
    
    return f"{header_b64}.{payload_b64}.{sig_b64}"

# Static Frontend Routes
@app.get("/")
def read_root():
    return FileResponse("index.html")

@app.get("/styles.css")
def read_styles():
    return FileResponse("styles.css")

@app.get("/app.js")
def read_js():
    return FileResponse("app.js")

# API Routes
@app.get("/api/careers")
def get_careers(sector: Optional[str] = "all", demand: Optional[str] = "all", query: Optional[str] = ""):
    filtered = CAREER_DB
    
    if sector and sector != "all":
        filtered = [c for c in filtered if c["sector"].lower() == sector.lower()]
        
    if demand and demand != "all":
        filtered = [c for c in filtered if c["demand"].lower() == demand.lower()]
        
    if query:
        q = query.lower()
        filtered = [
            c for c in filtered 
            if q in c["name"].lower() or q in c["description"].lower()
        ]
        
    return filtered

@app.get("/api/bursaries")
def get_bursaries(query: Optional[str] = ""):
    if not query:
        return BURSARY_DB
        
    q = query.lower()
    filtered = [
        b for b in BURSARY_DB
        if q in b["name"].lower() or q in b["provider"].lower() or q in b["requirements"].lower()
    ]
    return filtered

@app.get("/api/opportunities")
def get_opportunities(type: Optional[str] = "all"):
    if not type or type == "all":
        return OPPORTUNITIES_DB
        
    return [op for op in OPPORTUNITIES_DB if op["type"].lower() == type.lower()]

@app.get("/api/trends/{sector}")
def get_trends(sector: str):
    if sector not in SECTOR_TREND_DATA:
        raise HTTPException(status_code=404, detail="Sector trend data not found")
    return SECTOR_TREND_DATA[sector]

@app.post("/api/matcher")
def match_careers(request: MatcherRequest):
    selected_subs = request.subjects
    selected_ints = request.interests
    
    scores = []
    for career in CAREER_DB:
        # Subject matching
        req_met = sum(1 for sub in career["subjects"] if sub in selected_subs)
        
        # Pure Math lock logic
        math_lockout = False
        if "Pure Mathematics" in career["subjects"] and "Mathematical Literacy" in selected_subs:
            math_lockout = True
            
        sub_score_part = (req_met / len(career["subjects"])) * 50 if career["subjects"] else 50
        
        # Interest matching
        matching_ints = sum(1 for val in career["interests"] if val in selected_ints)
        int_score_part = (matching_ints / len(career["interests"])) * 50 if career["interests"] else 50
        
        score = round(sub_score_part + int_score_part)
        
        # Apply lockout cap
        if math_lockout:
            score = min(score, 50)
            
        scores.append({
            "career": career,
            "score": score,
            "mathLockout": math_lockout
        })
        
    # Sort descending by score
    scores.sort(key=lambda x: x["score"], reverse=True)
    return scores

@app.post("/api/validate")
def validate_institution(request: ValidationRequest):
    inst = request.institution.lower().strip()
    qual = request.qualification.lower().strip()
    
    # Check unaccredited list first (exact or substring match)
    for unacc in INSTITUTION_DB["unaccredited"]:
        if inst in unacc["name"].lower() or unacc["name"].lower() in inst:
            return {"accredited": False, "details": unacc}
            
    # Check accredited list
    for acc in INSTITUTION_DB["accredited"]:
        if inst in acc["name"].lower() or acc["name"].lower() in inst:
            return {"accredited": True, "details": acc}
            
    # Unlisted fallback
    return {
        "accredited": None,
        "details": {
            "name": request.institution,
            "warning": "Could not locate institution in our primary database.",
            "instructions": [
                "Verify if they have a physical registered campus.",
                "Ask the institution for their DHET Registration Number and their specific SAQA Qualification ID.",
                "Verify this ID directly on the SAQA database (saqa.org.za)."
            ]
        }
    }

@app.post("/api/chat")
def chat_response(request: ChatRequest):
    q = request.message.lower()
    
    if "tvet to beng" in q or "tvet college to a university" in q or ("tvet" in q and "university" in q):
        response = (
            "Aweh! The transition from a TVET college to a university engineering degree (like a BEng or BTech) "
            "is a popular articulation pathway in South Africa:\n\n"
            "1. **Complete your N-Diploma**: You must complete your N4, N5, and N6 Engineering Certificates, "
            "followed by 18 to 24 months of verified practical experience, yielding your National N-Diploma (NQF Level 6).\n"
            "2. **University Entry Requirements**: Most Universities of Technology (like TUT, CUT, CPUT, DUT) accept "
            "an N-Diploma for entry into their Advanced Diploma or BTech courses in engineering.\n"
            "3. **Credit Exemptions**: Depending on your grades in N5/N6 Mathematics and Science, you can be exempted "
            "from specific foundational modules, shaving up to 1 year off your university study time.\n\n"
            "Make sure to check our **RPL Pathway Map** tab to visualize how this bridge works step-by-step!"
        )
    elif "nsfas vs isfap" in q or ("nsfas" in q and "isfap" in q) or "difference between nsfas" in q:
        response = (
            "Great question! While both NSFAS and ISFAP fund students at South African universities, their target groups and criteria differ:\n\n"
            "*   **NSFAS (State Funded)**: For families with a combined household income under **R350,000** per year. "
            "It covers 100% of tuition, accommodation, and provides a monthly living stipend. Only applies to public universities and TVET colleges.\n"
            "*   **ISFAP (Corporate Funded)**: Specifically targeted at the \"Missing Middle\" (household income between **R350,000 and R600,000** per year). "
            "It funds specific high-demand career paths (Medicine, Engineering, Actuarial, Accounting, IT). It includes study mentorship "
            "and psychosocial coaching alongside tuition support.\n\n"
            "Use the **Funding & NSFAS** tab to run a quick diagnostic check on your household eligibility!"
        )
    elif "medicine" in q or "study medicine" in q or "wits" in q or "uct" in q:
        response = (
            "Studying Medicine (MBChB) at top SA universities like Wits, UCT, UP, or UKZN is extremely competitive. Here are the core academic requirements:\n\n"
            "1. **School Subjects**: You MUST take **Mathematics (Pure)**, **Physical Sciences**, and **Life Sciences**. Mathematical Literacy is not accepted.\n"
            "2. **Academic Threshold**: You typically need a minimum of 75%-80% in Mathematics and Science, with an overall Matric average of 85% or above to be competitive.\n"
            "3. **NBTs**: Most universities require you to write the National Benchmark Tests (Academic Literacy, Quantitative Literacy, and Mathematics).\n"
            "4. **Community Work**: Having volunteer hours at clinics or community projects strongly improves your selection score."
        )
    elif "apprenticeships better" in q or ("apprenticeship" in q and "degree" in q):
        response = (
            "This depends on your career goals and learning preferences! Here is a South African perspective:\n\n"
            "*   **Apprenticeships (Artisan Routes)**: Focus on hands-on practical skills (e.g., Solar Electrician, Welder, Toolmaker, Diesel Mechanic). "
            "You get paid a stipend while learning, skip massive student debt, and can pass a **Red Seal Trade Test** in 3-4 years. "
            "Very high employment rate due to local technical shortages.\n"
            "*   **University Degrees**: Better suited for academic, analytical, or corporate leadership paths (e.g., Software Architecture, Financial Analytics, Medicine). "
            "It requires significant financial investment, takes 3-6 years of classroom study, and entry requirements are high.\n\n"
            "Check out the **Opportunities** tab to view live apprenticeships and learnerships!"
        )
    elif ("verify" in q and "college" in q) or "fake college" in q or "unaccredited" in q:
        response = (
            "Spotting unregistered colleges is crucial to protect your future. Here is how to verify a college in South Africa:\n\n"
            "1. **Check SAQA Registry**: Ask the college for their specific SAQA Qualification ID number. Search this ID on the SAQA website (saqa.org.za).\n"
            "2. **Look for DHET registration**: Every private college must display their registration certificate showing their DHET registration number (e.g., 2018/FE07/005).\n"
            "3. **Look up UMALUSI**: For Matric rewrites or technical N-diplomas, ensure the center is accredited by Umalusi or a Quality Council (like QCTO).\n\n"
            "Try entering the college name into our **Course Validator** tool to run a quick diagnostic test!"
        )
    elif "software engineering" in q or "programmer" in q or "developer" in q:
        response = (
            "Excellent choice. Software Engineering is one of the highest-demand careers in South Africa. Here is your roadmap:\n\n"
            "1. **High School Subjects**: Pure Mathematics is highly recommended (min 60% for university degree entry). Physical Sciences and IT are helpful, but not always compulsory.\n"
            "2. **University Options**:\n"
            "    *   *BSc in Computer Science* (focuses on algorithms, logic, theory)\n"
            "    *   *BEng in Software Engineering* (focuses on architecture, system builds)\n"
            "    *   *National Diploma in IT* (more practical coding emphasis)\n"
            "3. **Alternative Routes**: Bootcamps (WeThinkCode_, HyperionDev) or TVET N4-N6 in systems development.\n\n"
            "Check out the **Career Explorer** for detailed salary benchmarks and linked bursaries for Software Developers!"
        )
    else:
        response = (
            "Sharp! Thanks for asking. I can guide you on:\n"
            "*   Subject requirements for engineering, finance, or medicine.\n"
            "*   Bridging TVET N-Diplomas to university degrees (RPL).\n"
            "*   NSFAS and ISFAP funding eligibility.\n"
            "*   Identifying unaccredited colleges and fake degrees.\n\n"
            "What specific career or funding question do you want to tackle next?"
        )
    return {"response": response}

@app.post("/api/sso/token")
def create_token(request: TokenRequest):
    payload = {
        "sub": request.name,
        "level": request.level,
        "prov": request.province,
        "subjects": request.subjects,
        "interests": request.interests,
        "iss": "pathway.co.za",
        "exp": int(time.time()) + 3600
    }
    token = generate_jwt(payload)
    return {"token": token}
