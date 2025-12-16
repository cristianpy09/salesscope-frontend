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
import { TopProduct, WeeklySale } from "@/types/analytics";
import AnimatedPage from "@/components/AnimatedPage";

// Variants para stagger
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};
export default function Page() {
  const [lineLabels, setLineLabels] = useState<string[]>([]);
  const [lineData, setLineData] = useState<number[]>([]);

  const [barLabels, setBarLabels] = useState<string[]>([]);
  const [barData, setBarData] = useState<number[]>([]);

  const [totalSales, setTotalSales] = useState(0);
  const [dailyAvg, setDailyAvg] = useState(0);
  const [productsSold, setProductsSold] = useState(0);
  const [transactions, setTransactions] = useState(0);

  function formatCOP(value: number): string {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0, // COP no usa centavos
    }).format(value);
  }

  useEffect(() => {
    Promise.all([
      getTotalSales(),
      getDailyAverage(),
      getProductsSold(),
      getTransactions(),
    ]).then(([sales, avg, products, trans]) => {
      setTotalSales(sales);
      setDailyAvg(avg);
      setProductsSold(products);
      setTransactions(trans);
    });
  }, []);
  useEffect(() => {
    async function loadCharts() {
      const weekly = await getWeeklySales();

      setLineLabels(
        weekly.map((w: WeeklySale) =>
          new Date(w.week).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        )
      );

      setLineData(weekly.map((w: WeeklySale) => w.revenue));

      const products = await getTopProducts(5);

      setBarLabels(products.map((p: TopProduct) => p.name));

      setBarData(products.map((p: TopProduct) => p.total_sold));
    }

    loadCharts();
  }, []);

  return (
    <AnimatedPage>
      <div>
        <h1 className="p-1 ml-9 font-bold  text-4xl ">Dashboard</h1>
        <h2 className="p-1 ml-9 font-semibold  text-xl">
          Summary of your sales and key metrics
        </h2>
        <motion.div
          className="ml-11 grid grid-cols-4 gap-x-3 mt-5"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <Card
              w="w-80"
              h="h-50"
              mainText="Total Sales"
              worth={formatCOP(totalSales)}
              percentage="12.5%"
              endText=" vs previous week"
              iconRoute="/icons/ventas.png"
              simbol={true}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card
              w="w-80"
              h="h-50"
              mainText="Daily Average"
              worth={formatCOP(dailyAvg)}
              percentage="18.3%"
              endText="vs previous week"
              iconRoute="/icons/promedio.png"
              simbol={true}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card
              w="w-80"
              h="h-50"
              mainText="Products Sold"
              worth={productsSold}
              percentage="15.2%"
              endText="vs previous week"
              iconRoute="/icons/box.png"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card
              w="w-80"
              h="h-50"
              mainText="Transaction"
              worth={transactions}
              percentage="9.8%"
              endText="vs previous week"
              iconRoute="/icons/money.png"
            />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-2  p-15">
          <motion.article
            className="bg-base-200 w-160 rounded-xl shadow-xl p-8 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <h1 className="text-xl font-bold">Weekly Sales</h1>
            <p className=" -mt-3">Evolution of daily sales in pesos</p>
            <LineChart labels={lineLabels} data={lineData} />
          </motion.article>
          <motion.article
            className="bg-base-200 w-160 rounded-xl shadow-xl p-8 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <h1 className="text-xl font-bold ">Best Selling Products</h1>
            <p className=" -mt-3">Top 5 products by quantity sold</p>
            <BarChart labels={barLabels} data={barData} />
          </motion.article>
        </div>
      </div>
    </AnimatedPage>
  );
}
