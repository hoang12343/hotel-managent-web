import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage"; // Đảm bảo đường dẫn này đúng

// Định nghĩa các route
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  // {
  //     path: '/service',
  //     element: <Service />,
  // },
  // {
  //     path: '/contact',
  //     element: <Contact />,
  // },
  // {
  //     path: '/about-us',
  //     element: <AboutUs />,
  // },
]);

export default router;
