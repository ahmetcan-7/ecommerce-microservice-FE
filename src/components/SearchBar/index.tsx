import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Category } from "../../types/category";

type SearchBarProps = {
  onChangeSearchValue: (value: string) => void;
  searchValue: string;
  onChangeSortBy: (value: string) => void;
  sortBy: string;
  onChangeFilter: (value: string) => void;
  filter: string;
  categories: Category[];
};

function SearchBar({
  onChangeSearchValue,
  searchValue,
  filter,
  onChangeFilter,
  onChangeSortBy,
  sortBy,
  categories,
}: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeSearchValue(e.target.value);
  };

  const handleChangeSortBy = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const value = event.target.value as string;
    onChangeSortBy(value);
  };

  const handleChangeFilter = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const value = event.target.value as string;
    onChangeFilter(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: "1rem 0",
        alignItems: "center",
      }}
    >
      <TextField
        id="filled-search"
        type="search"
        variant="outlined"
        className="without-padding"
        style={{ flex: 0.2 }}
        fullWidth
        size="small"
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
      <FormControl variant="outlined" size="small" style={{ flex: 0.075 }}>
        <InputLabel>Sort By</InputLabel>
        <Select label="Months" value={sortBy} onChange={handleChangeSortBy}>
          <MenuItem value={""}>Sort</MenuItem>
          <MenuItem value={"DATE_DESC"}>Date DESC</MenuItem>
          <MenuItem value={"DATE_ASC"}>Date ASC</MenuItem>
          <MenuItem value={"PRICE_DESC"}>Price DESC</MenuItem>
          <MenuItem value={"PRICE_ASC"}>Price ASC</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" size="small" style={{ flex: 0.075 }}>
        <InputLabel>Filter</InputLabel>
        <Select label="Months" value={filter} onChange={handleChangeFilter}>
          <MenuItem value={""}>All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem value={category.name}>{category.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SearchBar;
