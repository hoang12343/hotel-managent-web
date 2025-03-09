// src/context/AuthProvider.jsx
import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  return <>{children}</>;
};

export const AuthWrapper = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token") || !!sessionStorage.getItem("token")
  );
  const [userInfo, setUserInfo] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isEmailConfirmOpen, setIsEmailConfirmOpen] = useState(false);
  const [emailToConfirm, setEmailToConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setUserInfo(userData);
      setIsLoginOpen(false);
      setIsLoading(false);
      toast.success("Đăng nhập thành công!", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/");
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      setIsLoggedIn(false);
      setUserInfo(null);
      setIsLoading(false);
      toast.info("Đăng xuất thành công!", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/");
    }, 1000);
  };

  const value = {
    isLoggedIn,
    userInfo,
    isLoginOpen,
    setIsLoginOpen,
    isRegisterOpen,
    setIsRegisterOpen,
    isEmailConfirmOpen,
    setIsEmailConfirmOpen,
    emailToConfirm,
    setEmailToConfirm,
    isLoading,
    handleLoginSuccess,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthWrapper");
  }
  return context;
};
