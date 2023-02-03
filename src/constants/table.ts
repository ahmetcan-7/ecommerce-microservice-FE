import { Column } from "../types/table";

export const PRODUCT_COLUMNS: readonly Column[] = [
  { id: "productName", label: "Product Name" },
  { id: "categoryName", label: "Category Name" },
  { id: "unitPrice", label: "Unit Price" },
  { id: "createdDate", label: "Created Date" },
];

export const ORDER_COLUMNS: readonly Column[] = [
  { id: "id", label: "Order Number" },
  { id: "items", label: "Order Items" },
  { id: "orderStatus", label: "Order Status" },
  { id: "createdDate", label: "Created Date" },
];

export const ORDER_PRODUCT_COLUMNS: readonly Column[] = [
  { id: "productName", label: "Product Name" },
  { id: "customerName", label: "Customer Full Name" },
  { id: "customerEmail", label: "Customer Email" },
  { id: "city", label: "City" },
  { id: "unitPrice", label: "Unit Price" },
  { id: "quantity", label: "Product Quantity" },
  { id: "totalPrice", label: "Total Price" },
];
