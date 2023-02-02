import { Column } from "../types/table";

export const PRODUCT_COLUMNS: readonly Column[] = [
  { id: "productName", label: "Product Name" },
  { id: "categoryName", label: "Category Name" },
  { id: "unitPrice", label: "Unit Price" },
  { id: "createdDate", label: "Created Date" },
];

export const ORDER_COLUMNS: readonly Column[] = [
  { id: "id", label: "Order Id" },
  { id: "items", label: "Order Items" },
  { id: "orderStatus", label: "Order Status" },
  { id: "createdDate", label: "Created Date" },
];
