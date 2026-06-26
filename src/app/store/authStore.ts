import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userData: any, token: string) => void;
  logout: () => void;
  setUser: (userData: any) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (userData, token) => set({ user: userData, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      setUser: (userData) => set({ user: userData }),
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
    }
  )
);
