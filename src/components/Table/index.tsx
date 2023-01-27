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
export interface TableProps {
  products: ProductAdmin[] | undefined;
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
  products,
  totalSize,
  handleChangePage,
  handleChangeItemsPerPage,
  itemsPerPage,
  page,
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
              <TableCell align="center">Product Name</TableCell>
              <TableCell align="center">Category Name</TableCell>
              <TableCell align="center">Unit Price</TableCell>
              <TableCell align="center">Created Date</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((row) => (
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
                  <EditIcon />
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
