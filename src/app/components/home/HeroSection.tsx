import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";
import { useGetCategories } from "../../hooks/useData";

const FALLBACK_BANNERS = [
  {
    _id: "f1",
    title: "Best Mobiles at Best Prices",
    subtitle: "Shop top brands — Apple, Samsung, Vivo, Oppo & more",
    tag: "NEW ARRIVALS",
    image: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=1280&q=80",
    redirectUrl: "/categories",
  },
  {
    _id: "f2",
    title: "Accessories Sale",
    subtitle: "Earphones, cases, chargers — huge discounts",
    tag: "SALE",
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=1280&q=80",
    redirectUrl: "/categories",
  },
];

function HeroSkeleton() {
  return (
    <section className="bg-transparent pb-8">
      {/* Category bar skeleton */}
      <div className="w-full bg-card border-b border-border overflow-x-auto mb-6">
        <div className="flex items-center gap-4 px-4 h-11 max-w-[1400px] mx-auto">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 w-16 rounded bg-muted animate-pulse" />
          ))}
        </div>
      </div>

      {/* Banner skeleton */}
      <div className="relative overflow-hidden mx-4 rounded-3xl max-w-[1400px] lg:mx-auto border border-border/50">
        <div className="h-64 sm:h-72 md:h-96 lg:h-[32rem] bg-muted animate-pulse rounded-3xl" />
      </div>
    </section>
  );
}

export function HeroSection() {
  const [currentBanner, setCurrentBanner] = useState(0);

  // Fetch hero banners from DB
  const { data: dbBanners, isLoading: bannersLoading } = useQuery({
    queryKey: ["hero-banners"],
    queryFn: async () => {
      const { data } = await api.get("/banners?type=hero");
      return data.data as any[];
    },
  });

  const { data: categories, isLoading: catsLoading } = useGetCategories();
  const location = useLocation();

  const banners = dbBanners && dbBanners.length > 0 ? dbBanners : FALLBACK_BANNERS;

  // useEffect MUST be before any early return (Rules of Hooks)
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentBanner((b) => (b + 1) % banners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (bannersLoading && catsLoading) return <HeroSkeleton />;


  return (
    <section className="bg-transparent pb-8">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-scroll {
            display: flex;
            width: max-content;
            animation: marquee 40s linear infinite;
          }
          .animate-marquee-scroll:hover {
            animation-play-state: paused;
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      {/* Category Marquee */}
      <div className="w-full max-w-[1400px] mx-auto mb-6 px-4">
        <div className="overflow-hidden no-scrollbar bg-card border border-border/50 rounded-2xl shadow-sm py-4 relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee-scroll flex items-center gap-8 md:gap-12 px-4">
            {[...(categories?.length ? categories : [
              { _id: "1", name: "Smartphones", slug: "smartphones" },
              { _id: "2", name: "Accessories", slug: "accessories" },
              { _id: "3", name: "Smartwatches", slug: "smartwatches" },
              { _id: "4", name: "Tablets", slug: "tablets" },
              { _id: "5", name: "Laptops", slug: "laptops" },
              { _id: "6", name: "Headphones", slug: "headphones" },
            ]), ...(categories?.length ? categories : [
              { _id: "1", name: "Smartphones", slug: "smartphones" },
              { _id: "2", name: "Accessories", slug: "accessories" },
              { _id: "3", name: "Smartwatches", slug: "smartwatches" },
              { _id: "4", name: "Tablets", slug: "tablets" },
              { _id: "5", name: "Laptops", slug: "laptops" },
              { _id: "6", name: "Headphones", slug: "headphones" },
            ]), ...(categories?.length ? categories : [
              { _id: "1", name: "Smartphones", slug: "smartphones" },
              { _id: "2", name: "Accessories", slug: "accessories" },
              { _id: "3", name: "Smartwatches", slug: "smartwatches" },
              { _id: "4", name: "Tablets", slug: "tablets" },
              { _id: "5", name: "Laptops", slug: "laptops" },
              { _id: "6", name: "Headphones", slug: "headphones" },
            ]), ...(categories?.length ? categories : [
              { _id: "1", name: "Smartphones", slug: "smartphones" },
              { _id: "2", name: "Accessories", slug: "accessories" },
              { _id: "3", name: "Smartwatches", slug: "smartwatches" },
              { _id: "4", name: "Tablets", slug: "tablets" },
              { _id: "5", name: "Laptops", slug: "laptops" },
              { _id: "6", name: "Headphones", slug: "headphones" },
            ])].map((cat: any, index: number) => {
              const slug = cat.slug || cat.name.toLowerCase().replace(/ /g, "-");
              const href = `/categories/${slug}`;
              const imgUrl = cat.image || cat.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(cat.name)}&background=random&color=fff&size=100`;
              return (
                <Link
                  key={`${cat._id}-${index}`}
                  to={href}
                  className="flex flex-col items-center gap-2 group min-w-[70px] md:min-w-[90px]"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-muted flex items-center justify-center p-0.5 border-2 border-transparent group-hover:border-primary transition-colors shadow-sm">
                    <img src={imgUrl} alt={cat.name} className="w-full h-full object-cover rounded-full" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.png"; }} />
                  </div>
                  <span className="text-[10px] md:text-xs font-semibold text-center text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hero banner carousel */}
      <div className="relative overflow-hidden mx-4 rounded-3xl max-w-[1400px] lg:mx-auto border border-border/50 shadow-2xl">
        <div className="relative h-64 sm:h-72 md:h-96 lg:h-[32rem] bg-secondary">
          {banners.map((banner: any, i: number) => (
            <div
              key={banner._id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${i === currentBanner ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
            >
              <img
                src={banner.image || banner.img}
                alt={banner.title}
                className="w-full h-full object-cover"
              />

            </div>
          ))}

          <div className="absolute inset-0 flex flex-col justify-center px-5 sm:px-8 md:px-16">
            {banners[currentBanner]?.tag && (
              <span className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-2 sm:mb-4 w-fit tracking-wider uppercase shadow-sm">
                {banners[currentBanner].tag}
              </span>
            )}
            <h1 className="font-poppins font-bold text-foreground text-xl sm:text-3xl md:text-5xl lg:text-6xl leading-[1.15] max-w-xs sm:max-w-2xl tracking-tight">
              {banners[currentBanner]?.title}
            </h1>
            {banners[currentBanner]?.subtitle && (
              <p className="text-foreground/80 text-xs sm:text-base md:text-lg mt-2 sm:mt-4 mb-4 sm:mb-8 max-w-xs sm:max-w-xl font-medium line-clamp-2 sm:line-clamp-none">
                {banners[currentBanner].subtitle}
              </p>
            )}
            <Link
              to={banners[currentBanner]?.redirectUrl || "/categories"}
              className="bg-primary hover:bg-primary/90 active:scale-95 text-primary-foreground font-bold text-xs sm:text-sm md:text-base px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full transition-all duration-300 w-fit shadow-lg shadow-primary/30"
            >
              SHOP NOW
            </Link>
          </div>

          {/* Dots */}
          {banners.length > 1 && (
            <div className="absolute bottom-6 right-8 flex items-center gap-2.5">
              {banners.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setCurrentBanner(i)}
                  aria-label={`Banner ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === currentBanner ? "bg-primary w-8" : "bg-primary/20 w-2 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
