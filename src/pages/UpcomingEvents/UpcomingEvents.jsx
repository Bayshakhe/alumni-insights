import {
  AccessTime,
  BookOnline,
  Delete,
  Event,
  LocationOn,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import {
  useDeleteEventMutation,
  useGetUpcomingEventsQuery,
} from "../../redux/services/eventService";
import AddEvent from "./AddEvent";
import useLoggedUser from "../../hooks/useLoggedUser";
import Swal from "sweetalert2";

const upcomingEvents = ({ homepage }) => {
  const { data: events, refetch } = useGetUpcomingEventsQuery();
  const [deleteEvent] = useDeleteEventMutation();
  const { loggedUser } = useLoggedUser();
  // console.log(events);

  const handleDeleteEvent = (id) => {
    Swal.fire({
      title: "Delete this event?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteEvent(id);
        console.log(res);
        if (res?.data?.acknowledged) {
          Swal.fire("Deleted!", "Event Deleted", "success");
          refetch();
        }
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire("Cancelled", "", "error");
      }
    });
  };

  return (
    <Stack>
      <Box
        m={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: { xs: "column", md: "row" },
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {events?.map((event, i) => (
          <Box xs={12} md={12} key={i}>
            <Card sx={{ maxWidth: 360, padding: "10px" }}>
              <CardMedia
                sx={{ height: 150 }}
                image={event.image}
                title="Event Image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {event.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  display="flex"
                  gap={1}
                  alignItems="center"
                  mb={2}
                >
                  <LocationOn fontSize="small" />
                  {event.location}
                </Typography>
                <Stack justifyContent="space-between">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <Event fontSize="small" />
                    {event.heldOn}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <AccessTime fontSize="small" />
                    {event.time}
                  </Typography>
                </Stack>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  display="flex"
                  gap={1}
                  alignItems="center"
                  mt={1}
                >
                  <BookOnline fontSize="small" />
                  Available Tickets: {event.availableTicket}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Link to={`/dashboard/payment/${event._id}`}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#309576",
                      "&:hover": { background: "#546e7a" },
                    }}
                  >
                    Book Ticket ({event.ticketPrice}tk)
                  </Button>
                </Link>
                {loggedUser?.status === "admin" && !homepage && (
                  <Button onClick={() => handleDeleteEvent(event._id)}>
                    <Delete color="error" />
                  </Button>
                )}
              </CardActions>
            </Card>
          </Box>
        ))}
        {/* add event  */}
      </Box>
      {loggedUser?.status === "admin" && !homepage && (
        <Box textAlign="center">
          <AddEvent />
        </Box>
      )}
    </Stack>
  );
};

export default upcomingEvents;
