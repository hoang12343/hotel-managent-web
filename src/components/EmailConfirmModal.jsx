import React, { useState, useEffect, useRef } from "react";
import axiosClient from "../services/axiosClient";
import "./EmailConfirmModal.scss";
import { IoCloseSharp } from "react-icons/io5";

const EmailConfirmModal = ({ isOpen, onClose, email, onOpenLogin }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]); // 6 ký tự
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isCodeExpired, setIsCodeExpired] = useState(false);
  const inputRefs = useRef([]); // Tham chiếu đến các ô input

  useEffect(() => {
    if (!isOpen || isConfirmed) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCodeExpired(true);
          setError("Mã xác nhận đã hết hạn. Vui lòng yêu cầu mã mới.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isConfirmed]);

  if (!isOpen) return null;

  const handleCodeChange = (index, value) => {
    if (!/^[A-Za-z0-9]?$/.test(value)) return; // Chỉ cho phép chữ và số, tối đa 1 ký tự

    const newCode = [...code];
    newCode[index] = value.toUpperCase(); // Chuyển thành chữ in hoa
    setCode(newCode);

    // Chuyển focus sang ô tiếp theo nếu nhập xong
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus(); // Quay lại ô trước nếu xóa
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");

    const confirmCode = code.join("");
    if (!confirmCode || confirmCode.length !== 6 || !password) {
      setError("Vui lòng điền đầy đủ mã xác nhận (6 ký tự) và mật khẩu");
      return;
    }
    if (isCodeExpired) {
      setError("Mã xác nhận đã hết hạn. Vui lòng yêu cầu mã mới.");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Dữ liệu xác nhận:", { email, password, confirmCode });
      const response = await axiosClient.post("/confirmAccount", null, {
        params: { email, password, confirmCode },
      });
      console.log("Xác nhận thành công:", response.data);
      setIsConfirmed(true);
      setTimeout(() => {
        onClose();
        if (typeof onOpenLogin === "function") onOpenLogin();
        resetForm();
      }, 2000);
    } catch (err) {
      console.log("Lỗi chi tiết từ server:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
      setError(err.message || "Xác nhận thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError("");

    try {
      await axiosClient.post("/resendConfirmationCode", null, {
        params: { email },
      });
      setTimeLeft(120);
      setIsCodeExpired(false);
      setCode(["", "", "", "", "", ""]);
      setError("Mã xác nhận mới đã được gửi!");
    } catch (err) {
      setError(err.message || "Không thể gửi lại mã. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCode(["", "", "", "", "", ""]);
    setPassword("");
    setError("");
    setIsConfirmed(false);
    setTimeLeft(120);
    setIsCodeExpired(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          <IoCloseSharp />
        </button>

        {isConfirmed ? (
          <div className="confirm-success">
            <h2>Xác nhận thành công</h2>
            <p>Tài khoản của bạn đã được kích hoạt. Vui lòng đăng nhập.</p>
            <div className="success-icon">✓</div>
          </div>
        ) : (
          <>
            <h2>Xác nhận Email</h2>
            <p>Vui lòng nhập mã xác nhận được gửi đến {email}</p>
            <p>Thời gian còn lại: {timeLeft} giây</p>
            {error && (
              <div
                className={`message ${
                  error.includes("đã được gửi")
                    ? "success-message"
                    : "error-message"
                }`}
              >
                {error}
              </div>
            )}
            <form onSubmit={handleConfirm}>
              <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu của bạn"
                  required
                  disabled={isLoading || isCodeExpired}
                />
              </div>
              <div className="code-inputs">
                <label>Mã xác nhận</label>
                <div className="code-input-container">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      disabled={isLoading || isCodeExpired}
                      className="code-input"
                    />
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="confirm-submit-btn"
                disabled={isLoading || isCodeExpired}
              >
                {isLoading ? "Đang xử lý..." : "Xác nhận"}
              </button>
              <button
                type="button"
                className="resend-btn"
                onClick={handleResendCode}
                disabled={isLoading || !isCodeExpired}
              >
                {isLoading ? "Đang gửi..." : "Gửi lại mã"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailConfirmModal;
