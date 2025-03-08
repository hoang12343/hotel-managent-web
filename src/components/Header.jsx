import React, { useState, useEffect, useRef } from "react";
import "./Header.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({ onOpenRegister, onOpenLogin, onLoginSuccess }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setUserInfo({
        username: "User",
        points: 250,
        avatar: "https://via.placeholder.com/40",
      });
    }
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.classList.toggle("mobile-menu-active", isMenuOpen);
    }
  }, [isMenuOpen]);

  const handleLoginSuccessLocal = (userData) => {
    console.log("Header received userData:", userData);
    const enrichedUserData = {
      ...userData,
      points: userData.points || 0,
      avatar: userData.avatar || "../assets/images/avatar2.jpg",
      username: userData.username || "User",
    };
    setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập
    setUserInfo(enrichedUserData); // Cập nhật thông tin người dùng
    setIsProfileDropdownOpen(true); // Tự động mở dropdown
    toast.success("Đăng nhập thành công!", {
      position: "top-center",
      autoClose: 3000,
    });
    if (typeof onLoginSuccess === "function") {
      onLoginSuccess(enrichedUserData);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserInfo(null);
    setIsProfileDropdownOpen(false);
    toast.info("Đăng xuất thành công!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileDropdown = (e) => {
    e.stopPropagation();
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };
  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const handleLoginClick = () => {
    console.log("Nút Đăng nhập được click, onOpenLogin:", onOpenLogin);
    if (typeof onOpenLogin === "function") {
      onOpenLogin();
    } else {
      console.error("onOpenLogin không phải là hàm!");
    }
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
                <button onClick={onOpenRegister}>Đăng ký</button>
              </ul>
            </>
          )}
        </div>

        <button className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </header>

      <ToastContainer />
    </>
  );
};

export default Header;
