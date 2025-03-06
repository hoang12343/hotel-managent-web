import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/hotel", // URL cơ sở của API backend
  timeout: 5000, // Thời gian chờ 5 giây trước khi request bị hủy
  headers: { "Content-Type": "application/json" }, // Sửa lỗi từ "application.json" thành "application/json"
});

export default api;