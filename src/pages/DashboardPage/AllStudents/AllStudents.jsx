import { useEffect, useState } from "react";
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
import {
  AdminPanelSettingsOutlined,
  Delete,
  Search,
} from "@mui/icons-material";
import useLoggedUser from "../../../hooks/useLoggedUser";
import UpdateStudent from "./UpdateStudent";
import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
  useMakeAdminMutation,
} from "../../../redux/services/studentsService";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllStudents = () => {
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
  const [makeAdmin] = useMakeAdminMutation();

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
    const makeAdminAsync = async () => {
      try {
        const res = await makeAdmin(id);
        console.log(res);
        if (res?.data?.modifiedCount > 0) {
          Swal.fire("Done!", `${name} is now an Admin`, "success");
          refetch();
        }
      } catch (error) {
        console.error(error);
        Swal.fire(
          "Error",
          "An error occurred while making the student an admin",
          "error"
        );
      }
    };

    Swal.fire({
      title: "Make admin this student?",
      showCancelButton: true,
      confirmButtonText: "Yes, make it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdminAsync(); // Call the async function here
      } else if (result.dismiss === Swal.DismissReason.cancel) {
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
      maxHeight="94vh"
      width="100%"
      sx={{ padding: "20px", overflow: "scroll" }}
    >
      {/* search field */}
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
                Department
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
                <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                  {/* <IconButton color="primary">
                    <UpdateStudent id={row?._id} student={row} />
                  </IconButton> */}

                  <IconButton
                    onClick={() => handleMakeAdmin(row?._id, row?.firstName)}
                  >
                    <AdminPanelSettingsOutlined sx={{ color: "#309576" }} />
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
