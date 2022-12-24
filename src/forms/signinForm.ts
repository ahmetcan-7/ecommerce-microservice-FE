import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match ")
    .required("Password confirm is required"),
});

const initialValues = {
  email: "",
  password: "",
  passwordConfirm: "",
};

export default {
  validationSchema,
  initialValues,
};
