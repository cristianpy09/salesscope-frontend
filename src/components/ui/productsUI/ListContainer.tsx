"use client";
import { Product } from "@/types/ProductType";
import Image from "next/image";

type ListProps = {
  products?: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
};

export default function ListContainer({
  products,
  onDelete,
  onEdit,
}: ListProps) {
  return (
    <div>
      <section className=" bg-base-200 p-4  w-150 h-133 rounded-xl   space-y-5 shadow-xl    overflow-y-scroll ">
        {products?.map((item) => (
          <article
            key={item.product_id}
            className="p-4  min-h-24 border  rounded-xl  shadow-sm hover:shadow-md transition-all duration-200 flex items-center"
          >
            <div className="flex flex-col justify-center flex-1">
              <h2 className="font-semibold text-lg ">{item.name}</h2>

              <div className="flex text-sm space-x-2 ">
                <p className="capitalize">{item.category}</p>
                <p className="font-medium ">{`Stock: ${item.stock}`}</p>
              </div>
            </div>

            <div className="flex items-center  px-2 py-1 gap-2 rounded-lg">
              <p className="font-bold text-lg ">${item.price}</p>

              <button
                onClick={() => onEdit(item)}
                className="p-2 rounded-lg  cursor-pointer"
              >
                <Image src="/icons/edit.png" 
                 alt="Edit"
                 width={30}
                 height={25}
                 className="hover:bg-primary rounded-md"
                 />
              </button>

              <button
                onClick={() => onDelete(item.product_id)}
                className="p-3 rounded-lg cursor-pointer"
              >
                <Image src="/icons/delete.png" 
                 alt="Delete"
                 width={25}
                 height={25}
                 className="hover:bg-red-300 rounded-md"
                 />
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
