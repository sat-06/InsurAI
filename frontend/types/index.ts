// ================================
// Form field types
// ================================

export type Sex = "male" | "female";

export type SmokerStatus = "yes" | "no";


// ================================
// Prediction form input
// ================================

export interface PredictionFormInput {
  age: number;
  sex: Sex;
  bmi: number;
  children: number;
  smoker: SmokerStatus;
}

// Alias used by the newer API layer
export type PredictionFormData = PredictionFormInput;


// ================================
// API responses
// ================================

export interface PredictionResponse {
  predicted_charges: number;
}

export interface RiskScoreResponse {
  risk_score: number;
  risk_category: string;
}

export interface SegmentResponse {
  cluster: number;
  segment: string;
}

export interface UnderwritingResponse {
  risk_level: string;
  recommendation: string;
}


// ================================
// Complete pipeline result
// ================================

export interface CompletePredictionResult {
  predicted_charges: number;

  risk_score: number;
  risk_category: string;

  cluster: number;
  segment: string;

  risk_level: string;
  recommendation: string;
}


// ================================
// Error handling
// ================================

export interface ApiErrorShape {
  message: string;
  isNetworkError?: boolean;
}


// ================================
// General API status
// Kept for compatibility with
// existing generated components
// ================================

export type ApiStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";


// ================================
// Pipeline step status
// Kept for compatibility
// ================================

export type PipelineStep =
  | "predict"
  | "riskScore"
  | "segment"
  | "underwriting";

export type PipelineStepState =
  | "idle"
  | "loading"
  | "success"
  | "error";

export type StepStatus = Record<
  PipelineStep,
  PipelineStepState
>;


// ================================
// Risk category compatibility
// ================================

export type RiskCategory =
  | "Low Risk"
  | "Moderate Risk"
  | "High Risk"
  | string;


// ================================
// Prediction history compatibility
// ================================

export interface PredictionHistoryItem {
  id: string;
  date: string;

  age: number;
  sex: Sex;
  smoker: SmokerStatus;

  predicted_charges: number;
  risk_category: string;
  segment: string;
}


// ================================
// Legacy dashboard compatibility
// ================================

export interface DashboardResult
  extends CompletePredictionResult {
  input?: PredictionFormInput;
}