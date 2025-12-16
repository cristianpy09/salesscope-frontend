"use client";
import { Order, OrderItem } from "@/types/OrdersType";

type ListProps = {
  sales?: Order[];
  
};

export default function ListSales({ sales }: ListProps) {
  return (
    <div className=" bg-base-200 p-4 rounded-xl">
      <h2 className="text-lg font-semibold mb-4">Últimas ventas</h2>

      <ul className="space-y-3">
        {sales?.map((sale: Order) => (
          <li key={sale.order_id} className="0 p-3 rounded-lg">
            <div className="flex justify-between">
              <span># {sale.created_at}</span>
              <span className="font-semibold">
                ${sale.total_amount.toFixed(2)}
              </span>
            </div>

            <div className="text-sm ">
              {new Date(sale.created_at).toLocaleDateString()}
              {" · "}
              {sale.status}
            </div>
            
            {sale.items && sale.items.length > 0 && (
              <ul className="mt-2 text-sm">
                {sale.items.map((item: OrderItem) => (
                  <li key={item.order_item_id}>
                    Product: {
                      
                    item.product_id  } · Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
