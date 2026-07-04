import axios from "axios";

import type {
  PredictionFormData,
  PredictionResponse,
  RiskScoreResponse,
  SegmentResponse,
  UnderwritingResponse,
  CompletePredictionResult,
} from "@/types";

export const API_BASE_URL = "https://insurai-api.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 120000,
});

export async function runPredictionPipeline(
  formData: PredictionFormData
): Promise<CompletePredictionResult> {
  // 1. Predict insurance charges
  const predictionResponse = await api.post<PredictionResponse>(
    "/predict",
    {
      age: formData.age,
      sex: formData.sex,
      bmi: formData.bmi,
      children: formData.children,
      smoker: formData.smoker,
    }
  );

  const predictedCharges =
    predictionResponse.data.predicted_charges;

  // 2. Calculate risk score
  const riskResponse = await api.post<RiskScoreResponse>(
    "/risk-score",
    {
      age: formData.age,
      bmi: formData.bmi,
      smoker: formData.smoker,
      children: formData.children,
    }
  );

  const riskScore = riskResponse.data.risk_score;
  const riskCategory = riskResponse.data.risk_category;

  // 3. Predict customer segment
  const segmentResponse = await api.post<SegmentResponse>(
    "/segment",
    {
      age: formData.age,
      bmi: formData.bmi,
      children: formData.children,
      predicted_charges: predictedCharges,
    }
  );

  const cluster = segmentResponse.data.cluster;
  const segment = segmentResponse.data.segment;

  // 4. Generate underwriting recommendation
  const underwritingResponse =
    await api.post<UnderwritingResponse>(
      "/underwriting",
      {
        risk_score: riskScore,
        predicted_charges: predictedCharges,
      }
    );

  return {
    predicted_charges: predictedCharges,
    risk_score: riskScore,
    risk_category: riskCategory,
    cluster: cluster,
    segment: segment,
    risk_level: underwritingResponse.data.risk_level,
    recommendation:
      underwritingResponse.data.recommendation,
  };
}

export default api;