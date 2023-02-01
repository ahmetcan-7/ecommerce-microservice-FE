import * as yup from "yup";
import { ProductForm } from "../types/product";

const validationSchema = (isEdit: boolean) =>
  yup.object({
    description: yup.string().required("description is required"),
    name: yup.string().required("name is required"),
    categoryId: yup.number().required("category is required"),
    imageUrl: yup.string().required("image is required"),
    quantityInStock: yup.number().when([], {
      is: () => !isEdit,
      then: yup
        .number()
        .min(0, "Password should be of minimum 0")
        .required("quantityInStock is required"),
      otherwise: yup.number().notRequired(),
    }),
    unitPrice: yup
      .number()
      .min(0, "unitPrice should be of minimum 0")
      .required("unitPrice is required"),
  });

const initialValues = (isEdit: boolean = true): ProductForm => {
  return {
    categoryId: undefined,
    description: "",
    name: "",
    unitPrice: undefined,
    imageUrl: "",
    ...(!isEdit && { quantityInStock: undefined }),
  };
};

export default {
  validationSchema,
  initialValues,
};
