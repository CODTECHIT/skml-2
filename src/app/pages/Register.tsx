import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useCartStore } from "../store/cartStore";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { authService } from "../services/authService";
import { toast } from "sonner";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      const msg = "Full Name must be at least 2 characters.";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (phone.trim().length < 10) {
      const msg = "Phone number must be at least 10 digits.";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (password.length < 6) {
      const msg = "Password must be at least 6 characters long.";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (password !== confirmPassword) {
      const msg = "Passwords do not match!";
      setError(msg);
      toast.error(msg);
      return;
    }
    
    setLoading(true);
    try {
      const response = await authService.register({ name: name.trim(), email: email.trim(), phone: phone.trim(), password });
      
      if (response.success) {
        // Automatically log them in
        login(response.data, "token-stored-in-cookie");
        toast.success("Registered successfully!");

        // Merge guest cart to member account
        try {
          await useCartStore.getState().mergeLocalCart();
        } catch (err) {
          console.error("Cart merge on registration failed", err);
        }

        navigate(redirect);
      }
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || err.message || "Registration failed. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register | SKML Mobiles</title>
        <meta name="description" content="Create your free SKML Mobiles account. Get access to exclusive deals, order tracking, and wishlist on phones, accessories, and electronics." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="max-w-[500px] mx-auto px-4 py-12">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <h1 className="font-poppins font-bold text-2xl text-foreground mb-6 text-center">Create an Account</h1>
          
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Inline Error Message Banner */}
            {error && (
              <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-xl px-4 py-3">
                <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => { setName(e.target.value); setError(""); }}
                required
                className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  error ? "border-destructive focus:ring-destructive/20" : "border-border focus:ring-primary"
                }`}
                placeholder="Enter your full name" 
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                required
                className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  error ? "border-destructive focus:ring-destructive/20" : "border-border focus:ring-primary"
                }`}
                placeholder="Enter your email" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Phone Number</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setError(""); }}
                required
                className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  error ? "border-destructive focus:ring-destructive/20" : "border-border focus:ring-primary"
                }`}
                placeholder="Enter your 10-digit phone number" 
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  required
                  className={`w-full px-4 py-2.5 pr-12 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    error ? "border-destructive focus:ring-destructive/20" : "border-border focus:ring-primary"
                  }`}
                  placeholder="Create a password (min 6 characters)" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                required
                className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  error ? "border-destructive focus:ring-destructive/20" : "border-border focus:ring-primary"
                }`}
                placeholder="Confirm your password" 
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all mt-2 disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Registering...
                </>
              ) : "Register"}
            </button>
          </form>
          
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </>
  );
}
