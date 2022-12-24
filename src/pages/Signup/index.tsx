import { Container, Typography } from "@material-ui/core";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import TextInput from "../../components/TextInput";
import signupForm from "../../forms/signupForm";

function Signup() {
  const form = useFormik({
    ...signupForm,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container maxWidth="sm" style={{ marginTop: "1rem" }}>
      <Typography variant="h2" align="center">
        Sign Up
      </Typography>
      <form onSubmit={form.handleSubmit}>
        <TextInput name="firstName" label="First Name" form={form} />
        <TextInput name="lastName" label="Last Name" form={form} />
        <TextInput name="email" label="Email" form={form} />
        <TextInput
          name="password"
          label="Password"
          form={form}
          type="password"
        />
        <TextInput
          name="passwordConfirm"
          label="Password Confirm"
          form={form}
          type="password"
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default Signup;
