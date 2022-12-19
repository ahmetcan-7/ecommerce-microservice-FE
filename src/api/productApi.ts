import axios from "axios";
import { PRODUCT_PARAM } from "../constants/productConstant";
import { Product, ProductParam } from "../types/productType";

const getProducts = async (
  params: ProductParam = { ...PRODUCT_PARAM }
): Promise<Product[]> => {
  const response = await axios.get("/v1/products", {
    params,
  });

  return response.data;
};

export const ProductApi = {
  getProducts,
};
