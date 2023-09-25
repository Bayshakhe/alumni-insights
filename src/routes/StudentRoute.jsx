import {
  EventAvailable,
  Group,
  Payments,
  ReceiptLong,
} from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const StudentRoute = () => {
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
    <>
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
    </>
  );
};

export default StudentRoute;
