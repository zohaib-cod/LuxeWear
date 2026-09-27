"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const total = getTotalPrice();
  const tax = total * 0.05;
  const shipping = total > 100 || total === 0 ? 0 : 10;
  const finalTotal = total + tax + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center justify-center min-h-[70vh]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="text-green-500 mb-6"
        >
          <CheckCircle2 size={80} />
        </motion.div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-4 text-center">Order Confirmed!</h1>
        <p className="text-lg text-neutral-500 mb-8 text-center max-w-md">
          Thank you for shopping with LuxeWear. Your order #LW-{Math.floor(Math.random() * 100000)} has been successfully placed.
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

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-4">Nothing to checkout</h1>
        <p className="text-neutral-500 mb-8">Your cart is empty. Please add items to cart before proceeding to checkout.</p>
        <Link href="/shop" className="text-neutral-900 underline underline-offset-4 font-medium">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Contact Info */}
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Contact Information</h2>
              <div className="grid gap-4">
                <input required type="email" placeholder="Email Address" className="w-full border border-neutral-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 transition-colors" />
              </div>
            </section>

            {/* Shipping Info */}
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="First Name" className="w-full border border-neutral-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 transition-colors" />
                <input required type="text" placeholder="Last Name" className="w-full border border-neutral-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 transition-colors" />
                <input required type="text" placeholder="Address" className="col-span-2 w-full border border-neutral-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 transition-colors" />
                <input required type="text" placeholder="City" className="w-full border border-neutral-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 transition-colors" />
                <input required type="text" placeholder="Postal Code" className="w-full border border-neutral-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 transition-colors" />
              </div>
            </section>

            {/* Payment Info */}
            <section>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Payment</h2>
              <div className="grid gap-4">
                <input required type="text" placeholder="Card Number" className="w-full border border-neutral-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 transition-colors" />
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" placeholder="MM/YY" className="w-full border border-neutral-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 transition-colors" />
                  <input required type="text" placeholder="CVC" className="w-full border border-neutral-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 transition-colors" />
                </div>
              </div>
            </section>

            <button 
              type="submit" 
              disabled={isProcessing}
              className={`w-full py-4 rounded-md font-medium text-white transition-all flex items-center justify-center ${
                isProcessing ? "bg-neutral-600 cursor-wait" : "bg-neutral-900 hover:bg-neutral-800"
              }`}
            >
              {isProcessing ? "Processing Order..." : `Pay $${finalTotal.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-neutral-50 p-6 lg:p-8 rounded-lg sticky top-32">
            <h2 className="text-lg font-bold text-neutral-900 mb-6 border-b border-neutral-200 pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex space-x-4">
                  <div className="w-16 h-20 bg-neutral-200 rounded-md overflow-hidden flex-shrink-0 relative">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 text-sm py-1">
                    <h3 className="font-medium text-neutral-900 line-clamp-1">{item.name}</h3>
                    <p className="text-neutral-500 mt-1">{item.selectedSize} / {item.selectedColor}</p>
                  </div>
                  <div className="text-sm font-medium text-neutral-900 py-1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm text-neutral-600 border-t border-neutral-200 pt-6">
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
            
            <div className="border-t border-neutral-200 pt-4 mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-neutral-900">Total</span>
              <span className="text-2xl font-bold text-neutral-900">${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
