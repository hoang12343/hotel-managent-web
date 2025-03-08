import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Intro from "../components/Intro";
import HomeContent from "../components/HomeContent";
import Testimonials from "../components/Testimonials";
import Cta from "../components/Cta";
import UserLoginManagement from "../components/UserLoginManagement";

const HomePage = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isEmailConfirmOpen, setIsEmailConfirmOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [emailToConfirm, setEmailToConfirm] = useState("");

  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);
  const openEmailConfirm = (email) => {
    setEmailToConfirm(email);
    setIsEmailConfirmOpen(true);
  };
  const closeEmailConfirm = () => setIsEmailConfirmOpen(false);
  const openLogin = () => {
    console.log("openLogin được gọi");
    setIsLoginOpen(true);
  };
  const closeLogin = () => setIsLoginOpen(false);

  const handleLoginSuccess = (userData) => {
    console.log("Login success in HomePage:", userData);
  };

  return (
    <div className="home-container">
      <Header
        onOpenRegister={openRegister}
        onOpenLogin={openLogin}
        onLoginSuccess={handleLoginSuccess}
      />
      <Intro />
      <HomeContent />
      <Testimonials />
      <Cta />
      <UserLoginManagement
        isRegisterOpen={isRegisterOpen}
        onCloseRegister={closeRegister}
        onOpenEmailConfirm={openEmailConfirm}
        isEmailConfirmOpen={isEmailConfirmOpen}
        onCloseEmailConfirm={closeEmailConfirm}
        emailToConfirm={emailToConfirm}
        onOpenLogin={openLogin}
        isLoginOpen={isLoginOpen}
        onCloseLogin={closeLogin}
        onLoginSuccess={handleLoginSuccess}
      />
      <Footer />
    </div>
  );
};

export default HomePage;
