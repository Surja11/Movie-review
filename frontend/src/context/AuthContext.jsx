import { createContext, useCallback, useEffect, useState } from "react";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      
      if (!token) {
        console.log("No token");
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }

      const res = await api.get("/me/");
      console.log("✅ Auth check response:", res.data);
      
      if (res.data.authenticated === true) {
        
        setIsAuthenticated(true);
        setUser(res.data.user); 

      } else {
        
        setIsAuthenticated(false);
        setUser(null);
        
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
      }
    } catch (err) {
      
      setIsAuthenticated(false);
      setUser(null);
      
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("REFRESH_TOKEN");
    } finally {
      setLoading(false);
    }
  }, []);

  
  useEffect(() => {
    console.log("Auth state updated:", { 
      isAuthenticated, 
      user: user?.username || user?.email 
    });
  }, [isAuthenticated, user]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      checkAuth, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};