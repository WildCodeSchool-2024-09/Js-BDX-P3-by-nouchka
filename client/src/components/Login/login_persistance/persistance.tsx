import { type ReactNode, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isLogged: boolean;
  userRole: string;
  setUserRole: (role: string) => void;
  setIsLogged: (value: boolean) => void;
  logout: () => void;
  userFirstName: string | null;
  setUserFirstName: (value: string) => void;
  login: (token: string, firstName: string, role: string, userId: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });
  const [userFirstName, setUserFirstName] = useState<string | null>(() => {
    return localStorage.getItem("userFirstName");
  });
  const [userRole, setUserRole] = useState<string>(() => {
    return localStorage.getItem("userRole") || "client";
  });

  const login = (token: string, firstName: string, role: string, userId: number) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userFirstName", firstName);
    localStorage.setItem("userRole", role);
    localStorage.setItem("userId", userId.toString());
    setIsLogged(true);
    setUserFirstName(firstName);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userId");

    setIsLogged(false);
    setUserFirstName(null);
    setUserRole("client");

    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        setIsLogged,
        logout,
        userFirstName,
        setUserFirstName,
        userRole,
        setUserRole,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
