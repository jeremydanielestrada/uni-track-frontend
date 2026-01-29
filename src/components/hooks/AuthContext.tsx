/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import type { Governor } from "../../App.types";
import { api } from "../../utils/Axios";

export const AuthContext = createContext<Governor | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [Governor, setGovernor] = useState<Governor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getAuthenticatedGovenor = async () => {
    try {
      const res = await api.get("/auth/governor");
      setGovernor(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        await getAuthenticatedGovenor();
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={Governor}>{children}</AuthContext.Provider>
  );
}
