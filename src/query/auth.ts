import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (credentials: { email: string; username: string; password: string }) => {
      const response = await api.register.$post({
        json: credentials,
      });
      return response.json();
    },
  });
};
