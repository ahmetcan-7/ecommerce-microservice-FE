import * as yup from "yup";
import { LoginForm } from "../types/user";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const initialValues: LoginForm = {
  email: "",
  password: "",
};

export default {
  validationSchema,
  initialValues,
};
