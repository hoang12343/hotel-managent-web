// ModalLogin.jsx
import React, { useState } from "react";
import "./ModalLogin.scss";

const ModalLogin = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted", { username, password, rememberMe });
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Add Google login logic here
  };

  const handleAppleLogin = () => {
    console.log("Apple login clicked");
    // Add Apple login logic here
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>
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
              Ghi nhớ tôi
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
              <path
                fill="#000000"
                d="M18.71 13.38c-.07-2.24 1.83-4.18 3.82-4.36-.5-1.47-1.84-2.71-3.41-3.06-1.45-.34-2.85.18-3.62.67-.78.5-1.39.54-2.55.33-1.16-.21-2.26-.74-2.71-1.24-1.67-1.47-1.67-3.88-.87-5.84.38 1.57.35 2.37 1.67 2.71 2.96.34 1.28-.04 2.65-.87 3.63-.74.87-1.92 1.55-3.06 1.51-1.16-.04-2.26-.62-2.94-1.28-.67-.65-1.18-1.43-1.51-2.29-1.18-3-.35-6.86 2.55-8.63C5.06 2.39 8.31 1 11.45 1c1.59 0 3.06.5 4.14 1.35.82.65 1.43 1.47 1.88 2.41-.57-.14-1.63-.35-2.37.14-.82.54-.94 1.63-.71 2.55.28.92 1 1.63 1.71 2.51z"
              />
            </svg>
            Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;
