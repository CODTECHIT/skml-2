import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";

const FALLBACK_TILES = [
  { _id: "1", title: "Mobile Offers", redirectUrl: "/categories", tag: "OFFER", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80" },
  { _id: "2", title: "Accessories Sale", redirectUrl: "/categories", tag: "SALE", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
  { _id: "3", title: "Service Center", redirectUrl: "/", tag: "SERVICE", image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80" },
  { _id: "4", title: "Wholesale Deals", redirectUrl: "/categories", tag: "BULK", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80" },
];

function TileSkeleton() {
  return <div className="rounded-2xl h-32 md:h-40 bg-muted animate-pulse" />;
}

export function PromoTiles() {
  const { data: dbTiles, isLoading } = useQuery({
    queryKey: ["promo-tiles"],
    queryFn: async () => {
      const { data } = await api.get("/banners?type=promo");
      return data.data as any[];
    },
  });

  // Use DB tiles if they exist, otherwise show fallback
  const tiles = dbTiles && dbTiles.length > 0 ? dbTiles : FALLBACK_TILES;

  return (
    <section className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <TileSkeleton key={i} />)
          : tiles.slice(0, 4).map((tile: any) => (
              <Link
                key={tile._id}
                to={tile.redirectUrl || "/categories"}
                className="relative rounded-2xl overflow-hidden group h-32 md:h-40 bg-card text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent block border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={tile.image}
                  alt={tile.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {tile.tag && (
                  <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider shadow-sm">
                    {tile.tag}
                  </span>
                )}
                <p className="absolute bottom-4 left-4 right-4 font-poppins font-bold text-white text-sm md:text-base leading-tight">
                  {tile.title}
                </p>
              </Link>
            ))}
      </div>
    </section>
  );
}
