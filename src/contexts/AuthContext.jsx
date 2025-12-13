import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("auth");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("auth", JSON.stringify(user));
    else localStorage.removeItem("auth");
  }, [user]);

  async function login(email, password) {
    const result = await authApi.login(email, password);
    setUser({
      email: result.email,
      accessToken: result.accessToken,
      _id: result._id,
    });
  }

  async function register(email, password) {
    const result = await authApi.register(email, password);
    setUser({
      email: result.email,
      accessToken: result.accessToken,
      _id: result._id,
    });
  }

  async function logout() {
    if (user?.accessToken) {
      await authApi.logout(user.accessToken);
    }
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
