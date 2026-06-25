import joblib
import numpy as np

# Load trained models
kmeans = joblib.load("ml/saved_models/kmeans_model.pkl")
scaler = joblib.load("ml/saved_models/scaler.pkl")

# Map cluster numbers to readable names
cluster_map = {
    0: "Young Healthy Adult",
    1: "Family Protector",
    2: "High Risk Individual",
    3: "Senior Citizen"
}


def predict_customer_segment(age, bmi, children, predicted_charges):
    """
    Predict customer segment using the trained K-Means model.
    """

    data = np.array([[age, bmi, children, predicted_charges]])

    scaled_data = scaler.transform(data)

    cluster = kmeans.predict(scaled_data)[0]

    return {
        "cluster": int(cluster),
        "segment": cluster_map.get(cluster, "Unknown")
    }