import SalesPageClient from "@/components/ui/salesUI/SalesPageClient";
import { getProducts } from "@/services/products.services";
import { getLastSales } from "@/services/orders.services";

export default async function page() {
  const products = await getProducts();
  const sales = await getLastSales();

  return (
    <div className="p-6 lg:p-10 pb-20 space-y-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl bg-linear-to-br from-white to-white/60 bg-clip-text text-transparent">
          Sales Entry
        </h1>
        <p className="text-sm font-medium opacity-40">
          Process new transactions and monitor recent market activity.
        </p>
      </div>

      <SalesPageClient initialProducts={products} initialSales={sales} />
    </div>
  );
}
