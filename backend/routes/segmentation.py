from fastapi import APIRouter
from backend.utils.segment import predict_customer_segment

router = APIRouter()


@router.post("/segment")
def segment(data: dict):

    result = predict_customer_segment(
        age=data["age"],
        bmi=data["bmi"],
        children=data["children"],
        predicted_charges=data["predicted_charges"]
    )

    return result