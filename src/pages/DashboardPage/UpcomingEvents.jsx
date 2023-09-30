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

    {
      image:
        "https://www.monmouth.edu/alumni/wp-content/uploads/sites/665/2023/02/23_Alumnifest_Web_Header.jpg",
      name: "AlumniFest Network Reception 2023",
      location: "RUET Campus, Rajshahi",
      heldOn: "03 October, 2023",
      time: "03:30 pm",
      availableTicket: "80",
      ticketPrice: "250",
    },
  ];

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
              <Link to={`/dashboard/payment/${event.ticketPrice}`}>
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
