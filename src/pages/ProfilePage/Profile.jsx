import { Box, Typography } from "@mui/material";
import React from "react";
import UpdateProfile from "./UpdateProfile";
import useLoggedUser from "../../hooks/useLoggedUser";

const Profile = () => {
  const { loggedUser } = useLoggedUser();
  //   console.log(loggedUser);
  return (
    <Box mt={8}>
      <Typography align="center" variant="h3">
        Profile
      </Typography>
      <UpdateProfile loggedUser={loggedUser} />
    </Box>
  );
};

export default Profile;
