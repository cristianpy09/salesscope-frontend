import AnalysisCards from "@/components/ui/AnalisisUi/AnalysisCards";
import RecommendationsCard from "@/components/ui/AnalisisUi/RecommendationsCard";
import StatisticsCard from "@/components/ui/AnalisisUi/StatisticsCard";
import BestDayCard from "../../../components/ui/AnalisisUi/BestDayCard";
import PredictionCard from "@/components/ui/AnalisisUi/PredictionCard";
import { BrainCircuit } from "lucide-react";

export default function Page() {
  return (
    <div className="p-6 lg:p-10 pb-20 space-y-12">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl bg-linear-to-br from-white to-white/60 bg-clip-text text-transparent flex items-center gap-4">
            Neural Insights
            <BrainCircuit className="text-primary w-10 h-10" />
          </h1>
          <p className="text-sm font-medium opacity-40 mt-1 max-w-xl">
            Global forecasting engine utilizing deep regression models and
            historical heuristic data.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
            Pulse synchronized
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalysisCards
          footerText="3-week cycle moving avg"
          price={30067}
          mainText="Trend Velocity"
          borderColor="border-primary"
        />
        <AnalysisCards
          footerText="5-week macro cycle avg"
          price={28400}
          mainText="Macro Variance"
          borderColor="border-accent"
        />
        <AnalysisCards
          footerText="Standard linear regression"
          price={33436}
          mainText="Projection Vector"
          borderColor="border-secondary"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-12">
        <div className="xl:col-span-8 space-y-8">
          <PredictionCard />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BestDayCard average={8288} day="Friday" />
            <StatisticsCard />
          </div>
        </div>

        <div className="xl:col-span-4 h-full">
          <RecommendationsCard />
        </div>
      </div>
    </div>
  );
}
