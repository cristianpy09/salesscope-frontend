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

type Props = {
  labels: string[];
  data: number[];
};

export default function WeekdayBarChart({ labels, data }: Props) {
  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            data,
            backgroundColor: "#10B981",
            borderRadius: 6,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "#E5E7EB" },
          },
          x: {
            grid: { display: false },
          },
        },
      }}
    />
  );
}
