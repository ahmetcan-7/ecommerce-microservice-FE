import * as yup from "yup";
import { OrderForm } from "../types/order";

const validationSchema = yup.object({
  district: yup.string().required("district is required"),
  city: yup.string().required("city is required"),
  addressDetail: yup.string().required("addressDetail is required"),
});

const initialValues: OrderForm = {
  district: "",
  city: "",
  addressDetail: "",
};

export default {
  validationSchema,
  initialValues,
};
