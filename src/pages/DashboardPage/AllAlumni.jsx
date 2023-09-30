import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useLoggedUser from "../../hooks/useLoggedUser";
import { useGetAlumniStudentsQuery } from "../../redux/services/studentsService";

const AllAlumni = () => {
  const { loggedUser } = useLoggedUser();
  const { data } = useGetAlumniStudentsQuery();
  const rows = data;
  // console.log(rows);
  return (
    <Box minHeight="94vh" sx={{ margin: "20px auto" }}>
      <TableContainer component="div">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Image
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Company Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Designation
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Job Location
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Phone
              </TableCell>
              {/* <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Details
              </TableCell> */}
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
                {loggedUser ? (
                  <>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </>
                )}
                {/* <TableCell>
                  <IconButton color="primary">
                    <ArrowOutward />
                  </IconButton>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllAlumni;
