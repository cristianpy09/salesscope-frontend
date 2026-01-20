"use client";
import { Order, OrderItem } from "@/types/OrdersType";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Activity, History, Layers } from "lucide-react";

type ListProps = {
  sales?: Order[];
};

export default function ListSales({ sales }: ListProps) {
  function formatCOP(value: number): string {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
            <History className="text-accent w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Activity Feed</h2>
            <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">
              Real-time ledger
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold opacity-50 uppercase tracking-wider">
            Live
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {sales?.map((sale: Order, index: number) => (
            <motion.div
              layout
              key={sale.order_id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full -translate-y-12 translate-x-12 group-hover:bg-primary/10 transition-colors" />

              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/5">
                    <Package className="text-white/40 w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs opacity-30">
                        HEX-{sale.order_id.toString().padStart(4, "0")}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border 
                        ${sale.status === "paid" ? "bg-primary/10 border-primary/20 text-primary" : "bg-yellow-500/10 border-yellow-500/20 text-yellow-500"}`}
                      >
                        {sale.status}
                      </span>
                    </div>
                    <div className="text-sm font-bold mt-0.5">
                      {new Date(sale.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black tracking-tighter text-white group-hover:text-primary transition-colors">
                    {formatCOP(sale.total_amount)}
                  </div>
                  <div className="text-[10px] font-bold opacity-30 uppercase tracking-widest mt-0.5">
                    Cleared Unit
                  </div>
                </div>
              </div>

              {sale.items && sale.items.length > 0 && (
                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2 relative z-10">
                  {sale.items.map((itemValue: OrderItem) => (
                    <div
                      key={itemValue.order_item_id}
                      className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 text-[11px] font-bold text-white/40 group-hover:text-white/60 group-hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                      <Layers className="w-3 h-3" />
                      <span>{`Asset ${itemValue.product_id}`}</span>
                      <span className="opacity-30">×</span>
                      <span className="text-white/80">
                        {itemValue.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!sales ||
        (sales.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center opacity-20 filter grayscale">
            <Activity className="w-16 h-16 mb-4" />
            <p className="font-black uppercase tracking-[0.3em] text-xs">
              No activity detected
            </p>
          </div>
        ))}
    </div>
  );
}
