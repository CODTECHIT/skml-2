import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";

// --- PRODUCTS ---
export const useGetProducts = (params?: Record<string, string>) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const { data } = await api.get("/products", { params });
      return data.data as any[];
    },
  });
};

export const useGetProductById = (id?: string) => {
  return useQuery({
    queryKey: ["product", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      return data.data as any;
    },
  });
};

// --- CATEGORIES ---
export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await api.get("/categories");
      return data.data as any[];
    },
  });
};

// --- USER ORDERS ---
export const useGetMyOrders = () => {
  return useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const { data } = await api.get("/orders");
      return data.data as any[];
    },
  });
};
