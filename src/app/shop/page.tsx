"use client";

import { Suspense } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/lib/data";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const filter = searchParams.get("filter") || "all";
  const sort = searchParams.get("sort") || "featured";

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  // Filter products
  let filteredProducts = [...products];
  if (filter === "new") {
    // For demo purposes: treat the first two products as "New Arrivals"
    filteredProducts = filteredProducts.filter(p => p.id === "pw1" || p.id === "p1");
  } else if (filter === "best") {
    // For demo purposes: treat "featured" as Best Sellers
    filteredProducts = filteredProducts.filter(p => p.featured);
  }

  // Sort products
  if (sort === "price_asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-4">All Products</h1>
        <p className="text-lg text-neutral-500 max-w-2xl">
          Browse our complete collection of premium clothing, from everyday essentials to formal wear.
        </p>
      </motion.div>

      {/* URL-based Filters */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-200"
      >
        <div className="flex space-x-4 text-sm font-medium text-neutral-600">
          <button 
            onClick={() => updateParams("filter", "all")}
            className={filter === "all" ? "text-neutral-900" : "hover:text-neutral-900"}
          >
            All
          </button>
          <button 
            onClick={() => updateParams("filter", "new")}
            className={filter === "new" ? "text-neutral-900" : "hover:text-neutral-900"}
          >
            New Arrivals
          </button>
          <button 
            onClick={() => updateParams("filter", "best")}
            className={filter === "best" ? "text-neutral-900" : "hover:text-neutral-900"}
          >
            Best Sellers
          </button>
        </div>
        <div>
          <select 
            value={sort}
            onChange={(e) => updateParams("sort", e.target.value)}
            className="bg-transparent text-sm font-medium text-neutral-600 focus:outline-none cursor-pointer"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filteredProducts.length === 0 && (
          <p className="text-neutral-500 col-span-full py-8 text-center">No products found.</p>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
