import React, { useState } from "react";
import "./ModalLogin.scss";
import { FaApple } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

const ModalLogin = ({ isOpen, onClose, onOpenRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm state để theo dõi trạng thái đăng nhập

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted", { username, password, rememberMe });
    // Giả lập đăng nhập thành công - trong thực tế bạn sẽ kiểm tra với API
    setIsLoggedIn(true);
    // Tự động đóng modal sau 2 giây (tuỳ chọn)
    setTimeout(() => {
      onClose();
      setIsLoggedIn(false); // Reset trạng thái khi đóng
      setUsername(""); // Reset form
      setPassword("");
      setRememberMe(false);
    }, 2000);
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
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Tên đăng nhập</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập tên đăng nhập"
                  required
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
                />
              </div>
              <div className="login-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>
                <a href="#forgot-password" className="forgot-password">
                  Quên mật khẩu?
                </a>
              </div>
              <button type="submit" className="login-submit-btn">
                Đăng nhập
              </button>
            </form>

            <div className="social-login-separator">
              <span>Hoặc đăng nhập với</span>
            </div>

            <div className="social-login-buttons">
              <button
                className="social-btn google-btn"
                onClick={handleGoogleLogin}
              >
                <svg className="social-logo" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="..." />
                  <path fill="#34A853" d="..." />
                  <path fill="#FBBC05" d="..." />
                  <path fill="#EA4335" d="..." />
                </svg>
                Google
              </button>
              <button
                className="social-btn apple-btn"
                onClick={handleAppleLogin}
              >
                <svg className="social-logo" viewBox="0 0 24 24">
                  <FaApple />
                </svg>
                Apple
              </button>
              <button
                className="social-btn facebook-btn"
                onClick={handleFacebookLogin}
              >
                <svg className="social-logo" viewBox="0 0 24 24">
                  <path fill="#1877F2" d="..." />
                </svg>
                Facebook
              </button>
            </div>

            <div className="register-link">
              Chưa có tài khoản?{" "}
              <button
                onClick={onOpenRegister}
                className="register-now"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
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
