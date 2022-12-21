import { useFormik } from "formik";
import React from "react";

function Signup() {
  const form = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      passwordConfirm: "",
      email: "",
    },
    onSubmit: async (values, bag) => {
      console.log("values", values);
    },
  });

  return (
    <>
      <div>signup</div>
    </>
  );
}

export default Signup;
