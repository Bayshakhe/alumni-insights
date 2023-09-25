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
import { Delete } from "@mui/icons-material";
import useLoggedUser from "../../../hooks/useLoggedUser";
import UpdateStudent from "./UpdateStudent";
import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
} from "../../../redux/services/studentsService";
import toast from "react-hot-toast";

const AllStudents = () => {
  const loggedUser = useLoggedUser();
  const { data, refetch } = useGetAllStudentsQuery();
  const rows = data;
  const [deleteStudent, { data: dD, isSuccess }] = useDeleteStudentMutation();
  const handleDelete = (id) => {
    deleteStudent(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully Deleted User.");
      refetch();
    }
  }, [isSuccess]);

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
    </div>
  );
};

export default AllStudents;
