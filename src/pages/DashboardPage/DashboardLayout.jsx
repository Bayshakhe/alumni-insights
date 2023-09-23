import React, { useState } from "react";
import { Box, Button, Drawer, Backdrop, Stack } from "@mui/material";
import { Menu } from "@mui/icons-material";
import SideBar from "../../components/SideBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Stack direction="row">
          <SideBar></SideBar>
          <Outlet />
        </Stack>
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Button onClick={toggleSidebar}>{<Menu color="warning" />}</Button>
        <Backdrop sx={{ color: "#fff" }} open={open} onClick={toggleSidebar}>
          <Drawer anchor="left" open={open} onClose={toggleSidebar}>
            <SideBar></SideBar>
          </Drawer>
        </Backdrop>
        <Outlet />
      </Box>
    </div>
  );
};

export default DashboardLayout;
