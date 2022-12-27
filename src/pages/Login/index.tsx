import { Container, Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../components/TextInput";
import loginForm from "../../forms/loginForm";
import { AppState } from "../../store";
import { login } from "../../store/actions/userAction";
import { useEffect } from "react";
import { showSuccess } from "../../utils/showSuccess";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state: AppState) => state.user);

  useEffect(() => {
    if (data.isLogedIn) {
      showSuccess("You have successfully logged in!");
      navigate("/");
    }
  }, [data]);

  const form = useFormik({
    ...loginForm,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  return (
    <Container maxWidth="sm" style={{ marginTop: "1rem" }}>
      <form onSubmit={form.handleSubmit}>
        <Typography variant="h2" align="center">
          Login
        </Typography>
        <TextInput name="email" label="Email" form={form} />
        <TextInput
          name="password"
          label="Password"
          form={form}
          type="password"
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={loading}
        >
          Login
        </Button>
      </form>
    </Container>
  );
}

export default Login;
