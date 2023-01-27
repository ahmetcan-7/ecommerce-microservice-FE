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
import TablePagination from "@mui/material/TablePagination";
import EditIcon from "@mui/icons-material/Edit";
import { Column } from "../../types/table";
import { IconButton } from "@material-ui/core";
export interface TableProps {
  rows: Array<any> | undefined;
  columns: readonly Column[];
  totalSize: number | undefined;
  editItem: (id: string) => void;
  deleteItem: (id: string) => void;
  handleChangePage: any;
  handleChangeItemsPerPage: any;
  itemsPerPage: number;
  page: number;
}
function Table({
  deleteItem,
  editItem,
  rows,
  totalSize,
  handleChangePage,
  handleChangeItemsPerPage,
  itemsPerPage,
  page,
  columns,
}: TableProps) {
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ marginTop: "16px", maxWidth: "1200px" }}
      >
        <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column?.align}
                  style={{ minWidth: column?.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column?.id];
                    return (
                      <TableCell key={column.id} align={column?.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => editItem(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="secondary"
                      onClick={() => deleteItem(row.id)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </MuiTable>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalSize || 0}
          rowsPerPage={itemsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeItemsPerPage}
        />
      </TableContainer>
    </>
  );
}

export default Table;
