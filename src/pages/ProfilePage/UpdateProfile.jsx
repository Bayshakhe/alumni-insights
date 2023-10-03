import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllStudentsQuery,
  useUpdateStudentMutation,
} from "../../redux/services/studentsService";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { EditNote } from "@mui/icons-material";
import CustomTextField from "../../components/CustomTextField";
import { Controller, useForm } from "react-hook-form";
import useLoggedUser from "../../hooks/useLoggedUser";

const UpdateProfile = ({ loggedUser }) => {
  const [jobStatus, setJobStatus] = useState("Yes");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();
  const [updateStudent, { isLoading }] = useUpdateStudentMutation();
  const { refetch } = useGetAllStudentsQuery();
  //   console.log(jobStatus);

  const defaultValues = {
    firstName: "",
    lastName: "",
    currentLocation: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    department: "",
    photo: "",
    status: "",
    jobStatus: "",
    jobInfo: {
      companyName: "",
      designation: "",
      jobLocation: "",
    },
  };

  const {
    handleSubmit,
    control,
    register,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    if (loggedUser) {
      setValue("firstName", loggedUser.firstName);
      setValue("lastName", loggedUser.lastName);
      setValue("currentLocation", loggedUser.currentLocation);
      setValue("email", loggedUser.email);
      setValue("password", loggedUser.password);
      setValue("confirmPassword", loggedUser.confirmPassword);
      setValue("phone", loggedUser.phone);
      setValue("department", loggedUser.department);
      setValue("jobStatus", loggedUser.jobStatus);
      setValue("photo", loggedUser.photo);
      setValue("status", loggedUser.status);
      setValue("jobInfo.companyName", loggedUser.jobInfo.companyName);
      setValue("jobInfo.designation", loggedUser.jobInfo.designation);
      setValue("jobInfo.jobLocation", loggedUser.jobInfo.jobLocation);
    }
    setDepartment(loggedUser?.department);
    setJobStatus(loggedUser?.jobStatus);
  }, [loggedUser, setValue, department]);

  const handleDepartment = (event) => {
    setDepartment(event.target.value);
  };

  const handleJobStatus = (event) => {
    // console.log(event.target.value);
    if (event.target.value === "Yes") {
      setJobStatus(true);
    } else {
      setJobStatus(false);
    }
  };

  const handleFormData = async (data) => {
    data._id = loggedUser?._id;
    if (data?.jobStatus === "Yes") {
      data.jobStatus = true;
    } else {
      data.jobInfo = {};
      data.jobStatus = false;
    }
    // console.log(data);
    const response = await updateStudent(data);
    console.log(response.data);
    if (response?.data?.modifiedCount > 0) {
      toast.success("Update successful.");
      refetch();
    } else {
      toast.error("Something went wrong! Could not update");
    }
  };

  return (
    <div>
      <Paper
        sx={{
          maxWidth: "800px",
          height: "auto",
          padding: "30px",
          backgroundColor: "",
          boxShadow: "5px 5px 30px lightgray",
          margin: "0 auto",
        }}
      >
        <Box
          onSubmit={handleSubmit(handleFormData)}
          component="form"
          minWidth="350px"
          // pt={7}
        >
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

            {/* status field */}
            {loggedUser?.status === "admin" && (
              <Grid item xs={12} md={6}>
                <CustomTextField
                  name="status"
                  control={control}
                  type="text"
                  label="Status"
                />
              </Grid>
            )}

            {/* Department field */}
            <Grid item xs={12} md={6}>
              <Controller
                name="department"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  //   <Select
                  //     {...field}
                  //     {...register("department")}
                  //     value={department || ""}
                  //     onChange={handleDepartment}
                  //     error={!!error}
                  //     helperText={error?.message}
                  //     fullWidth
                  //     // input={<OutlinedInput label="Department" />}
                  //     //   MenuProps={MenuProps}
                  //   >
                  //     <MenuItem value="Computer Sceience">
                  //       Computer Sceience
                  //     </MenuItem>
                  //     <MenuItem value="English">English</MenuItem>
                  //     <MenuItem value="Mathematics">Mathematics</MenuItem>
                  //     <MenuItem value="Chemistry">Chemistry</MenuItem>
                  //     <MenuItem value="Electrical Engineering">
                  //       Electrical Engineering
                  //     </MenuItem>
                  //   </Select>
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
                    value={jobStatus ? "Yes" : "No"}
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
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: "#309576",
              marginTop: "15px",
              color: "white",
              "&:hover": {
                backgroundColor: "white",
                color: "#309576",
              },
            }}
          >
            Update
          </Button>
        </Box>
      </Paper>
    </div>
  );
};
export default UpdateProfile;
