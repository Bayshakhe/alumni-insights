import {
  Avatar,
  Box,
  FormControl,
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
import useLoggedUser from "../../hooks/useLoggedUser";
import { useGetAlumniStudentsQuery } from "../../redux/services/studentsService";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";

const AllAlumni = () => {
  const { loggedUser } = useLoggedUser();
  const { data: rows } = useGetAlumniStudentsQuery();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(rows);
  const [filterByDepartment, setFilterByDepartment] = useState("");

  useEffect(() => {
    if (!searchText) {
      setFilteredData(rows);
    }
    if (rows) {
      searchByText();
    }
    if (filterByDepartment) {
      searchByDepartment();
    }
  }, [searchText, rows, filterByDepartment]);

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
    } else {
      setFilteredData(rows);
    }
  };

  // search by text function
  const searchByDepartment = () => {
    let filtered = [];
    setFilteredData(rows);
    if (filterByDepartment) {
      filtered = rows?.filter((row) => row?.department === filterByDepartment);
      setFilteredData(filtered);
    }
  };

  return (
    <Box minHeight="94vh" sx={{ margin: "20px auto" }}>
      {/* search field */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
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
        {/* filterByDepartment */}
        <TextField
          sx={{ minWidth: { xs: "150px", md: "200px" } }}
          select
          defaultValue="All"
          label="Filter by Department"
          onChange={handleDepartment}
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
      {/* table */}
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
              {/* <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Details
              </TableCell> */}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllAlumni;
