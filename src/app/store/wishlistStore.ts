import { create } from "zustand";

type WishlistState = {
  wishlist: Set<number>;
  addWishlist: (id: number) => void;
  removeWishlist: (id: number) => void;
  toggleWishlist: (id: number) => void;
};

export const useWishlistStore = create<WishlistState>((set) => ({
  wishlist: new Set(),
  addWishlist: (id) =>
    set((state) => {
      const next = new Set(state.wishlist);
      next.add(id);
      return { wishlist: next };
    }),
  removeWishlist: (id) =>
    set((state) => {
      const next = new Set(state.wishlist);
      next.delete(id);
      return { wishlist: next };
    }),
  toggleWishlist: (id) =>
    set((state) => {
      const next = new Set(state.wishlist);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { wishlist: next };
    }),
}));
