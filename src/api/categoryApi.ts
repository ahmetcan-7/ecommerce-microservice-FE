import { Category } from "../types/category";
import { api } from "./axios";

const getCategories = async () => {
  const { data } = await api.get<Category[]>("/v1/categories");

  return data;
};

export const CategoryApi = {
  getCategories,
};
