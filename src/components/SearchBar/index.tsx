import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, TextField } from "@material-ui/core";
import "./style.css";

type SearchBarProps = {
  onChangeSearchValue: (value: string) => void;
  searchValue: string;
};

function SearchBar({ onChangeSearchValue, searchValue }: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeSearchValue(e.target.value);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}>
      <TextField
        id="filled-search"
        type="search"
        variant="outlined"
        className="without-padding"
        style={{ flex: 0.35 }}
        fullWidth
        value={searchValue}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default SearchBar;
