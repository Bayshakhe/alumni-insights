import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import React from "react";
import { useGetAllPaymentQuery } from "../../../redux/services/paymentService";
import { Box, Stack, Typography } from "@mui/material";

const PaymentChart = () => {
  const { data: allPayments } = useGetAllPaymentQuery();

  if (!allPayments || allPayments.length === 0) {
    return null; // or render a loading indicator or empty state
  }

  const colors = ["#0088FE", "#309576", "#fea523"];

  const uniqueEventData = allPayments?.reduce((accumulator, event, index) => {
    const existingEvent = accumulator?.find(
      (item) => item.label === event.eventName
    );

    if (existingEvent) {
      // If the eventName already exists, multiply the ticketPrice
      existingEvent.value += parseInt(event.ticketPrice);
    } else {
      // If it's a new eventName, add it to the accumulator array
      accumulator.push({
        label: event.eventName,
        value: parseInt(event.ticketPrice),
        // color: colors[index],
      });
    }

    return accumulator;
  }, []);

  const data = uniqueEventData;
  //   console.log(data);

  const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
  };
  const TOTAL = data?.map((item) => item.value)?.reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <Stack direction="row" alignItems="center">
      <PieChart
        series={[
          {
            outerRadius: 80,
            data,
            arcLabel: getArcLabel,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontSize: 14,
          },
        }}
        {...sizing}
      />
      <Box>
        {data?.map((element, i) => (
          <Box key={i}>
            <Typography>{element.label}</Typography>
            <Typography>{element.value}tk</Typography>
          </Box>
        ))}
      </Box>
    </Stack>
  );
};

export default PaymentChart;
