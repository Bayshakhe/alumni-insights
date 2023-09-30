import React, { useEffect, useState } from "react";
import useLoggedUser from "../hooks/useLoggedUser";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LinearProgress, Stack } from "@mui/material";

const PrivateRoute = ({ children }) => {
  const { loggedUser, isError } = useLoggedUser();
  const navigate = useNavigate();

  if (isError) {
    toast.error("Please login first to visit this route");
    navigate("/login");
  } else if (loggedUser) {
    return children;
  } else {
    return (
      <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
        <LinearProgress color="secondary" />
      </Stack>
    );
  }
};

export default PrivateRoute;
