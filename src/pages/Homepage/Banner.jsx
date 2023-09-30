import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { Box, Divider, Stack, Typography } from "@mui/material";
const Banner = () => {
  const bannerImages = [
    {
      src: "https://www.govst.edu/assets/0/224/1230/5021/ef76e64c-c44b-48b1-aab9-d3909e962576.jpg",
      quote:
        "I think the success of any University can be measured by the contribution the alumni make to out nation life.",
      author: "John Kennedy",
    },
    {
      src: "https://d8it4huxumps7.cloudfront.net/bites/wp-content/uploads/2019/08/14122623/How-to-make-the-best-use-of-your-college-alumni-association.jpg",
      quote:
        "Being an alumni is not jsut a title, but a lifelong commitment to the growth and success of the institution.",
      author: "Brainy Quote",
    },
    {
      src: "https://www.laurieralumni.ca/s/1681/images/gid2/editor/about/about_banner_saa.jpg",
      quote: "Nobody is bothered about an institution more than its alumni.",
      author: "Brainy Quote",
    },
  ];
  return (
    <div>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {bannerImages?.map((banner, i) => (
          <SwiperSlide key={i}>
            <Box
              sx={{
                backgroundImage: `linear-gradient(#309576, rgba(48, 149, 118, 0.2)), url(${banner?.src})`,
                // backgroundBlendMode: "multiply",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                minHeight: "600px",
                maxHeight: "100vh",
                backgroundPosition: "bottom center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Stack p={3}>
                <Typography
                  variant="h4"
                  maxWidth="1100px"
                  sx={{ color: "white" }}
                >
                  {banner?.quote}
                </Typography>{" "}
                {/* <Divider /> */}
                <Typography
                  maxWidth="1100px"
                  align="right"
                  sx={{ color: "white" }}
                >
                  {banner?.author}
                </Typography>
              </Stack>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
