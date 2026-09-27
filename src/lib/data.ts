import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "pw1",
    name: "Elegant Floral Wrap Dress",
    description: "A beautiful floral wrap dress made from lightweight, breathable fabric. Perfect for both casual outings and special occasions.",
    price: 59.99,
    category: "Women's Clothing",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Red Floral", "Blue Floral"],
    inStock: true,
    featured: true,
  },
  {
    id: "p1",
    name: "Classic Oxford Shirt",
    description: "A timeless classic. This Oxford shirt is tailored from breathable cotton and features a crisp button-down collar.",
    price: 49.99,
    category: "Men's Clothing",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Light Blue", "Navy"],
    inStock: true,
    featured: true,
  },
  {
    id: "p2",
    name: "Slim Fit Denim Jeans",
    description: "Premium stretch denim tailored for a sleek, modern fit. Perfect for both casual outings and elevated looks.",
    price: 89.99,
    category: "Jeans",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["30x30", "32x32", "34x32", "36x34"],
    colors: ["Dark Wash", "Light Blue", "Black"],
    inStock: true,
    featured: true,
  },
  {
    id: "p3",
    name: "Italian Wool Three-Piece Suit",
    description: "Make an unforgettable impression with this impeccably tailored three-piece suit spun from fine Italian wool.",
    price: 399.00,
    category: "Functions & Formal Wear",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e5?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["38R", "40R", "42R", "44L"],
    colors: ["Charcoal", "Navy", "Black"],
    inStock: true,
    featured: true,
  },
  {
    id: "p4",
    name: "Casual Graphic Tee",
    description: "Ultra-soft cotton blend with a modern geometric graphic print. Designed for ultimate comfort.",
    price: 24.99,
    category: "Men's Clothing",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Grey"],
    inStock: true,
  },
  {
    id: "p5",
    name: "Vintage Straight Leg Jeans",
    description: "A nod to the 90s, these straight leg jeans offer a relaxed fit with a distressed vintage wash.",
    price: 75.00,
    category: "Jeans",
    images: [
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["28x30", "30x32", "32x32", "34x32"],
    colors: ["Vintage Blue", "Faded Black"],
    inStock: true,
  },
  {
    id: "p6",
    name: "Velvet Dinner Jacket",
    description: "Stand out at your next evening event with this plush velvet dinner jacket, featuring satin lapels.",
    price: 250.00,
    category: "Functions & Formal Wear",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["38R", "40R", "42R"],
    colors: ["Burgundy", "Emerald Green", "Black"],
    inStock: true,
  },
  {
    id: "p7",
    name: "Knitted Polo Shirt",
    description: "A refined take on the classic polo. Made with a lightweight knit for a sophisticated drape.",
    price: 55.00,
    category: "Men's Clothing",
    images: [
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["M", "L", "XL"],
    colors: ["Beige", "Navy", "Olive"],
    inStock: true,
    featured: true,
  },
  {
    id: "p8",
    name: "Ripped Skinny Jeans",
    description: "Edgy and stylish ripped skinny jeans featuring reinforced distressing and high-stretch fabric.",
    price: 65.00,
    category: "Jeans",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["30x30", "32x32", "34x34"],
    colors: ["Black", "Light Wash"],
    inStock: true,
  },
];

export function getProductById(id: string) {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string) {
  return products.filter(p => p.category === category);
}

export function searchProducts(query: string) {
  const q = query.toLowerCase();
  return products.filter(
    p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  );
}
