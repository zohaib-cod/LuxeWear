export type Category = "Men's Clothing" | "Women's Clothing" | "Jeans" | "Functions & Formal Wear" | "Accessories";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}
