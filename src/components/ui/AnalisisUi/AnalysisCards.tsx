type CardProps = {
  borderColor: string;
  mainText: string;
  price: number;
  footerText: string;
};

export default function AnalysisCards({
  borderColor,
  mainText,
  price,
  footerText,
}: CardProps) {
  return (
    <div
      className={`relative bg-base-200  w-95 h-50 rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2)] hover:scale-101 border-l-7 ${borderColor} `}
    >
      <h1 className=" p-4 ">{mainText}</h1>
      <div className="flex "></div>
      <div className="  p-4 mt-10 ml-1">
        <h1 className="font-bold text-2xl mb-5 ">{`$${price}`}</h1>
        <h1 className="text-sm ">{footerText}</h1>
      </div>
    </div>
  );
}
