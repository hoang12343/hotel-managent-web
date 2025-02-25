// src/components/ScrollRevealComponent.jsx
import { useEffect } from "react";
import ScrollReveal from "scrollreveal";

const ScrollRevealComponent = () => {
  useEffect(() => {
    const scrollRevealOption = {
      distance: "50px",
      origin: "bottom",
      duration: 1000,
    };

    ScrollReveal().reveal(".header-container p", {
      ...scrollRevealOption,
    });

    ScrollReveal().reveal(".header-container h1", {
      ...scrollRevealOption,
      delay: 500,
    });
  }, []); // Chạy một lần khi component được render

  return null; // Không render gì ra giao diện
};

export default ScrollRevealComponent;
