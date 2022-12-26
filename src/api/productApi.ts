import axios from "axios";
import { PRODUCT_PARAM } from "../constants/product";
import { Product, ProductParam } from "../types/product";
import { api } from "./axios";

const getProducts = async (params: ProductParam = { ...PRODUCT_PARAM }) => {
  const { data } = await api.get<Product[]>("/v1/products", {
    params,
  });

  return data;
};

export const ProductApi = {
  getProducts,
};
