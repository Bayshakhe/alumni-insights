import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  Avatar,
} from "@mui/material";
import {
  EventAvailable,
  Group,
  Payments,
  ReceiptLong,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import useLoggedUser from "../hooks/useLoggedUser";

const SideBar = () => {
  const loggedUser = useLoggedUser();
  console.log(loggedUser);
  const studentRoute = [
    { label: "All Alumni", path: "/", icon: <Group /> },
    {
      label: "Upcoming Events",
      path: "/upcomingEvents",
      icon: <EventAvailable />,
    },
    { label: "Payment", path: "/payment", icon: <Payments /> },
    {
      label: "Payment History",
      path: "/paymentHistory",
      icon: <ReceiptLong />,
    },
  ];
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
        {studentRoute.map((element, index) => (
          <ListItem key={index} disablePadding>
            <Link to={element.path} style={{ textDecoration: "none" }}>
              <ListItemButton sx={{ width: "250px" }}>
                <ListItemIcon sx={{ color: "white" }}>
                  {element.icon}
                </ListItemIcon>
                <Typography color="white">{element.label}</Typography>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
