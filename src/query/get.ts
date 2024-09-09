import { api } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export function useGetQuery() {
  return useQuery({
    queryKey: ["noauth"],
    queryFn: () => api.test.$get().then((res) => res.json()),
  });
}

export function useGetAuthQuery() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = fetch(api.auth.test.$url(), {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      const res = await response;
      return await res.json();
    },
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
