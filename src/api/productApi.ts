import axios from "axios";
import { PRODUCT_PARAM } from "../constants/product";
import { Pagination } from "../types/pagination";
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
  const { data } = await api.get<Pagination<ProductAdmin[]>>(
    "/v1/products/getAll",
    {
      params,
    }
  );
  return data;
};

const deleteProduct = async (id: string) => {
  const { data } = await api.delete(`/v1/products/${id}`);
  return data;
};

const getProductById = async (id: string) => {
  const { data } = await api.get<ProductAdmin>(`/v1/products/${id}`);

  return data;
};

export const ProductApi = {
  getProducts,
  getProductsByPagination,
  deleteProduct,
  getProductById,
};
