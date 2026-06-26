import { create } from "zustand";

type OrderState = {
  orders: any[];
  setOrders: (orders: any[]) => void;
  addOrder: (order: any) => void;
};

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
}));
