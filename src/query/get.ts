import { api } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

export function useGetQuery() {
  return useQuery({
    queryKey: ["test"],
    queryFn: () => api.test.$get().then((res) => res.json()),
  });
}
