import React, { useEffect, useState } from "react";
import useLoggedUser from "../hooks/useLoggedUser";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const { loggedUser, isError } = useLoggedUser();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  if (isError) {
    localStorage.setItem("intendedPathname", location.pathname);
    toast.error("Please login first to visit this route");
    navigate("/login");
    // <Navigate to="/login" state={{ from: location?.pathname }} replace />;
  } else if (loggedUser) {
    return children;
  } else {
    return <Loading />;
  }
};

export default PrivateRoute;
