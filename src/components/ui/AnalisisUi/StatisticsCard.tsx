import { BarChart, ArrowUpRight, ArrowDownRight, Package } from "lucide-react";

export default function StatisticsCard() {
  const trends = [
    { name: "Quantum Core", units: 145, revenue: 8481, trend: "up" },
    { name: "Neural Link", units: 98, revenue: 5210, trend: "up" },
    { name: "Legacy Module", units: 42, revenue: 1250, trend: "down" },
    { name: "SaaS Interface", units: 210, revenue: 12450, trend: "up" },
    { name: "Security Vault", units: 15, revenue: 980, trend: "down" },
  ];

  const formatCOP = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="glass-panel rounded-3xl border border-white/5 p-8 premium-shadow h-full flex flex-col gap-8 overflow-y-auto custom-scrollbar">
      <div>
        <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
          <BarChart className="text-accent w-5 h-5" />
          Market Dynamics
        </h3>
        <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest mt-1">
          Asset Velocity & Demand Shift
        </p>
      </div>

      <div className="space-y-4 flex-1">
        {trends.map((item, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all flex items-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mr-4 border border-white/10">
              <Package className="w-5 h-5 opacity-30 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex-1">
              <h4 className="text-sm font-bold">{item.name}</h4>
              <div className="flex items-center gap-1.5 opacity-40 text-[10px] font-bold uppercase">
                {item.trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3 text-green-400" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-red-400" />
                )}
                {item.units} Units this cycle
              </div>
            </div>

            <div
              className={`px-3 py-1.5 rounded-xl font-bold text-xs ${item.trend === "up" ? "bg-green-500/10 text-green-400 border border-green-500/10" : "bg-red-500/10 text-red-400 border border-red-500/10"}`}
            >
              {formatCOP(item.revenue)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
