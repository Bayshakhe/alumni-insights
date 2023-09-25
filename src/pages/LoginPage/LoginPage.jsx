import { AccountCircle } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomTextField from "../../components/CustomTextField";
import { baseUrl } from "../../helper/baseUrl";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostLoginStudentMutation } from "../../redux/services/authServices";

const Login = () => {
  const { handleSubmit, control } = useForm();
  const [postLoginStudent] = usePostLoginStudentMutation();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFormData = async (data) => {
    const response = await postLoginStudent(data);
    console.log(response);
    if (response?.data?.error) {
      setError(response?.data?.error);
    } else {
      localStorage.setItem("id", response?.data?._id);
      toast.success("WELCOME");
      setError("");
      navigate("/");
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
          maxWidth: "500px",
          height: "auto",
          padding: "30px",
          backgroundColor: "",
          boxShadow: "5px 5px 30px lightgray",
        }}
      >
        {/* <Typography>Login</Typography> */}
        {/* <Card sx={{ textAlign: "center" }}> */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: "18%", md: "" },
            left: { xs: "40%", md: "45%" },
          }}
        >
          <AccountCircle sx={{ fontSize: "120px" }} color="warning" />
        </Box>
        <Box
          onSubmit={handleSubmit(handleFormData)}
          component="form"
          minWidth="300px"
          pt={7}
        >
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
            <Button href="/register" size="small" color="warning">
              Register
            </Button>
          </Typography>
          <Button
            type="submit"
            color="warning"
            variant="contained"
            sx={{ marginTop: "15px" }}
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
