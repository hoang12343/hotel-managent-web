import React from 'react';
import './Header.scss';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1>Khách Sạn XYZ</h1>
            </div>
            <nav className="nav">
                <ul>
                    <li><a href="/">Trang Chủ</a></li>
                    <li><a href="/rooms">Phòng</a></li>
                    <li><a href="/services">Dịch Vụ</a></li>
                    <li><a href="/contact">Liên Hệ</a></li>
                    <li><a href="/login">Đăng Nhập</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;