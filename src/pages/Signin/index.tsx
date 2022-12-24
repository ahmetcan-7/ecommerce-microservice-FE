import { Container, Typography } from "@material-ui/core";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import TextInput from "../../components/TextInput";
import signinForm from "../../forms/signinForm";

function Signin() {
  const form = useFormik({
    ...signinForm,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container maxWidth="sm" style={{ marginTop: "1rem" }}>
      <form onSubmit={form.handleSubmit}>
        <Typography variant="h2" align="center">
          Sign In
        </Typography>
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

export default Signin;
