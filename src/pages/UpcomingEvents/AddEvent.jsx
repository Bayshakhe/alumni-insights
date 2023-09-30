import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import CustomTextField from "../../components/CustomTextField";
import { Controller, useForm } from "react-hook-form";
import {
  useAddEventMutation,
  useGetUpcomingEventsQuery,
} from "../../redux/services/eventService";
import toast from "react-hot-toast";

const AddEvent = () => {
  const [addEvent] = useAddEventMutation();
  //   const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { refetch } = useGetUpcomingEventsQuery();

  //   const handleDepartment = (event) => {
  //     setDepartment(event.target.value);
  //   };
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
  } = useForm();

  const handleFormData = async (data) => {
    console.log(data);
    const response = await addEvent(data);
    console.log(response.data);
    if (response?.data?.insertedId) {
      toast.success("Added Event Successful.");
      refetch();
    } else {
      toast("Can not update");
    }
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#309576",
          "&:hover": { background: "#546e7a" },
        }}
        onClick={handleClickOpen}
      >
        Add Event <Add />
      </Button>
      <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        // aria-describedby="alert-dialog-slide-description"
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
                {/* event name field */}
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    name="name"
                    control={control}
                    type="text"
                    label="Event Name"
                  />
                </Grid>
                {/* Location field */}
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    name="location"
                    control={control}
                    type="text"
                    label="Location"
                  />
                </Grid>
                {/* date field */}
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    name="heldOn"
                    control={control}
                    type="text"
                    label="Held on"
                  />
                </Grid>
                {/* Event Time field */}
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    name="time"
                    control={control}
                    type="text"
                    label="Event Time"
                  />
                </Grid>
                {/* available ticket field */}
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    name="availableTicket"
                    control={control}
                    type="number"
                    label="Available Ticket"
                  />
                </Grid>
                {/* ticket price field */}
                <Grid item xs={12} md={6}>
                  <CustomTextField
                    name="ticketPrice"
                    control={control}
                    type="number"
                    label="Ticket Price"
                  />
                </Grid>
                {/* event image field */}
                <Grid item xs={12}>
                  <CustomTextField
                    name="image"
                    control={control}
                    type="url"
                    label="Event Image"
                  />
                </Grid>
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
      </Dialog>
    </div>
  );
};

export default AddEvent;
