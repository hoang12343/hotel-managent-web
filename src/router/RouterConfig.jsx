import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage"; // Đảm bảo đường dẫn này đúng
import { AuthWrapper } from "../context/AuthProvider";

// Định nghĩa các route
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthWrapper>
        <HomePage />
      </AuthWrapper>
    ),
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
