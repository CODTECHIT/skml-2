import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (product: { _id?: string; id?: string; title?: string; name?: string; price: number; images?: string[]; image?: string }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toast: boolean;
  setToast: (val: boolean) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      cartCount: 0,
      toast: false,
      setToast: (val) => set({ toast: val }),

      addToCart: (product) =>
        set((state) => {
          const id = String(product._id || product.id);
          const name = product.title || product.name || "Product";
          const image = product.images?.[0] || product.image || "/placeholder.png";
          const price = product.price;

          const existing = state.cartItems.find((item) => item.id === id);
          if (existing) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
              ),
              cartCount: state.cartCount + 1,
              toast: true,
            };
          }
          return {
            cartItems: [...state.cartItems, { id, name, price, image, quantity: 1 }],
            cartCount: state.cartCount + 1,
            toast: true,
          };
        }),

      removeFromCart: (id) =>
        set((state) => {
          const existing = state.cartItems.find((item) => item.id === id);
          if (!existing) return state;
          return {
            cartItems: state.cartItems.filter((item) => item.id !== id),
            cartCount: state.cartCount - existing.quantity,
          };
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            const existing = state.cartItems.find((item) => item.id === id);
            return {
              cartItems: state.cartItems.filter((item) => item.id !== id),
              cartCount: state.cartCount - (existing?.quantity || 0),
            };
          }
          const existing = state.cartItems.find((item) => item.id === id);
          const diff = quantity - (existing?.quantity || 0);
          return {
            cartItems: state.cartItems.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
            cartCount: state.cartCount + diff,
          };
        }),

      clearCart: () => set({ cartItems: [], cartCount: 0 }),
    }),
    { name: "skml-cart" }
  )
);
