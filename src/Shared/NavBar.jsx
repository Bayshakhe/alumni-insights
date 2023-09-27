import { Avatar, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Menu } from "@mui/icons-material";
import useLoggedUser from "../hooks/useLoggedUser";
import { useNavigate } from "react-router-dom";

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
            <Button href="/" sx={{ color: "#309576" }}>
              Home
            </Button>
            <Button href="/dashboard" sx={{ color: "#309576" }}>
              Dashboard
            </Button>
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
            )}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default NavBar;
