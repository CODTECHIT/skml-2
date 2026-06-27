import { useState, useEffect } from "react";
import { Search, Heart, Bell, ShoppingCart, User, Menu, X, Phone, MapPin, Loader2 } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import { useWishlistStore } from "../../store/wishlistStore";
import { useCartStore } from "../../store/cartStore";
import { useLocationStore } from "../../store/locationStore";

export function Header() {
  const wishlist = useWishlistStore((state) => state.wishlist);
  const cartCount = useCartStore((state) => state.cartCount);
  const { location: userLocation, isLoading, requestLocation, error, clearError } = useLocationStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu whenever the route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-card border-b border-border shadow-sm">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 py-2.5 flex items-center gap-2 sm:gap-3">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm">
            <Phone size={15} className="text-primary-foreground" />
          </div>
          <div className="hidden sm:block leading-none">
            <p className="font-poppins font-bold text-foreground text-[14px] sm:text-[15px] tracking-tight">SKML MOBILES</p>
            <p className="text-[9px] text-muted-foreground tracking-wide">Mobiles · Accessories · Service</p>
          </div>
          {/* Show only short name on very small screens */}
          <span className="sm:hidden font-poppins font-bold text-foreground text-[14px]">SKML</span>
        </Link>

        {/* Location Button */}
        <button 
          onClick={requestLocation} 
          onMouseDown={() => clearError()}
          className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors border border-border rounded-lg px-2 py-1 bg-secondary/50"
        >
          {isLoading ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <MapPin size={12} className="text-accent" />
          )}
          <span className="truncate max-w-[100px]">
            {userLocation || (error ? "Retry" : "Set Location")}
          </span>
        </button>

        {/* Search — full width, always visible */}
        <form onSubmit={handleSearch} className="flex-1 relative min-w-0">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mobiles, brands..."
            className="w-full bg-background border border-border rounded-xl pl-8 pr-3 py-2 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-muted-foreground"
          />
        </form>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-5 text-[13px] font-medium text-foreground flex-shrink-0">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/categories" className="hover:text-primary transition-colors">Categories</Link>
          <Link to="/orders" className="hover:text-primary transition-colors">Orders</Link>
          <Link to="/profile" className="hover:text-primary transition-colors">Profile</Link>
        </nav>

        {/* Icon cluster */}
        <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
          {/* Mobile Location Button */}
          <button 
            onClick={requestLocation}
            onMouseDown={() => clearError()}
            className="sm:hidden flex w-9 h-9 items-center justify-center rounded-full hover:bg-secondary transition-colors"
            aria-label="Get Location"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin text-primary" />
            ) : (
              <MapPin size={16} className="text-accent" />
            )}
          </button>

          {/* Wishlist — hidden on mobile (shown in bottom nav area) */}
          <button aria-label="Wishlist" className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full hover:bg-secondary transition-colors relative">
            <Heart size={18} className="text-muted-foreground hover:text-accent transition-colors" />
            {wishlist.size > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlist.size}
              </span>
            )}
          </button>

          {/* Cart icon — visible on mobile too */}
          <Link to="/cart" aria-label="Cart" className="flex w-9 h-9 items-center justify-center rounded-full hover:bg-secondary transition-colors relative">
            <ShoppingCart size={18} className="text-muted-foreground hover:text-primary transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Profile */}
          <Link to="/profile" aria-label="Profile" className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
            <User size={15} />
          </Link>

          {/* Mobile hamburger — lg:hidden */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex w-9 h-9 items-center justify-center rounded-full hover:bg-background transition-colors"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border px-4 py-4 flex flex-col gap-3 text-sm font-medium text-foreground shadow-lg">
          {/* Location option for mobile menu */}
          <button 
            onClick={requestLocation}
            onMouseDown={() => clearError()}
            className="flex items-center gap-2 py-2 border-b border-border text-muted-foreground hover:text-primary"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin text-primary" />
            ) : (
              <MapPin size={16} className="text-accent" />
            )}
            <span>{userLocation || (error ? "Retry Location" : "Set Location")}</span>
          </button>
          {/* Mobile search form */}
          <form onSubmit={handleSearch} className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mobiles, brands..."
              className="w-full bg-background border border-border rounded-xl pl-8 pr-3 py-2 text-sm focus:outline-none focus:border-accent"
            />
          </form>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-primary transition-colors border-b border-border">🏠 Home</Link>
          <Link to="/categories" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-primary transition-colors border-b border-border">📦 Categories</Link>
          <Link to="/orders" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-primary transition-colors border-b border-border">📋 My Orders</Link>
          <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-primary transition-colors">👤 My Profile</Link>
        </div>
      )}
    </header>
  );
}
