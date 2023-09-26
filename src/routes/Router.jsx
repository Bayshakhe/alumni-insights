import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../pages/DashboardPage/DashboardLayout";
import LoginPage from "../pages/LoginPage/LoginPage";
import AllAlumni from "../pages/DashboardPage/AllAlumni";
import UpcomingEvents from "../pages/DashboardPage/UpcomingEvents";
import Payment from "../pages/DashboardPage/Payment/Payment";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import AllStudents from "../pages/DashboardPage/AllStudents/AllStudents";
import HomePage from "../pages/Homepage/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <AllAlumni />,
      },
      {
        path: "/dashboard/allStudents",
        element: <AllStudents />,
      },
      {
        path: "/dashboard/upcomingEvents",
        element: <UpcomingEvents />,
      },
      {
        path: "/dashboard/payment",
        element: <Payment />,
      },
      {
        path: "/dashboard/paymentHistory",
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
