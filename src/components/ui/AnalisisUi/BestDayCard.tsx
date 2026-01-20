"use client";

import { useEffect, useState } from "react";
import { getSalesByWeekday } from "@/services/Analitics.services";
import WeekdayBarChart from "../../charts/WeekdayBarChart";
import { Calendar, Star } from "lucide-react";

type Props = {
  average: number;
  day: string;
};

export default function BestDayCard({ average, day }: Props) {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    getSalesByWeekday().then((res) => {
      setLabels(res.labels);
      setData(res.data);
    });
  }, []);

  const formatCOP = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="glass-panel rounded-3xl border border-white/5 p-8 premium-shadow h-full flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
            <Calendar className="text-primary w-5 h-5" />
            Weekly Velocity
          </h3>
          <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest mt-1">
            Temporal Demand Distribution
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-[250px] bg-white/5 rounded-2xl border border-white/5 p-4">
        <WeekdayBarChart data={data} labels={labels} />
      </div>

      <div className="relative overflow-hidden p-6 rounded-2xl bg-linear-to-br from-primary/20 to-transparent border border-primary/20">
        <div className="absolute right-[-20px] top-[-20px] opacity-10">
          <Star className="w-24 h-24 text-primary fill-primary" />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-1">
              Peak Performance Day
            </p>
            <h4 className="text-2xl font-black text-white">{day}</h4>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-1">
              Mean Volume
            </p>
            <p className="text-xl font-bold text-primary">
              {formatCOP(average)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
