import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = (storageType = "localStorage") => {
  const storage = storageType === "sessionStorage" ? sessionStorage : localStorage;
  const navigate = useNavigate();

  // Initial state
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!storage.getItem("token"));
  const [user, setUser] = useState(() => {
    const token = storage.getItem("token");
    return token ? JSON.parse(atob(token.split(".")[1])) : null;
  });

  const checkAuth = useMemo(
    () => () => {
      try {
        const token = storage.getItem("token");
        setIsAuthenticated(!!token);
        setUser(token ? JSON.parse(atob(token.split(".")[1])) : null); 
      } catch (error) {
        console.error("Error checking auth:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    },
    [storage]
  );

  useEffect(() => {
    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, [checkAuth]);

  const login = useCallback(
    (token) => {
      try {
        storage.setItem("token", token);
        checkAuth();
        window.dispatchEvent(new Event("storage"));
        navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    [checkAuth, navigate, storage]
  );

  const logout = useCallback(() => {
    try {
      storage.removeItem("token");
      checkAuth();
      window.dispatchEvent(new Event("storage"));
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [checkAuth, navigate, storage]);

  return { isAuthenticated, user, login, logout };
};
