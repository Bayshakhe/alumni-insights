import { AccessTime, BookOnline, Event, LocationOn } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useGetUpcomingEventsQuery } from "../../redux/services/eventService";

const EventsPagination = () => {
  const { data: events } = useGetUpcomingEventsQuery();
  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", paddingTop: "60px" }}>
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
            <Card sx={{ maxWidth: 350, padding: "10px", height: "100%" }}>
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
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#309576",
                    "&:hover": { background: "#546e7a" },
                  }}
                >
                  Book Ticket ({event.ticketPrice}tk)
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default EventsPagination;
