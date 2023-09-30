import React from "react";
import Banner from "./Banner";
import NavBar from "../../Shared/NavBar";
import OurEvents from "./OurEvents";
import AboutUs from "./AboutUs";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div>
      {/* <NavBar /> */}
      <Banner />
      <OurEvents />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default HomePage;
