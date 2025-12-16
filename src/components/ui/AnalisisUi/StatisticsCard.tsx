export default function StatisticsCard() {
  return (
    <section className=" bg-base-200  w-155  h-130 rounded-xl p-4 space-y-3 shadow-xl mb-5 overflow-y-auto">
       <h1 className="text-xl font-bold">Product Trends</h1>
       <p className=" -mt-3">Products in growth and decline</p>

      <article className="bg-base-200] flex  h-auto border border-[#D5D5D5] rounded-xl p-2">
        
        <div className="grid mt-auto gap-3 text-sm font-medium  ">
          <h2 className="font-bold mb-1 text-xl ml-1">Product A</h2>
          <div className="flex space-x-1">
            <img src="/icons/arriba.png" alt="" className="w-6" />
            <p className="text-[#ADADAD] ">145 units this week</p>
          </div>
        </div>

        <div className="w-15  ml-auto  flex items-center">
          <p className=" bg-[#3ae98063] text-green-600 rounded-xl p-1">$8481</p>
        </div>
      </article>
      <article className=" flex  h-auto border border-[#D5D5D5] rounded-xl p-2">
        <div className="grid mt-auto gap-3 text-sm font-medium  ">
          <h2 className="font-bold mb-1 text-xl ml-1">Product A</h2>
          <div className="flex space-x-1">
            <img src="/icons/arriba.png" alt="" className="w-6" />
            <p className="text-[#ADADAD] ">145 units this week</p>
          </div>
        </div>

        <div className="w-15  ml-auto  flex items-center">
          <p className=" bg-[#3ae98063] text-green-600 rounded-xl p-1">$8481</p>
        </div>
      </article>
      <article className=" flex  h-auto border border-[#D5D5D5] rounded-xl p-2">
        <div className="grid mt-auto gap-3 text-sm font-medium  ">
          <h2 className="font-bold mb-1 text-xl ml-1">Product A</h2>
          <div className="flex space-x-1">
            <img src="/icons/decrecer.png" alt="" className="w-6" />
            <p className="text-[#ADADAD] ">145 units this week</p>
          </div>
        </div>

        <div className="w-15  ml-auto  flex items-center">
          <p className=" bg-[#e93a3a5b] text-red-600 rounded-xl p-1">$8481</p>
        </div>
      </article>
      <article className=" flex  h-auto border border-[#D5D5D5] rounded-xl p-2">
        <div className="grid mt-auto gap-3 text-sm font-medium  ">
          <h2 className="font-bold mb-1 text-xl ml-1">Product A</h2>
          <div className="flex space-x-1">
            <img src="/icons/arriba.png" alt="" className="w-6" />
            <p className="text-[#ADADAD] ">145 units this week</p>
          </div>
        </div>

        <div className="w-15  ml-auto  flex items-center">
          <p className=" bg-[#3ae98063] text-green-600 rounded-xl p-1">$8481</p>
        </div>
      </article>
      <article className=" flex  h-auto border border-[#D5D5D5] rounded-xl p-2">
        <div className="grid mt-auto gap-3 text-sm font-medium  ">
          <h2 className="font-bold mb-1 text-xl ml-1">Product A</h2>
          <div className="flex space-x-1">
            <img src="/icons/arriba.png" alt="" className="w-6" />
            <p className="text-[#ADADAD] ">145 units this week</p>
          </div>
        </div>

        <div className="w-15  ml-auto  flex items-center">
          <p className=" bg-[#3ae98063] text-green-600 rounded-xl p-1">$8481</p>
        </div>
      </article>
    </section>
  );
}
