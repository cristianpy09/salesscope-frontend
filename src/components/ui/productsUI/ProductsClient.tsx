"use client";

import { useMemo, useState } from "react";
import { Product } from "@/types/ProductType";
import ListContainer from "./ListContainer";
import ListSeconSection from "./ListSeconSection";
import RegisterForm from "./RegisterProductForm";
import { deleteProduct, updateProduct } from "@/services/products.services";
import toast from "react-hot-toast";

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
    toast.success("Product created succesfully", { icon: "✅" });
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.product_id !== id));
      toast.success("Product successfully removed", { icon: "✅"});
    } catch {
      toast.error("Error deleting product", { icon: "❌" });
    }
  };

  const confirmDelete = (id: number) => {
    toast.custom((t) => (
      <div className="bg-base-300 shadow-xl rounded-lg p-4 flex flex-col gap-3 w-80">
        <p className="font-semibold  text-xl">
          ¿Are you sure to remove this product?
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 rounded-md bg-base-100 hover:brightness-200 cursor-pointer"
          >
            Cancel ❌
          </button>

          <button
            onClick={async () => {
              toast.dismiss(t.id);
              await handleDelete(id);
            }}
            className="px-3 py-1 rounded-md bg-red-500 text-white hover:brightness-150 cursor-pointer"
          >
            Yes, delete 🗑️
          </button>
        </div>
      </div>
    ));
  };

  const handleUpdate = async (product: Product) => {
    try {
      await updateProduct(product);
      setProducts((prev) =>
        prev.map((p) => (p.product_id === product.product_id ? product : p))
      );
      toast.success("Product updated", {
        icon: "💾",
        duration: 3000,
        className:
          "bg-base-200 text-base-content border border-base-300 rounded-xl shadow-lg",
      });
      setSelectedProduct(null);
    } catch {
      toast.error("Error updating product", { icon: "🚨", duration: 3000 });
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
    <div className="flex rounded-xl p-5 h-160 gap-6">
      <RegisterForm
        mainName="New Product"
        firstField="Name"
        secondField="Price"
        thirdField="Initial stock"
        fourthField="Category"
        buttonLabel="Add product"
        onCreated={handleProductCreated}
      />

      <div className="bg-base-200 flex flex-col gap-0 rounded-xl ">
        <div className="flex gap-3  p-3 rounded-xl rounded-b-none">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-48"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select select-bordered"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="all">All stock</option>
            <option value="in">In stock</option>
            <option value="low">Low stock</option>
          </select>
        </div>

        <ListContainer
          products={filteredProducts}
          onEdit={setSelectedProduct}
          onDelete={confirmDelete}
        />
      </div>

      <ListSeconSection
        product={selectedProduct}
        onSave={handleUpdate}
        onCancel={() => setSelectedProduct(null)}
      />
    </div>
  );
}
