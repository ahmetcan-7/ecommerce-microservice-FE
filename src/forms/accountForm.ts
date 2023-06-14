import * as yup from "yup";
import { AccountForm } from "../types/account";

const validationSchema = yup.object({
  currentPassword: yup.string().required("firstName is required"),
  newPassword: yup.string().required("lastName is required"),
});

const initialValues: AccountForm = {
  currentPassword: "",
  newPassword: "",
};

export default {
  validationSchema,
  initialValues,
};
