import React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ProductAdmin } from "../../types/product";
import { Table as MuiTable } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

export interface TableProps {
  products: ProductAdmin[];
  editItem: (id: string) => void;
  deleteItem: (id: string) => void;
}
function Table({ deleteItem, editItem, products }: TableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ marginTop: "16px", maxWidth: "1200px" }}
      >
        <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Product Name</TableCell>
              <TableCell align="center">Category Name</TableCell>
              <TableCell align="center">Unit Price</TableCell>
              <TableCell align="center">Created Date</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products!.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.category.name}</TableCell>
                <TableCell align="center">{row.unitPrice}</TableCell>
                <TableCell align="center">{row.createdDate}</TableCell>
                <TableCell align="center" onClick={() => editItem(row.id)}>
                  <DeleteForeverIcon />
                </TableCell>
                <TableCell align="center" onClick={() => deleteItem(row.id)}>
                  <DeleteForeverIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}

export default Table;
