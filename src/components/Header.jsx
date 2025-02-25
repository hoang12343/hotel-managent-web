// components/Header/Header.jsx
import React from "react";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="nav-logo">
        <h1 className="logo">My Website</h1>
      </div>

      <nav className="nav-list">
        <ul>
          <li>
            <a href="#home" className="nav-link">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link">
              About us
            </a>
          </li>
        </ul>
      </nav>

      <div className="auth-buttons">
        <ul className="register-btn">
          <button>Đăng ký</button>
        </ul>
        <ul className="login-btn">
          <button>Login</button>
        </ul>
      </div>
    </header>
  );
};

export default Header;
