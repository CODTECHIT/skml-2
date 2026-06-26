import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router";
import { Package, MapPin, Heart, LogOut, ChevronRight } from "lucide-react";
import { ProfileCard } from "../components/profile/ProfileCard";
import { useAuthStore } from "../store/authStore";

export function Profile() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-[600px] mx-auto px-4 py-20 text-center">
        <h2 className="font-poppins font-bold text-2xl mb-4">You are not logged in</h2>
        <div className="flex justify-center gap-4">
          <Link to="/login" className="bg-primary text-white px-6 py-2.5 rounded-xl font-semibold">Login</Link>
          <Link to="/register" className="border border-border px-6 py-2.5 rounded-xl font-semibold hover:bg-muted transition-colors">Register</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Profile | SKML Mobiles</title>
      </Helmet>
      <div className="max-w-[800px] mx-auto px-4 py-8">
        <h1 className="font-poppins font-bold text-2xl text-foreground mb-6">My Profile</h1>
        
        <div className="mb-6">
          <ProfileCard user={user} />
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <Link to="/orders" className="flex items-center justify-between p-4 hover:bg-muted transition-colors border-b border-border">
            <div className="flex items-center gap-3">
              <div className="bg-[#E3F7FB] p-2 rounded-lg text-primary"><Package size={20} /></div>
              <span className="font-medium text-foreground">My Orders</span>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </Link>
          <button className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors border-b border-border">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600"><MapPin size={20} /></div>
              <span className="font-medium text-foreground">Saved Addresses</span>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-muted transition-colors border-b border-border">
            <div className="flex items-center gap-3">
              <div className="bg-rose-50 p-2 rounded-lg text-rose-500"><Heart size={20} /></div>
              <span className="font-medium text-foreground">Wishlist</span>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>
          <button onClick={handleLogout} className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-lg text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors"><LogOut size={20} /></div>
              <span className="font-medium text-red-500">Logout</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
