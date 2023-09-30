import React from "react";
import { useGetAllPaymentQuery } from "../../../redux/services/paymentService";
import { Box, Table, TableContainer, Typography } from "@mui/material";
import PaymentData from "../../../components/PaymentData";

const AllPaymentHistory = () => {
  const { data: rows } = useGetAllPaymentQuery();
  console.log(rows);
  return (
    <>
      {rows?.length > 0 ? (
        <Box minHeight="94vh" sx={{ margin: "0 auto" }}>
          <TableContainer component="div">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <PaymentData rows={rows} />
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Typography variant="h4" align="center" mt={5}>
          No Payment History Yet..
        </Typography>
      )}
    </>
  );
};

export default AllPaymentHistory;
