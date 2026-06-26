import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";
import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { login: storeLogin, logout: storeLogout } = useAuthStore();

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: authService.getProfile,
    enabled: useAuthStore.getState().isAuthenticated,
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      storeLogin(data.user, data.token);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      storeLogin(data.user, data.token);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const logout = () => {
    storeLogout();
    queryClient.clear();
  };

  return {
    profileQuery,
    loginMutation,
    registerMutation,
    logout,
  };
};
