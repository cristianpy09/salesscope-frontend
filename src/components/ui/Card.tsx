import React from "react";

type CardProps = {

  w?: string;
  h?: string;
  worth?: number | string;
  percentage?: string;
  mainText?: string;
  endText?: string;
  iconRoute?: string;
  simbol?: boolean;
};

export default function Card({

  w,
  h,
  worth,
  percentage,
  mainText,
  endText,
  iconRoute,
  simbol,
}: CardProps) {
  return (
    <div
      className={`relative bg-base-200  ${w} ${h} rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] hover:scale-101  `}
    >
      <h1 className=" p-4 ">{mainText}</h1>
      <div className="flex justify-center  ">
        <h1 className="font-bold  text-4xl  text-center mt-5 ">
         
          {worth}
        </h1>
        <img
          src={`${iconRoute}`}
          alt="icon"
          className="w-10 h-10 absolute top-4 right-4 mr- mt-"
        />
      </div>
      <h3 className="  p-4 mt-8 ml-8">
        {percentage}
        {endText}
      </h3>
    </div>
  );
}
