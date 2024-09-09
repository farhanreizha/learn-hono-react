import { useQuery } from "@tanstack/react-query";

export function useGetQuery() {
  return useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      const response = await fetch(`/api/test`);
      return response.json();
    },
  });
}

export function useGetQueryProtected() {
  return useQuery({
    queryKey: ["protected"],
    queryFn: async () => {
      const response = await fetch(`/api/auth/test/protected`);
      return response.json();
    },
  });
}
