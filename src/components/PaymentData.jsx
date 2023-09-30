import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

const PaymentData = ({ rows }) => {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell sx={{ color: "white", fontWeight: "bold" }}>
            Event
          </TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }}>
            Location
          </TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }}>
            Date
          </TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }}>
            Time
          </TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }}>
            Email
          </TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }}>
            Price
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows?.map((row) => (
          <TableRow
            key={row._id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row?.eventName}
            </TableCell>
            <TableCell>{row?.location}</TableCell>
            <TableCell>{row?.date}</TableCell>
            <TableCell>{row?.time}</TableCell>
            <TableCell>{row?.email}</TableCell>
            <TableCell>{row?.ticketPrice} Tk</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default PaymentData;
