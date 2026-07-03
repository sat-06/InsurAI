"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: "primary" | "secondary" | "accent";
  index?: number;
}

const accentMap = {
  primary: {
    ring: "group-hover:border-primary/40",
    glow: "from-primary/20",
    icon: "text-primary bg-primary/10",
  },
  secondary: {
    ring: "group-hover:border-secondary/40",
    glow: "from-secondary/20",
    icon: "text-secondary bg-secondary/10",
  },
  accent: {
    ring: "group-hover:border-accent/40",
    glow: "from-accent/20",
    icon: "text-accent bg-accent/10",
  },
};

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  accent = "primary",
  index = 0,
}: FeatureCardProps) {
  const tone = accentMap[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`card-lift group relative overflow-hidden rounded-2xl border border-border bg-card p-6 ${tone.ring}`}
    >
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${tone.glow} to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
      />
      <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${tone.icon}`}>
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-zinc-50">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
    </motion.div>
  );
}
