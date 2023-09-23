import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/LoginPage/Login";
import Register from "../pages/RegisterPage/Register";
import DashboardLayout from "../pages/DashboardPage/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/allAlumni",
        element: <div>All Alumni</div>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
