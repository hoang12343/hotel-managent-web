// src/components/EmailConfirmModal.jsx
import React, { useState } from "react";
import axiosClient from "../services/axiosClient";
import "./EmailConfirmModal.scss";
import { IoCloseSharp } from "react-icons/io5";

const EmailConfirmModal = ({ isOpen, onClose, email, onOpenLogin }) => {
  const [confirmCode, setConfirmCode] = useState("");
  const [password, setPassword] = useState(""); // Thêm password để xác nhận
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");

    if (!confirmCode || !password) {
      setError("Vui lòng điền đầy đủ mã xác nhận và mật khẩu");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Dữ liệu xác nhận:", { email, password, confirmCode });
      const response = await axiosClient.post("/confirmAccount", null, {
        params: {
          email: email,
          password: password,
          confirmCode: confirmCode,
        },
      });
      console.log("Xác nhận thành công:", response.data);
      setIsConfirmed(true);
      setTimeout(() => {
        onClose();
        onOpenLogin(); // Chuyển hướng sang login sau khi xác nhận
        resetForm();
      }, 2000);
    } catch (err) {
      console.log("Lỗi chi tiết từ server:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
      const errorMessage =
        err.message || "Xác nhận thất bại. Vui lòng thử lại.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setConfirmCode("");
    setPassword("");
    setError("");
    setIsConfirmed(false);
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
            {error && <div className="error-message">{error}</div>}
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
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-code">Mã xác nhận</label>
                <input
                  type="text"
                  id="confirm-code"
                  value={confirmCode}
                  onChange={(e) => setConfirmCode(e.target.value)}
                  placeholder="Nhập mã xác nhận"
                  required
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                className="confirm-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? "Đang xử lý..." : "Xác nhận"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailConfirmModal;
