import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const QuickSearchToolbar = (props) => {
  const { value, clearSearch, onChange } = props;

  return (
    <Toolbar>
      <TextField
        variant="standard"
        value={value}
        onChange={onChange}
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {value && (
                <button
                  onClick={clearSearch}
                  className="MuiIconButton-root MuiIconButton-sizeSmall"
                >
                  <span className="MuiIconButton-label">
                    <span className="MuiIconButton-edgeStart">✕</span>
                  </span>
                </button>
              )}
            </InputAdornment>
          ),
        }}
      />
    </Toolbar>
  );
};

QuickSearchToolbar.propTypes = {
  value: PropTypes.string.isRequired,
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default QuickSearchToolbar;
