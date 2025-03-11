import React, { useState, useEffect, useRef } from "react";
import axiosClient from "../services/axiosClient";
import "./EmailConfirmModal.scss";
import { IoCloseSharp } from "react-icons/io5";

const EmailConfirmModal = ({ isOpen, onClose, email, onOpenLogin }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isCodeExpired, setIsCodeExpired] = useState(false);
  const inputRefs = useRef([]);

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

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCodeChange = (index, value) => {
    if (!/^[A-Za-z0-9]?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.toUpperCase();
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    if (index === 5 && value) {
      handleConfirm({ preventDefault: () => {} });
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");

    const confirmCode = code.join("");
    if (!confirmCode || confirmCode.length !== 6) {
      setError("Vui lòng điền đầy đủ mã xác nhận (6 ký tự)");
      return;
    }
    if (isCodeExpired) {
      setError("Mã xác nhận đã hết hạn. Vui lòng yêu cầu mã mới.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosClient.post("/confirmAccount", null, {
        params: { email, confirmCode },
      });
      setIsConfirmed(true);
      setTimeout(() => {
        onClose();
        onOpenLogin();
        resetForm();
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Xác nhận thất bại. Vui lòng thử lại."
      );
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
      setError(
        err.response?.data?.message || "Không thể gửi lại mã. Vui lòng thử lại."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCode(["", "", "", "", "", ""]);
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
