# 🏥 InsurAI - Intelligent Health Insurance Analytics Platform

An AI-powered InsurTech platform that predicts medical insurance charges, assesses customer risk, estimates claim probability, detects potential fraud, and assists insurance underwriting decisions using Machine Learning.

---

## 🚀 Overview

Traditional insurance premium estimation often lacks transparency and personalization. InsurAI leverages machine learning to provide accurate insurance charge predictions while helping both customers and insurers make data-driven decisions.

The platform goes beyond simple premium prediction by offering:

- Insurance Charge Prediction
- Health Risk Assessment
- Claim Probability Estimation
- Customer Segmentation
- Fraud Risk Detection
- Explainable AI Insights
- Underwriting Assistance
- AI Insurance Advisor

---

## ✨ Key Features

### 💰 Insurance Charge Prediction
Predict expected annual medical insurance charges based on:

- Age
- Gender
- BMI
- Number of Children
- Smoking Status
- Region

---

### 📊 Health Risk Scoring

Generate a comprehensive risk score ranging from 0-100.

Example:

```text
Risk Score: 82/100
Category: High Risk
```

---

### 📈 Claim Probability Prediction

Estimate the likelihood of future insurance claims.

Example:

```text
Claim Probability: 68%
Expected Claim Amount: ₹58,000
```

---

### 👥 Customer Segmentation

Automatically categorize customers into segments:

- Young Healthy Adult
- Family Protector
- High-Risk Individual
- Senior Citizen

---

### 🔍 Explainable AI Dashboard

Provide transparent predictions using:

- SHAP Values
- Feature Importance
- Decision Breakdown

Example:

```text
Predicted Charges: ₹42,500

Contributing Factors:
+ Smoking Status
+ High BMI
+ Age
```

---

### 🚨 Fraud Risk Detection

Identify potentially suspicious applications.

Example:

```text
Fraud Risk Score: 71%
Status: Requires Manual Review
```

---

### 📋 Underwriting Assistant

Generate underwriting recommendations.

Example:

```text
Risk Level: High

Predicted Charges: ₹45,000
Claim Probability: 72%

Recommendation:
Premium Plan + Medical Screening
```

---

### 🤖 AI Insurance Advisor

Interactive chatbot powered by LLMs.

Users can ask:

- Why is my premium high?
- How can I reduce my insurance costs?
- Which plan suits me best?
- What factors affect my risk score?

---

## 🧠 Machine Learning Pipeline

### Data Processing

- Missing Value Handling
- Outlier Detection
- Feature Engineering
- Label Encoding
- Data Normalization

### Models Evaluated

- Linear Regression
- Ridge Regression
- Random Forest Regressor
- XGBoost Regressor
- LightGBM Regressor

### Evaluation Metrics

- MAE
- MSE
- RMSE
- R² Score

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- ShadCN UI
- Recharts

### Backend

- FastAPI
- Python

### Machine Learning

- Scikit-Learn
- XGBoost
- LightGBM
- SHAP
- Pandas
- NumPy

### Database

- PostgreSQL

### Deployment

- Vercel
- Docker
- Render / Railway

---

## 📂 Project Structure

```text
InsurAI/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── charts/
│   └── pages/
│
├── backend/
│   ├── api/
│   ├── models/
│   ├── services/
│   └── utils/
│
├── ml/
│   ├── notebooks/
│   ├── training/
│   ├── prediction/
│   └── explainability/
│
├── dataset/
│
├── docs/
│
└── README.md
```

---

## 📊 Dataset

Dataset Features:

| Feature | Description |
|----------|------------|
| age | Age of insured person |
| sex | Gender |
| bmi | Body Mass Index |
| children | Number of dependents |
| smoker | Smoking status |
| region | Residential region |
| charges | Insurance charges (Target Variable) |

---

## 🎯 Use Cases

### For Customers

- Estimate insurance costs
- Understand risk factors
- Compare insurance plans
- Reduce future premiums

### For Insurance Companies

- Underwriting assistance
- Risk profiling
- Fraud prevention
- Claim forecasting
- Customer segmentation

---

## 🔮 Future Enhancements

- Real Insurance Plan Marketplace
- Multi-Provider Comparison Engine
- OCR-Based Medical Document Analysis
- Voice-Based Insurance Advisor
- Real-Time Policy Recommendation System
- Deep Learning Risk Models
- Federated Learning for Privacy-Preserving Predictions

---

## 📈 Model Performance

| Metric | Score |
|----------|--------|
| R² Score | XX.XX |
| RMSE | XX.XX |
| MAE | XX.XX |

*To be updated after training.*

---
