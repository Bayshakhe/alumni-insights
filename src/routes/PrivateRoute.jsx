import React, { useEffect, useState } from "react";
import useLoggedUser from "../hooks/useLoggedUser";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LinearProgress, Stack } from "@mui/material";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const { loggedUser, isError } = useLoggedUser();
  const navigate = useNavigate();

  if (isError) {
    toast.error("Please login first to visit this route");
    navigate("/login");
  } else if (loggedUser) {
    return children;
  } else {
    return <Loading />;
  }
};

export default PrivateRoute;
