"use client";

import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { Product } from "@/types/ProductType";
import { createOrder } from "@/services/orders.services";
import Button from "../Button";
import Input from "../Input";
import {
  ShoppingCart,
  Package,
  ChevronDown,
  Check,
  Layers,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type RegisterSaleFormProps = {
  initialProducts: Product[];
  onSaleCreated: () => Promise<void> | void;
};

export default function RegisterSaleForm({
  initialProducts,
  onSaleCreated,
}: RegisterSaleFormProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [openSelect, setOpenSelect] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpenSelect(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProduct || quantity < 1 || isSubmitting) {
      if (!selectedProduct) toast.error("Please select a product");
      return;
    }

    setIsSubmitting(true);

    try {
      await createOrder({
        user_id: 3,
        items: [
          {
            product_id: selectedProduct.product_id,
            quantity,
          },
        ],
      });

      setSelectedProduct(null);
      setQuantity(1);
      await onSaleCreated();
      toast.success("Transaction localized and verified", {
        icon: "🚀",
        style: {
          borderRadius: "12px",
          background: "#1A1A1A",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Process failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-panel p-1 rounded-3xl border border-white/5 premium-shadow">
      <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Zap className="text-primary w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">Rapid Entry</h2>
            <p className="text-xs font-bold opacity-30 uppercase tracking-widest">
              Sale Registration V3
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 ml-1">
            Asset Catalog
          </label>
          <div className="relative" ref={selectRef}>
            <button
              type="button"
              onClick={() => setOpenSelect((prev) => !prev)}
              className={`w-full bg-white/5 border rounded-2xl p-4 flex justify-between items-center transition-all duration-300 group
                ${openSelect ? "border-primary/50 bg-white/10 ring-4 ring-primary/5" : "border-white/10 hover:border-white/20 hover:bg-white/8"}`}
            >
              <div className="flex items-center gap-3">
                <Package
                  className={`w-5 h-5 transition-colors ${selectedProduct ? "text-primary" : "opacity-30"}`}
                />
                <span
                  className={`font-bold text-sm ${selectedProduct ? "text-white" : "opacity-30"}`}
                >
                  {selectedProduct
                    ? `${selectedProduct.name} - $${selectedProduct.price}`
                    : "Choose intelligence..."}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 opacity-30 transition-transform duration-500 ${openSelect ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {openSelect && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute left-0 mt-3 w-full backdrop-blur-2xl bg-[#0F0F0F]/90 border border-white/10 rounded-2xl shadow-2xl z-50 max-h-72 overflow-y-auto p-2 space-y-1"
                >
                  {initialProducts.map((product) => {
                    const isSelected =
                      selectedProduct?.product_id === product.product_id;
                    return (
                      <div
                        key={product.product_id}
                        onClick={() => {
                          setSelectedProduct(product);
                          setOpenSelect(false);
                        }}
                        className={`p-4 rounded-xl cursor-pointer flex justify-between items-center transition-all duration-200
                          ${isSelected ? "bg-primary/20 text-white" : "hover:bg-white/5 text-white/50 hover:text-white"}`}
                      >
                        <div className="flex flex-col">
                          <span className="font-bold text-sm">
                            {product.name}
                          </span>
                          <span className="text-[10px] opacity-40 uppercase tracking-wider">
                            {product.category || "Standard Asset"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm opacity-80">
                            ${product.price}
                          </span>
                          {isSelected && (
                            <Check className="text-primary w-4 h-4" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 ml-1">
            Payload Volume
          </label>
          <Input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Quantity"
            leftIcon={<Layers className="w-4 h-4" />}
          />
        </div>

        <div className="mt-4">
          <Button
            variant="glow"
            type="submit"
            disabled={isSubmitting}
            className="w-full h-16 rounded-2xl text-lg font-black"
            rightIcon={
              !isSubmitting && <ShoppingCart className="w-5 h-5 ml-1" />
            }
          >
            {isSubmitting ? "Syncing..." : "Execute Sale"}
          </Button>
        </div>
      </form>
    </div>
  );
}
