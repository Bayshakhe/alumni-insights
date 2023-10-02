import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const DashboardCountingCard = ({ icon, count, text }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        border="2px solid #309576"
        color="#309576"
        padding={3}
        // transition="background-color 0.3s ease"
        borderRadius="8px"
        sx={{
          "&:hover": {
            backgroundColor: "#309576",
            color: "white",
          },
          // boxSizing: "border-box",
          boxShadow:
            "0 4px 8px rgb(48,149,118, 0.4), 0 2px 4px rgb(48,149,118, 0.4)",
        }}
      >
        <Typography align="center">
          <span style={{ fontWeight: "bold", fontSize: "35px" }}>{count}</span>{" "}
          <br /> <span>{text}</span>
        </Typography>
        {icon}
      </Box>
    </Grid>
  );
};

export default DashboardCountingCard;
