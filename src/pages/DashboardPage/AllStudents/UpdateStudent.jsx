import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../../../components/CustomTextField";
import { baseUrl } from "../../../helper/baseUrl";
import { EditNote } from "@mui/icons-material";
import {
  useGetAllStudentsQuery,
  useUpdateStudentMutation,
} from "../../../redux/services/studentsService";
import toast from "react-hot-toast";

const UpdateStudent = ({ id, student }) => {
  const [jobStatus, setJobStatus] = useState(true);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [updateStudent, { isLoading }] = useUpdateStudentMutation();
  const { refetch } = useGetAllStudentsQuery();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const {
    handleSubmit,
    control,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: student });

  const handleJobStatus = (event) => {
    setJobStatus(event.target.value);
  };

  const handleFormData = async (data) => {
    // console.log(data);
    const response = await updateStudent(data);
    console.log(response.data);
    if (response?.data?.modifiedCount > 0) {
      toast.success("Update successful.");
      refetch();
    } else {
      toast("Can not update");
    }
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleClickOpen}>
        <EditNote sx={{ color: "#309576" }} />
      </Button>
      <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle variant="h4" align="center" mt={2}>
          Update Student
        </DialogTitle>
        <DialogContent>
          <Paper
            sx={{
              maxWidth: "600px",
              height: "auto",
              padding: "30px",
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
              <Button
                onClick={handleClose}
                color="error"
                variant="contained"
                sx={{ marginTop: "15px", marginLeft: "10px" }}
              >
                Close
              </Button>
            </Box>
            {/* </Card> */}
          </Paper>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};
export default UpdateStudent;
