import * as yup from "yup";
import { ProfileForm } from "../types/profile";

const validationSchema = yup.object({
  email: yup.string(),
  firstName: yup.string().required("firstName is required"),
  lastName: yup.string().required("lastName is required"),
  profileImageURL: yup.string(),
});

const initialValues: ProfileForm = {
  email: "",
  firstName: "",
  lastName: "",
  profileImageURL: "",
};

export default {
  validationSchema,
  initialValues,
};
