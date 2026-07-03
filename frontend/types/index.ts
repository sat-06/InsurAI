export interface PredictionFormData {
  age: number;
  sex: "male" | "female";
  bmi: number;
  children: number;
  smoker: "yes" | "no";
}

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

export interface CompletePredictionResult {
  predicted_charges: number;
  risk_score: number;
  risk_category: string;
  cluster: number;
  segment: string;
  risk_level: string;
  recommendation: string;
}