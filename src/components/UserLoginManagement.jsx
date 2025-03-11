import React from "react";
import ModalRegister from "./ModalRegister";
import EmailConfirmModal from "./EmailConfirmModal";
import ModalLogin from "./ModalLogin"; // Giả định bạn đã có ModalLogin
import { useAuth } from "../context/AuthProvider";

const UserLoginManagement = () => {
  const {
    isRegisterOpen,
    setIsRegisterOpen,
    isEmailConfirmOpen,
    setIsEmailConfirmOpen,
    emailToConfirm,
    setEmailToConfirm,
    setIsLoginOpen,
  } = useAuth();

  const handleOpenRegisterFromLogin = () => {
    setIsLoginOpen(false);
    setTimeout(() => setIsRegisterOpen(true), 100);
  };

  const handleOpenLoginFromRegister = () => {
    setIsRegisterOpen(false);
    setTimeout(() => setIsLoginOpen(true), 100);
  };

  return (
    <>
      <ModalRegister
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onOpenLogin={handleOpenLoginFromRegister}
        onOpenEmailConfirm={(email) => {
          setEmailToConfirm(email);
          setIsEmailConfirmOpen(true);
        }}
      />
      <EmailConfirmModal
        isOpen={isEmailConfirmOpen}
        onClose={() => setIsEmailConfirmOpen(false)}
        email={emailToConfirm}
        onOpenLogin={() => setIsLoginOpen(true)}
      />
      <ModalLogin /> {/* Giả định bạn đã có ModalLogin */}
    </>
  );
};

export default UserLoginManagement;
