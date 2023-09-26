import {
  Backdrop,
  Box,
  Button,
  Card,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { Menu } from "@mui/icons-material";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };
  return (
    <Stack
      color="white"
      py={1}
      px={2}
      direction="row"
      spacing={2}
      sx={{
        justifyContent: {
          xs: "space-between",
          md: "space-around",
        },
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        width: {
          xs: "auto",
          md: "1400px",
        },
        margin: "0 auto",
        // borderBottom: "1px solid white",
        // borderBottom: "white",
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        Alumni Insights
      </Typography>
      <Stack direction="row" sx={{ display: { xs: "none", md: "block" } }}>
        <Button href="/" sx={{ color: "white" }}>
          Home
        </Button>
        <Button href="/dashboard" sx={{ color: "white" }}>
          Dashboard
        </Button>
      </Stack>
      <Button
        variant="outlined"
        sx={{
          backgroundColor: "white",
          color: "#309576",
          border: "1px solid white",
          "&:hover": {
            color: "white",
          },
          display: { xs: "none", md: "block" },
        }}
        href="/login"
      >
        Login
      </Button>

      {/* mobile responsive */}
      <Stack sx={{ display: { xs: "block", md: "none" } }}>
        <Button onClick={toggleSidebar}>
          {<Menu sx={{ color: "white" }} />}
        </Button>
        {open && (
          <Stack
            position="absolute"
            top="50px"
            right="0px"
            sx={{
              display: { xs: "flex", md: "none" },
              backgroundColor: "white",
              padding: "5px",
            }}
          >
            <Button href="/" sx={{ color: "#309576" }}>
              Home
            </Button>
            <Button href="/dashboard" sx={{ color: "#309576" }}>
              Dashboard
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#309576",
                color: "white",
                border: "1px solid white",
                "&:hover": {
                  backgroundColor: "white",
                  color: "#309576",
                },
              }}
              href="/login"
            >
              Login
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default NavBar;
