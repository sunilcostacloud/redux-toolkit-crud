import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import { useDispatch, useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditEmployee = (props) => {
  const { editEmployeeopen, setEditEmployeeOpen, tableRowId } = props;
  const dispatch = useDispatch();

  const data = useSelector((state) => state.employees.employeeEditedData);
  const isLoading = useSelector(
    (state) => state.employees.employeeEditDataLoading
  );
  const isError = useSelector(
    (state) => state.employees.employeeEditDataIsError
  );
  const error = useSelector((state) => state.employees.employeeEditDataError);
  const isSuccess = useSelector(
    (state) => state.employees.employeeEditDataIsSuccess
  );

  return <div>EditEmployee</div>;
};

export default EditEmployee;
