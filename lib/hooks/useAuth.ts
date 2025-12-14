"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { StatusCodes } from "http-status-codes";

interface User {
  id: string;
  email: string;
}

interface AuthResponse {
  user: User | null;
}

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<AuthResponse>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const response = await fetch("/api/auth/me");
      if (response.status === StatusCodes.UNAUTHORIZED) {
        return { user: null };
      }
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      return response.json();
    },
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to logout");
      }
    },
    onSuccess: () => {
      queryClient.clear();
      router.push("/login");
      router.refresh();
    },
  });

  return {
    user: data?.user || null,
    isLoading,
    isAuthenticated: !!data?.user,
    error,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}
