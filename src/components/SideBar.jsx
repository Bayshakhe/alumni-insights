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
  Avatar,
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
      bgcolor="#607d8b"
    >
      <List>
        <Typography color="white" variant="h5" align="center" my={1}>
          Alumni Insights
        </Typography>
        <Avatar
          alt="Remy Sharp"
          src="https://1fid.com/wp-content/uploads/2022/06/girl-profile-picture-1024x1024.jpg"
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
