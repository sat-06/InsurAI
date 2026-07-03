"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  LineChart,
  ScanSearch,
  ShieldCheck,
  Users,
} from "lucide-react";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import StatsChart from "@/components/StatsChart";
import Footer from "@/components/Footer";

const FEATURES = [
  {
    icon: LineChart,
    title: "Insurance Prediction",
    description:
      "Estimate annual insurance charges from age, BMI, smoking status, and dependents using a trained regression model.",
    accent: "primary" as const,
  },
  {
    icon: ShieldCheck,
    title: "Risk Assessment",
    description:
      "Get a 0–100 risk score and category so underwriters can gauge exposure at a glance.",
    accent: "secondary" as const,
  },
  {
    icon: Users,
    title: "Customer Segmentation",
    description:
      "Automatically classify each customer into a meaningful cohort — from Young Healthy Adult to High Risk.",
    accent: "accent" as const,
  },
  {
    icon: ScanSearch,
    title: "Underwriting",
    description:
      "Turn risk score, predicted charges, and claim probability into a clear underwriting recommendation.",
    accent: "primary" as const,
  },
];

const ML_STACK = [
  { name: "Linear Regression", detail: "Core prediction model" },
  { name: "Scikit-Learn", detail: "Model training & inference" },
  { name: "FastAPI", detail: "High-performance backend" },
  { name: "Next.js", detail: "This frontend, server-rendered" },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Features */}
      <section id="features" className="container py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            What InsurAI Does
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Four models, one dashboard
          </h2>
          <p className="mt-4 text-sm text-zinc-400 sm:text-base">
            Every prediction run chains four purpose-built models to give you
            a complete picture of a policyholder.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} index={i} {...feature} />
          ))}
        </div>
      </section>

      {/* ML stack */}
      <section id="ml" className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="container relative">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                Under the hood
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Built on a proven ML stack
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
                A Linear Regression model trained with Scikit-Learn powers
                cost prediction, served through a FastAPI backend, and
                rendered here in a real-time Next.js dashboard.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {ML_STACK.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="card-lift glass rounded-2xl border border-border p-5"
                >
                  <BrainCircuit className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-sm font-semibold text-zinc-100">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">{item.detail}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <StatsChart />

      <Footer />
    </>
  );
}
