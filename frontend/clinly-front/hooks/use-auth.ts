"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { postLogin, postRegister } from "@/lib/api";

interface User {
  email: string;
  token: string;
  role?: string;
}

interface AuthContext {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export function useAuth(): AuthContext {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const getUser = useCallback((): User | null => {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("@App:token");
    const email = localStorage.getItem("@App:email");
    const role = localStorage.getItem("@App:role");
    if (!token || !email) return null;
    return { token, email, role: role || undefined };
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const response = await postLogin({ email, password });
        localStorage.setItem("@App:token", response.token);
        localStorage.setItem("@App:email", response.email);
        localStorage.setItem("@App:role", response.role);
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
        const response = await postRegister({
          name,
          email,
          password,
          role: "USER",
        });
        localStorage.setItem("@App:token", response.token);
        localStorage.setItem("@App:email", response.email);
        localStorage.setItem("@App:role", response.role);
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
    router.push("/login");
  }, [router]);

  const user = getUser();

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user?.token,
  };
}
