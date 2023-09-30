import React from "react";
import NavBar from "../Shared/NavBar";
import { Outlet } from "react-router-dom";

const HomepageLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default HomepageLayout;
