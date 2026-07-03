"use client";

import { motion } from "framer-motion";
import { IndianRupee, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedCounter from "@/components/AnimatedCounter";
import { formatINR } from "@/lib/utils";

interface PredictionCardProps {
  predictedCharges: number;
}

export default function PredictionCard({ predictedCharges }: PredictionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="card-lift relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-primary/20 blur-[80px]" />

        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-400">
              <IndianRupee className="h-4 w-4 text-primary" />
              Predicted Annual Charges
            </CardTitle>
            <span className="flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
              <TrendingUp className="h-3 w-3" />
              Estimate
            </span>
          </div>
        </CardHeader>

        <CardContent className="relative">
          <div className="flex items-baseline gap-2">
            <span className="bg-gradient-primary bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
              <AnimatedCounter value={predictedCharges} formatter={formatINR} />
            </span>
          </div>
          <p className="mt-3 text-sm text-zinc-500">
            Based on age, BMI, gender, dependents, and smoking status via our
            trained regression model.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
