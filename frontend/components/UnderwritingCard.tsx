"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Gauge } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UnderwritingCardProps {
  recommendation: string;
  riskCategory: string;
}

function recommendationTone(rec: string) {
  const lower = rec.toLowerCase();

  if (lower.includes("decline") || lower.includes("reject")) {
    return "border-error/30 bg-error/10 text-error";
  }

  if (
    lower.includes("high") ||
    lower.includes("loaded") ||
    lower.includes("extra")
  ) {
    return "border-secondary/30 bg-secondary/10 text-secondary";
  }

  return "border-accent/30 bg-accent/10 text-accent";
}

export function UnderwritingCard({
  recommendation,
  riskCategory,
}: UnderwritingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="sm:col-span-2 lg:col-span-3"
    >
      <Card className="card-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-400">
            <ClipboardCheck className="h-4 w-4 text-accent" />
            Underwriting Recommendation
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Recommendation */}
            <div
              className={`flex flex-col justify-center rounded-2xl border p-5 ${recommendationTone(
                recommendation
              )}`}
            >
              <p className="text-xs font-medium uppercase tracking-wide opacity-80">
                Recommendation
              </p>

              <p className="mt-2 text-xl font-bold">
                {recommendation}
              </p>
            </div>

            {/* Risk Level */}
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-[#0F0F12] p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10">
                <Gauge className="h-5 w-5 text-secondary" />
              </div>

              <div>
                <p className="text-xs text-zinc-500">
                  Risk Level
                </p>

                <p className="text-base font-semibold text-zinc-100">
                  {riskCategory}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}