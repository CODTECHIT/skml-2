import { Phone, MapPin, Mail, Shield, Facebook, Instagram, MessageCircle, Youtube } from "lucide-react";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-secondary text-foreground pt-10 pb-6 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-8 border-b border-border/50">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm">
                <Phone size={17} className="text-white" />
              </div>
              <div className="leading-none">
                <p className="font-poppins font-bold text-foreground text-[14px]">SKML MOBILES</p>
                <p className="text-[9px] text-muted-foreground tracking-wide">Mobiles · Accessories · Service</p>
              </div>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed mb-4 max-w-[200px]">
              Your one-stop destination for mobiles, accessories, spares, and trusted repair service — retail & wholesale.
            </p>
            <div className="flex items-center gap-2">
              {[Facebook, Instagram, MessageCircle, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  aria-label="Social link"
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-colors"
                >
                  <Icon size={13} />
                </button>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="font-poppins font-semibold text-foreground text-sm mb-3">Shop</p>
            {["All Products", "New Arrivals", "Best Sellers", "Brands", "Wholesale Deals"].map((link) => (
              <Link key={link} to="#" className="block text-muted-foreground text-xs py-1 hover:text-primary transition-colors">{link}</Link>
            ))}
          </div>

          {/* My Account */}
          <div>
            <p className="font-poppins font-semibold text-foreground text-sm mb-3">My Account</p>
            {["My Profile", "My Orders", "Wishlist", "Address Book"].map((link) => (
              <Link key={link} to="#" className="block text-muted-foreground text-xs py-1 hover:text-primary transition-colors">{link}</Link>
            ))}
          </div>

          {/* Help */}
          <div>
            <p className="font-poppins font-semibold text-foreground text-sm mb-3">Help & Support</p>
            <Link to="/about" className="block text-muted-foreground text-xs py-1 hover:text-primary transition-colors">About Us</Link>
            {["Help Center", "Shipping Policy", "Returns & Refunds", "FAQs", "Contact Us"].map((link) => (
              <Link key={link} to="#" className="block text-muted-foreground text-xs py-1 hover:text-primary transition-colors">{link}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p className="font-poppins font-semibold text-foreground text-sm mb-3">Get in Touch</p>
            <div className="space-y-2.5">
              <p className="flex items-start gap-2 text-muted-foreground text-xs leading-relaxed">
                <MapPin size={11} className="flex-shrink-0 mt-0.5 text-primary" />
                Near RTC Complex, Yellamanchili, Anakapalli Dist – 531055
              </p>
              <p className="flex items-center gap-2 text-muted-foreground text-xs">
                <Mail size={11} className="flex-shrink-0 text-primary" />
                skmlmobilesylm@gmail.com
              </p>
              <p className="flex items-center gap-2 text-muted-foreground text-xs">
                <Phone size={11} className="flex-shrink-0 text-primary" />
                +91 63002 00986
              </p>
              <p className="flex items-center gap-1.5 text-[#10B981] text-xs font-semibold">
                <Shield size={11} className="flex-shrink-0" />
                100% Secure Payments
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs">© 2026 SKML Mobiles. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            {["VISA", "MC", "UPI", "Paytm", "COD"].map((badge) => (
              <span
                key={badge}
                className="bg-card border border-border text-muted-foreground text-[10px] font-semibold px-2 py-1 rounded"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
