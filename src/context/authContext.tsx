import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { sleep } from "@/lib/utils";
import { api } from "@/config/api";
import Cookies from "js-cookie"; // import js-cookie

interface UserType {
  id: string;
  email: string;
  username: string;
  role: string;
}

export interface AuthContextI {
  isAuthenticated: boolean;
  login: (user: UserType) => Promise<void>;
  logout: (onlyRemove?: boolean) => Promise<void>;
  user: UserType | null;
}

export const AuthContext = createContext<AuthContextI | null>(null);

const key = "auth";

function getStoredUser(): UserType | null {
  const cookie = Cookies.get(key);
  return cookie ? JSON.parse(cookie) : null;
}

function setStoredUser(user: UserType | null) {
  if (user) {
    Cookies.set(key, JSON.stringify(user), {
      expires: 7,
      secure: true,
      sameSite: "Lax",
    }); // menyimpan cookie selama 7 hari
  } else {
    Cookies.remove(key, { path: "/" });
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(getStoredUser());
  const isAuthenticated = !!user;

  const logout = useCallback(async (onlyRemove = false) => {
    await sleep(250);

    setStoredUser(null);
    setUser(null);

    if (!onlyRemove) {
      await api.auth.logout.$delete();
      // await axiosApi.get("/logout");
    }
  }, []);

  const login = useCallback(async (user: UserType) => {
    await sleep(500);

    setStoredUser(user);
    setUser(user);
  }, []);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>{children}</AuthContext.Provider>;
}
