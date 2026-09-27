"use client";

import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  const total = getTotalPrice();
  const tax = total * 0.05;
  const shipping = total > 100 || total === 0 ? 0 : 10;
  const finalTotal = total + tax + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-neutral-100 p-6 rounded-full mb-6">
          <ShoppingBag size={48} className="text-neutral-400" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-4">Your Cart is Empty</h1>
        <p className="text-neutral-500 mb-8 text-center max-w-md">
          Looks like you haven&apos;t added anything to your cart yet. Discover our latest collections and find something you love.
        </p>
        <Link 
          href="/shop" 
          className="bg-neutral-900 text-white px-8 py-3 rounded-md font-medium hover:bg-neutral-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-10">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <div className="border-b border-neutral-200 pb-4 mb-6 hidden sm:grid sm:grid-cols-6 gap-4 text-sm font-medium text-neutral-500">
            <div className="sm:col-span-3">Product</div>
            <div className="sm:col-span-1 text-center">Quantity</div>
            <div className="sm:col-span-1 text-right">Price</div>
            <div className="sm:col-span-1 text-right">Total</div>
          </div>

          <div className="space-y-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div 
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="grid grid-cols-1 sm:grid-cols-6 gap-4 sm:items-center border-b border-neutral-100 pb-6"
                >
                  <div className="sm:col-span-3 flex space-x-4">
                    <div className="w-24 h-32 flex-shrink-0 bg-neutral-100 rounded-md overflow-hidden">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <Link href={`/product/${item.id}`} className="text-base font-medium text-neutral-900 hover:underline">
                          {item.name}
                        </Link>
                        <p className="text-sm text-neutral-500 mt-1">Size: {item.selectedSize}</p>
                        <p className="text-sm text-neutral-500">Color: {item.selectedColor}</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor)}
                        className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center w-fit"
                      >
                        <Trash2 size={14} className="mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="sm:col-span-1 flex items-center sm:justify-center mt-4 sm:mt-0">
                    <div className="flex items-center border border-neutral-200 rounded-md">
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 text-neutral-500 hover:text-neutral-900 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        className="px-3 py-1 text-neutral-500 hover:text-neutral-900 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="sm:col-span-1 sm:text-right font-medium text-neutral-900 hidden sm:block">
                    ${item.price.toFixed(2)}
                  </div>
                  
                  <div className="sm:col-span-1 font-bold text-neutral-900 flex justify-between sm:block sm:text-right mt-4 sm:mt-0">
                    <span className="sm:hidden text-neutral-500 font-normal">Total:</span>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h2 className="text-lg font-bold text-neutral-900 mb-6 border-b border-neutral-200 pb-4">Order Summary</h2>
            
            <div className="space-y-4 text-sm text-neutral-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-neutral-900">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-neutral-900">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="font-medium text-neutral-900">${tax.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t border-neutral-200 pt-4 mb-8 flex justify-between items-center">
              <span className="text-base font-bold text-neutral-900">Total</span>
              <span className="text-xl font-bold text-neutral-900">${finalTotal.toFixed(2)}</span>
            </div>
            
            <Link 
              href="/checkout"
              className="w-full bg-neutral-900 text-white py-4 rounded-md font-medium hover:bg-neutral-800 transition-colors flex justify-center items-center group"
            >
              Proceed to Checkout
              <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="mt-4 text-center">
              <Link href="/shop" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors underline underline-offset-4">
                or Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
