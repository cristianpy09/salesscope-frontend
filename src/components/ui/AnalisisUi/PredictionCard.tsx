"use client";

import { useEffect, useState } from "react";
import LineChart from "../../charts/LineChart";
import { getWeeklySalesChart } from "@/services/Analitics.services";

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
    <div className="">
      <div className="bg-base-200 w-270  rounded-xl shadow-xl p-8 space-y-3 grid grid-cols-1">
        <h2 className="text-xl font-bold ">Historical Sales & Prediction</h2>
        <p className=" -mt-3">Trend analysis and future sales projections</p>

        <LineChart labels={labels} data={data} />
        <article className="p-3 bg-base-200 rounded-xl shadow border border-blue-300 w-auto">
        <h3 className="text-lg font-semibold">
          Prediction for the coming weeks:
        </h3>
        <p className="text-sm text-gray-700">
          The last weeks show a strong growth trend. It is recommended to
          increase stock levels of best-selling products.
        </p>
      </article>
      </div>
     
    </div>
  );
}
