import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
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

  //Logga in
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await fetch("http://localhost:3001/login", {
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

  //Logga ut
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const register = async (credentials: LoginCredentials) => {
    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Registrering misslyckades...");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch {
      throw new Error("Något gick fel...");
    }
  };

  //Validera token
  const checkToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/validate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
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
