import { Lightbulb, Zap, ArrowRight } from "lucide-react";

export default function RecommendationsCard() {
  const recommendations = [
    {
      id: 1,
      title: "Inventory Scaling",
      desc: "Friday demand spike detected. Increase liquid stock by 40%.",
    },
    {
      id: 2,
      title: "Velocity Optimization",
      desc: "Product A cycle shortening. Recommend immediate procurement.",
    },
    {
      id: 3,
      title: "Price Strategy",
      desc: "Market elasticity high. Small valuation adjustments viable.",
    },
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/5 p-8 premium-shadow h-full flex flex-col relative overflow-hidden group transition-all duration-300 hover:border-secondary/20">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary/50 group-hover:bg-secondary transition-colors" />

      <div className="mb-10">
        <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
          <Lightbulb className="text-secondary w-6 h-6" />
          Heuristic Action
        </h3>
        <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest mt-1">
          Autonomous Strategy Engine
        </p>
      </div>

      <div className="flex-1 space-y-8">
        {recommendations.map((rec) => (
          <div key={rec.id} className="flex gap-4 group/item">
            <div className="w-8 h-8 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 group-hover/item:bg-secondary/20 transition-all font-black text-xs text-secondary italic">
              {rec.id}
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold group-hover/item:text-secondary transition-colors">
                {rec.title}
              </h4>
              <p className="text-xs font-medium opacity-40 leading-relaxed">
                {rec.desc}
              </p>
              <div className="flex items-center gap-1 text-[9px] font-bold text-secondary uppercase tracking-widest pt-1 opacity-0 group-hover/item:opacity-100 transition-opacity cursor-pointer">
                Execute Protocol <ArrowRight className="w-2.5 h-2.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 pt-8 border-t border-white/5">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group-hover:bg-white/10 transition-colors cursor-pointer">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-secondary" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Automate All
            </span>
          </div>
          <ArrowRight className="w-4 h-4 opacity-30" />
        </div>
      </div>
    </div>
  );
}
