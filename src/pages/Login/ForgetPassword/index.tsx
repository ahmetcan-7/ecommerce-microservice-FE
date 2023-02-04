import { Button, Container, TextField, Typography } from "@material-ui/core";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../../../api/userApi";
import { showSuccess } from "../../../utils/showSuccess";

function ForgetPassword() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const resetPassword = async () => {
    try {
      await UserApi.resetPassword(value);
    } catch (e: any) {
      if (e?.response?.status) {
        showSuccess("new password sent please check your mail!");
        navigate("/login");
      }
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "1rem" }}>
      <Typography variant="h3" align="center">
        Reset your password
      </Typography>

      <TextField
        variant="outlined"
        label="Email"
        fullWidth
        size="small"
        value={value}
        onChange={handleChange}
        style={{ marginTop: "2rem", marginBottom: "0.5rem" }}
        type="email"
      />
      <Button
        color="primary"
        variant="contained"
        fullWidth
        onClick={resetPassword}
      >
        send
      </Button>
    </Container>
  );
}

export default ForgetPassword;
