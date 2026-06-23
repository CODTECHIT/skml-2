import { useState, useEffect } from "react";
import {
  Search, MapPin, Heart, Bell, ShoppingCart, User, ChevronDown, ChevronRight,
  Star, Plus, Phone, Mail, MessageCircle, Youtube, Facebook, Instagram,
  Home, Grid3x3, Package, Menu, X, Zap, Shield, RotateCcw, Truck, CreditCard,
  CheckCircle,
} from "lucide-react";

const CATEGORIES = ["All", "Mobiles", "Keypad Mobiles", "Accessories", "Spares", "Service"];

const CATEGORY_CIRCLES = [
  { name: "Mobiles", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&h=120&fit=crop&auto=format" },
  { name: "Keypad Phones", img: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=120&h=120&fit=crop&auto=format" },
  { name: "Cases & Pouches", img: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=120&h=120&fit=crop&auto=format" },
  { name: "Tempered Glass", img: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=120&h=120&fit=crop&auto=format" },
  { name: "Chargers", img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=120&h=120&fit=crop&auto=format" },
  { name: "Cables", img: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=120&h=120&fit=crop&auto=format" },
  { name: "Earphones", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop&auto=format" },
  { name: "Power Banks", img: "https://images.unsplash.com/photo-1609592806596-be8db0e52cb7?w=120&h=120&fit=crop&auto=format" },
  { name: "Buds", img: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=120&h=120&fit=crop&auto=format" },
  { name: "Neckbands", img: "https://images.unsplash.com/photo-1625245488600-968b8c2f7fdc?w=120&h=120&fit=crop&auto=format" },
  { name: "Batteries", img: "https://images.unsplash.com/photo-1620714223084-8fcacc2dfd4d?w=120&h=120&fit=crop&auto=format" },
  { name: "Speakers", img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=120&h=120&fit=crop&auto=format" },
];

const HERO_BANNERS = [
  {
    title: "Power Up Your Pocket",
    subtitle: "Latest Mobiles. Best Prices.",
    tag: "New Arrivals This Week",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=500&fit=crop&auto=format",
  },
  {
    title: "Repair Done Right",
    subtitle: "Display · Battery · Dead Board Recovery",
    tag: "Trusted Service Center",
    img: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=1200&h=500&fit=crop&auto=format",
  },
  {
    title: "Wholesale Deals",
    subtitle: "Best Prices for Bulk Orders — Retail & Wholesale",
    tag: "Bulk Enquiries Welcome",
    img: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=1200&h=500&fit=crop&auto=format",
  },
];

const PROMO_TILES = [
  { label: "Mobile Offers", tag: "OFFER", img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=200&fit=crop&auto=format" },
  { label: "Accessories Sale", tag: "SALE", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=200&fit=crop&auto=format" },
  { label: "Service Center", tag: "BOOK", img: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=200&fit=crop&auto=format" },
  { label: "Wholesale Deals", tag: "BULK", img: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=400&h=200&fit=crop&auto=format" },
];

type Product = {
  id: number;
  brand: string;
  name: string;
  image: string;
  mrp: number;
  price: number;
  discount: number;
  rating: number;
  reviews: number;
  inStock: boolean;
};

const TRENDING: Product[] = [
  { id: 1, brand: "SAMSUNG", name: "Galaxy M14 5G", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop&auto=format", mrp: 16999, price: 13599, discount: 20, rating: 4.3, reviews: 1842, inStock: true },
  { id: 2, brand: "REDMI", name: "Redmi A3 Keypad", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop&auto=format", mrp: 2499, price: 1899, discount: 24, rating: 4.1, reviews: 673, inStock: true },
  { id: 3, brand: "BOAT", name: "Airdopes 141 TWS", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&auto=format", mrp: 2499, price: 999, discount: 60, rating: 4.4, reviews: 5621, inStock: true },
  { id: 4, brand: "GENERIC", name: "9H Tempered Glass Pack (2-in-1)", image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop&auto=format", mrp: 499, price: 149, discount: 70, rating: 3.9, reviews: 289, inStock: true },
  { id: 5, brand: "REALME", name: "65W SuperDart Charger", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop&auto=format", mrp: 1799, price: 1149, discount: 36, rating: 4.5, reviews: 934, inStock: true },
  { id: 6, brand: "MI", name: "20000mAh Power Bank Pro", image: "https://images.unsplash.com/photo-1609592806596-be8db0e52cb7?w=300&h=300&fit=crop&auto=format", mrp: 2499, price: 1749, discount: 30, rating: 4.6, reviews: 2103, inStock: true },
];

const TOP_PICKS: Product[] = [
  { id: 7, brand: "ONEPLUS", name: "Nord CE 3 Lite 5G", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop&auto=format", mrp: 19999, price: 15999, discount: 20, rating: 4.4, reviews: 3210, inStock: true },
  { id: 8, brand: "BOAT", name: "Bassheads 900 Neckband", image: "https://images.unsplash.com/photo-1625245488600-968b8c2f7fdc?w=300&h=300&fit=crop&auto=format", mrp: 1299, price: 699, discount: 46, rating: 4.2, reviews: 4501, inStock: true },
  { id: 9, brand: "VIVO", name: "Y36 5G — 8GB RAM", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop&auto=format", mrp: 18999, price: 15499, discount: 18, rating: 4.1, reviews: 876, inStock: false },
  { id: 10, brand: "PORTRONICS", name: "Charge Mate 3-in-1 Cable", image: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=300&h=300&fit=crop&auto=format", mrp: 799, price: 399, discount: 50, rating: 4.0, reviews: 1342, inStock: true },
  { id: 11, brand: "SAMSUNG", name: "Galaxy Buds FE", image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=300&h=300&fit=crop&auto=format", mrp: 8999, price: 5999, discount: 33, rating: 4.5, reviews: 2891, inStock: true },
  { id: 12, brand: "GENERIC", name: "Premium Silicone Phone Pouch", image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop&auto=format", mrp: 399, price: 199, discount: 50, rating: 3.8, reviews: 412, inStock: true },
];

function StarRating({ rating }: { rating: number }) {
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

function ProductCard({
  product,
  wishlist,
  onWishlist,
  onAddToCart,
  grid = false,
}: {
  product: Product;
  wishlist: Set<number>;
  onWishlist: (id: number) => void;
  onAddToCart: (id: number) => void;
  grid?: boolean;
}) {
  return (
    <div
      className={`bg-card rounded-2xl border border-[#E1ECEE] overflow-hidden hover:shadow-lg transition-shadow duration-200 group ${
        grid ? "w-full" : "flex-shrink-0 w-48 sm:w-52"
      }`}
    >
      <div className="relative">
        <span className="absolute top-2 left-2 z-10 bg-[#2563EB] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {product.discount}% OFF
        </span>
        <button
          onClick={() => onWishlist(product.id)}
          aria-label={wishlist.has(product.id) ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2 right-2 z-10 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform"
        >
          <Heart
            size={13}
            className={wishlist.has(product.id) ? "fill-red-500 text-red-500" : "text-[#5B7177]"}
          />
        </button>
        <div className="bg-[#F0F7F9] h-40 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-36 w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      <div className="p-3">
        <p className="text-[10px] font-bold text-[#5B7177] uppercase tracking-widest mb-0.5">{product.brand}</p>
        <p className="font-semibold text-foreground text-sm leading-snug mb-1.5 line-clamp-2">{product.name}</p>
        <div className="flex items-center gap-1 mb-2 flex-wrap">
          <StarRating rating={product.rating} />
          <span className="text-[10px] font-medium text-foreground">{product.rating}</span>
          <span className="text-[#C8DDE1]">·</span>
          <span className="text-[10px] text-muted-foreground">{product.reviews.toLocaleString()}</span>
          <span className="text-[#C8DDE1]">·</span>
          <span className={`text-[10px] font-semibold ${product.inStock ? "text-[#1FAA59]" : "text-red-500"}`}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="font-bold text-primary text-base leading-none">₹{product.price.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground line-through mt-0.5">MRP ₹{product.mrp.toLocaleString()}</p>
          </div>
          {product.inStock && (
            <button
              onClick={() => onAddToCart(product.id)}
              className="bg-[#FF7A00] hover:bg-[#e06c00] active:scale-95 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1"
            >
              <Plus size={11} />
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentBanner, setCurrentBanner] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((b) => (b + 1) % HERO_BANNERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addToCart = (id: number) => {
    void id;
    setCartCount((c) => c + 1);
    setToast(true);
    setTimeout(() => setToast(false), 2200);
  };

  return (
    <div className="min-h-screen bg-background font-inter pb-16 md:pb-0">

      {/* Toast */}
      <div
        className={`fixed top-4 right-4 z-50 bg-[#0E7C8C] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
          toast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <CheckCircle size={15} />
        Item added to cart!
      </div>

      {/* ═══════════════════ HEADER ═══════════════════ */}
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 py-2.5 flex items-center gap-3">

          {/* Logo */}
          <a href="#" className="flex-shrink-0 flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00B4D8] to-[#0B5E6F] flex items-center justify-center shadow-sm">
              <Phone size={17} className="text-white" />
            </div>
            <div className="hidden sm:block leading-none">
              <p className="font-poppins font-bold text-[#0A2E36] text-[15px] tracking-tight">SKML MOBILES</p>
              <p className="text-[9px] text-muted-foreground tracking-wide">Mobiles · Accessories · Service</p>
            </div>
          </a>

          {/* Location */}
          <button className="hidden md:flex items-center gap-1.5 text-[13px] text-foreground border border-border rounded-lg px-2.5 py-1.5 hover:border-primary transition-colors flex-shrink-0 bg-background">
            <MapPin size={13} className="text-primary" />
            <span className="font-medium">Yellamanchili</span>
            <ChevronDown size={11} className="text-muted-foreground" />
          </button>

          {/* Search */}
          <div className="flex-1 relative min-w-0">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for mobiles, accessories, brands..."
              className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-muted-foreground"
            />
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5 text-[13px] font-medium text-foreground flex-shrink-0">
            {["Home", "Categories", "Orders", "Profile"].map((n) => (
              <a key={n} href="#" className="hover:text-primary transition-colors">{n}</a>
            ))}
          </nav>

          {/* Icon cluster */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button aria-label="Wishlist" className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full hover:bg-background transition-colors relative">
              <Heart size={18} className="text-muted-foreground" />
              {wishlist.size > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.size}
                </span>
              )}
            </button>
            <button aria-label="Notifications" className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full hover:bg-background transition-colors">
              <Bell size={18} className="text-muted-foreground" />
            </button>
            <button aria-label="Cart" className="flex w-9 h-9 items-center justify-center rounded-full hover:bg-background transition-colors relative">
              <ShoppingCart size={18} className="text-muted-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#FF7A00] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button aria-label="Profile" className="flex w-9 h-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-[#0A2E36] transition-colors">
              <User size={15} />
            </button>
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex w-9 h-9 items-center justify-center rounded-full hover:bg-background transition-colors"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-border px-4 py-3 flex flex-wrap gap-5 text-sm font-medium text-foreground">
            {["Home", "Categories", "Orders", "Profile"].map((n) => (
              <a key={n} href="#" className="hover:text-primary transition-colors">{n}</a>
            ))}
          </div>
        )}
      </header>

      {/* ═══════════════════ DARK TEAL BAND ═══════════════════ */}
      <section className="bg-[#0A2E36]">

        {/* Category pills */}
        <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <div className="flex items-center gap-2 px-4 py-3 max-w-[1400px] mx-auto" style={{ minWidth: "max-content" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex-shrink-0 ${
                  activeCategory === cat
                    ? "bg-white text-primary font-semibold shadow-sm"
                    : "border border-white/25 text-white/75 hover:border-white/60 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Hero banner */}
        <div className="relative overflow-hidden mx-4 mb-4 rounded-2xl max-w-[1400px] lg:mx-auto">
          <div className="relative h-52 sm:h-64 md:h-80 lg:h-96 bg-[#0A2E36]">
            {HERO_BANNERS.map((banner, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-700 ${i === currentBanner ? "opacity-100" : "opacity-0"}`}
              >
                <img src={banner.img} alt={banner.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A2E36]/92 via-[#0A2E36]/55 to-transparent" />
              </div>
            ))}

            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
              <span className="inline-flex items-center gap-1.5 bg-[#00B4D8]/15 border border-[#00B4D8]/50 text-[#00B4D8] text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
                {HERO_BANNERS[currentBanner].tag}
              </span>
              <h1 className="font-poppins font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight max-w-lg">
                {HERO_BANNERS[currentBanner].title}
              </h1>
              <p className="text-white/70 text-sm md:text-base mt-2 mb-5">
                {HERO_BANNERS[currentBanner].subtitle}
              </p>
              <button className="bg-[#00B4D8] hover:bg-[#009bbf] active:scale-[0.98] text-white font-bold text-sm px-7 py-2.5 rounded-full transition-all w-fit shadow-lg shadow-[#00B4D8]/30">
                SHOP NOW
              </button>
            </div>

            {/* Carousel dots */}
            <div className="absolute bottom-4 right-6 flex items-center gap-2">
              {HERO_BANNERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentBanner(i)}
                  aria-label={`Banner ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentBanner ? "bg-[#00B4D8] w-6" : "bg-white/40 w-2 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROMO TILES ═══════════════════ */}
      <section className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PROMO_TILES.map((tile) => (
            <button
              key={tile.label}
              className="relative rounded-xl overflow-hidden group h-28 md:h-36 bg-[#0A2E36] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <img
                src={tile.img}
                alt={tile.label}
                className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:opacity-85 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E36]/80 via-[#0A2E36]/20 to-transparent" />
              <span className="absolute top-2.5 left-2.5 bg-[#00B4D8] text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">
                {tile.tag}
              </span>
              <p className="absolute bottom-3 left-3 font-poppins font-semibold text-white text-sm md:text-[15px] leading-tight">
                {tile.label}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* ═══════════════════ SHOP BY CATEGORY ═══════════════════ */}
      <section className="max-w-[1400px] mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-poppins font-bold text-foreground text-xl">Shop by Category</h2>
          <button className="text-primary text-[13px] font-semibold border border-primary rounded-full px-3.5 py-1 hover:bg-primary hover:text-white transition-colors flex items-center gap-1">
            VIEW ALL <ChevronRight size={13} />
          </button>
        </div>
        <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: "repeat(12, minmax(68px, 1fr))",
              minWidth: "max-content",
            }}
          >
            {CATEGORY_CIRCLES.map((cat) => (
              <button
                key={cat.name}
                className="flex flex-col items-center gap-2 group w-[68px] sm:w-20"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-border group-hover:border-accent transition-colors bg-background shadow-sm">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="text-[11px] font-medium text-foreground text-center leading-tight group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SERVICE STRIP ═══════════════════ */}
      <section className="max-w-[1400px] mx-auto px-4 pb-8">
        <div className="bg-gradient-to-r from-[#E3F7FB] to-[#F0FBFD] border border-[#B2E5F0] rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 bg-[#00B4D8]/15 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap size={21} className="text-primary" />
            </div>
            <div>
              <p className="font-poppins font-bold text-[#0A2E36] text-base">Mobile Service Available</p>
              <p className="text-[13px] text-muted-foreground mt-0.5">
                Display Replacement · Battery Change · Dead Board Recovery
              </p>
            </div>
          </div>
          <button className="border-2 border-primary text-primary font-semibold text-sm px-5 py-2 rounded-full hover:bg-primary hover:text-white transition-all flex-shrink-0 active:scale-95">
            Book Service
          </button>
        </div>
      </section>

      {/* ═══════════════════ TRENDING NOW ═══════════════════ */}
      <section className="max-w-[1400px] mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-poppins font-bold text-foreground text-xl">Trending Now</h2>
          <button className="text-primary text-[13px] font-semibold border border-primary rounded-full px-3.5 py-1 hover:bg-primary hover:text-white transition-colors flex items-center gap-1">
            SEE ALL <ChevronRight size={13} />
          </button>
        </div>
        <div className="overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          <div className="flex gap-3.5">
            {TRENDING.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wishlist={wishlist}
                onWishlist={toggleWishlist}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TOP PICKS ═══════════════════ */}
      <section className="max-w-[1400px] mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-poppins font-bold text-foreground text-xl">Top Picks For You</h2>
          <button className="text-primary text-[13px] font-semibold border border-primary rounded-full px-3.5 py-1 hover:bg-primary hover:text-white transition-colors flex items-center gap-1">
            VIEW ALL <ChevronRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {TOP_PICKS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wishlist={wishlist}
              onWishlist={toggleWishlist}
              onAddToCart={addToCart}
              grid
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════ TRUST STRIP ═══════════════════ */}
      <section className="bg-white border-y border-border py-5">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { Icon: Shield, label: "Genuine Products" },
              { Icon: RotateCcw, label: "Easy Returns" },
              { Icon: Truck, label: "Fast Delivery" },
              { Icon: CreditCard, label: "Secure Payments" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="bg-[#0A2E36] text-white pt-10 pb-6">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-8 border-b border-white/10">

            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00B4D8] to-[#0B5E6F] flex items-center justify-center shadow-sm">
                  <Phone size={17} className="text-white" />
                </div>
                <div className="leading-none">
                  <p className="font-poppins font-bold text-white text-[14px]">SKML MOBILES</p>
                  <p className="text-[9px] text-white/50 tracking-wide">Mobiles · Accessories · Service</p>
                </div>
              </div>
              <p className="text-white/55 text-xs leading-relaxed mb-4 max-w-[200px]">
                Your one-stop destination for mobiles, accessories, spares, and trusted repair service — retail & wholesale.
              </p>
              <div className="flex items-center gap-2">
                {[Facebook, Instagram, MessageCircle, Youtube].map((Icon, i) => (
                  <button
                    key={i}
                    aria-label="Social link"
                    className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center hover:bg-[#00B4D8] hover:border-[#00B4D8] transition-colors"
                  >
                    <Icon size={13} />
                  </button>
                ))}
              </div>
            </div>

            {/* Shop */}
            <div>
              <p className="font-poppins font-semibold text-white text-sm mb-3">Shop</p>
              {["All Products", "New Arrivals", "Best Sellers", "Brands", "Wholesale Deals"].map((link) => (
                <a key={link} href="#" className="block text-white/55 text-xs py-1 hover:text-[#00B4D8] transition-colors">{link}</a>
              ))}
            </div>

            {/* My Account */}
            <div>
              <p className="font-poppins font-semibold text-white text-sm mb-3">My Account</p>
              {["My Profile", "My Orders", "Wishlist", "Address Book"].map((link) => (
                <a key={link} href="#" className="block text-white/55 text-xs py-1 hover:text-[#00B4D8] transition-colors">{link}</a>
              ))}
            </div>

            {/* Help */}
            <div>
              <p className="font-poppins font-semibold text-white text-sm mb-3">Help & Support</p>
              {["Help Center", "Shipping Policy", "Returns & Refunds", "FAQs", "Contact Us"].map((link) => (
                <a key={link} href="#" className="block text-white/55 text-xs py-1 hover:text-[#00B4D8] transition-colors">{link}</a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <p className="font-poppins font-semibold text-white text-sm mb-3">Get in Touch</p>
              <div className="space-y-2.5">
                <p className="flex items-start gap-2 text-white/55 text-xs leading-relaxed">
                  <MapPin size={11} className="flex-shrink-0 mt-0.5 text-[#00B4D8]" />
                  Near RTC Complex, Yellamanchili, Anakapalli Dist – 531055
                </p>
                <p className="flex items-center gap-2 text-white/55 text-xs">
                  <Mail size={11} className="flex-shrink-0 text-[#00B4D8]" />
                  skmlmobilesylm@gmail.com
                </p>
                <p className="flex items-center gap-2 text-white/55 text-xs">
                  <Phone size={11} className="flex-shrink-0 text-[#00B4D8]" />
                  +91 63002 00986
                </p>
                <p className="flex items-center gap-1.5 text-[#1FAA59] text-xs font-semibold">
                  <Shield size={11} className="flex-shrink-0" />
                  100% Secure Payments
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/35 text-xs">© 2026 SKML Mobiles. All rights reserved.</p>
            <div className="flex items-center gap-1.5">
              {["VISA", "MC", "UPI", "Paytm", "COD"].map((badge) => (
                <span
                  key={badge}
                  className="bg-white/8 border border-white/15 text-white/50 text-[10px] font-semibold px-2 py-1 rounded"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════════════ MOBILE BOTTOM TAB BAR ═══════════════════ */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-border flex">
        {[
          { id: "home", Icon: Home, label: "Home" },
          { id: "categories", Icon: Grid3x3, label: "Categories" },
          { id: "cart", Icon: ShoppingCart, label: "Cart", badge: cartCount },
          { id: "orders", Icon: Package, label: "Orders" },
          { id: "profile", Icon: User, label: "Profile" },
        ].map(({ id, Icon, label, badge }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5"
          >
            <div className="relative">
              <Icon size={20} className={activeTab === id ? "text-accent" : "text-muted-foreground"} />
              {badge ? (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[#FF7A00] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {badge}
                </span>
              ) : null}
            </div>
            <span className={`text-[10px] font-medium ${activeTab === id ? "text-accent" : "text-muted-foreground"}`}>
              {label}
            </span>
          </button>
        ))}
      </nav>

    </div>
  );
}
