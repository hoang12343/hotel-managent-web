import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axiosClient from "../services/axiosClient";
import "./ModalLogin.scss";
import { IoCloseSharp } from "react-icons/io5";

const ModalLogin = ({ onOpenForgotPassword }) => {
  // Thêm prop
  const { isLoginOpen, setIsLoginOpen, handleLoginSuccess, isLoading } =
    useAuth();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  if (!isLoginOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axiosClient.post("/login", {
        email: emailOrPhone,
        password,
      });

      const token = response.data.token;
      const username = response.data.username || "User";

      if (!token) {
        throw new Error("Không nhận được token từ server!");
      }

      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      const userData = {
        username,
        token,
        points: 0,
        avatar: "../assets/images/avatar2.jpg",
      };

      handleLoginSuccess(userData);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.";
      setError(errorMessage);
      console.error("Lỗi đăng nhập:", err);
    }
  };

  const resetForm = () => {
    setEmailOrPhone("");
    setPassword("");
    setRememberMe(false);
    setError("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="modal-close-btn"
          onClick={() => {
            setIsLoginOpen(false);
            resetForm();
          }}
          disabled={isLoading}
        >
          <IoCloseSharp />
        </button>

        <h2>Đăng nhập</h2>
        {error && <div className="error-message">{error}</div>}
        {isLoading && <div className="loading-message">Đang xử lý...</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="emailOrPhone">Email/Số điện thoại</label>
            <input
              type="text"
              id="emailOrPhone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
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
            <button
              type="button"
              className="forgot-password"
              onClick={onOpenForgotPassword} // Gọi hàm mở modal quên mật khẩu
              disabled={isLoading}
            >
              Quên mật khẩu?
            </button>
          </div>
          <button
            type="submit"
            className="login-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalLogin;
