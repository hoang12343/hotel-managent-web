import React, { useState } from "react";
import "./ModalRegister.scss";
import { FaApple } from "react-icons/fa6";

const ModalRegister = ({ isOpen, onClose, onOpenLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    console.log("Register submitted", { username, email, password });
    // Add your registration logic here
  };

  const handleGoogleLogin = () => {
    console.log("Google register clicked");
    // Add Google registration logic here
  };

  const handleAppleLogin = () => {
    console.log("Apple register clicked");
    // Add Apple registration logic here
  };

  const handleFacebookLogin = () => {
    console.log("Facebook register clicked");
    // Add Facebook registration logic here
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Đăng ký</h2>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
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
          <div className="form-group">
            <label htmlFor="confirm-password">Xác nhận mật khẩu</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Xác nhận mật khẩu"
              required
            />
          </div>
          <button type="submit" className="register-submit-btn">
            Đăng ký
          </button>
        </form>

        <div className="social-login-separator">
          <span>Hoặc đăng ký với</span>
        </div>

        <div className="social-login-buttons">
          <button className="social-btn google-btn" onClick={handleGoogleLogin}>
            <svg className="social-logo" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.04.69-2.36 1.09-3.71 1.09-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4.01 20.39 7.68 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.68 1 4.01 3.61 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>
          <button className="social-btn apple-btn" onClick={handleAppleLogin}>
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
              <path
                fill="#1877F2"
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
            Facebook
          </button>
        </div>

        <div className="login-link">
          Đã có tài khoản?{" "}
          <button
            onClick={onOpenLogin} // Use button with onClick instead of <a>
            className="login-now"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }} // Match link styling
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRegister;
