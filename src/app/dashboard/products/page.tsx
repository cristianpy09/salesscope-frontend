import Card from "@/components/ui/Card";
import { Product } from "@/types/ProductType";
import { getProducts } from "@/services/products.services";
import ProductsClient from "@/components/ui/productsUI/ProductsClient";
import AnimatedPage from "@/components/AnimatedPage";

export default async function Page() {
  const products: Product[] = await getProducts();
  const lowStockProducts = products.filter((product) => product.stock < 5);

  const lowStock = lowStockProducts.length;
  const totalProducts = products.length;

  const totalInventoryValue = products.reduce(
    (acc, product) => acc + product.price * product.stock,
    0
  );

  const formatted = totalInventoryValue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <AnimatedPage>
      <div>
        
        <h1 className="p-1 ml-9 font-bold  text-4xl ">Product Management</h1>
        <h2 className="p-1 ml-9 font-semibold  text-xl">
          Manage your product inventory
        </h2>
       
        <div className="flex justify-center space-x-10 p-5 ">
          <ProductsClient initialProducts={products} />
        </div>

        <div className="flex justify-center space-x-30">
          <Card
            w="w-80"
            h="h-50"
            worth={totalProducts}
            mainText="Total Products"
            iconRoute="/icons/agregar-producto.png"
          />

          <Card
            w="w-80"
            h="h-50"
            worth={formatted}
            mainText="Total Inventory Value"
            iconRoute="/icons/inventario.png"
          />

          <Card
            w="w-80"
            h="h-50"
            worth={lowStock}
            mainText="Low Stock"
            iconRoute="/icons/nohaystock.png"
          />
        </div>
      </div>
    </AnimatedPage>
  );
}
