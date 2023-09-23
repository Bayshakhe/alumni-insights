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

const upcomingEvents = () => {
  const events = [
    {
      image:
        "https://lighthouseworld.co.in/wp-content/uploads/2019/07/Annual-Day-7.jpg",
      name: "NovaVerse National IT Festival",
      location: "Administration Building 1, Rajshahi",
      heldOn: "02 October, 2023",
      time: "03:00 pm",
      availableTicket: "42",
      ticketPrice: "200",
    },
    {
      image:
        "https://www.yesmilano.it/sites/default/files/styles/testata_full/public/event_top_event/copertina/6877/27983/Banner-Sito-Homepage-18-18-2048x1152.png?itok=JWyDWY6e",
      name: "Science Festival Universitario 2023",
      location: "RUET Campus, Rajshahi",
      heldOn: "24 October, 2023",
      time: "05:00 pm",
      availableTicket: "65",
      ticketPrice: "220",
    },
  ];
  return (
    <Box
      m={5}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: "20px",
      }}
    >
      {events?.map((event, i) => (
        <Box xs={12} md={6} key={i}>
          <Card sx={{ maxWidth: 345 }}>
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
                alignItems="center"
                mb={2}
              >
                <LocationOn fontSize="small" />
                {event.location}
              </Typography>
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  display="flex"
                  alignItems="center"
                >
                  <Event fontSize="small" />
                  {event.heldOn}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  display="flex"
                  alignItems="center"
                >
                  <AccessTime fontSize="small" />
                  {event.time}
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                display="flex"
                alignItems="center"
                mt={1}
              >
                <BookOnline fontSize="small" />
                Available Tickets: {event.availableTicket}
              </Typography>
            </CardContent>
            <CardActions>
              <Button href="/payment" variant="contained" color="primary">
                Book Ticket ({event.ticketPrice}tk)
              </Button>
            </CardActions>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default upcomingEvents;
