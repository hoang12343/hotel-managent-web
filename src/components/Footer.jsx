import React from 'react';
import './Footer.scss'; // Thêm file CSS để tùy chỉnh kiểu dáng

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer-content">
                <p>© 2025 Khách Sạn ABC. Bản quyền thuộc về công ty.</p>
                <div className="social-icons">
                    <a href="#" aria-label="Facebook">Facebook</a>
                    <a href="#" aria-label="Twitter">Twitter</a>
                    <a href="#" aria-label="Instagram">Instagram</a>
                </div>
            </div>
        </footer>
    );
};

const App = () => {
    return (
        <div>
            {/* Nội dung chính sẽ được thêm vào đây */}
            <Footer />
        </div>
    );
};

export default App;