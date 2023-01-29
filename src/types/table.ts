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

export type TableRow = InstanceType<typeof ProductRow>;
