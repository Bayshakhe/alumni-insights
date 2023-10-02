import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import LoginPage from "../pages/LoginPage/LoginPage";
import AllAlumni from "../pages/DashboardPage/AllAlumni";
import UpcomingEvents from "../pages/UpcomingEvents/UpcomingEvents";
import Payment from "../pages/DashboardPage/Payment/Payment";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import AllStudents from "../pages/DashboardPage/AllStudents/AllStudents";
import HomePage from "../pages/Homepage/HomePage";
import PrivateRoute from "./PrivateRoute";
import HomepageLayout from "../layouts/HomepageLayout";
import AlumniPage from "../pages/AlumniPage";
import PaymentHistory from "../pages/DashboardPage/PaymentHistory/PaymentHistory";
import AllPaymentHistory from "../pages/DashboardPage/PaymentHistory/AllPaymentHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomepageLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/alumni",
        element: <AlumniPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <div>ehllluybinom</div>,
      },
      {
        path: "/dashboard/allAlumni",
        element: (
          <PrivateRoute>
            <AllAlumni />
          </PrivateRoute>
        ),
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
        path: "/dashboard/payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/paymentHistory",
        element: <PaymentHistory />,
      },
      {
        path: "/dashboard/allPaymentHistory",
        element: <AllPaymentHistory />,
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
