import React from "react";
import Banner from "./Banner";
import NavBar from "../../Shared/NavBar";
import OurEvents from "./OurEvents";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <Banner />
      <OurEvents />
    </div>
  );
};

export default HomePage;
