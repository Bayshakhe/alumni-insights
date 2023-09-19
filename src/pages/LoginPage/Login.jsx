import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const Login = () => {
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
        <Box sx={{ position: "absolute", top: {xs: "18%", md: ""}, left:{xs:"40%", md: "45%"} }} >
          <AccountCircle sx={{ fontSize: "120px" }} color="warning"/>
        </Box>
        <Box component="form" minWidth="300px" pt={7}>
          {/* <Stack spacing={3}> */}
          <TextField
            fullWidth
            type="email"
            variant="outlined"
            label="Email"
            color="warning"
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            type="email"
            variant="outlined"
            label="Password"
            color="warning"
            //   sx={{ margin: "10px" }}
          />
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
          {/* </Stack> */}
        </Box>
        {/* </Card> */}
      </Paper>
    </Box>
  );
};

export default Login;
