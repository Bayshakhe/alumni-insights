import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";
import LoginPage from "../pages/LoginPage/LoginPage";
import AllAlumni from "../pages/DashboardPage/AllAlumni";
import UpcomingEvents from "../pages/DashboardPage/UpcomingEvents";
import Payment from "../pages/DashboardPage/Payment/Payment";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import AllStudents from "../pages/DashboardPage/AllStudents/AllStudents";
import HomePage from "../pages/Homepage/HomePage";
import PrivateRoute from "./PrivateRoute";
import HomepageLayout from "../components/layouts/HomepageLayout";
import AlumniPage from "../pages/AlumniPage";

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
