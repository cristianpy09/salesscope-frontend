"use client";

import { useState, useRef } from "react";
import { MdExpandMore, MdCheck } from "react-icons/md";
import toast from "react-hot-toast";
import { Product } from "@/types/ProductType";
import { createOrder } from "@/services/orders.services";
import Button from "../Button";

type RegisterSaleFormProps = {
  initialProducts: Product[];
  onSaleCreated: () => Promise<void> | void;
};

export default function RegisterSaleForm({
  initialProducts,
  onSaleCreated,
}: RegisterSaleFormProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [openSelect, setOpenSelect] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProduct || quantity < 1 || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await createOrder({
        user_id: 3,
        items: [
          {
            product_id: selectedProduct.product_id,
            quantity,
          },
        ],
      });

      // Reset form
      setSelectedProduct(null);
      setQuantity(1);

      await onSaleCreated();

      toast.success("Sale registered correctly ");
    } catch (error) {
      console.error(error);
      toast.error("Error registering the sale");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-base-200 shadow rounded-md   flex flex-col gap-5"
    >
      <h2 className="text-xl font-bold ">New Sale</h2>
      <p className=" -mt-3">Complete the details of the sale made</p>

      <label className="font-semibold ">Product</label>

      <div className="relative" ref={selectRef}>
        <button
          type="button"
          onClick={() => setOpenSelect((prev) => !prev)}
          className="w-full border border-gray-300  p-3 rounded-md flex justify-between items-center cursor-pointer"
        >
          <span className={selectedProduct ? "" : ""}>
            {selectedProduct
              ? `${selectedProduct.name} - $${selectedProduct.price}`
              : "Select a product"}
          </span>

          <span
            className={`transition-transform duration-200 ${
              openSelect ? "rotate-180" : "rotate-0"
            }`}
          >
            <MdExpandMore className="text-xl" />
          </span>
        </button>

        {openSelect && (
          <div className="absolute left-0 mt-1 w-full  border  rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
            {initialProducts.map((product) => {
              const isSelected =
                selectedProduct?.product_id === product.product_id;

              return (
                <div
                  key={product.product_id}
                  onClick={() => {
                    setSelectedProduct(product);
                    setOpenSelect(false);
                  }}
                  className={`p-3 cursor-pointer flex justify-between items-center bg-base-100
                    ${
                      isSelected
                        ? "bg-blue-100 font-medium"
                        : "hover:bg-base-200"
                    }`}
                >
                  {product.name} - ${product.price}
                  {isSelected && <MdCheck className="text-blue-600 text-xl" />}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <label className="font-semibold ">Quantity</label>
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="border border-gray-300  p-3 rounded-md "
      />

      <Button
        variant="primary"
        type="submit"
        disabled={isSubmitting}
        
      >
        {isSubmitting ? "Registering..." : "Register sale"}
      </Button>
    </form>
  );
}
