"use client";

import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ---------- Dummy analytics data ----------
const SEGMENT_DATA = [
  { name: "Young Healthy", value: 38 },
  { name: "Family Plan", value: 27 },
  { name: "Senior Care", value: 21 },
  { name: "High Risk", value: 14 },
];

const SEGMENT_COLORS = ["#2563EB", "#06B6D4", "#22C55E", "#EF4444"];

const MONTHLY_PREDICTIONS = [
  { month: "Jan", predictions: 620 },
  { month: "Feb", predictions: 780 },
  { month: "Mar", predictions: 910 },
  { month: "Apr", predictions: 860 },
  { month: "May", predictions: 1040 },
  { month: "Jun", predictions: 1290 },
];

const CHARGES_TREND = [
  { month: "Jan", avgCharges: 9800 },
  { month: "Feb", avgCharges: 10400 },
  { month: "Mar", avgCharges: 10100 },
  { month: "Apr", avgCharges: 11200 },
  { month: "May", avgCharges: 11800 },
  { month: "Jun", avgCharges: 12450 },
];

const tooltipStyle = {
  background: "#18181B",
  border: "1px solid #27272A",
  borderRadius: "12px",
  fontSize: "12px",
  color: "#F4F4F5",
};

export default function StatsChart() {
  return (
    <section id="stats" className="container py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-14 max-w-2xl text-center"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
          Platform Analytics
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Insights across every prediction
        </h2>
        <p className="mt-4 text-sm text-zinc-400 sm:text-base">
          Aggregated, anonymized trends from the InsurAI model — illustrative
          sample data.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Pie chart — segment distribution */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <Card className="card-lift h-full">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-zinc-400">
                Customer Segments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={SEGMENT_DATA}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {SEGMENT_DATA.map((entry, i) => (
                      <Cell key={entry.name} fill={SEGMENT_COLORS[i % SEGMENT_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    wrapperStyle={{ fontSize: "11px", color: "#A1A1AA" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bar chart — monthly predictions */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="card-lift h-full">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-zinc-400">
                Monthly Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={MONTHLY_PREDICTIONS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                  <XAxis dataKey="month" stroke="#71717A" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#71717A" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Bar dataKey="predictions" fill="#2563EB" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Area chart — avg charges trend */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="card-lift h-full">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-zinc-400">
                Avg. Predicted Charges (₹)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={CHARGES_TREND}>
                  <defs>
                    <linearGradient id="chargesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22C55E" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                  <XAxis dataKey="month" stroke="#71717A" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#71717A" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area
                    type="monotone"
                    dataKey="avgCharges"
                    stroke="#22C55E"
                    strokeWidth={2}
                    fill="url(#chargesGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
