import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../pages/DashboardPage/DashboardLayout";
import LoginPage from "../pages/LoginPage/LoginPage";
import AllAlumni from "../pages/DashboardPage/AllAlumni";
import UpcomingEvents from "../pages/DashboardPage/UpcomingEvents";
import Payment from "../pages/DashboardPage/Payment/Payment";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <AllAlumni />,
      },
      {
        path: "/allStudents",
        element: <div>all student for admin</div>,
      },
      {
        path: "/upcomingEvents",
        element: <UpcomingEvents />,
      },
      {
        path: "/payment",
        element: <Payment />,
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
