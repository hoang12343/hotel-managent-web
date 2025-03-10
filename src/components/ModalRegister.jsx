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
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
      setError("Bạn phải đồng ý với Điều khoản dịch vụ");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Dữ liệu gửi lên:", { email, password, confirmPassword });
      const response = await axiosClient.post("/register", {
        email,
        password,
        confirmPassword,
      });
      console.log("Đăng ký thành công:", response.data);
      setIsRegistered(true);
      setTimeout(() => {
        onClose();
        if (typeof onOpenEmailConfirm === "function") {
          onOpenEmailConfirm(email);
        } else {
          console.warn("onOpenEmailConfirm is not a function");
        }
        resetForm();
      }, 2000);
    } catch (err) {
      console.log("Lỗi chi tiết từ server:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
      setError(err.message || "Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsRegistered(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setAgreeTerms(false);
    setError("");
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} register clicked`);
    setIsRegistered(true);
    setTimeout(() => onClose(), 2000);
    // Thêm logic thực tế cho đăng ký bằng Google/Apple/Facebook nếu cần
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
              <div className="form-group">
                <label htmlFor="confirm-password">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Xác nhận mật khẩu"
                  required
                  disabled={isLoading}
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
                disabled={!agreeTerms || isLoading}
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
                <svg className="social-logo" viewBox="0 0 24 24">
                  {/* SVG Google */}
                </svg>
                Google
              </button>
              <button
                className="social-btn apple-btn"
                onClick={() => handleSocialLogin("Apple")}
                disabled={isLoading}
              >
                <FaApple className="social-logo" />
                Apple
              </button>
              <button
                className="social-btn facebook-btn"
                onClick={() => handleSocialLogin("Facebook")}
                disabled={isLoading}
              >
                <svg className="social-logo" viewBox="0 0 24 24">
                  {/* SVG Facebook */}
                </svg>
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
