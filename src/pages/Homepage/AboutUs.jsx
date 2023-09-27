import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { Box, Grid, Typography } from "@mui/material";

const AboutUs = () => {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <SectionTitle
        title="About Us"
        subTitle="''Every strike brings us closer to a home run''"
      />
      <Grid
        container
        alignItems="center"
        maxWidth="1280px"
        mx="auto"
        sx={{
          paddingX: {
            xs: "10px",
            md: "50px",
          },
        }}
      >
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            sx={{ color: "#309576", fontWeight: "bold" }}
          >
            Leather takes time...{" "}
          </Typography>
          <Typography width="90%">
            This is not something that you have likely given much thought to. I
            certainly had not when I landed in Bangladesh ten years ago.
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            beatae consequatur suscipit iusto ipsum asperiores magnam,
            recusandae non facilis architecto nisi eveniet dolore, voluptate
            facere minima. Distinctio quia reprehenderit ut!
            <br /> Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Labore quidem tenetur a enim molestias sunt iste possimus! Fugit
            cum, numquam repellat in a saepe, minima impedit quas voluptates,
            nihil consequuntur.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <img
              style={{ width: "100%" }}
              src="https://kinsta.com/wp-content/uploads/2021/11/about-us-page.png"
              alt=""
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default AboutUs;
