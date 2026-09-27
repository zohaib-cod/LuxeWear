"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, Menu, X, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Men", href: "/category/mens-clothing" },
  { name: "Women", href: "/category/womens-clothing" },
  { name: "Jeans", href: "/category/jeans" },
  { name: "Formal Wear", href: "/category/formal-wear" },
];

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-4"
          : "bg-white py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-neutral-800"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-neutral-900">
              Luxe<span className="font-light">Wear</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-neutral-900 ${
                  pathname === link.href ? "text-neutral-900" : "text-neutral-500"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button className="text-neutral-500 hover:text-neutral-900 transition-colors">
              <Search size={20} />
            </button>
            <button className="hidden sm:block text-neutral-500 hover:text-neutral-900 transition-colors">
              <User size={20} />
            </button>
            <Link href="/cart" className="relative text-neutral-500 hover:text-neutral-900 transition-colors">
              <ShoppingBag size={20} />
              {isMounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-neutral-900 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-neutral-900/50 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-white z-50 shadow-xl flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                <Link href="/" className="text-xl font-bold tracking-tighter" onClick={() => setIsMobileMenuOpen(false)}>
                  Luxe<span className="font-light">Wear</span>
                </Link>
                <button
                  className="p-2 text-neutral-500 hover:text-neutral-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col p-6 space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-lg font-medium ${
                      pathname === link.href ? "text-neutral-900" : "text-neutral-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
