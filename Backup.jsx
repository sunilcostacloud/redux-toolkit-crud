// ** React Import
import { useState } from "react";
import { Collapse, Fab, Icon, InputBase, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import QuickSearchToolbar from "./QuickSearchToolbar";

// ** renders client column
const renderClient = (params) => {
  const { row } = params;
};

const rows = [
  {
    id: 1,

    Contact_name: "Korrie O'Crevy",
    account_name: "Nuclear Power Engineer",
    email: "mailto:kocrevy0@thetimes.co.uk",
    Phone: 2389666735,
    Designation: "Krasnosilka",
    contact_owner: "Korrie O'Crevy",
  },
  {
    id: 7,

    Contact_name: "Eileen Diehn",
    account_name: "Environmental Specialist",
    email: "mailto:ediehn6@163.com",
    Phone: 189918767,
    Designation: "Lampuyang",
    contact_owner: "Eileen Diehn",
  },
  {
    id: 11,
    avatar: "",
    Contact_name: "De Falloon",
    account_name: "Sales Representative",
    email: "mailto:dfalloona@ifeng.com",
    Phone: 192526712,
    Designation: "Colima",
    contact_owner: "Korrie O'Crevy",
  },
  {
    id: 3,

    Contact_name: "Stella Ganderton",
    account_name: "Operator",
    email: "mailto:sganderton2@tuttocitta.it",
    Phone: 130767828,
    Designation: "Golcowa",
    contact_owner: "De Falloon",
  },
  {
    id: 5,

    Contact_name: "Harmonia Nisius",
    account_name: "Senior Cost Accountant",
    email: "mailto:hnisius4@gnu.org",
    Phone: 109096752,
    Designation: "Lucan",
    contact_owner: "Harmonia Nisius",
  },
  {
    id: 6,

    Contact_name: "Genevra Honeywood",
    account_name: "Geologist",
    email: "mailto:ghoneywood5@narod.ru",
    Phone: 178036878,
    Designation: "Maofan",
    contact_owner: "Korrie O'Crevy",
  },
  {
    id: 4,

    Contact_name: "Dorolice Crossman",
    account_name: "Cost Accountant",
    email: "mailto:dcrossman3@google.co.jp",
    Phone: 1233678817,
    Designation: "Paquera",
    contact_owner: "Korrie O'Crevy",
  },
  {
    id: 8,
    avatar: "7.png",
    Contact_name: "Richardo Aldren",
    account_name: "Senior Sales Associate",
    email: "mailto:raldren7@mtv.com",
    Phone: 19230813,
    Designation: "Skoghall",
    contact_owner: "Korrie O'Crevy",
  },
  {
    id: 9,
    avatar: "2.png",
    Contact_name: "Allyson Moakler",
    account_name: "Safety Technician",
    email: "mailto:amoakler8@shareasale.com",
    Phone: 116778932,
    Designation: "Mogilany",
    contact_owner: "Allyson Moakler",
  },
  {
    id: 10,
    avatar: "7.png",
    Contact_name: "Merline Penhalewick",
    account_name: "Junior Executive",
    email: "mailto:mpenhalewick9@php.net",
    Phone: 159397852,
    Designation: "Kanuma",
    contact_owner: "Merline Penhalewick",
  },
  {
    id: 12,
    avatar: "",
    Contact_name: "Cyrus Gornal",
    account_name: "Senior Sales Associate",
    email: "mailto:cgornalb@fda.gov",
    Phone: 167457847,
    Designation: "Boro Utara",
    contact_owner: "Cyrus Gornal",
  },

  {
    id: 14,
    avatar: "",
    Contact_name: "Othilia Extill",
    account_name: "Associate Professor",
    email: "mailto:oextilld@theatlantic.com",
    Phone: 184428734,
    Designation: "Brzyska",
    contact_owner: "Othilia Extill",
  },
  {
    id: 15,
    avatar: "",
    Contact_name: "Wilmar Bourton",
    account_name: "Administrative Assistant",
    email: "mailto:wbourtone@sakura.ne.jp",
    Phone: 133047545,
    Designation: "Bích Động",
    contact_owner: "Wilmar Bourton",
  },
];

const AccountTable = () => {
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  };

  // ** State
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 7,
  });
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [data] = useState(rows);
  const [filteredData, setFilteredData] = useState([]);
  const [showIcon, setShowIcon] = useState(false);
  const dispatch = useDispatch();

  const [checkedRowsDetails, setCheckedRowDetails] = useState([]);

  const [singleRowDetails, setSingleRowDetails] = useState({});

  // console.log("singleRowDetails", singleRowDetails);

  // console.log("checkedRowsDetails", checkedRowsDetails);

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
      flex: 0.25,
      minWidth: 290,
      field: "Contact_name",
      headerName: "Contact Name",
      renderCell: (params) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {renderClient(params)}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                noWrap
                variant="body2"
                sx={{ color: "text.primary", fontWeight: 600 }}
              >
                {row.Contact_name}
              </Typography>
              <Typography noWrap variant="caption">
                {row.email}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      flex: 0.175,
      minWidth: 120,
      headerName: "Account Name",
      field: "account_name",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.account_name}
        </Typography>
      ),
    },
    {
      flex: 0.175,
      minWidth: 110,
      field: "Phone",
      headerName: "Phone",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.Phone}
        </Typography>
      ),
    },
    {
      flex: 0.125,
      field: "contact_owner",
      minWidth: 80,
      headerName: "Contact Owner",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.contact_owner}
        </Typography>
      ),
    },
    {
      flex: 0.175,
      minWidth: 140,
      field: "Designation",
      headerName: "Designation",
      renderCell: (params) => {
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {params.row.Designation}
        </Typography>;
      },
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

  const handleSubmit = () => {
    setOpen(!open);
  };

  const handleVisibilityIconClick = () => {
    setOpenDialog(true);
  };

  const handleContactFormClose = () => {
    setOpen(false);
    setOpenDialog(false);
  };

  const handleContactFormSubmit = () => {
    handleContactFormClose();
  };

  const handleDialogSubmit = (params) => {
    handleVisibilityIconClick();
  };

  const handleSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");

    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        // @ts-ignore
        return searchRegex.test(row[field].toString());
      });
    });
    if (searchValue.length) {
      setFilteredData(filteredRows);
    } else {
      setFilteredData([]);
    }
  };

  return (
    <Card className="tableGrid">
      <CardHeader
        title="ACCOUNTS"
        action={
          <>
            <div className="PaIconCon">
              <IconButton>
                <Tooltip title="CREATE LEAD" placement="top">
                  <span>
                    <Fab
                      style={{
                        width: "2.2rem",
                        height: ".1rem",
                        backgroundColor: "#7367F0",
                      }}
                      onClick={handleSubmit}
                    >
                      <AddIcon style={{ fontSize: "19", color: "#fff" }} />
                    </Fab>
                  </span>
                </Tooltip>
              </IconButton>
            </div>
          </>
        }
      />
      <DataGrid
        sx={{ display: "flex" }}
        autoHeight
        slots={{ toolbar: QuickSearchToolbar }}
        rows={filteredData.length ? filteredData || [] : data || []}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(newRowSelectionModel) => {
          //  console.log("newRowSelectionModel", newRowSelectionModel);
          const receivedData = filteredData.length
            ? filteredData || []
            : data || [];
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
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        slotProps={{
          baseButton: {
            size: "medium",
            variant: "outlined",
          },
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(""),
            onChange: (event) => handleSearch(event.target.value),
          },
          row: {
            onMouseEnter: (event) => {
              const id = event.currentTarget.dataset.id;
              const hoveredRow = (
                filteredData.length ? filteredData || [] : data || []
              ).find((row) => row.id == id);

              setHoveredId(id);
              setHoveredRowDetails(hoveredRow);
            },
            onMouseLeave: (event) => {
              setHoveredId(null);
              setHoveredRowDetails({});
            },
          },
        }}
      />
    </Card>
  );
};

export default AccountTable;
