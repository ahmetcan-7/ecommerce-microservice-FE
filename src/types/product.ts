import { Category } from "./category";
export interface ProductParam {
  size: number;
  page: number;
  filter: string;
  sort: string;
  searchTerm: string;
}

export interface ProductAdminParam {
  pageNo: number;
  pageSize: number;
}

export interface Product extends BaseProduct {
  categoryName: string;
}

export interface ProductAdmin extends BaseProduct {
  createdDate: string;
  category: Category;
}
interface BaseProduct {
  id: string;
  name: string;
  unitPrice: number;
  description: string;
}
