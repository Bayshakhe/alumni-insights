import { AccountCircle } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomTextField from "../../components/CustomTextField";
import schema from "../../helper/yupValidation";
import { baseUrl } from "../../helper/baseUrl";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const handleFormData = async (data) => {
    const res = await fetch(`${baseUrl}/students`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res?.json();
    // console.log(resData);
    if (resData.acknowledged) {
      toast.success("Register successful.");
      navigate("/login");
    } else {
      toast("Already registered. Please Login.");
      navigate("/login");
    }
  };
  return (
    <Box
      height="95vh"
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
            top: { xs: "13%", md: "" },
            left: { xs: "40%", md: "45%" },
          }}
        >
          <AccountCircle sx={{ fontSize: "120px" }} color="warning" />
        </Box>
        <Box
          onSubmit={handleSubmit(handleFormData)}
          component="form"
          minWidth="350px"
          pt={7}
        >
          <Grid container spacing={2}>
            {/* Name field */}
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="name"
                control={control}
                type="text"
                label="Name"
              />
            </Grid>
            {/* Phone no field */}
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="phone"
                control={control}
                type="tel"
                label="Phone"
              />
            </Grid>
            {/* Email field */}
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="email"
                control={control}
                type="email"
                label="Email"
              />
            </Grid>
            {/* password field */}
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="password"
                control={control}
                type="password"
                label="Password"
              />
            </Grid>

            {/* confirm password field */}
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="confirmPassword"
                control={control}
                type="password"
                label="Confirm Password"
              />
            </Grid>
            {/* Photo field */}
            <Grid item xs={12}>
              <CustomTextField
                name="photo"
                control={control}
                type="url"
                label="Photo"
              />
            </Grid>
          </Grid>
          <Typography variant="body2">
            Already have an account? Please
            <Button href="/login" size="small" color="warning">
              Login
            </Button>
          </Typography>
          <Button
            type="submit"
            color="warning"
            variant="contained"
            sx={{ marginTop: "15px" }}
          >
            Register
          </Button>
        </Box>
        {/* </Card> */}
      </Paper>
    </Box>
  );
};

export default RegisterPage;
