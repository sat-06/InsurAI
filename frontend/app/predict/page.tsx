"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  History,
  RotateCcw,
  Sparkles,
  Loader2,
} from "lucide-react";

import PredictionForm from "@/components/PredictionForm";
import PredictionCard from "@/components/PredictionCard";
import RiskCard from "@/components/RiskCard";
import SegmentCard from "@/components/SegmentCard";
import { UnderwritingCard } from "@/components/UnderwritingCard";
import ErrorToast, {
  NetworkErrorCard,
} from "@/components/ErrorToast";
import { Button } from "@/components/ui/button";

import { runPredictionPipeline } from "@/lib/api";
import { formatINR } from "@/lib/utils";

import type {
  CompletePredictionResult,
  PredictionFormData,
} from "@/types";


type ApiStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";


interface PredictionHistoryItem {
  id: string;
  date: string;
  age: number;
  sex: "male" | "female";
  smoker: "yes" | "no";
  predicted_charges: number;
  risk_category: string;
  segment: string;
}


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
    segment: "High Risk Individual",
  },
  {
    id: "hist-3",
    date: "2026-06-25",
    age: 41,
    sex: "male",
    smoker: "no",
    predicted_charges: 13980,
    risk_category: "Moderate Risk",
    segment: "Family Protector",
  },
  {
    id: "hist-4",
    date: "2026-06-24",
    age: 63,
    sex: "female",
    smoker: "no",
    predicted_charges: 18640,
    risk_category: "Moderate Risk",
    segment: "Senior Citizen",
  },
];


