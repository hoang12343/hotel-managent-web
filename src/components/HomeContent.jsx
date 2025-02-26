// src/components/HomeContent.jsx
import React from "react";
import "./HomeContent.scss";
import cozyRoom from "../assets/cozyRoom.jpg";
const HomeContent = () => {
  return (
    <>
      {/* Section Giới thiệu hiện tại */}
      <section className="section-container home-content-container" id="about">
        <div className="content-wrapper">
          <h2>Tìm hiểu về Khách Sạn của chúng tôi</h2>
          <p className="intro-text">
            Khám phá một nơi mà sự thoải mái hòa quyện với sự sang trọng. Khách
            sạn của chúng tôi mang đến cho bạn một trải nghiệm độc đáo với các
            dịch vụ hàng đầu, tiện nghi hiện đại và bầu không khí ấm cúng, thân
            thiện. Dù bạn đến đây vì công việc hay nghỉ dưỡng, chúng tôi đảm bảo
            kỳ nghỉ của bạn sẽ khó quên.
          </p>

          <div className="features-grid">
            <div className="feature-item">
              <img src="{cozy}" alt="Cozy Rooms" className="feature-icon" />
              <h3>Cozy Rooms</h3>
              <p>
                Relax in our beautifully designed rooms with all the comforts
                you need.
              </p>
            </div>

            <div className="feature-item">
              <img
                src="{cozyRoom}"
                alt="Delicious Dining"
                className="feature-icon"
              />
              <h3>Delicious Dining</h3>
              <p>Enjoy exquisite meals prepared by our expert chefs.</p>
            </div>

            <div className="feature-item">
              <img
                src="{cozyRoom}"
                alt="Spa & Wellness"
                className="feature-icon"
              />
              <h3>Spa & Wellness</h3>
              <p>Rejuvenate with our premium spa and wellness services.</p>
            </div>

            <div className="feature-item">
              <img
                src="{cozyRoom}"
                alt="Prime Location"
                className="feature-icon"
              />
              <h3>Prime Location</h3>
              <p>
                Conveniently located near top attractions and business hubs.
              </p>
            </div>
          </div>

          <div className="cta-section">
            <button className="btn explore-btn">Explore More</button>
          </div>
        </div>
      </section>

      {/* Section mới: Các phòng được yêu thích */}
      <section
        className="section-container popular-rooms-container"
        id="popular-rooms"
      >
        <div className="content-wrapper">
          <h2>Các Phòng Được Khách Yêu Thích</h2>
          <p className="intro-text">
            Khám phá những phòng có điểm đánh giá cao nhất từ khách hàng.
          </p>

          <div className="rooms-grid">
            <div className="room-item">
              <img
                src="../assets/room1.jpg"
                alt="Deluxe Room"
                className="room-image"
              />
              <h3>Deluxe Room</h3>
              <p>
                Phòng sang trọng với view thành phố, đầy đủ tiện nghi hiện đại.
              </p>
              <span className="rating">9.0/10</span>
            </div>

            <div className="room-item">
              <img
                src="../assets/room2.jpg"
                alt="Suite Room"
                className="room-image"
              />
              <h3>Suite Room</h3>
              <p>
                Không gian rộng rãi, nội thất cao cấp, phù hợp cho gia đình.
              </p>
              <span className="rating">8.8/10</span>
            </div>

            <div className="room-item">
              <img
                src="../assets/room3.jpg"
                alt="Executive Room"
                className="room-image"
              />
              <h3>Executive Room</h3>
              <p>
                Phòng dành cho doanh nhân với bàn làm việc và wifi tốc độ cao.
              </p>
              <span className="rating">8.7/10</span>
            </div>

            <div className="room-item">
              <img
                src="../assets/room4.jpg"
                alt="Ocean View Room"
                className="room-image"
              />
              <h3>Ocean View Room</h3>
              <p>Hưởng thụ tầm nhìn biển tuyệt đẹp từ ban công riêng.</p>
              <span className="rating">9.2/10</span>
            </div>
          </div>

          <div className="cta-section">
            <button className="btn explore-btn">Xem Tất Cả Phòng</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeContent;
