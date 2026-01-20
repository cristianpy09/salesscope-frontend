"use client";

import { Product } from "@/types/ProductType";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Button from "../Button";
import Input from "../Input";
import { Edit3, X, Save, Package, Tag, DollarSign, Layers } from "lucide-react";

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
    return null;
  }

  return (
    <div className="glass-panel p-1 rounded-3xl border border-white/5 premium-shadow sticky top-0">
      <form onSubmit={handleSubmit(onSave)} className="p-8 flex flex-col gap-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Edit3 className="text-primary w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">
                Modify Asset
              </h2>
              <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">
                Heuristic Adjustment
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors opacity-30 hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 ml-1">
              Core Label
            </label>
            <Input
              {...register("name", { required: true })}
              placeholder="Asset Label"
              leftIcon={<Package className="w-4 h-4" />}
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 ml-1">
              Classification
            </label>
            <Input
              {...register("category", { required: true })}
              placeholder="Sector"
              leftIcon={<Tag className="w-4 h-4" />}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 ml-1">
                Valuation
              </label>
              <Input
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true, required: true })}
                placeholder="Price"
                leftIcon={<DollarSign className="w-4 h-4" />}
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 ml-1">
                Volume
              </label>
              <Input
                type="number"
                {...register("stock", { valueAsNumber: true, required: true })}
                placeholder="Quantity"
                leftIcon={<Layers className="w-4 h-4" />}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <Button
            variant="glow"
            type="submit"
            className="flex-1 h-14 rounded-2xl font-black"
            rightIcon={<Save className="w-4 h-4 ml-1" />}
          >
            Update Ledger
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={onCancel}
            className="h-14 rounded-2xl px-6 border-white/10"
          >
            Abort
          </Button>
        </div>
      </form>
    </div>
  );
}
