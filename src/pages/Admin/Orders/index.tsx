import React from "react";
import { useQuery } from "react-query";
import { OrderApi } from "../../../api/orderApi";
import TableWithDetail from "../../../components/Table/TableWithDetail";
import { ORDER_COLUMNS } from "../../../constants/table";
import usePagination from "../../../hooks/usePagination";
import { OrderRow, TableRow } from "../../../types/table";

function Orders() {
  const { page, handleChangePage, handleChangeItemsPerPage, itemsPerPage } =
    usePagination();

  const { data: orders } = useQuery(["admin:orders", page, itemsPerPage], () =>
    OrderApi.getOrders({
      pageNo: page,
      pageSize: itemsPerPage,
    })
  );

  const orderRows = orders?.data.map(
    (order) =>
      new OrderRow(
        order.id,
        order.items.length,
        order.orderStatus,
        order.createdDate
      )
  );

  const navigateDetailOrder = (orderRow: TableRow) => {
    const order = orders?.data.find((order) => order.id === orderRow.id);
    console.log("order", order);
  };
  return (
    <>
      <h3>Orders</h3>
      <TableWithDetail
        rows={orderRows}
        columns={ORDER_COLUMNS}
        totalSize={orders?.totalSize}
        handleChangePage={handleChangePage}
        handleChangeItemsPerPage={handleChangeItemsPerPage}
        page={page}
        itemsPerPage={itemsPerPage}
        onClickDetail={navigateDetailOrder}
      />
    </>
  );
}

export default Orders;
