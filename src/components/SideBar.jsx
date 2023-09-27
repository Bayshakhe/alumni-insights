import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import { Home, Login, Logout } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import useLoggedUser from "../hooks/useLoggedUser";
import StudentRoute from "../routes/StudentRoute";
import AdminRoute from "../routes/AdminRoute";

const SideBar = () => {
  const { loggedUser } = useLoggedUser();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("id");
    navigate("/login");
  };

  return (
    <Box
      sx={{ width: 250, height: "100vh" }}
      role="presentation"
      bgcolor="#309576"
    >
      <List>
        {/* title */}
        <Typography color="white" variant="h5" align="center" my={1}>
          Alumni Insights
        </Typography>

        {/* user image */}
        <Avatar
          alt={loggedUser?.firstName}
          src={loggedUser?.photo}
          title={loggedUser?.firstName}
          sx={{ width: 60, height: 60, margin: "15px auto 5px" }}
        />

        {/* user name */}
        {loggedUser && (
          <Typography color="white" variant="h5" align="center" mb={4}>
            {loggedUser?.firstName}
          </Typography>
        )}

        {/* dynamically rendered routes by admin or students */}
        {loggedUser?.status ? <AdminRoute /> : <StudentRoute />}

        <Divider sx={{ marginY: "10px" }} />

        {/* back to home route */}
        <ListItem disablePadding>
          <Link to="/" style={{ textDecoration: "none" }}>
            <ListItemButton sx={{ width: "250px" }}>
              <ListItemIcon sx={{ color: "white" }}>
                <Home />
              </ListItemIcon>
              <Typography color="white">Back to Home</Typography>
            </ListItemButton>
          </Link>
        </ListItem>

        {/* login and logout route */}
        <ListItem disablePadding>
          {loggedUser ? (
            <ListItemButton onClick={handleLogOut} sx={{ width: "250px" }}>
              <ListItemIcon sx={{ color: "white" }}>
                <Logout />
              </ListItemIcon>
              <Typography color="white">Log out</Typography>
            </ListItemButton>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <ListItemButton sx={{ width: "250px" }}>
                <ListItemIcon sx={{ color: "white" }}>
                  <Login />
                </ListItemIcon>
                <Typography color="white">Log in</Typography>
              </ListItemButton>
            </Link>
          )}
        </ListItem>
      </List>
    </Box>
  );
};

export default SideBar;
