import React from "react";
import UpcomintEvents from "../DashboardPage/UpcomingEvents";
import { Typography } from "@mui/material";

const OurEvents = () => {
  return (
    <div>
      <Typography
        variant="h3"
        my="40px"
        sx={{ color: "#309576", textAlign: "center" }}
      >
        Our Upcoming Events
      </Typography>
      <UpcomintEvents />
    </div>
  );
};

export default OurEvents;
