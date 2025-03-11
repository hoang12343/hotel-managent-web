import React, { useState, useEffect, useRef } from "react";
import "./Header.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthProvider";

const Header = () => {
  const {
    isLoggedIn,
    userInfo,
    setIsLoginOpen,
    setIsRegisterOpen,
    handleLoginSuccess,
    handleLogout,
    isLoading,
  } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // Trạng thái scroll
  const dropdownRef = useRef(null);
  const headerRef = useRef(null);

  // Xử lý scroll để thay đổi trạng thái header ngay khi scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0); // Đổi màu ngay khi scroll xuống 1px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.classList.toggle("mobile-menu-active", isMenuOpen);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileDropdown = (e) => {
    e.stopPropagation();
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };
  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const handleLoginClick = () => setIsLoginOpen(true);
  const handleRegisterClick = () => setIsRegisterOpen(true);

  const onLogout = () => {
    handleLogout();
    setIsProfileDropdownOpen(false);
  };

  return (
    <>
      <header
        className={`header ${isScrolled ? "scrolled" : ""}`} // Thêm class scrolled khi cuộn
        ref={headerRef}
      >
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
                    src={userInfo?.avatar || "../assets/images/avatar2.jpg"}
                    alt="User Avatar"
                    className="user-avatar"
                  />
                </div>
                <div className="user-details">
                  <span className="username">
                    {userInfo?.username || "User"}
                  </span>
                  <span className="points">{userInfo?.points || 0} điểm</span>
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
                    <li className="logout-item" onClick={onLogout}>
                      <a href="#logout">
                        {isLoading ? "Đang đăng xuất..." : "Đăng xuất"}
                      </a>
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
                  disabled={isLoading}
                >
                  Đăng nhập
                </button>
              </ul>
              <ul className="login-btn">
                <button onClick={handleRegisterClick} disabled={isLoading}>
                  Đăng ký
                </button>
              </ul>
            </>
          )}
        </div>

        <button className="hamburger" onClick={toggleMenu} disabled={isLoading}>
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </header>

      <ToastContainer />
    </>
  );
};

export default Header;
