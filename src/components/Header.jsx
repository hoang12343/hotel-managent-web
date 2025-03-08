import React, { useState, useEffect, useRef } from "react";
import "./Header.scss";
import ModalLogin from "./ModalLogin.jsx";
import ModalRegister from "./ModalRegister.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // Mock user data - in a real app, you would fetch this from your API
      setUserInfo({
        username: "User",
        points: 250,
        avatar: "https://via.placeholder.com/40",
      });
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update header class when menu is open
  useEffect(() => {
    if (headerRef.current) {
      if (isMenuOpen) {
        headerRef.current.classList.add("mobile-menu-active");
      } else {
        headerRef.current.classList.remove("mobile-menu-active");
      }
    }
  }, [isMenuOpen]);

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
    setIsModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleOpenLoginFromRegister = () => {
    setIsRegisterModalOpen(false);
    setIsModalOpen(true);
  };

  const handleLoginSuccess = (userData) => {
    // Add default values for new properties
    const enrichedUserData = {
      ...userData,
      points: userData.points || 0,
      avatar: userData.avatar || "../assets/images/avatar2.jpg",
    };

    setIsLoggedIn(true);
    setUserInfo(enrichedUserData);
    setIsModalOpen(false);

    toast.success("Đăng nhập thành công!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserInfo(null);
    setIsProfileDropdownOpen(false);

    toast.info("Đăng xuất thành công!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close profile dropdown when toggling menu
    if (isProfileDropdownOpen) {
      setIsProfileDropdownOpen(false);
    }
  };

  const toggleProfileDropdown = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  return (
    <>
      <header className="header" ref={headerRef}>
        <div className="nav-logo">
          <h1 className="logo">VTI HOTEL</h1>
        </div>

        <nav className={`nav-list ${isMenuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <a href="#home" className="nav-link" onClick={handleNavLinkClick}>
                Trang chủ
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="nav-link"
                onClick={handleNavLinkClick}
              >
                Phòng
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="nav-link"
                onClick={handleNavLinkClick}
              >
                Tiện nghi
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="nav-link"
                onClick={handleNavLinkClick}
              >
                Liên Hệ
              </a>
            </li>
            <li>
              <a
                href="#AboutUs"
                className="nav-link"
                onClick={handleNavLinkClick}
              >
                Giới thiệu
              </a>
            </li>
          </ul>
        </nav>

        <div className={`auth-buttons ${isMenuOpen ? "active" : ""}`}>
          {isLoggedIn ? (
            <div className="user-profile" ref={dropdownRef}>
              <div className="profile-info" onClick={toggleProfileDropdown}>
                <div className="avatar-container">
                  <img
                    src={userInfo?.avatar}
                    alt="User Avatar"
                    className="user-avatar"
                  />
                </div>
                <div className="user-details">
                  <span className="username">{userInfo?.username}</span>
                  <span className="points">{userInfo?.points} điểm</span>
                </div>
                <span className="dropdown-arrow">
                  {isProfileDropdownOpen ? "▲" : "▼"}
                </span>
              </div>

              {isProfileDropdownOpen && (
                <div className="profile-dropdown">
                  <ul>
                    <li onClick={() => setIsProfileDropdownOpen(false)}>
                      <a href="#profile">Chỉnh sửa hồ sơ</a>
                    </li>
                    <li onClick={() => setIsProfileDropdownOpen(false)}>
                      <a href="#transactions">Danh sách giao dịch</a>
                    </li>
                    <li onClick={() => setIsProfileDropdownOpen(false)}>
                      <a href="#notifications">Thông báo</a>
                    </li>
                    <li onClick={() => setIsProfileDropdownOpen(false)}>
                      <a href="#saved">Đã lưu</a>
                    </li>
                    <li className="logout-item" onClick={handleLogout}>
                      <a href="#logout">Đăng xuất</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        <button className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </header>

      <ModalLogin
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onOpenRegister={handleOpenRegisterFromLogin}
        onLoginSuccess={handleLoginSuccess}
      />
      <ModalRegister
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegisterModal}
        onOpenLogin={handleOpenLoginFromRegister}
      />

      <ToastContainer />
    </>
  );
};

export default Header;
