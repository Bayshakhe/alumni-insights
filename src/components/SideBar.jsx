import React from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Backdrop,
  Typography,
} from "@mui/material";
import {
  EventAvailable,
  Group,
  InboxOutlined,
  MailOutlined,
  Payments,
  ReceiptLong,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const SideBar = () => {
  const studentRoute = [
    { label: "All Alumni", path: "/allAlumni", icon: <Group /> },
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
      bgcolor="#ed6c02"
    >
      <List>
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
