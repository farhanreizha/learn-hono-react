import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import Cookies from "js-cookie";
import { FormLogin } from "@/schema/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: FormLogin) => {
      const response = await fetch(api.login.$url(), {
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
    mutationFn: async (credentials: { email: string; username: string; password: string }) => {
      const response = await fetch(api.register.$url(), {
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
      const response = await fetch(api.auth.session.$url(), {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const res = await response.json();
      return res.session;
    },
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
