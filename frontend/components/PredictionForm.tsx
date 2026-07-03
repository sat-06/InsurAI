"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cake, Cigarette, Ruler, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InlineSpinner } from "@/components/Loading";
import type { PredictionFormInput, Sex, SmokerStatus } from "@/types";

interface PredictionFormProps {
  onSubmit: (input: PredictionFormInput) => void;
  isSubmitting: boolean;
}

interface FormErrors {
  age?: string;
  bmi?: string;
  children?: string;
}

const DEFAULTS = {
  age: "30",
  sex: "male" as Sex,
  bmi: "24.5",
  children: "0",
  smoker: "no" as SmokerStatus,
};

export default function PredictionForm({ onSubmit, isSubmitting }: PredictionFormProps) {
  const [age, setAge] = useState(DEFAULTS.age);
  const [sex, setSex] = useState<Sex>(DEFAULTS.sex);
  const [bmi, setBmi] = useState(DEFAULTS.bmi);
  const [children, setChildren] = useState(DEFAULTS.children);
  const [smoker, setSmoker] = useState<SmokerStatus>(DEFAULTS.smoker);
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const next: FormErrors = {};
    const ageNum = Number(age);
    const bmiNum = Number(bmi);
    const childrenNum = Number(children);

    if (!age || isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      next.age = "Enter an age between 1 and 120";
    }
    if (!bmi || isNaN(bmiNum) || bmiNum < 10 || bmiNum > 60) {
      next.bmi = "Enter a BMI between 10 and 60";
    }
    if (children === "" || isNaN(childrenNum) || childrenNum < 0 || childrenNum > 10) {
      next.children = "Enter a number between 0 and 10";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      age: Number(age),
      sex,
      bmi: Number(bmi),
      children: Number(children),
      smoker,
    });
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={handleSubmit}
      className="glass rounded-3xl border border-border p-6 sm:p-8"
    >
      <div className="mb-6 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-zinc-50">Patient details</h2>
          <p className="text-xs text-zinc-500">All fields are required for an accurate estimate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Age */}
        <div className="space-y-2">
          <Label htmlFor="age" className="flex items-center gap-1.5">
            <Cake className="h-3.5 w-3.5" /> Age
          </Label>
          <Input
            id="age"
            type="number"
            inputMode="numeric"
            placeholder="e.g. 30"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {errors.age && <p className="text-xs text-error">{errors.age}</p>}
        </div>

        {/* Sex */}
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" /> Gender
          </Label>
          <Select value={sex} onValueChange={(v) => setSex(v as Sex)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* BMI */}
        <div className="space-y-2">
          <Label htmlFor="bmi" className="flex items-center gap-1.5">
            <Ruler className="h-3.5 w-3.5" /> BMI
          </Label>
          <Input
            id="bmi"
            type="number"
            step="0.1"
            inputMode="decimal"
            placeholder="e.g. 24.5"
            value={bmi}
            onChange={(e) => setBmi(e.target.value)}
          />
          {errors.bmi && <p className="text-xs text-error">{errors.bmi}</p>}
        </div>

        {/* Children */}
        <div className="space-y-2">
          <Label htmlFor="children" className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" /> Children
          </Label>
          <Input
            id="children"
            type="number"
            inputMode="numeric"
            placeholder="e.g. 1"
            value={children}
            onChange={(e) => setChildren(e.target.value)}
          />
          {errors.children && <p className="text-xs text-error">{errors.children}</p>}
        </div>

        {/* Smoker */}
        <div className="space-y-2 sm:col-span-2">
          <Label className="flex items-center gap-1.5">
            <Cigarette className="h-3.5 w-3.5" /> Smoking status
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {(["no", "yes"] as SmokerStatus[]).map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => setSmoker(option)}
                className={`rounded-xl border px-4 py-2.5 text-sm font-medium capitalize transition-all duration-200 ${
                  smoker === option
                    ? "border-primary/50 bg-primary/10 text-white shadow-glow"
                    : "border-border bg-transparent text-zinc-400 hover:border-zinc-600"
                }`}
              >
                {option === "no" ? "Non-smoker" : "Smoker"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="mt-8 w-full"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <InlineSpinner /> Running prediction pipeline…
          </span>
        ) : (
          "Predict"
        )}
      </Button>
    </motion.form>
  );
}
