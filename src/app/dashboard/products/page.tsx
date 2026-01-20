import { Product } from "@/types/ProductType";
import { getProducts } from "@/services/products.services";
import ProductsClient from "@/components/ui/productsUI/ProductsClient";
import Card from "@/components/ui/Card";
import {
  Package,
  AlertTriangle,
  BarChart3,
  Plus,
  LayoutGrid,
} from "lucide-react";
import Button from "@/components/ui/Button";

export default async function Page() {
  const products: Product[] = await getProducts();
  const lowStockProducts = products.filter((product) => product.stock < 5);

  const lowStock = lowStockProducts.length;
  const totalProducts = products.length;

  const totalInventoryValue = products.reduce(
    (acc, product) => acc + product.price * product.stock,
    0,
  );

  function formatCOP(value: number): string {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(value);
  }

  return (
    <div className="p-6 lg:p-10 pb-20 space-y-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl bg-linear-to-br from-white to-white/60 bg-clip-text text-transparent">
            Inventory Core
          </h1>
          <p className="text-sm font-medium opacity-40 mt-1">
            Manage your assets, track stock levels, and optimize procurement.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-12 rounded-xl px-4 border-white/5 bg-white/5"
          >
            <LayoutGrid className="w-4 h-4 mr-2" />
            Gallery
          </Button>
          <Button variant="glow" className="h-12 rounded-xl px-5">
            <Plus className="w-4 h-4 mr-2" />
            New Asset
          </Button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Total Catalog"
          value={totalProducts}
          subtitle="Unique SKU items"
          icon={<Package className="text-primary w-5 h-5" />}
        />
        <Card
          title="Inventory Value"
          value={formatCOP(totalInventoryValue)}
          subtitle="Cumulative worth"
          icon={<BarChart3 className="text-accent w-5 h-5" />}
        />
        <Card
          title="Critical Stock"
          value={lowStock}
          subtitle="Items below 5 units"
          icon={<AlertTriangle className="text-secondary w-5 h-5" />}
        />
      </div>

      <div className="pt-4">
        <ProductsClient initialProducts={products} />
      </div>
    </div>
  );
}
