import { Star } from "lucide-react";

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={10}
          className={s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-[#E1ECEE] text-[#E1ECEE]"}
        />
      ))}
    </div>
  );
}
