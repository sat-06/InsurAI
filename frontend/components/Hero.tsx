"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/AnimatedCounter";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const STATS = [
  { value: 94, suffix: "%", label: "Model accuracy" },
  { value: 12000, suffix: "+", label: "Predictions served" },
  { value: 40, suffix: "ms", label: "Avg. response time" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-40 sm:pt-48">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial-glow" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh" />
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_20%,transparent_75%)]" />

      <motion.div
        animate={{ y: [0, -16, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-10 left-1/2 h-72 w-72 -translate-x-[120%] rounded-full bg-primary/20 blur-[100px]"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="pointer-events-none absolute top-20 left-1/2 h-72 w-72 translate-x-[40%] rounded-full bg-accent/20 blur-[100px]"
      />

      <div className="container relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-zinc-300"
          >
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            Powered by Scikit-Learn &amp; FastAPI
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl"
          >
            AI Powered{" "}
            <span className="text-gradient">Health Insurance</span>{" "}
            Analytics
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="mt-6 max-w-xl text-balance text-base text-zinc-400 sm:text-lg"
          >
            Predict insurance costs using Machine Learning. Score risk,
            segment customers, and generate underwriting recommendations —
            all in one dashboard.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.3}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Button size="lg" asChild>
              <Link href="/predict" className="flex items-center gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.45}
          className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-4 border-t border-border/60 pt-10"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-white sm:text-3xl">
                <AnimatedCounter
                  value={stat.value}
                  formatter={(v) => `${v.toLocaleString("en-IN")}${stat.suffix}`}
                />
              </p>
              <p className="mt-1 text-xs text-zinc-500 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
