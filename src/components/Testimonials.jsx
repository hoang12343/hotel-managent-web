import React from "react";
import { testimonialsData } from "../data/Testimonials";
import "./Testimonials.scss";

const Testimonials = () => {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Khách hàng nói gì về chúng tôi</h2>
        <div className="testimonials">
          {testimonialsData.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="author-img"
                />
                <div>
                  <div className="author-name">{testimonial.author}</div>
                  <div>{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
