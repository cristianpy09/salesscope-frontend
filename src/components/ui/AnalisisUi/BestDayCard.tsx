"use client";

import { useEffect, useState } from "react";

import { getSalesByWeekday } from "@/services/Analitics.services";
import WeekdayBarChart from "../../charts/WeekdayBarChart";

type Props = {
  average: number;
  day: string;
};

export default function BestDayCard({ average, day }: Props) {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    getSalesByWeekday().then((res) => {
      console.log("WEEKDAY DATA:", res);
      setLabels(res.labels);
      setData(res.data);
    });
  }, []);
  return (
    <section className=" bg-base-200   w-155 h-130  rounded-xl p-6 shadow-xl  grid grid-cols-1 ">
     
      <article className=" space-y-3 h-[300px]">
      <h1 className="text-xl font-bold">Sales by Day of the Week</h1>
      <p className=" -mt-3">Identify the days with the highest demand</p>
        <WeekdayBarChart data={data} labels={labels} />
      </article>
      <article className="p-3 mt-18 h-20  rounded-xl shadow border border-green-400 ">
        <h2 className="text-lg font-semibold">
          Best Day: <strong className="text-green-400">{day}</strong>
        </h2>
        <p className="text-sm ">Average sales of ${average}</p>
      </article>
    </section>
  );
}
