import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import joblib

# Load dataset
df = pd.read_csv("dataset/insurance.csv")

# Features for clustering
X = df[["age", "bmi", "children", "charges"]]

# Scale data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train KMeans
kmeans = KMeans(
    n_clusters=4,
    random_state=42,
    n_init=10
)

kmeans.fit(X_scaled)

# Save model
joblib.dump(
    kmeans,
    "ml/saved_models/kmeans_model.pkl"
)

# Save scaler
joblib.dump(
    scaler,
    "ml/saved_models/scaler.pkl"
)

print("KMeans model saved successfully")