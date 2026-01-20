"use client";

import { useState } from "react";
import RegisterSaleForm from "@/components/ui/salesUI/RegisterSaleForm";
import ListSales from "@/components/ui/salesUI/ListSales";
import { getLastSales } from "@/services/orders.services";
import { Order } from "@/types/OrdersType";
import { Product } from "@/types/ProductType";
import { motion } from "framer-motion";

type Props = {
  initialProducts: Product[];
  initialSales: Order[];
};

export default function SalesPageClient({
  initialProducts,
  initialSales,
}: Props) {
  const [sales, setSales] = useState<Order[]>(initialSales);

  const refreshSales = async () => {
    const data = await getLastSales();
    setSales(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 xl:grid-cols-12 gap-8"
    >
      <div className="xl:col-span-4">
        <RegisterSaleForm
          initialProducts={initialProducts}
          onSaleCreated={refreshSales}
        />
      </div>
      <div className="xl:col-span-8">
        <ListSales sales={sales} />
      </div>
    </motion.div>
  );
}
