import {
  Dashboard,
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

const AdminRoute = () => {
  const studentRoute = [
    { label: "Dashboard", path: "/dashboard", icon: <Dashboard /> },
    { label: "All Alumni", path: "/dashboard/allAlumni", icon: <Group /> },
    { label: "All Students", path: "/dashboard/allStudents", icon: <Group /> },
    {
      label: "Upcoming Events",
      path: "/dashboard/upcomingEvents",
      icon: <EventAvailable />,
    },
    {
      label: "All Payment History",
      path: "/dashboard/allPaymentHistory",
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

export default AdminRoute;
