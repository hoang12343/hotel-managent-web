import React from "react";
import "./Intro.scss";
import ScrollRevealComponent from "./ScrollRevealComponent";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const Intro = () => {
  return (
    <div className="section-container header-container" id="home">
      <ScrollRevealComponent />
      <div className="intro-content">
        <p>Simple - Unique - Friendly</p>
        <h1>
          Make Yourself At Home
          <br />
          In Our <span>Hotel</span>.<br />
        </h1>
      </div>
      <section className="section-container booking-container">
        <form action="/" className="booking-form">
          <div className="input-group">
            <span>
              <FaRegCalendarAlt />
            </span>
            <div className="input-group">
              <label htmlFor="Check-in"></label>
              <input type="date" placeholder="Check-in" />
            </div>
          </div>

          <div className="input-group">
            <span>
              <FaRegCalendarAlt />
            </span>
            <div className="input-group">
              <label htmlFor="Check-out"></label>
              <input type="date" placeholder="Check-out" />
            </div>
          </div>

          {/* Replaced Guest with Adults */}
          <div className="input-group">
            <span>
              <FaUser />
            </span>
            <div className="input-group">
              <label htmlFor="Adults"></label>
              <input type="number" placeholder="Adults" min={0} />
            </div>
          </div>

          {/* Added Children */}
          <div className="input-group">
            <span>
              <FaUser />
            </span>
            <div className="input-group">
              <label htmlFor="Children"></label>
              <input type="number" placeholder="Children" min={0} />
            </div>
          </div>

          <div className="input-group input-btn">
            <button className="btn btn">CHECK-OUT</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Intro;
