"use client";

import { useState } from "react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, Check } from "lucide-react";
import { motion } from "framer-motion";

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      ...product,
      quantity,
      selectedSize,
      selectedColor
    });
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col space-y-8">
      {/* Colors */}
      <div>
        <h3 className="text-sm font-medium text-neutral-900 mb-3">Color</h3>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-4 py-2 text-sm border rounded-md transition-all ${
                selectedColor === color 
                  ? "border-neutral-900 bg-neutral-900 text-white" 
                  : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-neutral-900">Size</h3>
          <button className="text-sm text-neutral-500 underline underline-offset-4">Size Guide</button>
        </div>
        <div className="flex flex-wrap gap-3">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-12 flex items-center justify-center text-sm border rounded-md transition-all ${
                selectedSize === size 
                  ? "border-neutral-900 bg-neutral-900 text-white" 
                  : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Button */}
      <div className="flex space-x-4 pt-4">
        <div className="flex items-center border border-neutral-200 rounded-md">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-3 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
          >
            -
          </button>
          <span className="w-8 text-center text-sm font-medium">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-3 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
          >
            +
          </button>
        </div>
        
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`flex-1 flex items-center justify-center space-x-2 rounded-md font-medium transition-colors ${
            !product.inStock 
              ? "bg-neutral-200 text-neutral-500 cursor-not-allowed" 
              : added 
                ? "bg-green-600 text-white"
                : "bg-neutral-900 text-white hover:bg-neutral-800"
          }`}
        >
          {added ? (
            <>
              <Check size={20} />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingBag size={20} />
              <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
