import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../store/authStore";

export function ProtectedAdminRoute() {
  const { user, isAuthenticated } = useAuthStore();

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
