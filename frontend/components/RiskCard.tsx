"use client";

import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RiskCategory } from "@/types";

interface RiskCardProps {
  riskScore: number;
  category: RiskCategory;
}

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function categoryTone(category: string) {
  const lower = (category ?? "Unknown Risk").toLowerCase();
  if (lower.includes("low")) {
    return { text: "text-accent", stroke: "#22C55E", bg: "bg-accent/10" };
  }
  if (lower.includes("high")) {
    return { text: "text-error", stroke: "#EF4444", bg: "bg-error/10" };
  }
  return { text: "text-secondary", stroke: "#06B6D4", bg: "bg-secondary/10" };
}

export default function RiskCard({ riskScore, category }: RiskCardProps) {
  const clamped = Math.min(Math.max(riskScore, 0), 100);
  const offset = CIRCUMFERENCE - (clamped / 100) * CIRCUMFERENCE;
  const tone = categoryTone(category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="card-lift h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-400">
            <ShieldAlert className="h-4 w-4 text-secondary" />
            Risk Score
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="relative flex h-40 w-40 items-center justify-center">
            <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
              <circle
                cx="70"
                cy="70"
                r={RADIUS}
                fill="none"
                stroke="#27272A"
                strokeWidth="10"
              />
              <motion.circle
                cx="70"
                cy="70"
                r={RADIUS}
                fill="none"
                stroke={tone.stroke}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-3xl font-bold text-white"
              >
                {Math.round(clamped)}
              </motion.span>
              <span className="text-xs text-zinc-500">/ 100</span>
            </div>
          </div>

          <span
            className={`mt-5 rounded-full px-4 py-1.5 text-sm font-medium ${tone.bg} ${tone.text}`}
          >
            {category}
          </span>
        </CardContent>
      </Card>
    </motion.div>
  );
}
