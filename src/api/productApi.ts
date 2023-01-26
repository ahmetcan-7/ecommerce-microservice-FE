import axios from "axios";
import { PRODUCT_PARAM } from "../constants/product";
import {
  Product,
  ProductAdminParam,
  ProductAdmin,
  ProductParam,
} from "../types/product";
import { api } from "./axios";

const getProducts = async (params: ProductParam = { ...PRODUCT_PARAM }) => {
  const { data } = await api.get<Product[]>("/v1/products", {
    params,
  });

  return data;
};

const getProductsByPagination = async (params: ProductAdminParam) => {
  const { data } = await api.get<ProductAdmin[]>("/v1/products/getAll", {
    params,
  });
  return data;
};

export const ProductApi = {
  getProducts,
  getProductsByPagination,
};
