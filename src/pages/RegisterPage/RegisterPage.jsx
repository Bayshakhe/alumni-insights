import { AccountCircle, CloudUpload } from "@mui/icons-material";
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
  const [jobStatus, setJobStatus] = useState("Yes");
  const [department, setDepartment] = useState();
  const navigate = useNavigate();
  const [img, setImg] = useState();
  const {
    handleSubmit,
    control,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleJobStatus = (event) => {
    // console.log(event.target.value);
    setJobStatus(event.target.value);
  };
  const handleDepartment = (event) => {
    setDepartment(event.target.value);
  };

  const handleImg = (e) => {
    // console.log(e.target.files[0]);
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "yrpcd6rd");
    data.append("cloud_name", "dpfh92onc");

    fetch("https://api.cloudinary.com/v1_1/dpfh92onc/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setImg(data?.url))
      .catch((err) => console.log(err));
  };

  const handleFormData = async (data) => {
    if (data?.jobStatus === "Yes") {
      data.jobStatus = true;
    } else {
      data.jobStatus = false;
    }
    if (img) {
      data.photo = img;
    }
    console.log(data);
    const response = await postRegisterStudent(data);
    // console.log(response);
    if (response?.data?.acknowledged) {
      toast.success("Register successful.");
      navigate("/login");
    } else {
      toast("Already registered. Please Login.");
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
                type=""
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
            {/* <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button> */}
            <Grid item xs={12} md={6}>
              <Controller
                name="photo"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <TextField
                      {...field}
                      fullWidth
                      type="file"
                      variant="outlined"
                      label="Photo"
                      error={!!error}
                      helperText={error?.message}
                      sx={{ marginBottom: "auto" }}
                      onChange={handleImg}
                    />
                  </>
                )}
              />
              {/* <CustomTextField
                name="photo"
                control={control}
                type="file"
                label="Photo"
                handleImg={handleImg}
              /> */}
            </Grid>
            {/* Department field */}
            <Grid item xs={12} md={6} mt={2}>
              <Controller
                name="department"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    {...register("department")}
                    select
                    value={department || ""}
                    label="Department"
                    onChange={handleDepartment}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  >
                    <MenuItem value="Computer Sceience">
                      Computer Sceience
                    </MenuItem>
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Mathematics">Mathematics</MenuItem>
                    <MenuItem value="Chemistry">Chemistry</MenuItem>
                    <MenuItem value="Electrical Engineering">
                      Electrical Engineering
                    </MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            {/* job status select field */}
            <Grid item xs={12} md={6} mt={2}>
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
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            {jobStatus === "Yes" && (
              <>
                {/* company name field */}
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    name="jobInfo.companyName"
                    control={control}
                    type="text"
                    label="Company Name"
                    jobStatus={jobStatus === "Yes"}
                  />
                </Grid>
                {/* designation field */}
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    name="jobInfo.designation"
                    control={control}
                    type="text"
                    label="Designation"
                    jobStatus={jobStatus === "Yes"}
                  />
                </Grid>
                {/* job location field */}
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    name="jobInfo.jobLocation"
                    control={control}
                    type="text"
                    label="Job Location"
                    jobStatus={jobStatus === "Yes"}
                  />
                </Grid>
              </>
            )}
          </Grid>

          {/* submit button */}
          <Button
            type="submit"
            sx={{
              backgroundColor: "#309576",
              marginTop: "15px",
              color: "white",
              "&:hover": {
                backgroundColor: "white",
                color: "#309576",
              },
            }}
            variant="contained"
          >
            Register
          </Button>
        </Box>

        {/* path to login */}
        <Typography variant="body2">
          Already have an account? Please
          <Button href="/login" size="small" sx={{ color: "#309576" }}>
            Login
          </Button>
        </Typography>
        {/* </Card> */}
      </Paper>
    </Box>
  );
};

export default RegisterPage;
