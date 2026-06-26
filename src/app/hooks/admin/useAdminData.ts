import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/axios";
import { toast } from "sonner";

// --- MOBILES (PRODUCTS) ---
export const useGetMobiles = () => {
  return useQuery({
    queryKey: ["admin", "mobiles"],
    queryFn: async () => {
      const { data } = await api.get("/products");
      return data.data; // assuming API returns { success: true, data: [...] }
    },
  });
};

export const useCreateMobile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (mobileData: any) => {
      const { data } = await api.post("/products", mobileData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "mobiles"] });
      toast.success("Mobile added successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add mobile");
    }
  });
};

export const useUpdateMobile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      const res = await api.put(`/products/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "mobiles"] });
      toast.success("Mobile updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update mobile");
    }
  });
};

export const useDeleteMobile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/products/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "mobiles"] });
      toast.success("Mobile deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete mobile");
    }
  });
};

// --- CATEGORIES ---
export const useGetCategories = () => {
  return useQuery({
    queryKey: ["admin", "categories"],
    queryFn: async () => {
      const { data } = await api.get("/categories");
      return data.data;
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (categoryData: any) => {
      const { data } = await api.post("/categories", categoryData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      toast.success("Category added successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add category");
    }
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      const res = await api.put(`/categories/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      toast.success("Category updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update category");
    }
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/categories/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      toast.success("Category deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete category");
    }
  });
};

// --- ORDERS ---
export const useGetOrders = () => {
  return useQuery({
    queryKey: ["admin", "orders"],
    queryFn: async () => {
      const { data } = await api.get("/orders");
      return data.data;
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      const { data } = await api.put(`/orders/${id}`, { orderStatus: status });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
      toast.success("Order status updated");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  });
};

// --- CUSTOMERS ---
export const useGetCustomers = () => {
  return useQuery({
    queryKey: ["admin", "customers"],
    queryFn: async () => {
      const { data } = await api.get("/users/customers");
      return data.data;
    },
  });
};

// --- BANNERS ---
export const useGetBanners = () => {
  return useQuery({
    queryKey: ["admin", "banners"],
    queryFn: async () => {
      const { data } = await api.get("/banners");
      return data.data as any[];
    },
  });
};

export const useCreateBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bannerData: any) => {
      const { data } = await api.post("/banners", bannerData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "banners"] });
      toast.success("Banner added successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add banner");
    }
  });
};

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/banners/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "banners"] });
      toast.success("Banner deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete banner");
    }
  });
};

// --- PROMO TILES ---
export const useGetPromoTiles = () => {
  return useQuery({
    queryKey: ["admin", "promo-tiles"],
    queryFn: async () => {
      const { data } = await api.get("/banners?type=promo");
      return data.data as any[];
    },
  });
};

export const useCreatePromoTile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tileData: any) => {
      const { data } = await api.post("/banners", { ...tileData, type: "promo" });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "promo-tiles"] });
      toast.success("Promo tile added successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add promo tile");
    }
  });
};

export const useGetAnalytics = () => {
  return useQuery({
    queryKey: ["admin", "analytics"],
    queryFn: async () => {
      const { data } = await api.get("/analytics");
      return data.data;
    },
  });
};
