import { ReactNode, createContext, useCallback } from "react";
import { FormLogin } from "@/schema/auth";
import { useLogin, useSession } from "@/query/auth";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { api } from "@/config/api";
import { errorToastConfig, successToastConfig } from "@/config/toastConfig";

interface UserType {
  id: string;
  email: string;
  username: string;
}

export interface AuthContextI {
  isAuthenticated: boolean;
  login: (credentials: FormLogin) => Promise<void>;
  logout: (onlyRemove?: boolean) => Promise<void>;
  user: UserType | null;
}

export const AuthContext = createContext<AuthContextI | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { mutate } = useLogin();
  const { data: user } = useSession();
  const isAuthenticated = !!user;

  const login = useCallback(
    async (credentials: FormLogin) => {
      mutate(credentials, {
        onSuccess: (data: { message: string }) => {
          toast.success(data.message, successToastConfig);
          window.location.replace("/");
        },
        onError: (error: Error) => {
          const errorMessage = error.message.split('"')[1].trim();
          toast.error(errorMessage, errorToastConfig);
        },
      });
    },
    [mutate]
  );

  const logout = useCallback(async (onlyRemove = false) => {
    if (!onlyRemove) {
      await fetch(api.auth.logout.$url(), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      window.location.reload();
    }
  }, []);

  return <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>{children}</AuthContext.Provider>;
}
