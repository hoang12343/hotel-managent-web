import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage'; // Đảm bảo đường dẫn này đúng

// Định nghĩa các route
const router = createBrowserRouter([
    {
        path: '/home',
        element: <HomePage />,
    },
    // Bạn có thể thêm các route khác ở đây
    // Ví dụ:
    // {
    //   path: '/rooms',
    //   element: <RoomsPage />,
    // },
]);

export default router;