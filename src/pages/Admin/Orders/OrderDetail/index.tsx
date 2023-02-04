import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { api } from "../../../../api/axios";
import { ProductApi } from "../../../../api/productApi";
import { UserApi } from "../../../../api/userApi";
import TableWithDetail from "../../../../components/Table/TableWithDetail";
import { ORDER_PRODUCT_COLUMNS } from "../../../../constants/table";
import { Order } from "../../../../types/order";
import { OrderProductRow } from "../../../../types/table";
import { UserCredentials } from "../../../../types/user";
import { calculateTotalPriceOfOneProduct } from "../../../../utils/cart";

interface OrderLocation {
  state: Order;
}
function OrderDetail() {
  const { state: order }: OrderLocation = useLocation();

  const { data: products } = useQuery(["admin:order-product"], () => {
    const productIds = order.items.map((item) => item.productId);
    return ProductApi.getProductsByIds(productIds);
  });

  const { data: user } = useQuery(["admin:user"], () => {
    return UserApi.getUserById(order.customerId);
  });

  const orderRows = products?.map((product) => {
    const quantity =
      order.items.find((item) => item.productId === product?.id)?.quantity ?? 0;
    return new OrderProductRow(
      product.id,
      product.name,
      user?.firstName + " " + user?.lastName,
      user?.email ?? "",
      order.address.city,
      product.unitPrice,
      quantity,
      calculateTotalPriceOfOneProduct(product.unitPrice, quantity)
    );
  });

  const calculateSubtotal = () => {
    return orderRows
      ?.reduce((acc, product) => product.totalPrice + acc, 0)
      ?.toFixed(2);
  };

  return (
    <>
      <TableWithDetail rows={orderRows} columns={ORDER_PRODUCT_COLUMNS} />
      <Typography variant="h4" style={{ marginTop: "1rem" }}>
        Total: {calculateSubtotal()} TL
      </Typography>
    </>
  );
}

export default OrderDetail;
