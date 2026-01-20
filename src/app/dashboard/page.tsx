"use client";

import { motion } from "framer-motion";
import BarChart from "@/components/charts/BarChart";
import Card from "@/components/ui/Card";
import LineChart from "@/components/charts/LineChart";
import { useEffect, useState } from "react";
import {
  getDailyAverage,
  getProductsSold,
  getTopProducts,
  getTotalSales,
  getTransactions,
  getWeeklySales,
} from "@/services/Analitics.services";
import {
  TrendingUp,
  Package,
  ShoppingCart,
  ArrowUpRight,
  Search,
  Filter,
  Calendar,
  Sparkles,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface WeeklySale {
  week: string;
  revenue: number;
}

interface TopProduct {
  name: string;
  total_sold: number;
}

export default function Page() {
  const [lineLabels, setLineLabels] = useState<string[]>([]);
  const [lineData, setLineData] = useState<number[]>([]);
  const [barLabels, setBarLabels] = useState<string[]>([]);
  const [barData, setBarData] = useState<number[]>([]);

  const [totalSales, setTotalSales] = useState(0);
  const [dailyAvg, setDailyAvg] = useState(0);
  const [productsSold, setProductsSold] = useState(0);
  const [transactions, setTransactions] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  function formatCOP(value: number): string {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);
  }

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [sales, avg, products, trans, weekly, topProducts] =
          await Promise.all([
            getTotalSales(),
            getDailyAverage(),
            getProductsSold(),
            getTransactions(),
            getWeeklySales(),
            getTopProducts(5),
          ]);

        setTotalSales(sales);
        setDailyAvg(avg);
        setProductsSold(products);
        setTransactions(trans);

        setLineLabels(
          weekly.map((w: WeeklySale) =>
            new Date(w.week).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
          ),
        );
        setLineData(weekly.map((w: WeeklySale) => w.revenue));

        setBarLabels(topProducts.map((p: TopProduct) => p.name));
        setBarData(topProducts.map((p: TopProduct) => p.total_sold));
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="text-sm font-bold uppercase tracking-widest opacity-40 animate-pulse">
            Initializing Neural Engine...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 lg:p-10 pb-20">
      {/* Header with Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl bg-linear-to-br from-white to-white/60 bg-clip-text text-transparent">
            Insight Overview
          </h1>
          <p className="text-sm font-medium opacity-40 mt-1">
            Real-time performance metrics and predictive intelligence.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <Input
            placeholder="Search intelligence..."
            leftIcon={<Search className="w-4 h-4" />}
            className="h-12 lg:w-64"
          />
          <Button
            variant="outline"
            className="h-12 rounded-xl px-4 border-white/5 bg-white/5"
          >
            <Filter className="w-4 h-4" />
          </Button>
          <Button variant="glow" className="h-12 rounded-xl px-5">
            <Calendar className="w-4 h-4 mr-2" />
            Today
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card
            title="Total Revenue"
            value={formatCOP(totalSales)}
            percentage="+12.5%"
            subtitle="vs last month"
            icon={<TrendingUp className="text-primary w-5 h-5" />}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card
            title="Daily Efficiency"
            value={formatCOP(dailyAvg)}
            percentage="+4.2%"
            subtitle="Daily average"
            icon={<ArrowUpRight className="text-accent w-5 h-5" />}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card
            title="Inventory Out"
            value={productsSold}
            percentage="-2.1%"
            subtitle="Products sold"
            icon={<Package className="text-secondary w-5 h-5" />}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card
            title="Active Deals"
            value={transactions}
            percentage="+8.3%"
            subtitle="Success rate"
            icon={<ShoppingCart className="text-white w-5 h-5" />}
          />
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-4"
        >
          <Card className="h-full" variant="glass">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-bold text-lg">Revenue Stream</h3>
                <p className="text-xs opacity-40 uppercase tracking-widest font-bold">
                  Weekly Performance
                </p>
              </div>
              <Sparkles className="w-5 h-5 text-primary opacity-50" />
            </div>
            <div className="h-[300px] w-full mt-4">
              <LineChart labels={lineLabels} data={lineData} />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-3"
        >
          <Card className="h-full" variant="glass">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-bold text-lg">Inventory Flow</h3>
                <p className="text-xs opacity-40 uppercase tracking-widest font-bold">
                  Top Performance Assets
                </p>
              </div>
              <Package className="w-5 h-5 text-accent opacity-50" />
            </div>
            <div className="h-[300px] w-full mt-4">
              <BarChart labels={barLabels} data={barData} />
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
