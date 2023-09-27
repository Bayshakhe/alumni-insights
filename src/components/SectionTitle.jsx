import { Divider, Typography } from "@mui/material";
import React from "react";

const SectionTitle = ({ title, subTitle }) => {
  return (
    <div>
      <Typography
        variant="h3"
        mb="10px"
        sx={{
          color: "#309576",
          textAlign: "center",
          fontWeight: "550",
          marginTop: {
            xs: "50px",
            md: "80px",
          },
        }}
      >
        {title}
      </Typography>
      <Divider sx={{ width: { xs: "90%", md: "500px" }, margin: "0 auto" }} />
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          marginBottom: {
            xs: "30px",
            md: "50px",
          },
        }}
      >
        {subTitle}
      </Typography>
    </div>
  );
};

export default SectionTitle;
