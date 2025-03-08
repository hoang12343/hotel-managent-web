import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Intro from "../components/Intro";
import HomeContent from "../components/HomeContent";
import Testimonials from "../components/Testimonials";
import Cta from "../components/Cta";

const HomePage = () => {
  return (
    <div className="home-container">
      <Header />
      <Intro />
      <HomeContent />
      <Testimonials />
      <Cta />

      <Footer />
    </div>
  );
};

export default HomePage;
