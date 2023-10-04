import { AccountCircle } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomTextField from "../../components/CustomTextField";
import { baseUrl } from "../../helper/baseUrl";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostLoginStudentMutation } from "../../redux/services/authServices";

const Login = () => {
  const { handleSubmit, control } = useForm();
  const [postLoginStudent] = usePostLoginStudentMutation();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log({ location, from });
  const intendedPathname = localStorage.getItem("intendedPathname");

  const handleFormData = async (data) => {
    const response = await postLoginStudent(data);
    console.log(response);
    if (response?.data?.error) {
      setError(response?.data?.error);
    } else if (localStorage.getItem("id") !== undefined) {
      localStorage.setItem("id", response?.data?._id);
      toast.success("WELCOME");
      setError("");
      if (intendedPathname) {
        navigate(intendedPathname);
        localStorage.removeItem("intendedPathname"); // Remove it from storage
      } else {
        navigate("/"); // Redirect to a default route if no intended pathname is saved
      }
    }
  };
  return (
    <Box
      height="97vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      //   bgcolor="gray"
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: "500px",
          height: "auto",
          padding: "30px",
          backgroundColor: "",
          boxShadow: "5px 5px 30px lightgray",
        }}
      >
        <Box
          onSubmit={handleSubmit(handleFormData)}
          component="form"
          minWidth="300px"
        >
          <Typography align="center" variant="h4" mt={1} mb={3}>
            Login
          </Typography>
          {/* Email field */}
          <CustomTextField
            name="email"
            control={control}
            type="email"
            label="Email"
            marginB="15px"
          />
          {/* password field */}
          <CustomTextField
            name="password"
            control={control}
            type="password"
            label="Password"
          />
          {error && <Typography color="error">{error}</Typography>}
          <Typography variant="body2">
            New at Alumni Insights? Please
            <Button href="/register" size="small" sx={{ color: "#309576" }}>
              Register
            </Button>
          </Typography>
          <Button
            type="submit"
            sx={{
              backgroundColor: "#309576",
              marginTop: "15px",
              color: "white",
              "&:hover": {
                backgroundColor: "white",
                color: "#309576",
              },
            }}
            variant="contained"
          >
            Login
          </Button>
        </Box>
        {/* </Card> */}
      </Paper>
    </Box>
  );
};

export default Login;
