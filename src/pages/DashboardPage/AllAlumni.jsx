import { useEffect, useState } from "react";
import {
  Avatar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { baseUrl } from "../../helper/baseUrl";
import { ArrowOutward } from "@mui/icons-material";
import useLoggedUser from "../../hooks/useLoggedUser";

const AllAlumni = () => {
  const [rows, setRows] = useState([]);
  const loggedUser = useLoggedUser();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseUrl}/alumniStudents`);
      const data = await response.json();
      // console.log(data);
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
              <TableCell>Company Name</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Job Location</TableCell>
              {loggedUser && (
                <>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                </>
              )}
              <TableCell>Details</TableCell>
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
                <TableCell>{row?.jobInfo?.companyName}</TableCell>
                <TableCell>{row?.jobInfo?.designation}</TableCell>
                <TableCell>{row?.jobInfo?.jobLocation}</TableCell>
                {loggedUser && (
                  <>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                  </>
                )}
                <TableCell>
                  <IconButton color="primary">
                    <ArrowOutward />
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

export default AllAlumni;
