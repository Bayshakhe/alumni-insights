import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useLoggedUser from "../hooks/useLoggedUser";
import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
} from "../redux/services/studentsService";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import {
  AdminPanelSettingsOutlined,
  DeleteForever,
  PersonOff,
  Search,
} from "@mui/icons-material";
import useAdminOperation from "../hooks/useAdminOperation";

const CustomizeTable = ({ allStudent, adminData, alumni }) => {
  const { loggedUser } = useLoggedUser();
  const {
    data: rows,
    refetch,
    isSuccess: dataIssuccess,
  } = useGetAllStudentsQuery();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filterByDepartment, setFilterByDepartment] = useState("");
  const [filterByJobStatus, setFilterByJobStatus] = useState("All");
  const [deleteStudent, { data: dD, isSuccess }] = useDeleteStudentMutation();
  const handleAdminOperation = useAdminOperation();

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
    if (!searchText || !filterByDepartment || !filterByJobStatus) {
      const students = rows?.filter((e) => e.status !== "admin");
      setFilteredData(students);
    }
    if (rows) {
      searchByText();
    }
    if (filterByDepartment) {
      searchByDepartment();
    }
    if (filterByJobStatus) {
      searchByJobStatus();
    }
    if (alumni) {
      let filtered = [];
      const students = rows?.filter((e) => e.jobStatus === true);
      setFilteredData(students);
      if (searchText) {
        filtered = students?.filter((row) =>
          row?.firstName.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredData(filtered);
      }
      if (filterByDepartment) {
        filtered = students?.filter(
          (row) => row?.department === filterByDepartment
        );
        setFilteredData(filtered);
      }
    }
    if (adminData) {
      const admins = rows?.filter((e) => e.status === "admin");
      setFilteredData(admins);
    }
  }, [rows, searchText, filterByDepartment, filterByJobStatus]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleDepartment = (e) => {
    if (e.target.value === "All") {
      setFilterByDepartment("");
    } else {
      setFilterByDepartment(e.target.value);
    }
  };

  // search by text function
  const searchByText = () => {
    let filtered = [];
    // const filtered = rows?.filter(row => row.firstName || row.department || row?.jobInfo?.companyName || row?.jobInfo?.designation || row?.jobInfo?.jobLocation || row.email || row.phone.toLowarCase().incl)
    if (searchText) {
      filtered = rows?.filter((row) =>
        row?.firstName.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  // filter by department function
  const searchByDepartment = () => {
    let filtered = [];
    setFilteredData(rows);
    if (filterByDepartment) {
      filtered = rows?.filter((row) => row?.department === filterByDepartment);
      setFilteredData(filtered);
    }
  };

  const searchByJobStatus = () => {
    const jobStatusTrue = rows?.filter((row) => row?.jobStatus === true);
    const jobStatusFalse = rows?.filter((row) => row?.jobStatus === "false");
    // setFilteredData(rows);
    if (filterByJobStatus === "Yes") {
      setFilteredData(jobStatusTrue);
    } else if (filterByJobStatus === "No") {
      setFilteredData(jobStatusFalse);
    }
  };

  // filter by department
  const handleJobStatus = (e) => {
    if (e.target.value === "All") {
      setFilterByJobStatus("");
    } else {
      setFilterByJobStatus(e.target.value);
    }
  };

  const handleMakeAdmin = (id, name) => {
    handleAdminOperation(id, name, "makeAdmin", refetch);
  };

  const handleRemoveAdmin = (id, name) => {
    handleAdminOperation(id, name, "removeAdmin", refetch);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully Deleted User.");
      refetch();
    }
  }, [isSuccess, refetch]);

  return (
    <Box
      maxHeight="94vh"
      width="100%"
      sx={{ padding: "20px", overflow: "scroll" }}
    >
      {/* search field */}
      {!adminData && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          my={1}
        >
          {/* search by text */}
          <FormControl variant="outlined">
            <OutlinedInput
              placeholder="Search"
              onChange={handleSearch}
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
          <Stack direction="row" spacing={1}>
            {/* filter By Job Status */}
            {allStudent && (
              <TextField
                sx={{ minWidth: { xs: "150px", md: "200px" } }}
                select
                label="Filter by Job Status"
                onChange={handleJobStatus}
                defaultValue="All"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            )}
            {/* filter By Department */}
            <TextField
              sx={{ minWidth: { xs: "150px", md: "200px" } }}
              select
              label="Filter by Department"
              onChange={handleDepartment}
              defaultValue="All"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Computer Sceience">Computer Sceience</MenuItem>
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Mathematics">Mathematics</MenuItem>
              <MenuItem value="Chemistry">Chemistry</MenuItem>
              <MenuItem value="Electrical Engineering">
                Electrical Engineering
              </MenuItem>
            </TextField>
          </Stack>
        </Stack>
      )}
      {/* table container */}
      <TableContainer component="div">
        <Table
          sx={{ minWidth: 650, overflowX: "scroll" }}
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
                Department
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
              {adminData && (
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Phone
                </TableCell>
              )}
              {allStudent && (
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((row) => (
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
                <TableCell>{row?.department}</TableCell>
                <TableCell>{row?.jobInfo?.companyName || "N/A"}</TableCell>
                <TableCell>{row?.jobInfo?.designation || "N/A"}</TableCell>
                <TableCell>{row?.jobInfo?.jobLocation || "N/A"}</TableCell>
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
                {adminData && (
                  <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton
                      onClick={() =>
                        handleRemoveAdmin(row?._id, row?.firstName)
                      }
                    >
                      <PersonOff sx={{ color: "#309576" }} />
                    </IconButton>

                    <IconButton onClick={() => handleDelete(row?._id)} color="">
                      <DeleteForever color="error" />
                    </IconButton>
                  </TableCell>
                )}
                {allStudent && (
                  <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton
                      onClick={() => handleMakeAdmin(row?._id, row?.firstName)}
                    >
                      <AdminPanelSettingsOutlined sx={{ color: "#309576" }} />
                    </IconButton>

                    <IconButton onClick={() => handleDelete(row?._id)} color="">
                      <DeleteForever color="error" />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomizeTable;
