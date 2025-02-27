import React, { useState } from "react";
import "./Header.scss";
import ModalLogin from "./ModalLogin.jsx";
import ModalRegister from "./ModalRegister.jsx";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleOpenRegisterFromLogin = () => {
    setIsModalOpen(false); // Close the login modal
    setIsRegisterModalOpen(true); // Open the register modal
  };

  // New function to handle opening the login modal from register modal
  const handleOpenLoginFromRegister = () => {
    setIsRegisterModalOpen(false); // Close the register modal
    setIsModalOpen(true); // Open the login modal
  };

  return (
    <>
      <header className="header">
        <div className="nav-logo">
          <h1 className="logo">VTI HOTEL</h1>
        </div>

        <nav className="nav-list">
          <ul>
            <li>
              <a href="#home" className="nav-link">
                Trang chủ
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link">
                Phòng
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link">
                Tiện nghi
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link">
                Liên Hệ
              </a>
            </li>
            <li>
              <a href="#AboutUs" className="nav-link">
                Giới thiệu
              </a>
            </li>
          </ul>
        </nav>

        <div className="auth-buttons">
          <ul className="register-btn">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLoginClick}
            >
              Đăng nhập
            </button>
          </ul>
          <ul className="login-btn">
            <button onClick={handleRegisterClick}>Đăng ký</button>
          </ul>
        </div>
      </header>
      <ModalLogin
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onOpenRegister={handleOpenRegisterFromLogin}
      />
      <ModalRegister
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegisterModal}
        onOpenLogin={handleOpenLoginFromRegister} // Pass the new callback
      />
    </>
  );
};

export default Header;
