import React, { useState } from "react";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";

const Test = () => {
  const [hoverdRowId, setHoveredId] = useState(null);
  const [hoveredRowDetails, setHoveredRowDetails] = useState({});

  // console.log("hoverdRowId", hoverdRowId, hoveredRowDetails);
  const handleViewClick = (e, id) => {
    console.log("checkRowId", id);
  };

  const handleDeleteClick = (e, id) => {
    console.log("checkRowId", id);
  };

  const columns = [
    {
      flex: 0.1,
      field: "name",
      minWidth: 220,
      headerName: "Name",
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>{row.name}</Typography>
      ),
    },
    {
      flex: 0.1,
      minWidth: 105,
      field: "userid",
      headerName: "USER ID",
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>{row.userid}</Typography>
      ),
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: "age",
      headerName: "AGE",
      renderCell: ({ row }) => (
        <>
          <Typography
            sx={{ color: "text.secondary" }}
          >{`${row.age}`}</Typography>
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
          {hoverdRowId !== null && hoverdRowId == row.id && (
            <div style={{ display: "flex", gap: "10px" }}>
              <Tooltip title="View">
                <IconButton
                  onClick={() => {
                    handleViewClick(event, row.id);
                  }}
                >
                  <VisibilityIcon
                    style={{
                      color: "#014361",
                    }}
                  />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton
                  onClick={() => {
                    handleDeleteClick(event, row.id);
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

  const [data, setData] = useState([
    {
      id: 1,
      name: "Aarav Agarwal",
      userid: "8S0S9wwL",
      age: 23,
    },
    {
      id: 2,
      name: "Aarav Gupta",
      userid: "uzofJ1M3",
      age: 30,
    },
    {
      id: 3,
      name: "Arya Sharma",
      userid: "X9DBHQkZ",
      age: 23,
    },
    {
      id: 4,
      name: "Ishaan Sharma",
      userid: "KBpmCTKU",
      age: 57,
    },
    {
      id: 5,
      name: "Hemant Vatsal",
      userid: "JGyROiMr",
      age: 45,
    },
    {
      id: 6,
      name: "Tara Patel",
      userid: "wIXQptuW",
      age: 54,
    },
    {
      id: 7,
      name: "Kia Agarwal",
      userid: "ZA9B0AIS",
      age: 39,
    },
    {
      id: 8,
      name: "Ishaan Patel",
      userid: "Yms0jHXK",
      age: 36,
    },
    {
      id: 9,
      name: "Rohan Khandelwal",
      userid: "DOU8ej30",
      age: 34,
    },
    {
      id: 10,
      name: "Ishaan Thakur",
      userid: "WcYri2r2",
      age: 50,
    },
  ]);

  const [checkedRowsDetails, setCheckedRowDetails] = useState([]);

  const [singleRowDetails, setSingleRowDetails] = useState({});

  // console.log("singleRowDetails", singleRowDetails);

  // console.log("checkedRowsDetails", checkedRowsDetails);

  return (
    <div>
      <DataGrid
        autoHeight
        rows={data}
        rowHeight={62}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(newRowSelectionModel) => {
          //  console.log("newRowSelectionModel", newRowSelectionModel);
          const receivedData = data;
          const res = receivedData.filter((item) =>
            newRowSelectionModel.includes(item.id)
          );
          // console.log("checkRes", res);
          setCheckedRowDetails(res);
        }}
        getRowId={(row) => row.id}
        onRowClick={(params) => {
          console.log("Clicked Row Data:", params);
          setSingleRowDetails(params);
        }}
        componentsProps={{
          row: {
            onMouseEnter: (event) => {
              const id = event.currentTarget.dataset.id;
              const hoveredRow = data.find((row) => row.id == id);

              // console.log(`Hovering over row with ID: ${id}`)
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
  );
};

export default Test;
