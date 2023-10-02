import { Avatar, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Menu } from "@mui/icons-material";
import useLoggedUser from "../hooks/useLoggedUser";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { loggedUser } = useLoggedUser();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setOpen(!open);
  };
  const handleLogOut = () => {
    localStorage.removeItem("id");
    navigate("/");
  };
  return (
    <Stack
      backgroundColor="#309576"
      color="white"
      py={1}
      px={2}
      direction="row"
      spacing={2}
      sx={{
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        width: {
          xs: "100%",
          md: "1280px",
        },
        margin: "0 auto",
      }}
    >
      <Link to="/">
        <Typography variant="h5" fontWeight="bold" sx={{ color: "white" }}>
          Alumni Insights
        </Typography>
      </Link>
      <Stack direction="row" sx={{ display: { xs: "none", md: "block" } }}>
        <Link to="/">
          <Button sx={{ color: "white" }}>Home</Button>
        </Link>
        {loggedUser && (
          <Link to="/dashboard">
            <Button sx={{ color: "white" }}>Dashboard</Button>
          </Link>
        )}
        <Link to="/alumni">
          <Button sx={{ color: "white" }}>All Alumni</Button>
        </Link>

        <Button sx={{ color: "white" }}>Blog</Button>
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        <Avatar
          alt={loggedUser?.firstName}
          src={loggedUser?.photo}
          title={loggedUser?.firstName}
          // sx={{ width: 60, height: 60, margin: "15px auto 5px" }}
        />

        {loggedUser ? (
          <Button
            variant="contained"
            onClick={handleLogOut}
            sx={{
              backgroundColor: "white",
              color: "#309576",
              border: "1px solid white",
              "&:hover": {
                color: "white",
              },
            }}
          >
            Log out
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "#309576",
              border: "1px solid white",
              "&:hover": {
                color: "white",
              },
            }}
            href="/login"
          >
            Login
          </Button>
        )}
      </Stack>

      {/* mobile responsive */}
      <Stack sx={{ display: { xs: "block", md: "none" } }}>
        <Button onClick={toggleSidebar}>
          {<Menu sx={{ color: "white" }} />}
        </Button>
        {open && (
          <Stack
            position="absolute"
            top="50px"
            right="30px"
            sx={{
              display: { xs: "flex", md: "none" },
              backgroundColor: "white",
              padding: "5px",
            }}
          >
            <Link to="/">
              <Button sx={{ color: "#309576" }}>Home</Button>
            </Link>
            {loggedUser?.status !== "admin" && (
              <Link to="/dashboard/allAlumni">
                <Button sx={{ color: "#309576" }}>Dashboard</Button>
              </Link>
            )}
            {loggedUser?.status === "admin" && (
              <Link to="/dashboard">
                <Button sx={{ color: "#309576" }}>Dashboard</Button>
              </Link>
            )}
            <Button sx={{ color: "#309576" }}>Blog</Button>

            <Avatar
              alt={loggedUser?.firstName}
              src={loggedUser?.photo}
              title={loggedUser?.firstName}
              sx={{ margin: "0 auto 5px" }}
            />

            {loggedUser ? (
              <Button
                variant="contained"
                onClick={handleLogOut}
                sx={{
                  backgroundColor: "#309576",
                  color: "white",
                  border: "1px solid white",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "#309576",
                  },
                }}
              >
                Log out
              </Button>
            ) : (
              <Link to="/login">
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
                >
                  Login
                </Button>
              </Link>
            )}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default NavBar;
