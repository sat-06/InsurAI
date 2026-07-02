import joblib
import pandas as pd
from fastapi import APIRouter

router = APIRouter()

# Load trained model
model = joblib.load("ml/saved_models/insurance_model.pkl")

# Load feature order
feature_names = joblib.load("ml/saved_models/feature_names.pkl")


@router.post("/predict")
def predict(data: dict):

    sex = 1 if data["sex"].lower() == "male" else 0
    smoker = 1 if data["smoker"].lower() == "yes" else 0

    input_data = pd.DataFrame([{
    "age": data["age"],
    "sex": sex,
    "bmi": data["bmi"],
    "children": data["children"],
    "smoker": smoker,

    "region_northwest": 0,
    "region_southeast": 0,
    "region_southwest": 0,

    "bmi_category_Normal": 0,
    "bmi_category_Overweight": 0,
    "bmi_category_Obese": 0
}])

    # Ensure correct column order
    input_data = input_data[feature_names]

    prediction = model.predict(input_data)[0]

    return {
        "predicted_charges": round(float(prediction), 2)
    }