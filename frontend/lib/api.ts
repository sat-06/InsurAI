import axios, { AxiosError, AxiosInstance } from "axios";
import type {
  PredictRequest,
  PredictResponse,
  RiskScoreRequest,
  RiskScoreResponse,
  SegmentRequest,
  SegmentResponse,
  UnderwritingRequest,
  UnderwritingResponse,
  PredictionFormInput,
  DashboardResult,
  ApiErrorShape,
} from "@/types";

// ============================================================
// Base configuration
// ============================================================

export const API_BASE_URL = "http://127.0.0.1:8000";

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/** Normalizes any axios/network failure into a friendly shape the UI can render. */
export function normalizeApiError(error: unknown): ApiErrorShape {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<{ detail?: string; message?: string }>;

    if (!err.response) {
      return {
        message:
          "Can't reach the InsurAI backend. Make sure the FastAPI server is running on http://127.0.0.1:8000.",
        isNetworkError: true,
      };
    }

    const detail =
      err.response.data?.detail || err.response.data?.message || err.message;

    return {
      message: detail || "The server returned an unexpected error.",
      status: err.response.status,
      isNetworkError: false,
    };
  }

  return {
    message: "Something unexpected went wrong. Please try again.",
    isNetworkError: false,
  };
}

// ============================================================
// Individual endpoint calls
// ============================================================

export async function predictCharges(
  payload: PredictRequest
): Promise<PredictResponse> {
  const { data } = await apiClient.post<PredictResponse>("/predict", payload);
  return data;
}

export async function getRiskScore(
  payload: RiskScoreRequest
): Promise<RiskScoreResponse> {
  const { data } = await apiClient.post<RiskScoreResponse>(
    "/risk-score",
    payload
  );
  return data;
}

export async function getSegment(
  payload: SegmentRequest
): Promise<SegmentResponse> {
  const { data } = await apiClient.post<SegmentResponse>("/segment", payload);
  return data;
}

export async function getUnderwriting(
  payload: UnderwritingRequest
): Promise<UnderwritingResponse> {
  const { data } = await apiClient.post<UnderwritingResponse>(
    "/underwriting",
    payload
  );
  return data;
}

export async function pingBackend(): Promise<boolean> {
  try {
    await apiClient.get("/");
    return true;
  } catch {
    return false;
  }
}

// ============================================================
// Sequential pipeline
//
// predict -> risk-score -> segment (needs predicted_charges) ->
// underwriting (needs risk_score + predicted_charges, claim_probability
// is hardcoded to 60 for now)
// ============================================================

export const HARDCODED_CLAIM_PROBABILITY = 60;

export type PipelineStep = "predict" | "riskScore" | "segment" | "underwriting";

export interface PipelineCallbacks {
  onStepStart?: (step: PipelineStep) => void;
  onStepSuccess?: (step: PipelineStep) => void;
  onStepError?: (step: PipelineStep, error: ApiErrorShape) => void;
}

export async function runPredictionPipeline(
  input: PredictionFormInput,
  callbacks: PipelineCallbacks = {}
): Promise<DashboardResult> {
  const { onStepStart, onStepSuccess, onStepError } = callbacks;

  // Step 1: /predict
  onStepStart?.("predict");
  let predicted_charges: number;
  try {
    const res = await predictCharges({
      age: input.age,
      sex: input.sex,
      bmi: input.bmi,
      children: input.children,
      smoker: input.smoker,
    });
    predicted_charges = res.predicted_charges;
    onStepSuccess?.("predict");
  } catch (error) {
    const normalized = normalizeApiError(error);
    onStepError?.("predict", normalized);
    throw normalized;
  }

  // Step 2: /risk-score
  onStepStart?.("riskScore");
  let risk_score: number;
  let risk_category: string;
  try {
    const res = await getRiskScore({
      age: input.age,
      bmi: input.bmi,
      smoker: input.smoker,
      children: input.children,
    });
    risk_score = res.risk_score;
    risk_category = res.category;
    onStepSuccess?.("riskScore");
  } catch (error) {
    const normalized = normalizeApiError(error);
    onStepError?.("riskScore", normalized);
    throw normalized;
  }

  // Step 3: /segment (needs predicted_charges)
  onStepStart?.("segment");
  let segment: string;
  try {
    const res = await getSegment({
      age: input.age,
      bmi: input.bmi,
      children: input.children,
      predicted_charges,
    });
    segment = res.segment;
    onStepSuccess?.("segment");
  } catch (error) {
    const normalized = normalizeApiError(error);
    onStepError?.("segment", normalized);
    throw normalized;
  }

  // Step 4: /underwriting (needs risk_score + predicted_charges, claim_probability hardcoded)
  onStepStart?.("underwriting");
  let recommendation: string;
  try {
    const res = await getUnderwriting({
      risk_score,
      predicted_charges,
      claim_probability: HARDCODED_CLAIM_PROBABILITY,
    });
    recommendation = res.recommendation;
    onStepSuccess?.("underwriting");
  } catch (error) {
    const normalized = normalizeApiError(error);
    onStepError?.("underwriting", normalized);
    throw normalized;
  }

  return {
    input,
    predicted_charges,
    risk_score,
    risk_category,
    segment,
    claim_probability: HARDCODED_CLAIM_PROBABILITY,
    recommendation,
    timestamp: new Date().toISOString(),
  };
}
