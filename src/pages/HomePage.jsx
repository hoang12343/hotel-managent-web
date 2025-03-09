// src/pages/HomePage.js
import React from "react";
import Header from "../components/Header";
import UserLoginManagement from "../components/UserLoginManagement";
import HomeContent from "../components/HomeContent";
import Intro from "../components/Intro";
import Cta from "../components/Cta";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <Header />
      <UserLoginManagement />
      {/* Các component khác nếu cần */}
      <Intro />
      <HomeContent />
      <Cta />
      <Footer />
    </div>
  );
};

export default HomePage;
