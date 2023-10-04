import { CircularProgress, LinearProgress, Stack } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Stack
      sx={{ width: "100%", height: "100vh", color: "grey.500" }}
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress sx={{ color: "#309576" }} />
    </Stack>
  );
};

export default Loading;
