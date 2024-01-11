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
import DeleteEmployee from "../crud-operations/DeleteEmployee";
import AddEmployee from "../crud-operations/AddEmployee";
import EditEmployee from "../crud-operations/EditEmployee";

const DataGridTable = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [hoverdRowId, setHoveredId] = useState(null);
  const [hoveredRowDetails, setHoveredRowDetails] = useState({});

  const { data, isLoading, isError, error, isSuccess } = useSelector(
    (state) => state.employees
  );

  // console.log("data?.data?.employeesTableData", data);

  const [checkedRowsDetails, setCheckedRowDetails] = useState([]);

  const [singleRowDetails, setSingleRowDetails] = useState({});

  // console.log("check info", checkedRowsDetails, singleRowDetails);

  const [search, setSearch] = useState(sessionStorage.getItem("search") || "");
  const [gender, setGender] = useState(
    sessionStorage.getItem("gender") || "all"
  );
  const [status, setStatus] = useState(
    sessionStorage.getItem("status") || "all"
  );
  const [sort, setSort] = useState(sessionStorage.getItem("sort") || "new");

  const [page, setPage] = useState(
    sessionStorage.getItem("page") ? Number(sessionStorage.getItem("page")) : 1
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
    sessionStorage.setItem("page", newPage);
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
    sessionStorage.setItem("search", searchedVal);
    setPage(1);
    sessionStorage.setItem("page", 1);
    if (searchedVal == "") {
      getData({ search: searchedVal, gender, status, sort, page: 1 });
    }
  };

  const requestSearch = () => {
    setPage(1);
    sessionStorage.setItem("page", 1);
    getData({ search, gender, status, sort, page: 1 });
  };

  const handleGenderChange = (event) => {
    sessionStorage.setItem("gender", event.target.value);
    setGender(event.target.value);
    sessionStorage.setItem("page", 1);
    setPage(1);
    getData({ search, gender: event.target.value, status, sort, page: 1 });
  };

  const handleStatusChange = (event) => {
    sessionStorage.setItem("status", event.target.value);
    setStatus(event.target.value);
    sessionStorage.setItem("page", 1);
    setPage(1);
    getData({ search, gender, status: event.target.value, sort, page: 1 });
  };

  const handleSortChange = (event) => {
    sessionStorage.setItem("sort", event.target.value);
    setSort(event.target.value);
    sessionStorage.setItem("page", 1);
    setPage(1);
    getData({ search, gender, status, sort: event.target.value, page: 1 });
  };

  useEffect(() => {
    if (!sessionStorage.getItem("page")) {
      sessionStorage.setItem("page", 1);
    }

    if (!sessionStorage.getItem("gender")) {
      sessionStorage.setItem("gender", "all");
    }

    if (!sessionStorage.getItem("status")) {
      sessionStorage.setItem("status", "all");
    }

    if (!sessionStorage.getItem("sort")) {
      sessionStorage.setItem("sort", "new");
    }

    if (!sessionStorage.getItem("search")) {
      sessionStorage.setItem("search", "");
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
      minWidth: 150,
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
      minWidth: 100,
      sortable: false,
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }) => (
        <>
          {hoverdRowId !== null && hoverdRowId == row._id && (
            <div style={{ display: "flex", gap: "10px", padding: "5px" }}>
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

  const rows = data?.data?.employeesTableData || [];

  return (
    <>
      <div>
        <DataGrid
          autoHeight
          rows={rows}
          rowHeight={62}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setCheckedRowDetails(
              newRowSelectionModel.map(
                (index) => data?.data?.employeesTableData[index]
              )
            );
          }}
          getRowId={(row) => row._id}
          onRowClick={(params) => {
            console.log("Clicked Row Data:", params);
            setSingleRowDetails(params);
          }}
          componentsProps={{
            row: {
              onMouseEnter: (event) => {
                const id = event.currentTarget.dataset.id;
                // console.log("hoveredRow", data?.data?.employeesTableData);
                const hoveredRow = data?.data?.employeesTableData.find(
                  (row) => row._id === Number(id)
                );

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
    </>
  );
};

export default DataGridTable;
