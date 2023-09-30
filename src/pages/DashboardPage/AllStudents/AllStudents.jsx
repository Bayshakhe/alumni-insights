import { useEffect, useState } from "react";
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
import { Delete } from "@mui/icons-material";
import useLoggedUser from "../../../hooks/useLoggedUser";
import UpdateStudent from "./UpdateStudent";
import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
} from "../../../redux/services/studentsService";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllStudents = () => {
  const { loggedUser } = useLoggedUser();
  const { data, refetch } = useGetAllStudentsQuery();
  const rows = data?.filter((e) => e.status !== "admin");

  const [deleteStudent, { data: dD, isSuccess }] = useDeleteStudentMutation();
  // console.log(loggedUser);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this student?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStudent(id);
        Swal.fire("Deleted!", "Student Deleted", "success");
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire("Cancelled", "", "error");
      }
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully Deleted User.");
      refetch();
    }
  }, [isSuccess, refetch]);

  return (
    <Box
      minHeight="94vh"
      width="100%"
      sx={{ margin: "20px", overflowY: "scroll" }}
    >
      <TableContainer component="div" sx={{}}>
        <Table
          sx={{ minWidth: 650, marginX: "auto" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Image
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Status
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
              {loggedUser && (
                <>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Phone
                  </TableCell>
                </>
              )}
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Actions
              </TableCell>
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
                <TableCell>
                  {row?.jobStatus === true ? "Alumni Student" : "Student"}
                </TableCell>
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
                    <UpdateStudent id={row?._id} student={row} />
                  </IconButton>

                  <IconButton onClick={() => handleDelete(row?._id)} color="">
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllStudents;
