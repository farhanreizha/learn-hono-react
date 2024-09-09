import { useMutation, useQuery } from "@tanstack/react-query";
import { FormLogin, FormRegister } from "@/schema/auth";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (credentials: FormLogin) => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      return response.json();
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (credentials: FormRegister) => {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      return response.json();
    },
  });
};

export const useSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const response = await fetch("/api/auth/session");
      const data = await response.json();
      if (!data || !data.user) {
        throw new Error("No session data available");
      }
      return data.user;
    },
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
