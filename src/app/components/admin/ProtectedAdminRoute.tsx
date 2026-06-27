import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../store/authStore";
import { useState, useEffect } from "react";

export function ProtectedAdminRoute() {
  const { user, isAuthenticated } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen flex items-center justify-center text-primary">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Only allow: role === 'admin'
  if (user?.role !== "admin") {
    // Redirect to home if they are not an admin
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
