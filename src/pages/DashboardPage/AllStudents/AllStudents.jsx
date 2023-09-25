import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ArrowOutward, Delete, Update } from "@mui/icons-material";
import { baseUrl } from "../../../helper/baseUrl";
import useLoggedUser from "../../../hooks/useLoggedUser";
import UpdateStudent from "./UpdateStudent";

const AllStudents = () => {
  const [rows, setRows] = useState([]);
  const loggedUser = useLoggedUser();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseUrl}/allStudents`);
      const data = await response.json();
      //   console.log(data);
      setRows(data);
    };
    fetchData();
    // fetch(`${baseUrl}/students`)
    //   .then((res) => res.json())
    //   .then((data) => setRows(data));
  }, []);
  return (
    <div>
      <TableContainer component="div">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Job Location</TableCell>
              {loggedUser && (
                <>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                </>
              )}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Avatar alt={row.firstName} src={row.photo} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.firstName + " "}
                  {row.lastName}
                </TableCell>
                <TableCell>{row?.status ? "ADMIN" : "Student"}</TableCell>
                <TableCell>{row?.jobInfo?.companyName || "N/A"}</TableCell>
                <TableCell>{row?.jobInfo?.designation || "N/A"}</TableCell>
                <TableCell>{row?.jobInfo?.jobLocation || "N/A"}</TableCell>
                {loggedUser && (
                  <>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                  </>
                )}
                <TableCell sx={{ display: "flex" }}>
                  <IconButton color="primary">
                    <UpdateStudent id={row?._id} />
                  </IconButton>

                  <IconButton color="">
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllStudents;
