/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import type { Governor } from "../../App.types";
import { api } from "../../utils/Axios";

interface AuthContextType {
  governor: Governor | null;
  setGovernor: (governor: Governor | null) => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [governor, setGovernor] = useState<Governor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAuthenticatedGovernor = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setGovernor(null);
        setIsLoading(false);
        return;
      }

      try {
        const res = await api.get("/auth/governor");
        setGovernor(res.data.governor);
      } catch (err) {
        console.log(err);
        setGovernor(null);
      } finally {
        setIsLoading(false);
      }
    };

    getAuthenticatedGovernor();
  }, []);

  return (
    <AuthContext.Provider value={{ governor, setGovernor, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
