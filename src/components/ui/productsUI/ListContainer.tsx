"use client";
import { Product } from "@/types/ProductType";
import { Edit3, Trash2, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package className="w-5 h-5 text-primary opacity-50" />
          <h3 className="font-bold text-lg">Asset Ledger</h3>
        </div>
        <span className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">
          {products?.length || 0} Entities
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {products?.map((item, index) => (
            <motion.div
              layout
              key={item.product_id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.03 }}
              className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 hover:bg-white/10 transition-all duration-300 flex items-center group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 blur-2xl rounded-full -translate-y-8 translate-x-8 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mr-4 border border-white/5 group-hover:bg-primary/10 transition-colors">
                <Package className="w-6 h-6 text-white/20 group-hover:text-primary transition-colors" />
              </div>

              <div className="flex flex-col justify-center flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-black text-white group-hover:text-primary transition-colors">
                    {item.name}
                  </h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/5 opacity-50 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span
                    className={`text-[11px] font-bold flex items-center gap-1.5 ${item.stock < 5 ? "text-red-400" : "opacity-40"}`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${item.stock < 5 ? "bg-red-400 animate-pulse" : "bg-green-400"}`}
                    />
                    Stock: {item.stock}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mr-2">
                <div className="text-right mr-4">
                  <p className="font-mono text-lg font-black text-white leading-none">
                    ${item.price}
                  </p>
                  <p className="text-[9px] font-bold opacity-30 uppercase tracking-widest mt-1 text-right">
                    Unit Value
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 transition-all text-white/40 hover:text-white"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDelete(item.product_id)}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/30 transition-all text-white/40 hover:text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {(!products || products.length === 0) && (
          <div className="h-full flex flex-col items-center justify-center opacity-30 py-20">
            <Package className="w-12 h-12 mb-4" />
            <p className="font-bold uppercase tracking-widest text-xs">
              No assets synchronized
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
