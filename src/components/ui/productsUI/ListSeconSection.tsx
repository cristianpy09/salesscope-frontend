"use client";

import { Product } from "@/types/ProductType";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Button from "../Button";

type Props = {
  product: Product | null;
  onSave: (product: Product) => void;
  onCancel: () => void;
};

export default function ListSeconSection({ product, onSave, onCancel }: Props) {
  const { register, handleSubmit, reset } = useForm<Product>();

  useEffect(() => {
    if (product) reset(product);
  }, [product, reset]);

  if (!product) {
    return <div className="w-100 p-5 text-gray-500"></div>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSave)}
      className="bg-base-200 rounded-xl w-100 p-5 space-y-10"
    >
      <h2 className="font-bold text-2xl">Edit Product</h2>

      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Product name</label>
        <input
          {...register("name")}
          className="p-2 rounded bg-base-100 border border-bg-gray-200"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Category</label>
        <input
          {...register("category")}
          className="p-2 rounded bg-base-100 border border-bg-gray-200"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Price</label>
        <input
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
          className="p-2 rounded bg-base-100 border"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Quantity</label>
        <input
          type="number"
          {...register("stock", { valueAsNumber: true })}
          className="p-2 rounded bg-base-100 border"
        />
      </div>

      <div className="flex h-auto justify-center space-x-4 pt-2 ">
        <Button>Save</Button>
        <Button size="sm" variant="danger" type="button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
