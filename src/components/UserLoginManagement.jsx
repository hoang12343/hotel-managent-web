import React from "react";
import ModalRegister from "./ModalRegister";
import EmailConfirmModal from "./EmailConfirmModal";
import ModalLogin from "./ModalLogin";

const UserLoginManagement = ({
  isRegisterOpen,
  onCloseRegister,
  onOpenEmailConfirm,
  isEmailConfirmOpen,
  onCloseEmailConfirm,
  emailToConfirm,
  onOpenLogin,
  isLoginOpen,
  onCloseLogin,
  onLoginSuccess,
}) => {
  const handleOpenRegisterFromLogin = () => {
    onCloseLogin();
    setTimeout(() => onCloseRegister(true), 100);
  };

  const handleOpenLoginFromRegister = () => {
    onCloseRegister();
    setTimeout(() => onOpenLogin(), 100);
  };

  const handleLoginSuccessLocal = (userData) => {
    console.log("Đăng nhập thành công từ UserLoginManagement:", userData);
    if (userData && userData.username) {
      if (typeof onLoginSuccess === "function") {
        onLoginSuccess(userData); // Truyền dữ liệu đầy đủ lên HomePage/Header
      } else {
        console.warn("onLoginSuccess không phải là hàm!");
      }
    } else {
      console.warn("Không nhận được username từ ModalLogin!");
    }
  };

  return (
    <>
      <ModalRegister
        isOpen={isRegisterOpen}
        onClose={onCloseRegister}
        onOpenLogin={handleOpenLoginFromRegister}
        onOpenEmailConfirm={onOpenEmailConfirm}
      />
      <EmailConfirmModal
        isOpen={isEmailConfirmOpen}
        onClose={onCloseEmailConfirm}
        email={emailToConfirm}
        onOpenLogin={onOpenLogin}
      />
      <ModalLogin
        isOpen={isLoginOpen}
        onClose={onCloseLogin}
        onOpenRegister={handleOpenRegisterFromLogin}
        onLoginSuccess={handleLoginSuccessLocal}
      />
    </>
  );
};

export default UserLoginManagement;
