// ============================================================
// InsurAI — Shared TypeScript Types
// ============================================================

export type Sex = "male" | "female";
export type SmokerStatus = "yes" | "no";

// ---------- Form input (what the user fills in) ----------
export interface PredictionFormInput {
  age: number;
  sex: Sex;
  bmi: number;
  children: number;
  smoker: SmokerStatus;
}

// ---------- POST /predict ----------
export interface PredictRequest {
  age: number;
  sex: Sex;
  bmi: number;
  children: number;
  smoker: SmokerStatus;
}

export interface PredictResponse {
  predicted_charges: number;
}

// ---------- POST /risk-score ----------
export interface RiskScoreRequest {
  age: number;
  bmi: number;
  smoker: SmokerStatus;
  children: number;
}

export type RiskCategory = "Low Risk" | "Moderate Risk" | "High Risk" | string;

export interface RiskScoreResponse {
  risk_score: number;
  category: RiskCategory;
}

// ---------- POST /segment ----------
export interface SegmentRequest {
  age: number;
  bmi: number;
  children: number;
  predicted_charges: number;
}

export interface SegmentResponse {
  segment: string;
}

// ---------- POST /underwriting ----------
export interface UnderwritingRequest {
  risk_score: number;
  predicted_charges: number;
  claim_probability: number;
}

export interface UnderwritingResponse {
  recommendation: string;
}

// ---------- Aggregated dashboard result ----------
export interface DashboardResult {
  input: PredictionFormInput;
  predicted_charges: number;
  risk_score: number;
  risk_category: RiskCategory;
  segment: string;
  claim_probability: number;
  recommendation: string;
  timestamp: string;
}

// ---------- Prediction history (dummy for now) ----------
export interface PredictionHistoryItem {
  id: string;
  date: string;
  age: number;
  sex: Sex;
  smoker: SmokerStatus;
  predicted_charges: number;
  risk_category: RiskCategory;
  segment: string;
}

// ---------- Async / API state ----------
export type ApiStatus = "idle" | "loading" | "success" | "error";

export interface StepStatus {
  predict: ApiStatus;
  riskScore: ApiStatus;
  segment: ApiStatus;
  underwriting: ApiStatus;
}

export interface ApiErrorShape {
  message: string;
  status?: number;
  isNetworkError?: boolean;
}
