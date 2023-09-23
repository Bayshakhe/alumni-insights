import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import DashboardLayout from "../pages/DashboardPage/DashboardLayout";
import LoginPage from "../pages/LoginPage/LoginPage";
import AllAlumni from "../pages/DashboardPage/AllAlumni";
import UpcomingEvents from "../pages/DashboardPage/UpcomingEvents";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/allAlumni",
        element: <AllAlumni />,
      },
      {
        path: "/upcomingEvents",
        element: <UpcomingEvents />,
      },
      {
        path: "/payment",
        element: <div>payment</div>,
      },
      {
        path: "/paymentHistory",
        element: <div>paymentHistory</div>,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default router;
