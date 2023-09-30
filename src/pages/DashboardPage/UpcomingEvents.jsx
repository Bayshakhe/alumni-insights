import { AccessTime, BookOnline, Event, LocationOn } from "@mui/icons-material";
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
import { useGetUpcomingEventsQuery } from "../../redux/services/eventService";

const upcomingEvents = () => {
  const { data: events } = useGetUpcomingEventsQuery();
  // console.log(events);

  return (
    <Box
      m={5}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: { xs: "column", md: "row" },
        gap: "30px",
      }}
    >
      {events?.map((event, i) => (
        <Box xs={12} md={6} key={i}>
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
            <CardActions>
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
            </CardActions>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default upcomingEvents;
