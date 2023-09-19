import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/LoginPage/Login";
import Register from "../pages/RegisterPage/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
]);

export default router;