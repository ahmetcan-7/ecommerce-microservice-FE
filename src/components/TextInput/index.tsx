import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

type TextInputProps = TextFieldProps & {
  form: any;
  name: string;
  label: string;
  [rest: string]: any;
};

function TextInput({
  form,
  name,
  label,
  margin = "dense",
  ...rest
}: TextInputProps) {
  return (
    <TextField
      fullWidth
      name={name}
      label={label}
      margin={margin}
      value={form.values?.[name]}
      onChange={form.handleChange}
      onBlur={form.handleBlur}
      error={form.touched?.[name] && Boolean(form.errors?.[name])}
      helperText={form.touched?.[name] && form.errors?.[name]}
      {...rest}
    />
  );
}

export default TextInput;
