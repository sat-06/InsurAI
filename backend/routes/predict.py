from fastapi import APIRouter
import pandas as pd
import joblib

router = APIRouter()

# Load trained model
model = joblib.load("ml/saved_models/insurance_model.pkl")


@router.post("/predict")
def predict(data: dict):

    # Encode categorical variables
    sex = 1 if data["sex"].lower() == "male" else 0
    smoker = 1 if data["smoker"].lower() == "yes" else 0

    # Create input dataframe
    input_data = pd.DataFrame([
        {
            "age": data["age"],
            "sex": sex,
            "bmi": data["bmi"],
            "children": data["children"],
            "smoker": smoker
        }
    ])

    # Predict
    prediction = model.predict(input_data)[0]

    return {
        "predicted_charges": round(float(prediction), 2)
    }