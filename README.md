# 🏥 InsurAI — Intelligent Health Insurance Analytics Platform

InsurAI is an end-to-end Machine Learning powered health insurance analytics platform that predicts medical insurance charges, evaluates customer health risk, segments customers using clustering, and generates underwriting recommendations.

The project integrates a trained Machine Learning model with a FastAPI backend and a modern Next.js frontend to provide real-time insurance analytics through an interactive dashboard.

---

## 🚀 Overview

Traditional insurance cost estimation often relies on broad assumptions and manual risk assessment.

InsurAI demonstrates how Machine Learning and rule-based analytics can be combined to build an intelligent insurance decision-support system.

The platform processes customer information through a complete analytics pipeline:

```text
Customer Information
        ↓
Insurance Charge Prediction
        ↓
Health Risk Assessment
        ↓
Customer Segmentation
        ↓
Underwriting Recommendation
        ↓
Interactive Dashboard
```

---

## ✨ Key Features

### 💰 Insurance Charge Prediction

Predicts estimated medical insurance charges based on customer information such as:

- Age
- Gender
- BMI
- Number of Children
- Smoking Status

The prediction model is trained using historical medical insurance data.

Example output:

```text
Predicted Insurance Charges: ₹24,850
```

---

### 📊 Health Risk Scoring

Calculates a health risk score from `0–100` using factors such as:

- Age
- BMI
- Smoking Status
- Number of Children

Customers are categorized into:

- Low Risk
- Moderate Risk
- High Risk

Example:

```text
Risk Score: 64.5
Risk Category: High Risk
```

---

### 👥 Customer Segmentation

Uses K-Means Clustering to group customers based on:

- Age
- BMI
- Number of Children
- Predicted Insurance Charges

Customer segments include:

- Young Healthy Adult
- Family Protector
- High Risk Individual
- Senior Citizen

Example:

```text
Cluster: 1
Segment: Family Protector
```

---

### 📋 Underwriting Recommendation Engine

Generates underwriting recommendations based on:

- Health Risk Score
- Predicted Insurance Charges

Possible recommendations include:

```text
Basic Coverage
Standard Coverage
Premium Plan + Medical Screening
```

Example:

```text
Risk Level: High

Recommendation:
Premium Plan + Medical Screening
```

---

### 🌐 REST API Backend

The backend is built using FastAPI and exposes REST API endpoints for each analytics feature.

Available endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API health/welcome endpoint |
| POST | `/predict` | Predict insurance charges |
| POST | `/risk-score` | Calculate health risk score |
| POST | `/segment` | Predict customer segment |
| POST | `/underwriting` | Generate underwriting recommendation |

Interactive API documentation is available through Swagger UI.

```text
http://127.0.0.1:8000/docs
```

---

### 🖥️ Interactive Frontend Dashboard

The frontend is built with Next.js and TypeScript.

It provides:

- Customer profile input form
- Real-time prediction results
- Insurance charge visualization
- Health risk score display
- Customer segment display
- Underwriting recommendation
- Loading states
- Error handling
- Responsive design
- Smooth UI animations

---

## 🔄 End-to-End Prediction Pipeline

When a user submits customer information, the frontend executes the following pipeline:

```text
Next.js Prediction Form
        ↓
POST /predict
        ↓
Predicted Insurance Charges
        ↓
POST /risk-score
        ↓
Risk Score + Risk Category
        ↓
POST /segment
        ↓
Customer Segment
        ↓
POST /underwriting
        ↓
Risk Level + Recommendation
        ↓
Interactive Results Dashboard
```

This demonstrates complete integration between:

```text
Frontend
   ↓
REST API
   ↓
Machine Learning Model
   ↓
Analytics Engines
   ↓
Dashboard
```

---

## 🧠 Machine Learning Workflow

### 1. Data Exploration

The dataset was analyzed to understand:

- Feature distributions
- Relationships between variables
- Correlation with insurance charges
- Impact of smoking
- Impact of BMI
- Impact of age

---

### 2. Data Preprocessing

The preprocessing workflow includes:

- Data inspection
- Categorical encoding
- Feature engineering
- Feature selection
- Train-test splitting

---

### 3. Feature Engineering

Additional BMI-based categories were explored during preprocessing:

```text
Underweight
Normal
Overweight
Obese
```

Categorical variables were converted into machine-readable numerical representations.

---

### 4. Insurance Charge Prediction

A regression model predicts medical insurance charges.

Core input features used by the deployed prediction pipeline:

```text
age
sex
bmi
children
smoker
```

---

### 5. Customer Segmentation

K-Means Clustering is used for unsupervised customer segmentation.

Clustering features:

```text
age
bmi
children
predicted_charges
```

The clustering pipeline uses feature scaling before K-Means prediction.

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios
- Lucide React

### Backend

- FastAPI
- Python
- Uvicorn

### Machine Learning & Data Science

- Scikit-learn
- Pandas
- NumPy
- Joblib
- Jupyter Notebook

### Development Tools

