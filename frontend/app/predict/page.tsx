"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, History, RotateCcw, Sparkles } from "lucide-react";

import PredictionForm from "@/components/PredictionForm";
import PredictionCard from "@/components/PredictionCard";
import RiskCard from "@/components/RiskCard";
import SegmentCard from "@/components/SegmentCard";
import UnderwritingCard from "@/components/UnderwritingCard";
import ErrorToast, { NetworkErrorCard } from "@/components/ErrorToast";
import { InlineSpinner } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { runPredictionPipeline, type PipelineStep } from "@/lib/api";
import { formatINR } from "@/lib/utils";
import type {
  ApiErrorShape,
  ApiStatus,
  DashboardResult,
  PredictionFormInput,
  PredictionHistoryItem,
  StepStatus,
} from "@/types";

const STEP_LABELS: Record<PipelineStep, string> = {
  predict: "Predicting charges",
  riskScore: "Scoring risk",
  segment: "Segmenting customer",
  underwriting: "Generating recommendation",
};

const STEP_ORDER: PipelineStep[] = ["predict", "riskScore", "segment", "underwriting"];

const INITIAL_STEP_STATUS: StepStatus = {
  predict: "idle",
  riskScore: "idle",
  segment: "idle",
  underwriting: "idle",
};

const DUMMY_HISTORY: PredictionHistoryItem[] = [
  {
    id: "hist-1",
    date: "2026-06-28",
    age: 29,
    sex: "female",
    smoker: "no",
    predicted_charges: 8420,
    risk_category: "Low Risk",
    segment: "Young Healthy Adult",
  },
  {
    id: "hist-2",
    date: "2026-06-27",
    age: 54,
    sex: "male",
    smoker: "yes",
    predicted_charges: 27310,
    risk_category: "High Risk",
    segment: "High Risk",
  },
  {
    id: "hist-3",
    date: "2026-06-25",
    age: 41,
    sex: "male",
    smoker: "no",
    predicted_charges: 13980,
    risk_category: "Moderate Risk",
    segment: "Family Plan",
  },
  {
    id: "hist-4",
    date: "2026-06-24",
    age: 63,
    sex: "female",
    smoker: "no",
    predicted_charges: 18640,
    risk_category: "Moderate Risk",
    segment: "Senior Care",
  },
];

