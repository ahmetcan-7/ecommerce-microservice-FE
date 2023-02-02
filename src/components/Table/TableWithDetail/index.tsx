import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Table as MuiTable } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { Column } from "../../../types/table";
import type { TableRow as TableRowType } from "../../../types/table";

export interface TableProps {
  rows: TableRowType[] | undefined;
  columns: readonly Column[];
  totalSize: number | undefined;
  handleChangePage: any;
  handleChangeItemsPerPage: any;
  itemsPerPage: number;
  page: number;
  onClickDetail: (tableRow: TableRowType) => void;
}

function TableWithDetail({
  rows,
  totalSize,
  handleChangePage,
  handleChangeItemsPerPage,
  itemsPerPage,
  page,
  columns,
  onClickDetail,
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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  onClick={() => onClickDetail(row)}
                >
                  {columns.map((column) => {
                    const value = (row as any)[column?.id];
                    return (
                      <TableCell key={column.id} align={column?.align}>
                        {value}
                      </TableCell>
                    );
                  })}
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

export default TableWithDetail;
