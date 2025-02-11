import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div>
      <Header />
      <main>
        <h2>Chào mừng đến với Khách Sạn XYZ</h2>
        <p>Đây là trang chủ quản lý khách sạn của chúng tôi.</p>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;