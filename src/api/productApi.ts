import { PRODUCT_PARAM } from "../constants/product";
import { Comment } from "../types/comment";
import { Pagination } from "../types/pagination";
import {
  Product,
  ProductAdminParam,
  ProductAdmin,
  ProductParam,
  ProductForm,
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

const getProductsByIds = async (productIds: string[]) => {
  const { data } = await api.get<ProductAdmin[]>(
    `/v1/products/findByIds/${productIds.toString()}`
  );

  return data;
};

const saveProduct = async (product: ProductForm) => {
  const { data } = await api.post(`/v1/products`, {
    ...product,
  });

  return data;
};

const updateProduct = async (updateProduct: {
  data: ProductForm;
  id: string;
}) => {
  const { data } = await api.put(`/v1/products/${updateProduct.id}`, {
    ...updateProduct.data,
  });

  return data;
};

const getCommentsByProductId = async (productId: string) => {
  const { data } = await api.get<Comment[]>(
    `/v1/products/${productId}/comments`
  );

  return data;
};

export const ProductApi = {
  getProducts,
  getProductsByPagination,
  deleteProduct,
  getProductById,
  saveProduct,
  updateProduct,
  getProductsByIds,
  getCommentsByProductId,
};
