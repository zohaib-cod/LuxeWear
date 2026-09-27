"use client";

import Link from "next/link";
import { Product } from "@/types";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] bg-neutral-100 rounded-lg overflow-hidden mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
          {!product.inStock && (
            <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded">
              Sold Out
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <h3 className="text-sm font-medium text-neutral-900 line-clamp-1">{product.name}</h3>
          <p className="text-xs text-neutral-500">{product.category}</p>
          <p className="text-sm font-semibold">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </motion.div>
  );
}
