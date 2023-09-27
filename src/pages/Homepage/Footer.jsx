import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box bgcolor="black" textAlign="center" color="white" p={2} mt={5}>
      All &copy;Copy Rights reserved by <br />{" "}
      <Typography variant="h6" sx={{ color: "#309576" }}>
        Alumni Insights
      </Typography>
    </Box>
  );
};

export default Footer;
