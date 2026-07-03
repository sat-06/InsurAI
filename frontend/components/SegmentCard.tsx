"use client";

import { motion } from "framer-motion";
import {
  Baby,
  HeartPulse,
  PersonStanding,
  Sprout,
  Users2,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SegmentCardProps {
  segment: string;
}

function resolveIcon(segment: string): { Icon: LucideIcon; tone: string } {
  const lower = segment.toLowerCase();
  if (lower.includes("young")) return { Icon: Sprout, tone: "text-accent bg-accent/10" };
  if (lower.includes("senior") || lower.includes("elder"))
    return { Icon: PersonStanding, tone: "text-secondary bg-secondary/10" };
  if (lower.includes("family") || lower.includes("parent"))
    return { Icon: Baby, tone: "text-primary bg-primary/10" };
  if (lower.includes("risk") || lower.includes("chronic"))
    return { Icon: HeartPulse, tone: "text-error bg-error/10" };
  return { Icon: Users2, tone: "text-primary bg-primary/10" };
}

export default function SegmentCard({ segment }: SegmentCardProps) {
  const { Icon, tone } = resolveIcon(segment);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="card-lift flex h-full flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-400">
            <Users2 className="h-4 w-4 text-primary" />
            Customer Segment
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 14 }}
            className={`flex h-20 w-20 items-center justify-center rounded-3xl ${tone}`}
          >
            <Icon className="h-10 w-10" />
          </motion.div>
          <div>
            <p className="text-lg font-semibold text-zinc-50">{segment}</p>
            <p className="mt-1 text-xs text-zinc-500">
              Predicted customer cohort
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
