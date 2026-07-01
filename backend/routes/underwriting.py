from fastapi import APIRouter
from backend.utils.underwriting_rules import get_underwriting_recommendation

router = APIRouter()


@router.post("/underwriting")
def underwriting(data: dict):

    result = get_underwriting_recommendation(
        risk_score=data["risk_score"],
        predicted_charges=data["predicted_charges"]
    )

    return result