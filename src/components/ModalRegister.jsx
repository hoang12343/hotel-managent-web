import React, { useState } from "react";
import axiosClient from "../services/axiosClient";
import "./ModalRegister.scss";
import { FaApple } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

const ModalRegister = ({
  isOpen,
  onClose,
  onOpenLogin,
  onOpenEmailConfirm,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (!email.match(/^[A-Za-z0-9+_.-]+@(.+)$/)) {
      setError("Email không hợp lệ");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }
    if (!agreeTerms) {
      setError("Vui lòng đồng ý với Điều khoản dịch vụ");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosClient.post("/register", {
        email,
        password,
        confirmPassword,
      });
      setIsRegistered(true);
      setTimeout(() => {
        onClose();
        onOpenEmailConfirm(email);
        resetForm();
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setAgreeTerms(false);
    setError("");
    setIsRegistered(false);
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} register clicked`);
    // Thêm logic đăng ký bằng Google/Apple/Facebook nếu cần
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          <IoCloseSharp />
        </button>
        {isRegistered ? (
          <div className="register-success">
            <h2>Đăng ký thành công</h2>
            <p>Vui lòng kiểm tra email để xác nhận tài khoản.</p>
            <div className="success-icon">✓</div>
          </div>
        ) : (
          <>
            <h2>Đăng ký</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  placeholder="Nhập email"
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="terms-group">
                <label className="terms-label">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    disabled={isLoading}
                  />
                  Tôi đồng ý với{" "}
                  <a href="#terms" className="terms-link">
                    Điều khoản dịch vụ
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className="register-submit-btn"
                disabled={isLoading || !agreeTerms}
              >
                {isLoading ? "Đang xử lý..." : "Đăng ký"}
              </button>
            </form>
            <div className="social-login-separator">
              <span>Hoặc đăng ký với</span>
            </div>
            <div className="social-login-buttons">
              <button
                className="social-btn google-btn"
                onClick={() => handleSocialLogin("Google")}
                disabled={isLoading}
              >
                Google
              </button>
              <button
                className="social-btn apple-btn"
                onClick={() => handleSocialLogin("Apple")}
                disabled={isLoading}
              >
                <FaApple className="social-logo" /> Apple
              </button>
              <button
                className="social-btn facebook-btn"
                onClick={() => handleSocialLogin("Facebook")}
                disabled={isLoading}
              >
                Facebook
              </button>
            </div>
            <div className="login-link">
              Đã có tài khoản?{" "}
              <button onClick={onOpenLogin} className="login-now">
                Đăng nhập ngay
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalRegister;