export default function PredictPage() {
  const [status, setStatus] =
    useState<ApiStatus>("idle");

  const [result, setResult] =
    useState<CompletePredictionResult | null>(null);

  const [error, setError] =
    useState<{ message: string } | null>(null);

  const [history, setHistory] =
    useState<PredictionHistoryItem[]>(DUMMY_HISTORY);


  async function handleSubmit(
    input: PredictionFormData
  ) {
    setStatus("loading");
    setError(null);
    setResult(null);

    try {
      const pipelineResult =
        await runPredictionPipeline(input);

      setResult(pipelineResult);
      setStatus("success");

      const newHistoryItem: PredictionHistoryItem = {
        id: `hist-${Date.now()}`,
        date: new Date()
          .toISOString()
          .slice(0, 10),

        age: input.age,
        sex: input.sex,
        smoker: input.smoker,

        predicted_charges:
          pipelineResult.predicted_charges,

        risk_category:
          pipelineResult.risk_category,

        segment:
          pipelineResult.segment,
      };

      setHistory((previousHistory) => [
        newHistoryItem,
        ...previousHistory,
      ]);
    } catch (err) {
      console.error(
        "Prediction pipeline failed:",
        err
      );

      setError({
        message:
          err instanceof Error
            ? err.message
            : "Prediction failed. Please try again.",
      });

      setStatus("error");
    }
  }


  function handleReset() {
    setStatus("idle");
    setResult(null);
    setError(null);
  }


  return (
    <div className="relative min-h-screen pb-24 pt-32">

      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial-glow" />

      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_40%_at_50%_0%,#000_20%,transparent_75%)]" />


      <div className="container relative">

        {/* Page heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
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
            Fill in the patient profile below.
            InsurAI will predict insurance charges,
            calculate health risk, segment the customer,
            and generate an underwriting recommendation.
          </p>
        </motion.div>


        {/* Main layout */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-5">

          {/* Form column */}
          <div className="lg:col-span-2">

            <PredictionForm
              onSubmit={handleSubmit}
              isSubmitting={status === "loading"}
            />


            {/* Loading pipeline */}
            {status === "loading" && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="glass mt-5 rounded-2xl border border-border p-5"
              >
                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-zinc-200">
                      Running AI pipeline
                    </p>

                    <p className="mt-0.5 text-xs text-zinc-500">
                      Prediction → Risk → Segment → Underwriting
                    </p>
                  </div>

                </div>
              </motion.div>
            )}

          </div>


          {/* Result column */}
          <div className="lg:col-span-3">

            <AnimatePresence mode="wait">

              {/* Error */}
              {status === "error" && error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <NetworkErrorCard
                    message={error.message}
                    onRetry={handleReset}
                  />
                </motion.div>
              )}


              {/* Successful result */}
              {status === "success" && result && (
                <motion.div
                  key="result"
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                  }}
                  className="space-y-6"
                >

                  {/* Result header */}
                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-xs uppercase tracking-wider text-zinc-500">
                        Analysis Complete
                      </p>

                      <h2 className="mt-1 text-sm font-medium text-zinc-300">
                        Insurance Intelligence Dashboard
                      </h2>
                    </div>


                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                    >
                      <RotateCcw className="mr-2 h-3.5 w-3.5" />

                      New prediction
                    </Button>

                  </div>


                  {/* Dashboard cards */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    {/* Charge prediction */}
                    <div className="sm:col-span-2">
                      <PredictionCard
                        predictedCharges={
                          result.predicted_charges
                        }
                      />
                    </div>


                    {/* Risk score */}
                    <RiskCard
                      riskScore={
                        result.risk_score
                      }
                      category={
                        result.risk_category
                      }
                    />


                    {/* Customer segment */}
                    <SegmentCard
                      segment={
                        result.segment
                      }
                    />


                    {/* Underwriting */}
                    <div className="sm:col-span-2">
                      <UnderwritingCard
                        recommendation={
                          result.recommendation
                        }
                        riskCategory={
                          result.risk_level
                        }
                      />
                    </div>

                  </div>

                </motion.div>
              )}


              {/* Empty state */}
              {status === "idle" && (
                <motion.div
                  key="empty"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  className="glass flex h-full min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-border p-10 text-center"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <Sparkles className="h-7 w-7 text-primary" />
                  </div>


                  <p className="mt-4 text-sm font-medium text-zinc-300">
                    Your dashboard will appear here
                  </p>


                  <p className="mt-1 max-w-xs text-xs text-zinc-500">
                    Submit the form to see predicted charges,
                    health risk score, customer segment,
                    and underwriting recommendation.
                  </p>

                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>


        {/* Prediction history */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-60px",
          }}
          transition={{
            duration: 0.5,
          }}
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

                    <th className="px-5 py-3 font-medium">
                      Date
                    </th>

                    <th className="px-5 py-3 font-medium">
                      Profile
                    </th>

                    <th className="px-5 py-3 font-medium">
                      Predicted Charges
                    </th>

                    <th className="px-5 py-3 font-medium">
                      Risk
                    </th>

                    <th className="px-5 py-3 font-medium">
                      Segment
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {history.map((item) => (

                    <tr
                      key={item.id}
                      className="border-b border-border/60 text-zinc-300 last:border-b-0 hover:bg-white/[0.02]"
                    >

                      <td className="px-5 py-3.5 text-zinc-500">
                        {item.date}
                      </td>


                      <td className="px-5 py-3.5">
                        {item.age}y ·{" "}
                        {item.sex === "male"
                          ? "M"
                          : "F"}{" "}
                        ·{" "}
                        {item.smoker === "yes"
                          ? "Smoker"
                          : "Non-smoker"}
                      </td>


                      <td className="px-5 py-3.5 font-medium text-zinc-100">
                        {formatINR(
                          item.predicted_charges
                        )}
                      </td>


                      <td className="px-5 py-3.5">
                        {item.risk_category}
                      </td>


                      <td className="px-5 py-3.5">
                        {item.segment}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </motion.div>

      </div>


      {/* Error toast */}
      <ErrorToast
        error={
          status === "error"
            ? error
            : null
        }
        onDismiss={() =>
          setError(null)
        }
      />

    </div>
  );
}