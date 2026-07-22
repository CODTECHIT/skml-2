import { api } from "../api/axios";

export const cartService = {
  getCart: async () => {
    const response = await api.get("/cart");
    return Array.isArray(response.data?.data) ? response.data.data : (Array.isArray(response.data) ? response.data : []);
  },
  addToCart: async (item: any) => {
    const response = await api.post("/cart", item);
    return Array.isArray(response.data?.data) ? response.data.data : (Array.isArray(response.data) ? response.data : []);
  },
  updateCartItem: async (id: string | number, item: any) => {
    const response = await api.put(`/cart/${id}`, item);
    return Array.isArray(response.data?.data) ? response.data.data : (Array.isArray(response.data) ? response.data : []);
  },
  removeFromCart: async (id: string | number) => {
    const response = await api.delete(`/cart/${id}`);
    return Array.isArray(response.data?.data) ? response.data.data : (Array.isArray(response.data) ? response.data : []);
  },
};

