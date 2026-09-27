"use client";

import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/lib/data";
import { motion } from "framer-motion";

export default function Home() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-neutral-900/40" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Define Your Style
          </h1>
          <p className="text-lg md:text-xl text-neutral-200 mb-10 max-w-2xl mx-auto font-light">
            Discover our latest collection of premium clothing. Tailored for comfort, designed for the modern individual.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/shop" 
              className="bg-white text-neutral-900 px-8 py-4 rounded-md font-medium hover:bg-neutral-100 transition-colors"
            >
              Shop New Arrivals
            </Link>
            <Link 
              href="/category/formal-wear" 
              className="bg-transparent border border-white text-white px-8 py-4 rounded-md font-medium hover:bg-white/10 transition-colors"
            >
              Explore Formal Wear
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      >
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">Featured Collection</h2>
            <p className="text-neutral-500">Handpicked essentials for your wardrobe.</p>
          </div>
          <Link href="/shop" className="hidden sm:block text-sm font-medium underline underline-offset-4 hover:text-neutral-600 transition-colors">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 sm:hidden flex justify-center">
          <Link href="/shop" className="text-sm font-medium underline underline-offset-4 hover:text-neutral-600 transition-colors">
            View All Products
          </Link>
        </div>
      </motion.section>

      {/* Category Highlights */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="py-16 bg-neutral-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/category/jeans" className="group relative h-[400px] overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop" 
                alt="Jeans" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="text-3xl font-bold tracking-tight mb-2">Premium Denim</h3>
                <span className="bg-white text-neutral-900 px-6 py-2 rounded-full text-sm font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">Shop Jeans</span>
              </div>
            </Link>
            
            <Link href="/category/formal-wear" className="group relative h-[400px] overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop" 
                alt="Formal Wear" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="text-3xl font-bold tracking-tight mb-2">Formal Elegance</h3>
                <span className="bg-white text-neutral-900 px-6 py-2 rounded-full text-sm font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">Shop Formal</span>
              </div>
            </Link>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
