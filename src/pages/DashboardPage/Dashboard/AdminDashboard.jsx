import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import {
  useGetAllStudentsQuery,
  useGetAlumniStudentsQuery,
} from "../../../redux/services/studentsService";
import { BookOnline, Diamond, Payments, People } from "@mui/icons-material";
import DashboardCountingCard from "../../../components/DashboardCountingCard";
import { useGetAllPaymentQuery } from "../../../redux/services/paymentService";
import { useGetUpcomingEventsQuery } from "../../../redux/services/eventService";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import PaymentChart from "./PaymentChart";

const Dashboard = () => {
  const { data: allStudents } = useGetAllStudentsQuery();
  const { data: allAlumni } = useGetAlumniStudentsQuery();
  const { data: allPayments } = useGetAllPaymentQuery();
  const { data: allEvents } = useGetUpcomingEventsQuery();

  // total amount
  const totalAmount = allPayments?.reduce((acc, curr) => {
    return acc + parseInt(curr?.ticketPrice);
  }, 0);

  // total available tickets
  const totalAvailableTickets = allEvents?.reduce((acc, curr) => {
    return acc + parseInt(curr?.availableTicket);
  }, 0);

  return (
    <Box width="100%" boxSizing="border-box" p={3}>
      {/* dashboard card with grid */}
      <Grid container spacing={3}>
        <DashboardCountingCard
          icon={<People fontSize="large" />}
          text="All Students"
          count={allStudents?.length}
        />
        <DashboardCountingCard
          icon={<Diamond fontSize="large" />}
          text="All Alumni"
          count={allAlumni?.length}
        />
        <DashboardCountingCard
          icon={<Payments fontSize="large" />}
          text="Total Paid Amount"
          count={totalAmount + " " + "Tk"}
        />
        <DashboardCountingCard
          icon={<BookOnline fontSize="large" />}
          text="Available Ticket"
          count={totalAvailableTickets}
        />
      </Grid>

      {/* piechart for events ticket */}
      <Box>
        <PaymentChart />
      </Box>
    </Box>
  );
};

export default Dashboard;
