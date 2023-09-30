import React, { useState } from "react";
import AllAlumni from "./DashboardPage/AllAlumni";
import { Box, Typography } from "@mui/material";
import useLoggedUser from "../hooks/useLoggedUser";

const AlumniPage = () => {
  const [showAlumniContact, setShowAlumniContact] = useState(false);
  return (
    <Box mt={10}>
      <Typography variant="h4" align="center" pt={5}>
        All Alumni
      </Typography>
      <Box maxWidth="1280px" marginX="auto">
        <AllAlumni />
      </Box>
    </Box>
  );
};

export default AlumniPage;
