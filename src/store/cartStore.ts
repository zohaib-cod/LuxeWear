import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, selectedSize: string, selectedColor: string) => void;
  updateQuantity: (id: string, selectedSize: string, selectedColor: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => 
              item.id === newItem.id && 
              item.selectedSize === newItem.selectedSize && 
              item.selectedColor === newItem.selectedColor
          );

          if (existingItemIndex !== -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += newItem.quantity;
            return { items: updatedItems };
          }

          return { items: [...state.items, newItem] };
        });
      },
      
      removeItem: (id, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === id && item.selectedSize === size && item.selectedColor === color)
          ),
        }));
      },
      
      updateQuantity: (id, size, color, quantity) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id && item.selectedSize === size && item.selectedColor === color) {
              return { ...item, quantity };
            }
            return item;
          }),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'luxewear-cart',
    }
  )
);
