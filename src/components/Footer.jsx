import React from "react";
import "./Footer.scss"; // File CSS để định dạng

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>VTI HOTEL</h3>
          <p>Địa chỉ: 123 Đường Hospitality, TP. HCM</p>
          <p>Email: contact@xyzhotel.com</p>
          <p>Hotline: +84 123 456 789</p>
        </div>
        <div className="footer-section">
          <h3>Liên kết nhanh</h3>
          <ul>
            <li>
              <a href="/home">Trang chủ</a>
            </li>
            <li>
              <a href="/rooms">Phòng</a>
            </li>
            <li>
              <a href="/booking">Đặt phòng</a>
            </li>
            <li>
              <a href="/contact">Liên hệ</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Theo dõi chúng tôi</h3>
          <div className="social-links">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Khách sạn XYZ. Mọi quyền được bảo lưu.</p>
      </div>
    </footer>
  );
};

export default Footer;
