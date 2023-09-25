import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostRegisterStudentMutation } from "../../redux/services/authServices";
import CustomTextField from "../../components/CustomTextField";
import schema from "../../helper/yupValidation";
import { baseUrl } from "../../helper/baseUrl";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [postRegisterStudent] = usePostRegisterStudentMutation();
  const [jobStatus, setJobStatus] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleJobStatus = (event) => {
    setJobStatus(event.target.value);
  };

  const handleFormData = async (data) => {
    const response = await postRegisterStudent(data);
    console.log(response);
    if (response?.data?.acknowledged) {
      toast.success("Register successful.");
      // console.log(response.data);
      navigate("/login");
    } else {
      toast("Already registered. Please Login.");
      // console.log(response.data);
      navigate("/login");
    }
  };
  // console.log(errors);
  return (
    <Box
      minHeight="95vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      //   bgcolor="gray"
    >
      <Paper
        sx={{
          maxWidth: "600px",
          height: "auto",
          padding: "0 30px 30px",
          backgroundColor: "",
          boxShadow: "5px 5px 30px lightgray",
        }}
      >
        <Box
          onSubmit={handleSubmit(handleFormData)}
          component="form"
          minWidth="350px"
          // pt={7}
        >
          <Typography align="center" variant="h4" mt={5} mb={3}>
            Register
          </Typography>
          <Grid container spacing={2}>
            {/* First name field */}
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="firstName"
                control={control}
                type="text"
                label="First Name"
              />
            </Grid>
            {/* Last name field */}
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="lastName"
                control={control}
                type="text"
                label="Last Name"
              />
            </Grid>
            {/* Current location field */}
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="currentLocation"
                control={control}
                type="text"
                label="Current Location"
              />
            </Grid>
            {/* Phone no field */}
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="phone"
                control={control}
                type="tel"
                label="Phone"
              />
            </Grid>
            {/* Email field */}
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="email"
                control={control}
                type="email"
                label="Email"
              />
            </Grid>
            {/* password field */}
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="password"
                control={control}
                type="password"
                label="Password"
              />
            </Grid>

            {/* confirm password field */}
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="confirmPassword"
                control={control}
                type="password"
                label="Confirm Password"
              />
            </Grid>
            {/* Photo field */}
            <Grid item xs={12} md={6}>
              <CustomTextField
                name="photo"
                control={control}
                type="url"
                label="Photo"
              />
            </Grid>
            {/* job status select field */}
            <Grid item xs={12} mt={2}>
              {/* <InputLabel id="demo-simple-select-label">Job Status</InputLabel> */}
              <Controller
                name="jobStatus"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    {...register("jobStatus")}
                    select
                    value={jobStatus}
                    label="Job Status"
                    onChange={handleJobStatus}
                    fullWidth
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            {jobStatus && (
              <>
                {/* company name field */}
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    name="jobInfo.companyName"
                    control={control}
                    type="text"
                    label="Company Name"
                    jobStatus={jobStatus}
                  />
                </Grid>
                {/* designation field */}
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    name="jobInfo.designation"
                    control={control}
                    type="text"
                    label="Designation"
                    jobStatus={jobStatus}
                  />
                </Grid>
                {/* job location field */}
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    name="jobInfo.jobLocation"
                    control={control}
                    type="text"
                    label="Job Location"
                    jobStatus={jobStatus}
                  />
                </Grid>
              </>
            )}
          </Grid>

          {/* submit button */}
          <Button
            type="submit"
            color="warning"
            variant="contained"
            sx={{ marginTop: "15px" }}
          >
            Register
          </Button>
        </Box>

        {/* path to login */}
        <Typography variant="body2">
          Already have an account? Please
          <Button href="/login" size="small" color="warning">
            Login
          </Button>
        </Typography>
        {/* </Card> */}
      </Paper>
    </Box>
  );
};

export default RegisterPage;
