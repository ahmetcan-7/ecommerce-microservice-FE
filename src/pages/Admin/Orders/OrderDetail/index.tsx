import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { ProductApi } from "../../../../api/productApi";
import TableWithDetail from "../../../../components/Table/TableWithDetail";
import { ORDER_PRODUCT_COLUMNS } from "../../../../constants/table";
import { Order } from "../../../../types/order";
import { OrderProductRow } from "../../../../types/table";
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

  const orderRows = products?.map((product) => {
    const quantity =
      order.items.find((item) => item.productId === product?.id)?.quantity ?? 0;
    return new OrderProductRow(
      product.id,
      product.name,
      product.category.name,
      product.unitPrice,
      quantity,
      calculateTotalPriceOfOneProduct(product.unitPrice, quantity)
    );
  });

  const calculateSubtotal = () => {
    return orderRows?.reduce((acc, product) => product.totalPrice + acc, 0);
  };

  return (
    <>
      <h2>Order details</h2>
      <TableWithDetail rows={orderRows} columns={ORDER_PRODUCT_COLUMNS} />
      <h3>Subtotal :{calculateSubtotal()}</h3>
    </>
  );
}

export default OrderDetail;
