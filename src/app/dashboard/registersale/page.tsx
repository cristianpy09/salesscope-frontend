import SalesPageClient from "@/components/ui/salesUI/SalesPageClient";
import { getProducts, getProductsMap } from "@/services/products.services";
import { getLastSales } from "@/services/orders.services";
import AnimatedPage from "@/components/AnimatedPage";


export default async function page() {
  const products = await getProducts();
  const sales = await getLastSales();

 
  return (
    <AnimatedPage>
      <div className="space-x-1">
        <h1 className="p-1 ml-9 font-bold text-4xl">Register Sale</h1>
        <h2
          className="p-1 ml-9 font-semibold 
        text-xl"
        >
          Add a new sales transaction
        </h2>

        <SalesPageClient  initialProducts={products} initialSales={sales} />
      </div>
    </AnimatedPage>
  );
}
