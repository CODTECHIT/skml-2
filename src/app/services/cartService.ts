import api from "./api";

export const cartService = {
  getCart: async () => {
    const response = await api.get("/cart");
    return response.data;
  },
  addToCart: async (item: any) => {
    const response = await api.post("/cart", item);
    return response.data;
  },
  updateCartItem: async (id: string | number, item: any) => {
    const response = await api.put(`/cart/${id}`, item);
    return response.data;
  },
  removeFromCart: async (id: string | number) => {
    const response = await api.delete(`/cart/${id}`);
    return response.data;
  },
};
