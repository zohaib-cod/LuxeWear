"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-white block">
              Luxe<span className="font-light">Wear</span>
            </Link>
            <p className="text-sm text-neutral-400 max-w-xs">
              Elevating everyday style with premium quality materials and timeless designs. Modern fashion for the modern individual.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Youtube size={20} /></a>
              <a href="https://vt.tiktok.com/ZSbF3M1fU/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-label="TikTok"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.15 4.34-3.03 5.61-2.07 1.4-4.8 1.47-6.93.33-2.09-1.1-3.53-3.1-3.69-5.46-.16-2.52 1.25-5.07 3.51-6.22 2.21-1.12 4.96-1.01 7.02.32V8.52c-1.12-.66-2.42-1.01-3.75-1.03-2.31-.04-4.66.69-6.38 2.23-1.85 1.66-2.88 4.24-2.42 6.74.45 2.45 2.15 4.54 4.38 5.61 2.21 1.05 4.94 1.15 7.15.22 2.37-.99 4.14-3.26 4.38-5.87V.02h-4.32z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/category/mens-clothing" className="hover:text-white transition-colors">Men&apos;s Clothing</Link></li>
              <li><Link href="/category/womens-clothing" className="hover:text-white transition-colors">Women&apos;s Clothing</Link></li>
              <li><Link href="/category/jeans" className="hover:text-white transition-colors">Jeans</Link></li>
              <li><Link href="/category/formal-wear" className="hover:text-white transition-colors">Functions & Formal Wear</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-neutral-400 mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-neutral-800 text-white px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-white rounded-l-md text-sm"
              />
              <button 
                type="submit" 
                className="bg-white text-neutral-900 px-4 py-2 font-medium text-sm rounded-r-md hover:bg-neutral-200 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
          
        </div>
        
        <div className="border-t border-neutral-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()} LuxeWear. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