- Git
- GitHub
- VS Code
- Swagger UI

---

## 📂 Project Structure

```text
InsurAI/
│
├── backend/
│   ├── app.py
│   │
│   ├── routes/
│   │   ├── predict.py
│   │   ├── risk.py
│   │   ├── segmentation.py
│   │   └── underwriting.py
│   │
│   └── utils/
│       ├── risk_score.py
│       ├── segment.py
│       └── underwriting_rules.py
│
├── dataset/
│   └── insurance.csv
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   ├── types/
│   ├── package.json
│   └── tailwind.config.ts
│
├── ml/
│   ├── notebooks/
│   │   └── Model_Training.ipynb
│   │
│   ├── saved_models/
│   │   ├── insurance_model.pkl
│   │   ├── feature_names.pkl
│   │   ├── kmeans_model.pkl
│   │   └── scaler.pkl
│   │
│   └── training/
│       └── customer_segmentation.py
│
└── README.md
```

---

## 📊 Dataset

The project uses a medical insurance dataset containing customer demographic and health-related information.

| Feature | Description |
|---|---|
| `age` | Age of insured person |
| `sex` | Gender |
| `bmi` | Body Mass Index |
| `children` | Number of dependents |
| `smoker` | Smoking status |
| `region` | Residential region |
| `charges` | Medical insurance charges |

Target variable:

```text
charges
```

---

## ⚙️ Running the Project Locally

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd InsurAI
```

---

### 2. Install Backend Dependencies

```bash
pip install fastapi uvicorn pandas numpy scikit-learn joblib
```

---

### 3. Start the FastAPI Backend

From the project root:

```bash
python -m uvicorn backend.app:app --reload
```

Backend server:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

---

### 4. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

---

### 5. Start the Next.js Frontend

```bash
npm run dev
```

Frontend application:

```text
http://localhost:3000
```

---

## 📡 API Examples

### Insurance Charge Prediction

Endpoint:

```text
POST /predict
```

Example request:

```json
{
  "age": 25,
  "sex": "male",
  "bmi": 24.5,
  "children": 1,
  "smoker": "no"
}
```

Example response:

```json
{
  "predicted_charges": 8420.5
}
```

---

### Health Risk Score

Endpoint:

```text
POST /risk-score
```

Example request:

```json
{
  "age": 25,
  "bmi": 24.5,
  "smoker": "no",
  "children": 1
}
```

Example response:

```json
{
  "risk_score": 24.25,
  "risk_category": "Low Risk"
}
```

---

### Customer Segmentation

Endpoint:

```text
POST /segment
```

Example request:

```json
{
  "age": 25,
  "bmi": 24.5,
  "children": 1,
  "predicted_charges": 8420.5
}
```

Example response:

```json
{
  "cluster": 0,
  "segment": "Young Healthy Adult"
}
```

---

### Underwriting Recommendation

Endpoint:

```text
POST /underwriting
```

Example request:

```json
{
  "risk_score": 24.25,
  "predicted_charges": 8420.5
}
```

Example response:

```json
{
  "risk_level": "Low",
  "recommendation": "Basic Coverage"
}
```

---

## 🎯 Use Cases

### For Customers

- Estimate potential medical insurance charges
- Understand health risk classification
- Receive a simplified insurance profile

### For Insurance Analytics

- Customer risk profiling
- Customer segmentation
- Underwriting decision support
- Data-driven insurance analytics

---

## 📸 Screenshots

Add screenshots of the working application here.

Suggested screenshots:

```text
1. Landing Page
2. Prediction Form
3. Complete Prediction Dashboard
4. Swagger API Documentation
```

Example:

```markdown
![InsurAI Landing Page](docs/screenshots/landing-page.png)

![Prediction Dashboard](docs/screenshots/prediction-dashboard.png)
```

---

## 🔮 Future Enhancements

Potential future improvements include:

- SHAP-based model explainability
- Advanced ensemble regression models
- Model comparison experiments
- Database-backed prediction history
- User authentication
- Cloud deployment
- Docker containerization
- Automated testing
- CI/CD pipeline
- Model monitoring
- Real claim prediction using claim-labeled datasets

---

## 📚 What This Project Demonstrates

InsurAI demonstrates practical experience with:

- End-to-end Machine Learning development
- Regression modeling
- Unsupervised learning with K-Means
- Feature preprocessing
- Model serialization with Joblib
- REST API development with FastAPI
- Frontend development with Next.js
- Type-safe API integration with TypeScript
- Frontend-backend integration
- Error handling
- ML model deployment architecture

---

## 👨‍💻 Author

**Satyam Kulkarni**

AI & Data Science Student

---

## ⭐ Project Status

```text
InsurAI v1 — Completed
```

Core functionality is implemented and working end-to-end:

- ✅ Insurance Charge Prediction
- ✅ Health Risk Scoring
- ✅ Customer Segmentation
- ✅ Underwriting Recommendation
- ✅ FastAPI Backend
- ✅ Next.js Frontend
- ✅ Frontend-Backend Integration
