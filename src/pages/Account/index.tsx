import { Avatar, Container, IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useMutation, useQuery } from "react-query";
import { useFormik } from "formik";
import { setToken } from "../../utils/token";
import TextInput from "../../components/TextInput";
import { showSuccess } from "../../utils/showSuccess";
import { useNavigate } from "react-router-dom";

import accountForm from "../../forms/accountForm";
import { UserApi } from "../../api/userApi";
import { LoadingButton } from "@mui/lab";
import { showError } from "../../utils/showError";
import { AxiosError } from "axios";

function Account() {
  const navigate = useNavigate();

  const form = useFormik({
    initialValues: accountForm.initialValues,
    validationSchema: accountForm.validationSchema,
    onSubmit: (values) => {
      updateMutation.mutate(values);
    },
  });

  const updateMutation = useMutation(UserApi.updatePassword, {
    onSuccess: (res) => {
      setToken({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      });
      showSuccess("Your Password has been updated successfully");
      navigate(`/`);
    },
    onError: (err: any) => {
      showError(err?.response?.data?.message as string);
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <TextInput
          name="currentPassword"
          label="currentPassword"
          type="password"
          form={form}
        />
        <TextInput
          name="newPassword"
          label="newPassword"
          type="password"
          form={form}
        />
        <LoadingButton
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          loading={updateMutation.isLoading}
        >
          Change Password
        </LoadingButton>
      </Container>
    </form>
  );
}

export default Account;
