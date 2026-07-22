"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { postLogin, postRegister } from "@/lib/api";

interface User {
  email: string;
  token: string;
  role: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  userRole: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

function readUser(): User | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("@App:token");
  const email = localStorage.getItem("@App:email");
  const role = localStorage.getItem("@App:role");
  const name = localStorage.getItem("@App:name");
  if (!token || !email) return null;
  return { token, email, role: role || "USER", name: name || undefined };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(() => readUser());
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const response = await postLogin({ email, password });
        localStorage.setItem("@App:token", response.token);
        localStorage.setItem("@App:email", response.email);
        localStorage.setItem("@App:role", response.role);
        setUser({ token: response.token, email: response.email, role: response.role });
        router.push("/dashboard");
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      setIsLoading(true);
      try {
        const response = await postRegister({ name, email, password, role: "USER" });
        localStorage.setItem("@App:token", response.token);
        localStorage.setItem("@App:email", response.email);
        localStorage.setItem("@App:role", response.role);
        localStorage.setItem("@App:name", response.name);
        setUser({ token: response.token, email: response.email, role: response.role, name: response.name });
        router.push("/dashboard");
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("@App:token");
    localStorage.removeItem("@App:email");
    localStorage.removeItem("@App:role");
    localStorage.removeItem("@App:name");
    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user?.token,
        userRole: user?.role ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
