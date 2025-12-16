export default function RecommendationsCard() {
  return (
    <div className="bg-base-200 w-300 h-80 rounded-2xl border-l-7 border-[#ff6f00b0]">
      <div>
        <h1 className="mt-4 ml-4 text-2xl font-bold ">Recommendations</h1>
        <p className=" ml-4 font-semibold ">
          Suggested actions based on the analysis
        </p>
      </div>
      <div className=" mt-8">
        <div className=" flex space-x-2 text-center ml-3 mt-4 mb-5 ">
          <h1 className="bg-amber-100 w-7 h-7 text-xl text-orange-500 rounded-full ">
            1
          </h1>
          <div className="">
            <h1 className="font-semibold text-left">
              Increase stock for the weekend
            </h1>
            <h1 className="">
              Fridays and Saturdays show sales 40% higher than average
            </h1>
          </div>
        </div>
        <div className=" flex space-x-2 text-center ml-3 mt-4 mb-5 ">
          <h1 className="bg-amber-100 w-7 h-7 text-xl text-orange-500 rounded-full ">
            2
          </h1>
          <div className="">
            <h1 className="font-semibold text-left">
              Increase stock for the weekend
            </h1>
            <h1 className="">
              Fridays and Saturdays show sales 40% higher than average
            </h1>
          </div>
        </div>
        <div className=" flex space-x-2 text-center ml-3 mt-4 ">
          <h1 className="bg-amber-100 w-7 h-7 text-xl text-orange-500 rounded-full ">
            3
          </h1>
          <div className="">
            <h1 className="font-semibold text-left">
              Increase stock for the weekend
            </h1>
            <h1 className="">
              Fridays and Saturdays show sales 40% higher than average
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
