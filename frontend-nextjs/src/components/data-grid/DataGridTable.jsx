import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import {
  getEmployeeProfileData,
  getEmployeeTableData,
} from "@/redux/features/employeeTableSlice";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import InputLabel from "@mui/material/InputLabel";
import Pagination from "@mui/material/Pagination";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AddEmployeeDataGrid from "./AddEmployeeDataGrid";
import EditEmployeeDataGrid from "./EditEmployeeDataGrid";
import DeleteEmployeeDataGrid from "./DeleteEmployeeDataGrid";

const DataGridTable = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [hoverdRowId, setHoveredId] = useState(null);
  const [hoveredRowDetails, setHoveredRowDetails] = useState({});

  // console.log("hoverdRowId", hoverdRowId, hoveredRowDetails);

  const { data, isLoading, isError, error, isSuccess } = useSelector(
    (state) => state.employees
  );

  // console.log("data?.data?.employeesTableData", data);

  const [checkedRowsDetails, setCheckedRowDetails] = useState([]);

  const [singleRowDetails, setSingleRowDetails] = useState({});

  // console.log("singleRowDetails", singleRowDetails);
  // console.log("checkedRowsDetails", checkedRowsDetails);

  const [search, setSearch] = useState(
    sessionStorage.getItem("datagrid_search") || ""
  );
  const [gender, setGender] = useState(
    sessionStorage.getItem("datagrid_gender") || "all"
  );
  const [status, setStatus] = useState(
    sessionStorage.getItem("datagrid_status") || "all"
  );
  const [sort, setSort] = useState(
    sessionStorage.getItem("datagrid_sort") || "new"
  );

  const [page, setPage] = useState(
    sessionStorage.getItem("datagrid_page")
      ? Number(sessionStorage.getItem("datagrid_page"))
      : 1
  );

  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);
  const [editEmployeeopen, setEditEmployeeOpen] = useState(false);
  const [deleteEmployeeOpen, setDeleteEmployeeOpen] = useState(false);
  const [tableRowId, setTableRowId] = useState("");

  const getData = ({ search, gender, status, sort, page }) => {
    dispatch(getEmployeeTableData({ search, gender, status, sort, page }));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    sessionStorage.setItem("datagrid_page", newPage);
    getData({ search, gender, status, sort, page: newPage });
  };

  const handleAddEmployeeClickOpen = () => {
    setAddEmployeeOpen(true);
  };

  const handleEditEmployeeClickOpen = () => {
    setEditEmployeeOpen(true);
  };

  const handleDeleteEmployeeClickOpen = () => {
    setDeleteEmployeeOpen(true);
  };

  const handleEditClick = (e, id) => {
    //  console.log("checkRowId", id);
    setTableRowId(id);
    dispatch(getEmployeeProfileData({ id }));
    handleEditEmployeeClickOpen();
  };

  const handleViewClick = (e, id) => {
    // console.log("checkRowId", id);
    router.push(`/data-grid/${id}`);
  };

  const handleDeleteClick = (e, id) => {
    // console.log("checkRowId", id);
    setTableRowId(id);
    handleDeleteEmployeeClickOpen();
  };

  const handleSearch = (searchedVal) => {
    setSearch(searchedVal);
    sessionStorage.setItem("datagrid_search", searchedVal);
    setPage(1);
    sessionStorage.setItem("datagrid_page", 1);
    if (searchedVal == "") {
      getData({ search: searchedVal, gender, status, sort, page: 1 });
    }
  };

  const requestSearch = () => {
    setPage(1);
    sessionStorage.setItem("datagrid_page", 1);
    getData({ search, gender, status, sort, page: 1 });
  };

  const handleGenderChange = (event) => {
    sessionStorage.setItem("datagrid_gender", event.target.value);
    setGender(event.target.value);
    sessionStorage.setItem("datagrid_page", 1);
    setPage(1);
    getData({ search, gender: event.target.value, status, sort, page: 1 });
  };

  const handleStatusChange = (event) => {
    sessionStorage.setItem("datagrid_status", event.target.value);
    setStatus(event.target.value);
    sessionStorage.setItem("datagrid_page", 1);
    setPage(1);
    getData({ search, gender, status: event.target.value, sort, page: 1 });
  };

  const handleSortChange = (event) => {
    sessionStorage.setItem("datagrid_sort", event.target.value);
    setSort(event.target.value);
    sessionStorage.setItem("datagrid_page", 1);
    setPage(1);
    getData({ search, gender, status, sort: event.target.value, page: 1 });
  };

  useEffect(() => {
    if (!sessionStorage.getItem("datagrid_page")) {
      sessionStorage.setItem("datagrid_page", 1);
    }

    if (!sessionStorage.getItem("datagrid_gender")) {
      sessionStorage.setItem("datagrid_gender", "all");
    }

    if (!sessionStorage.getItem("datagrid_status")) {
      sessionStorage.setItem("datagrid_status", "all");
    }

    if (!sessionStorage.getItem("datagrid_sort")) {
      sessionStorage.setItem("datagrid_sort", "new");
    }

    if (!sessionStorage.getItem("datagrid_search")) {
      sessionStorage.setItem("datagrid_search", "");
    }

    getData({
      search,
      gender,
      status,
      sort,
      page,
    });
  }, []);

  const columns = [
    {
      flex: 0.1,
      field: "fname",
      minWidth: 220,
      headerName: "First Name",
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>{row.fname}</Typography>
      ),
    },
    {
      flex: 0.1,
      minWidth: 105,
      field: "lname",
      headerName: "Last Name",
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>{row.lname}</Typography>
      ),
    },
    {
      flex: 0.1,
      minWidth: 105,
      field: "email",
      headerName: "Email",
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>{row.email}</Typography>
      ),
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: "mobile",
      headerName: "Phone Number",
      renderCell: ({ row }) => (
        <>
          <Typography
            sx={{ color: "text.secondary" }}
          >{`${row.mobile}`}</Typography>
        </>
      ),
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: "gender",
      headerName: "Gender",
      renderCell: ({ row }) => (
        <>
          <Typography
            sx={{ color: "text.secondary" }}
          >{`${row.gender}`}</Typography>
        </>
      ),
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: "status",
      headerName: "Status",
      renderCell: ({ row }) => (
        <>
          <Typography
            sx={{ color: "text.secondary" }}
          >{`${row.status}`}</Typography>
        </>
      ),
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: "location",
      headerName: "Location",
      renderCell: ({ row }) => (
        <>
          <Typography
            sx={{ color: "text.secondary" }}
          >{`${row.location}`}</Typography>
        </>
      ),
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: "datecreated",
      headerName: "Date",
      renderCell: ({ row }) => (
        <>
          <Typography sx={{ color: "text.secondary" }}>
            {moment(row.datecreated).format("DD-MM-YYYY hh:mm a")}
          </Typography>
        </>
      ),
    },
    {
      flex: 0.1,
      minWidth: 200,
      sortable: false,
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }) => (
        <>
          {hoverdRowId !== null && hoverdRowId == row._id && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                padding: "5px",
              }}
            >
              <Tooltip title="View">
                <IconButton
                  onClick={() => {
                    handleViewClick(event, row._id);
                  }}
                >
                  <VisibilityIcon
                    style={{
                      color: "#014361",
                    }}
                  />
                </IconButton>
              </Tooltip>

              <Tooltip title="Edit">
                <IconButton
                  onClick={() => {
                    handleEditClick(event, row._id);
                  }}
                >
                  <EditIcon
                    style={{
                      color: "#014361",
                    }}
                  />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton
                  onClick={() => {
                    handleDeleteClick(event, row._id);
                  }}
                >
                  <DeleteForeverIcon
                    style={{
                      color: "#014361",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          width: "95%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            id="standard-basic"
            label="Search"
            variant="standard"
            type="search"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button variant="contained" onClick={() => requestSearch()}>
            Search
          </Button>
        </div>
        {/* {console.log("gennder", gender)} */}
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={gender}
              onChange={handleGenderChange}
              row
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </div>

        <div>
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={status}
              onChange={handleStatusChange}
              label="Status"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">active</MenuItem>
              <MenuItem value="inactive">inactive</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              {" "}
              Sort{" "}
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={sort}
              onChange={handleSortChange}
              label="Sort"
            >
              <MenuItem value="new">new</MenuItem>
              <MenuItem value="old">old</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => handleAddEmployeeClickOpen()}
          >
            Add User
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <LinearProgress style={{ width: "100%", marginTop: "20px" }} />
        </div>
      ) : isError ? (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <h4>{error}</h4>
        </div>
      ) : isSuccess === true && data?.data?.employeesTableData?.length == 0 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h1>No Data Found</h1>
        </div>
      ) : isSuccess ? (
        <div style={{ width: "95%", margin: "auto" }}>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{
                width: "100%",
                overflowX: "auto",
                display: "inline-grid",
                marginTop: "10px",
              }}
            >
              <div>
                <DataGrid
                  autoHeight
                  rows={data?.data?.employeesTableData || []}
                  rowHeight={62}
                  columns={columns}
                  checkboxSelection
                  disableRowSelectionOnClick
                  onRowSelectionModelChange={(newRowSelectionModel) => {
                    //  console.log("newRowSelectionModel", newRowSelectionModel);
                    const receivedData = data?.data?.employeesTableData;
                    const res = receivedData.filter((item) =>
                      newRowSelectionModel.includes(item._id)
                    );
                    // console.log("checkRes", res);
                    setCheckedRowDetails(res);
                  }}
                  getRowId={(row) => row._id}
                  onRowClick={(params) => {
                    // console.log("Clicked Row Data:", params);
                    setSingleRowDetails(params);
                  }}
                  slotProps={{
                    row: {
                      onMouseEnter: (event) => {
                        const id = event.currentTarget.dataset.id;
                        const hoveredRow = data?.data?.employeesTableData?.find(
                          (row) => row._id == id
                        );

                        //   console.log("hoveredRow", hoveredRow);

                        // console.log(`Hovering over row with ID: ${id}`);

                        setHoveredId(id);
                        setHoveredRowDetails(hoveredRow);
                      },
                      onMouseLeave: (event) => {
                        // Handle the logic to hide the VisibilityIcon when leaving the row here
                        setHoveredId(null);
                        setHoveredRowDetails({});
                      },
                    },
                  }}
                  hideFooter
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Pagination
                  count={data?.data?.pagination?.pageCount}
                  page={Number(page)}
                  onChange={handlePageChange}
                  variant="outlined"
                  color="primary"
                />
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        ""
      )}
      {/* add employee dialog */}
      <AddEmployeeDataGrid
        addEmployeeOpen={addEmployeeOpen}
        setAddEmployeeOpen={setAddEmployeeOpen}
        setPage={setPage}
      />

      {/* edit employee dialog */}
      <EditEmployeeDataGrid
        editEmployeeopen={editEmployeeopen}
        setEditEmployeeOpen={setEditEmployeeOpen}
        tableRowId={tableRowId}
      />

      {/* delete employee dialog */}

      {data?.data?.employeesTableData?.length !== "undefined" && (
        <DeleteEmployeeDataGrid
          deleteEmployeeOpen={deleteEmployeeOpen}
          setDeleteEmployeeOpen={setDeleteEmployeeOpen}
          tableRowId={tableRowId}
          page={
            page == 1
              ? 1
              : data?.data?.employeesTableData?.length > 1
              ? page
              : page - 1
          }
          setPage={setPage}
        />
      )}
    </>
  );
};

export default DataGridTable;
