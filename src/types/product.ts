import { Category } from "./category";
import { Comment } from "./comment";
export interface ProductParam {
  size: number;
  page: number;
  filter: string;
  sort: string;
  searchTerm: string;
}

interface BaseProduct {
  id: string;
  name: string;
  unitPrice: number;
  description: string;
  imageUrl: string;
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
  comments: Comment[];
}
export interface ProductForm {
  name: string;
  unitPrice: number | undefined;
  categoryId: Category["id"] | undefined;
  description: string;
  quantityInStock?: number | undefined;
  imageUrl: string;
}
