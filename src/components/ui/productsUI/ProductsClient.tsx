"use client";

import { useMemo, useState } from "react";
import { Product } from "@/types/ProductType";
import ListContainer from "./ListContainer";
import ListSeconSection from "./ListSeconSection";
import RegisterForm from "./RegisterProductForm";
import { deleteProduct, updateProduct } from "@/services/products.services";
import toast from "react-hot-toast";
import { Search, Filter, ChevronDown } from "lucide-react";
import Button from "../Button";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  initialProducts: Product[];
};

export default function ProductsClient({ initialProducts }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  const handleProductCreated = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    toast.success("Asset catalog updated successfully");
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.product_id !== id));
      toast.success("Asset decommissioned");
    } catch {
      toast.error("Process failed");
    }
  };

  const confirmDelete = (id: number) => {
    toast.custom((t) => (
      <div
        className={`${t.visible ? "animate-in fade-in zoom-in duration-300" : "animate-out fade-out zoom-out duration-300"} glass-panel p-6 rounded-2xl border border-white/10 shadow-2xl w-80`}
      >
        <p className="font-bold text-lg mb-4">Decommission Asset?</p>
        <p className="text-sm opacity-50 mb-6 font-medium">
          This action will permanently purge the asset from the ledger.
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl border-white/10"
            onClick={() => toast.dismiss(t.id)}
          >
            Retain
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="bg-red-500 hover:bg-red-600 rounded-xl"
            onClick={async () => {
              toast.dismiss(t.id);
              await handleDelete(id);
            }}
          >
            Purge
          </Button>
        </div>
      </div>
    ));
  };

  const handleUpdate = async (product: Product) => {
    try {
      await updateProduct(product);
      setProducts((prev) =>
        prev.map((p) => (p.product_id === product.product_id ? product : p)),
      );
      toast.success("Asset heuristics synchronized");
      setSelectedProduct(null);
    } catch {
      toast.error("Synchronization failed");
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchName = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchCategory = category === "all" || product.category === category;
      const matchStock =
        stockFilter === "all" ||
        (stockFilter === "in" && product.stock > 0) ||
        (stockFilter === "low" && product.stock < 5);
      return matchName && matchCategory && matchStock;
    });
  }, [products, search, category, stockFilter]);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="flex flex-col xl:flex-row gap-8 min-h-[600px]">
      <div className="xl:w-80 shrink-0">
        <RegisterForm
          mainName="Register Asset"
          firstField="Asset Name"
          secondField="Price (USD)"
          thirdField="Initial Payload"
          fourthField="Categorization"
          buttonLabel="Initialize Asset"
          onCreated={handleProductCreated}
        />
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <div className="glass-panel p-4 rounded-3xl border border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-[200px]">
            <Search className="w-4 h-4 opacity-30 ml-2" />
            <input
              type="text"
              placeholder="Filter catalog..."
              className="bg-transparent border-none outline-none text-sm font-bold w-full placeholder:opacity-30"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative group">
              <select
                className="appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold outline-none hover:bg-white/10 transition-all pr-8 cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">All Sectors</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 opacity-30 pointer-events-none" />
            </div>

            <div className="relative group">
              <select
                className="appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold outline-none hover:bg-white/10 transition-all pr-8 cursor-pointer"
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
              >
                <option value="all">Status: All</option>
                <option value="in">Status: Operational</option>
                <option value="low">Status: Critical</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 opacity-30 pointer-events-none" />
            </div>

            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-white/10 h-9 hidden sm:flex"
            >
              <Filter className="w-3 h-3 mr-2" />
              Advanced
            </Button>
          </div>
        </div>

        <div className="glass-panel rounded-3xl border border-white/5 overflow-hidden flex-1 flex flex-col min-h-0">
          <ListContainer
            products={filteredProducts}
            onEdit={setSelectedProduct}
            onDelete={confirmDelete}
          />
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="xl:w-96 shrink-0"
          >
            <ListSeconSection
              product={selectedProduct}
              onSave={handleUpdate}
              onCancel={() => setSelectedProduct(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