export default function PredictPage() {
  const [status, setStatus] = useState<ApiStatus>("idle");
  const [stepStatus, setStepStatus] = useState<StepStatus>(INITIAL_STEP_STATUS);
  const [result, setResult] = useState<DashboardResult | null>(null);
  const [error, setError] = useState<ApiErrorShape | null>(null);
  const [history, setHistory] = useState<PredictionHistoryItem[]>(DUMMY_HISTORY);

  async function handleSubmit(input: PredictionFormInput) {
    setStatus("loading");
    setError(null);
    setStepStatus(INITIAL_STEP_STATUS);

    try {
      const pipelineResult = await runPredictionPipeline(input, {
        onStepStart: (step) =>
          setStepStatus((prev) => ({ ...prev, [pipelineKey(step)]: "loading" })),
        onStepSuccess: (step) =>
          setStepStatus((prev) => ({ ...prev, [pipelineKey(step)]: "success" })),
        onStepError: (step) =>
          setStepStatus((prev) => ({ ...prev, [pipelineKey(step)]: "error" })),
      });

      setResult(pipelineResult);
      setStatus("success");
      setHistory((prev) => [
        {
          id: `hist-${Date.now()}`,
          date: new Date().toISOString().slice(0, 10),
          age: input.age,
          sex: input.sex,
          smoker: input.smoker,
          predicted_charges: pipelineResult.predicted_charges,
          risk_category: pipelineResult.risk_category,
          segment: pipelineResult.segment,
        },
        ...prev,
      ]);
    } catch (err) {
      setError(err as ApiErrorShape);
      setStatus("error");
    }
  }

  function handleReset() {
    setStatus("idle");
    setResult(null);
    setError(null);
    setStepStatus(INITIAL_STEP_STATUS);
  }

  return (
    <div className="relative min-h-screen pb-24 pt-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial-glow" />
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_40%_at_50%_0%,#000_20%,transparent_75%)]" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-zinc-300">
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            Prediction Dashboard
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Run a new prediction
          </h1>
          <p className="mt-3 text-sm text-zinc-400 sm:text-base">
            Fill in the patient profile below. InsurAI will call the
            prediction, risk, segmentation, and underwriting models in
            sequence.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Form column */}
          <div className="lg:col-span-2">
            <PredictionForm onSubmit={handleSubmit} isSubmitting={status === "loading"} />

            {status === "loading" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass mt-5 rounded-2xl border border-border p-5"
              >
                <p className="mb-4 text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Pipeline progress
                </p>
                <ul className="space-y-3">
                  {STEP_ORDER.map((step) => (
                    <StepRow
                      key={step}
                      label={STEP_LABELS[step]}
                      status={stepStatus[pipelineKey(step)]}
                    />
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Result column */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {status === "error" && error && (
                <motion.div key="error" exit={{ opacity: 0 }}>
                  <NetworkErrorCard message={error.message} onRetry={handleReset} />
                </motion.div>
              )}

              {status === "success" && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-zinc-400">
                      Results for a {result.input.age}-year-old {result.input.sex}
                    </h2>
                    <Button variant="ghost" size="sm" onClick={handleReset}>
                      <RotateCcw className="mr-2 h-3.5 w-3.5" />
                      New prediction
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="sm:col-span-2 lg:col-span-3">
                      <PredictionCard predictedCharges={result.predicted_charges} />
                    </div>
                    <RiskCard riskScore={result.risk_score} category={result.risk_category} />
                    <SegmentCard segment={result.segment} />
                    <div className="hidden lg:block" aria-hidden />
                    <UnderwritingCard
                      recommendation={result.recommendation}
                      riskCategory={result.risk_category}
                      claimProbability={result.claim_probability}
                    />
                  </div>
                </motion.div>
              )}

              {status === "idle" && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass flex h-full min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-border p-10 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <Sparkles className="h-7 w-7 text-primary" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-zinc-300">
                    Your dashboard will appear here
                  </p>
                  <p className="mt-1 max-w-xs text-xs text-zinc-500">
                    Submit the form to see predicted charges, risk score,
                    segment, and underwriting recommendation.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Prediction history (dummy) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-20 max-w-5xl"
        >
          <div className="mb-5 flex items-center gap-2">
            <History className="h-4 w-4 text-zinc-500" />
            <h2 className="text-sm font-medium text-zinc-400">
              Recent predictions
            </h2>
          </div>

          <div className="glass overflow-hidden rounded-2xl border border-border">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-zinc-500">
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Profile</th>
                    <th className="px-5 py-3 font-medium">Predicted Charges</th>
                    <th className="px-5 py-3 font-medium">Risk</th>
                    <th className="px-5 py-3 font-medium">Segment</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-border/60 text-zinc-300 last:border-b-0 hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-3.5 text-zinc-500">{item.date}</td>
                      <td className="px-5 py-3.5">
                        {item.age}y · {item.sex === "male" ? "M" : "F"} ·{" "}
                        {item.smoker === "yes" ? "Smoker" : "Non-smoker"}
                      </td>
                      <td className="px-5 py-3.5 font-medium text-zinc-100">
                        {formatINR(item.predicted_charges)}
                      </td>
                      <td className="px-5 py-3.5">{item.risk_category}</td>
                      <td className="px-5 py-3.5">{item.segment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>

      <ErrorToast error={status === "error" ? error : null} onDismiss={() => setError(null)} />
    </div>
  );
}

function pipelineKey(step: PipelineStep): keyof StepStatus {
  return step;
}

function StepRow({ label, status }: { label: string; status: ApiStatus }) {
  return (
    <li className="flex items-center gap-3 text-sm">
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs ${
          status === "success"
            ? "border-accent/40 bg-accent/10 text-accent"
            : status === "loading"
            ? "border-primary/40 bg-primary/10 text-primary"
            : status === "error"
            ? "border-error/40 bg-error/10 text-error"
            : "border-border bg-transparent text-zinc-600"
        }`}
      >
        {status === "success" ? (
          <Check className="h-3.5 w-3.5" />
        ) : status === "loading" ? (
          <InlineSpinner className="h-3 w-3" />
        ) : (
          "•"
        )}
      </span>
      <span
        className={
          status === "idle" ? "text-zinc-600" : "text-zinc-300"
        }
      >
        {label}
      </span>
    </li>
  );
}
