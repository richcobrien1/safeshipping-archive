// src/auth/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);
  const [language, setLanguage] = useState("en");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("token");
    const storedLang = localStorage.getItem("language");

    const browserLang = navigator.language?.slice(0, 2) || "en";
    const supportedLangs = ["en", "es", "ja"];
    const defaultLang = supportedLangs.includes(browserLang) ? browserLang : "en";

    // ✅ Only trust role if token exists
    if (storedToken && storedRole) {
      setRole(storedRole);
    } else {
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      setRole(null);
    }

    if (storedLang) {
      setLanguage(storedLang);
    } else {
      setLanguage(defaultLang);
      localStorage.setItem("language", defaultLang);
    }

    setIsInitialized(true); // 🔓 Now ready for routing logic
  }, []);

  const login = (newRole, token = "mock_token_123") => {
    setRole(newRole);
    console.log("🔥 login called with:", newRole);
    localStorage.setItem("role", newRole);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem("role");
    localStorage.removeItem("token");
  };

  const setLanguageAndStore = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        login,
        logout,
        language,
        setLanguage: setLanguageAndStore,
        isInitialized
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("❌ useAuth() must be used within an AuthProvider");
  return context;
}
