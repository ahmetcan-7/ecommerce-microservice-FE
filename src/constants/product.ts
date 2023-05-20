import { ProductAdminParam, ProductParam } from "../types/product";

export const PRODUCT_PARAM: ProductParam = {
  size: 8,
  page: 0,
  filter: "",
  sort: "DATE_DESC",
  searchTerm: "",
};

export const PRODUCT_ADMIN_PARAM: ProductAdminParam = {
  pageNo: 0,
  pageSize: 15,
};
