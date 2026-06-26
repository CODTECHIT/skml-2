import { Home, Grid3x3, Package, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useCartStore } from "../../store/cartStore";

export function MobileNav() {
  const cartCount = useCartStore((state) => state.cartCount);
  const location = useLocation();

  const NAV_ITEMS = [
    { id: "/", Icon: Home, label: "Home" },
    { id: "/categories", Icon: Grid3x3, label: "Categories" },
    { id: "/cart", Icon: ShoppingCart, label: "Cart", badge: cartCount },
    { id: "/orders", Icon: Package, label: "Orders" },
    { id: "/profile", Icon: User, label: "Profile" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-card border-t border-border flex safe-area-inset-bottom shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
      {NAV_ITEMS.map(({ id, Icon, label, badge }) => {
        const isActive = location.pathname === id || (id !== "/" && location.pathname.startsWith(id));
        return (
          <Link
            key={id}
            to={id}
            className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-colors active:scale-95 ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div className="relative">
              <Icon size={21} strokeWidth={isActive ? 2.5 : 1.8} />
              {badge ? (
                <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 bg-destructive text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1">
                  {badge > 99 ? "99+" : badge}
                </span>
              ) : null}
            </div>
            <span className={`text-[10px] font-medium ${isActive ? "font-semibold" : ""}`}>
              {label}
            </span>
            {isActive && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
