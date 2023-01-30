import * as yup from "yup";
import { ProductForm } from "../types/product";

const validationSchema = yup.object({
  description: yup.string().required("description is required"),
  name: yup.string().required("name is required"),
  categoryId: yup.number().required("category is required"),
  quantityInStock: yup
    .number()
    .min(0, "Password should be of minimum 0")
    .required("quantityInStock is required"),
  unitPrice: yup
    .number()
    .min(0, "unitPrice should be of minimum 0")
    .required("unitPrice is required"),
});

const initialValues: ProductForm = {
  categoryId: undefined,
  description: "",
  name: "",
  quantityInStock: undefined,
  unitPrice: undefined,
};

export default {
  validationSchema,
  initialValues,
};
