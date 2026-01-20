"use client";

import { createProduct } from "@/services/products.services";
import { Product } from "@/types/ProductType";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../Button";
import Input from "../Input";
import { Package, DollarSign, Layers, Tag, Plus, Database } from "lucide-react";

type FormData = {
  name: string;
  price: number;
  stock: number;
  category: string;
};

type RegisterProps = {
  onCreated?: (product: Product) => void;
  mainName?: string;
  firstField?: string;
  secondField?: string;
  thirdField?: string;
  fourthField?: string;
  buttonLabel?: string;
};

export default function RegisterForm({
  onCreated,
  mainName,
  firstField,
  secondField,
  thirdField,
  fourthField,
  buttonLabel,
}: RegisterProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ mode: "onBlur" });

  const onSubmit = async (data: FormData) => {
    try {
      const created = await createProduct(data);
      onCreated?.(created.data ?? created);
      reset();
      toast.success("Asset successfully indexed", {
        icon: "💎",
        style: {
          borderRadius: "12px",
          background: "#1A1A1A",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Handshake failed. Check parameters.");
    }
  };

  return (
    <div className="glass-panel p-1 rounded-3xl border border-white/5 premium-shadow">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 flex flex-col gap-8"
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
            <Database className="text-accent w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">
              {mainName || "New Asset"}
            </h2>
            <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">
              Inventory Indexing
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 ml-1">
              {firstField || "Identification"}
            </label>
            <Input
              {...register("name", {
                required: "Asset name required",
                minLength: { value: 3, message: "Use 3+ characters" },
              })}
              placeholder="E.g. Quantum Core"
              leftIcon={<Package className="w-4 h-4" />}
            />
            {errors.name && (
              <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider ml-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 ml-1">
                {secondField || "Valuation"}
              </label>
              <Input
                type="number"
                {...register("price", {
                  required: "Price required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Min 1" },
                })}
                placeholder="199.99"
                leftIcon={<DollarSign className="w-4 h-4" />}
              />
              {errors.price && (
                <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider ml-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 ml-1">
                {thirdField || "Volume"}
              </label>
              <Input
                type="number"
                {...register("stock", {
                  required: "Stock required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Min 0" },
                })}
                placeholder="100"
                leftIcon={<Layers className="w-4 h-4" />}
              />
              {errors.stock && (
                <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider ml-1">
                  {errors.stock.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 ml-1">
              {fourthField || "Sector"}
            </label>
            <Input
              {...register("category", {
                required: "Categorization required",
              })}
              placeholder="E.g. Infrastructure"
              leftIcon={<Tag className="w-4 h-4" />}
            />
            {errors.category && (
              <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider ml-1">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Button
            variant="glow"
            disabled={isSubmitting}
            className="w-full h-16 rounded-2xl text-lg font-black"
            rightIcon={!isSubmitting && <Plus className="w-5 h-5 ml-1" />}
          >
            {isSubmitting ? "Syncing..." : buttonLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}
