"use client";

import { useEffect, useState } from "react";
import LineChart from "../../charts/LineChart";
import { getWeeklySalesChart } from "@/services/Analitics.services";
import { TrendingUp, Activity, Sparkles } from "lucide-react";

export default function PredictionCard() {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    getWeeklySalesChart().then((res) => {
      setLabels(res.labels);
      setData(res.data);
    });
  }, []);

  return (
    <div className="glass-panel rounded-3xl border border-white/5 p-8 premium-shadow space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
            <Activity className="text-accent w-6 h-6" />
            Macro-Trend Analysis
          </h3>
          <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest mt-1">
            Multi-cycle Temporal Projections
          </p>
        </div>

        <div className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-xl flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-accent" />
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
            AI Enabled
          </span>
        </div>
      </div>

      <div className="min-h-[350px] bg-white/5 rounded-2xl border border-white/5 p-6">
        <LineChart labels={labels} data={data} />
      </div>

      <div className="p-6 rounded-2xl bg-linear-to-br from-accent/20 to-transparent border border-accent/20 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
          <TrendingUp className="text-accent w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-black uppercase tracking-wider text-accent">
            Predicted Trajectory
          </h4>
          <p className="text-sm font-medium opacity-60 leading-relaxed">
            Aggregated cycles indicate a{" "}
            <span className="text-white font-bold">12.4% growth vector</span>{" "}
            for the next quadrant. Strategic optimization of high-velocity
            assets is recommended to maximize conversion yields.
          </p>
        </div>
      </div>
    </div>
  );
}
