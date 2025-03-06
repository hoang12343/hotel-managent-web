// src/components/ModalLogin.jsx
import React, { useState } from "react";
import axiosClient from "../services/axiosClient"; // Import axiosClient
import "./ModalLogin.scss";
import { FaApple } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

const ModalLogin = ({ isOpen, onClose, onOpenRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Gọi API đăng nhập bằng axiosClient
      const response = await axiosClient.post("/login", {
        emailOrPhone,
        password,
      });

      const { token, message } = response.data;
      console.log("Đăng nhập thành công:", message);

      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      setIsLoggedIn(true);
      setTimeout(() => {
        onClose();
        resetForm();
      }, 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setRememberMe(false);
    setError("");
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    setIsLoggedIn(true);
    setTimeout(() => {
      onClose();
      setIsLoggedIn(false);
    }, 2000);
  };

  const handleAppleLogin = () => {
    console.log("Apple login clicked");
    setIsLoggedIn(true);
    setTimeout(() => {
      onClose();
      setIsLoggedIn(false);
    }, 2000);
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
    setIsLoggedIn(true);
    setTimeout(() => {
      onClose();
      setIsLoggedIn(false);
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          <IoCloseSharp />
        </button>

        {isLoggedIn ? (
          <div className="login-success">
            <h2>Tài khoản đã được đăng nhập thành công</h2>
            <div className="success-icon">✓</div>
          </div>
        ) : (
          <>
            <h2>Đăng nhập</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Email/Số điện thoại</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập email hoặc số điện thoại"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="login-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isLoading}
                  />
                  Remember me
                </label>
                <a href="#forgot-password" className="forgot-password">
                  Quên mật khẩu?
                </a>
              </div>
              <button
                type="submit"
                className="login-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </form>

            <div className="social-login-separator">
              <span>Hoặc đăng nhập với</span>
            </div>

            <div className="social-login-buttons">
              <button
                className="social-btn google-btn"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg className="social-logo" viewBox="0 0 24 24">
                  {/* SVG Google */}
                </svg>
                Google
              </button>
              <button
                className="social-btn apple-btn"
                onClick={handleAppleLogin}
                disabled={isLoading}
              >
                <FaApple className="social-logo" />
                Apple
              </button>
              <button
                className="social-btn facebook-btn"
                onClick={handleFacebookLogin}
                disabled={isLoading}
              >
                <svg className="social-logo" viewBox="0 0 24 24">
                  {/* SVG Facebook */}
                </svg>
                Facebook
              </button>
            </div>

            <div className="register-link">
              Chưa có tài khoản?{" "}
              <button onClick={onOpenRegister} className="register-now">
                Đăng ký ngay
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalLogin;
