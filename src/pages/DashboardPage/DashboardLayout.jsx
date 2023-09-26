import React, { useState } from "react";
import { Box, Button, Drawer, Backdrop, Stack } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar";

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
        <Button onClick={toggleSidebar}>
          {<Menu sx={{ color: "#309576" }} />}
        </Button>
        <Backdrop sx={{ color: "#fff" }} open={open} onClick={toggleSidebar}>
          <Drawer anchor="left" open={open} onClose={toggleSidebar}>
            <SideBar></SideBar>
          </Drawer>
        </Backdrop>
        {/* all outlet here */}
        <Outlet />
      </Box>
    </div>
  );
};

export default DashboardLayout;
