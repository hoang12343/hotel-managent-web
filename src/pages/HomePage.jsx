import React from "react";
import Header from "../components/Header";
// import Footer from "../components/Footer";
import Intro from "../components/Intro";
import HomeContent from "../components/HomeContent";

const HomePage = () => {
  return (
    <div className="home-container">
      <Header />
      <Intro />
      <HomeContent />

      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
