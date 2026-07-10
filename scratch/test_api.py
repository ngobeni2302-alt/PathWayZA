# scratch/test_api.py
import sys
import os

# Add parent directory to path so we can import main
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import main
from main import MatcherRequest, ValidationRequest, ChatRequest, TokenRequest

def test_careers():
    print("Testing get_careers...")
    # Get all careers
    res = main.get_careers()
    assert len(res) >= 12
    print(f"  Total careers: {len(res)}")

    # Filter by Tech
    res_tech = main.get_careers(sector="Tech")
    assert all(c["sector"] == "Tech" for c in res_tech)
    print(f"  Tech careers: {len(res_tech)}")

    # Filter by query
    res_query = main.get_careers(query="Software")
    assert len(res_query) > 0
    print(f"  Query 'Software' matched: {[c['name'] for c in res_query]}")
    print("✓ get_careers passed!")

def test_bursaries():
    print("Testing get_bursaries...")
    res = main.get_bursaries()
    assert len(res) >= 5
    res_query = main.get_bursaries(query="NSFAS")
    assert len(res_query) == 1
    print("✓ get_bursaries passed!")

def test_opportunities():
    print("Testing get_opportunities...")
    res = main.get_opportunities(type="Internship")
    assert all(o["type"] == "Internship" for o in res)
    print("✓ get_opportunities passed!")

def test_trends():
    print("Testing get_trends...")
    res = main.get_trends("technology")
    assert "Tech Job" in res["datasets"][0]["label"]
    print("✓ get_trends passed!")

def test_matcher():
    print("Testing match_careers...")
    req = MatcherRequest(
        subjects=["Pure Mathematics", "Information Technology", "Physical Sciences"],
        interests=["coding"]
    )
    res = main.match_careers(req)
    # The top match should be Software Engineer or Data Scientist
    top_match = res[0]
    print(f"  Top Match for IT/Maths/Physics: {top_match['career']['name']} with score {top_match['score']}%")
    assert top_match["score"] >= 75
    assert not top_match["mathLockout"]

    # Test Math Lit lockout
    req_lit = MatcherRequest(
        subjects=["Mathematical Literacy"],
        interests=["coding"]
    )
    res_lit = main.match_careers(req_lit)
    soft_eng_match = next(item for item in res_lit if item["career"]["id"] == "soft-eng")
    print(f"  Software Engineer match with Math Lit: {soft_eng_match['score']}% (Lockout: {soft_eng_match['mathLockout']})")
    assert soft_eng_match["mathLockout"]
    assert soft_eng_match["score"] <= 50
    print("✓ match_careers passed!")

def test_validate():
    print("Testing validate_institution...")
    # Public University
    req_uct = ValidationRequest(institution="University of Cape Town", qualification="BSc")
    res_uct = main.validate_institution(req_uct)
    assert res_uct["accredited"] is True
    assert res_uct["details"]["code"] == "UCT"
    print(f"  UCT Validation: Accredited = {res_uct['accredited']}, Type = {res_uct['details']['type']}")

    # Accredited Private College (Rosebank College)
    req_rc = ValidationRequest(institution="Rosebank College", qualification="Diploma")
    res_rc = main.validate_institution(req_rc)
    assert res_rc["accredited"] is True
    print(f"  Rosebank College Validation: Accredited = {res_rc['accredited']}, SAQA ID = {res_rc['details']['saqaId']}")

    # Unaccredited Bogus College
    req_fake = ValidationRequest(institution="Fake SA College", qualification="Degree")
    res_fake = main.validate_institution(req_fake)
    assert res_fake["accredited"] is False
    assert res_fake["details"]["warningCode"] == "LOW-VALUE-FLAG"
    print(f"  Fake SA College Validation: Accredited = {res_fake['accredited']}, Warning = {res_fake['details']['warningCode']}")

    # Unlisted College
    req_unlisted = ValidationRequest(institution="Unknown Random Academy", qualification="Certificate")
    res_unlisted = main.validate_institution(req_unlisted)
    assert res_unlisted["accredited"] is None
    print(f"  Unlisted Validation: Accredited = {res_unlisted['accredited']}")
    print("✓ validate_institution passed!")

def test_chat():
    print("Testing chat_response...")
    req = ChatRequest(message="What is the difference between NSFAS and ISFAP?")
    res = main.chat_response(req)
    assert "Missing Middle" in res["response"]
    print("✓ chat_response passed!")

def test_sso_token():
    print("Testing SSO Token generation...")
    req = TokenRequest(
        name="Test Student",
        level="Grade 12",
        province="Gauteng",
        subjects=["English", "Maths"],
        interests=["coding"]
    )
    res = main.create_token(req)
    token = res["token"]
    assert len(token.split(".")) == 3
    print(f"  Generated Token: {token[:30]}...{token[-30:]}")
    print("✓ create_token passed!")

if __name__ == "__main__":
    try:
        test_careers()
        test_bursaries()
        test_opportunities()
        test_trends()
        test_matcher()
        test_validate()
        test_chat()
        test_sso_token()
        print("\nAll unit tests passed successfully!")
    except AssertionError as e:
        print(f"\nAssertion Error occurred: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"\nUnexpected error occurred: {e}", file=sys.stderr)
        sys.exit(1)
