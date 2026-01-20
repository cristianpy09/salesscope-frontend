"use client";

import { Activity } from "lucide-react";

type CardProps = {
  borderColor: string;
  mainText: string;
  price: number;
  footerText: string;
};

export default function AnalysisCards({
  borderColor,
  mainText,
  price,
  footerText,
}: CardProps) {
  const formatCOP = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div
      className={`group glass-panel rounded-3xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10 premium-shadow`}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-1.5 ${borderColor.replace("border-", "bg-")}`}
      />

      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
            {mainText}
          </h3>
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <Activity className="w-4 h-4 opacity-40" />
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight">
            {formatCOP(price)}
          </h2>
          <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">
            {footerText}
          </p>
        </div>
      </div>
    </div>
  );
}
