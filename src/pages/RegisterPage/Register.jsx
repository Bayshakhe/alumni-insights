import { AccountCircle } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import CustomTextField from "../../components/CustomTextField";

const Register = () => {
  const { handleSubmit, control } = useForm();
  const handleFormData = (data) => {
    console.log(data);
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
            top: { xs: "18%", md: "" },
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

export default Register;
