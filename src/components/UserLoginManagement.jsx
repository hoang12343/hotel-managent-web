// src/components/UserLoginManagement.jsx
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
    console.log("Received userData in UserLoginManagement:", userData);
    if (typeof onLoginSuccess === "function") {
      onLoginSuccess(userData);
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
        onLoginSuccess={handleLoginSuccessLocal} // Truyền hàm cục bộ
      />
    </>
  );
};

export default UserLoginManagement;
