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
import {
  EventAvailable,
  Group,
  Login,
  Logout,
  Payments,
  ReceiptLong,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import useLoggedUser from "../hooks/useLoggedUser";
import StudentRoute from "../routes/StudentRoute";
import AdminRoute from "../routes/AdminRoute";

const SideBar = () => {
  const loggedUser = useLoggedUser();
  const navigate = useNavigate();
  // console.log(loggedUser);

  const handleLogOut = () => {
    localStorage.removeItem("id");
    navigate("/login");
  };

  return (
    <Box
      sx={{ width: 250, height: "100vh" }}
      role="presentation"
      bgcolor="#607d8b"
    >
      <List>
        <Typography color="white" variant="h5" align="center" my={1}>
          Alumni Insights
        </Typography>
        <Avatar
          alt={loggedUser?.firstName}
          src={loggedUser?.photo}
          title={loggedUser?.firstName}
          sx={{ width: 60, height: 60, margin: "15px auto" }}
        />

        {/* dynamically rendered routes by admin or students */}
        {loggedUser?.status ? <AdminRoute /> : <StudentRoute />}

        <Divider sx={{ marginY: "10px" }} />
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
