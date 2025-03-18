import { createContext, useState, useContext, ReactNode } from "react";
import {
  User,
  LoginCredentials,
  AuthResponse,
  AuthContextType,
} from "../types/auth.types";

//Skapa context
const AuthContext = createContext<AuthContextType | null>(null);

//Interface för context
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Inloggning misslyckades...");
      }

      const data = (await response.json()) as AuthResponse;

      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch {
      throw new Error("Något gick fel...");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth måste användas inom en AuthProvider");
  }

  return context;
};
