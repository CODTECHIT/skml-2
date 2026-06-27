import { Link } from "react-router";
import { Heart, Plus } from "lucide-react";
import { StarRating } from "./StarRating";
import { useWishlistStore } from "../../store/wishlistStore";
import { useCartStore } from "../../store/cartStore";

export function ProductCard({
  product,
  grid = false,
}: {
  product: any; // DB product from MongoDB
  grid?: boolean;
}) {
  const wishlist = useWishlistStore((state) => state.wishlist);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const addToCart = useCartStore((state) => state.addToCart);

  const id = product._id || product.id;
  const image = product.images?.[0] || product.image || product.img || "/placeholder.png";
  const name = product.title || product.name;
  const price = product.price || 0;
  const originalPrice = product.originalPrice || product.discountPrice || product.mrp;
  const discount = originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;
  const brand = product.brand || "";
  const rating = product.rating || 0;
  const numReviews = product.numReviews || product.reviews || 0;
  const inStock = product.stock == null ? true : product.stock > 0;

  return (
    <Link
      to={`/products/${id}`}
      className={`bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:-translate-y-[2px] transition-all duration-300 group block ${
        grid ? "w-full" : "flex-shrink-0 w-48 sm:w-52"
      }`}
    >
      <div className="relative">
        {discount && discount > 0 ? (
          <span className="absolute top-2 left-2 z-10 bg-accent text-accent-foreground text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            {discount}% OFF
          </span>
        ) : null}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(id);
          }}
          aria-label={wishlist.includes(id) ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2 right-2 z-10 w-8 h-8 bg-card rounded-full flex items-center justify-center shadow-sm border border-border/50 hover:scale-110 transition-transform"
        >
          <Heart
            size={14}
            className={wishlist.includes(id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}
          />
        </button>
        <div className="bg-secondary/40 h-44 flex items-center justify-center overflow-hidden p-4">
          <img
            src={image}
            alt={name}
            className="h-36 w-full object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.png"; }}
          />
        </div>
      </div>
      <div className="p-4">
        {brand && <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{brand}</p>}
        <p className="font-semibold text-foreground text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">{name}</p>
        <div className="flex items-center gap-1.5 mb-3 flex-wrap">
          <StarRating rating={rating} />
          <span className="text-[10px] font-medium text-foreground">{rating}</span>
          {numReviews > 0 && (
            <>
              <span className="text-border">·</span>
              <span className="text-[10px] text-muted-foreground">{numReviews.toLocaleString()} reviews</span>
            </>
          )}
          <span className="text-border">·</span>
          <span className={`text-[10px] font-semibold ${inStock ? "text-[#10B981]" : "text-destructive"}`}>
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        <div className="flex items-end justify-between mt-auto">
          <div>
            <p className="font-bold text-foreground text-lg leading-none">₹{price.toLocaleString()}</p>
            {originalPrice && originalPrice > price && (
              <p className="text-[11px] text-muted-foreground line-through mt-1">MRP ₹{originalPrice.toLocaleString()}</p>
            )}
          </div>
          {inStock && (
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="bg-primary hover:bg-primary/90 active:scale-95 text-primary-foreground text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1 shadow-md shadow-primary/20"
            >
              <Plus size={12} />
              ADD
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
