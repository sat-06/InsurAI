from fastapi import APIRouter
from backend.utils.risk_score import calculate_risk_score

router = APIRouter()

@router.post("/risk-score")
def get_risk_score(data: dict):

    result = calculate_risk_score(
        age=data["age"],
        bmi=data["bmi"],
        smoker=data["smoker"],
        children=data["children"]
    )

    return result