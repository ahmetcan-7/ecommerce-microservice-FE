import { Category } from "../types/category";
import { api } from "./axios";

const getCategories = async () => {
  const { data } = await api.get<Category[]>("/v1/categories");

  return data;
};

const saveCategory = async (category: { name: string }) => {
  const { data } = await api.post("/v1/categories", category);

  return data;
};

export const CategoryApi = {
  getCategories,
  saveCategory,
};
