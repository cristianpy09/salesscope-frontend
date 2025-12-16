"use client";

import { useState } from "react";
import RegisterSaleForm from "@/components/ui/salesUI/RegisterSaleForm";
import ListSales from "@/components/ui/salesUI/ListSales";
import { getLastSales } from "@/services/orders.services";
import { Order } from "@/types/OrdersType";
import { Product } from "@/types/ProductType";
import { getProductsMap } from "@/services/products.services";

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
    <div className="grid grid-cols-2 p-2 mt-5 mx-15 space-x-15 rounded-2xl">
      <RegisterSaleForm
        initialProducts={initialProducts}
        onSaleCreated={refreshSales}
      />
      <ListSales  sales={sales} />
    </div>
  );
}
