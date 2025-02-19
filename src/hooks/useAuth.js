import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = (storageType = "localStorage") => {
  const storage = storageType === "sessionStorage" ? sessionStorage : localStorage;
  const navigate = useNavigate();

  // Helper function to decode token and check expiration
  const parseToken = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      if (decoded.exp * 1000 < Date.now()) {
        return null; // Token expired
      }
      return decoded;
    } catch (error) {
      return null; // Invalid token
    }
  };

  // Initial state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = storage.getItem("token");
    return !!parseToken(token);
  });

  const [user, setUser] = useState(() => {
    const token = storage.getItem("token");
    return parseToken(token);
  });

  const checkAuth = useMemo(
    () => () => {
      try {
        const token = storage.getItem("token");
        const userData = parseToken(token);
        
        setIsAuthenticated(!!userData);
        setUser(userData);

        // If token is expired, remove it
        if (!userData) {
          storage.removeItem("token");
        }
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
        if (!parseToken(token)) {
          throw new Error("Invalid or expired token");
        }
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
