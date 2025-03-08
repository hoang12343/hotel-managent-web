import React from "react";
import "./Cta.scss";

const Cta = () => {
  return (
    <section className="cta">
      <div className="container">
        <h2 className="cta-title">Đặt phòng ngay hôm nay</h2>
        <p className="cta-text">
          Nhận ưu đãi đặc biệt khi đặt phòng trực tuyến trên trang web của chúng
          tôi
        </p>
        <a href="#" className="btn btn-secondary">
          Đặt phòng ngay
        </a>
      </div>
    </section>
  );
};

export default Cta;
