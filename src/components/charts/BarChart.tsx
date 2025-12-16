"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

type BarChartProps = {
  labels: string[];
  data: number[];
};

export default function BarChart({ labels, data }: BarChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: "#CF6CFF47",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#eee" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
