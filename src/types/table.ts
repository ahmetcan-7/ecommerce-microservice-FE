import { Category } from "./category";

export interface Column {
  id: string | number;
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
}

export class ProductRow {
  id: string;
  productName: string;
  categoryName: string;
  unitPrice: number;
  createdDate: string;
  constructor(
    id: string,
    productName: string,
    categoryName: string,
    unitPrice: number,
    createdDate: string
  ) {
    this.productName = productName;
    this.categoryName = categoryName;
    this.unitPrice = unitPrice;
    this.createdDate = createdDate;
    this.id = id;
  }
}

export class OrderRow {
  id: string;
  items: number;
  orderStatus: string;
  createdDate: string;
  constructor(
    id: string,
    items: number,
    orderStatus: string,
    createdDate: string
  ) {
    this.items = items;
    this.orderStatus = orderStatus;
    this.createdDate = createdDate;
    this.id = id;
  }
}

export class OrderProductRow {
  id: string;
  productName: string;
  categoryName: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  constructor(
    id: string,
    productName: string,
    categoryName: string,
    unitPrice: number,
    quantity: number,
    totalPrice: number
  ) {
    this.productName = productName;
    this.categoryName = categoryName;
    this.unitPrice = unitPrice;
    this.id = id;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
  }
}

export type TableRow = InstanceType<
  typeof ProductRow | typeof OrderRow | typeof OrderProductRow
>;
