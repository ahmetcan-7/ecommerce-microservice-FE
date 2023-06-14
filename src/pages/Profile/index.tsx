import { Avatar, Container, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import { useMutation, useQuery } from "react-query";
import { useEffect, ChangeEvent, useState } from "react";
import { FileApi } from "../../api/file";
import { useFormik } from "formik";
import profileForm from "../../forms/profileForm";
import { ProfileForm } from "../../types/profile";
import { UserApi } from "../../api/userApi";
import { setToken } from "../../utils/token";
import TextInput from "../../components/TextInput";
import { LoadingButton } from "@mui/lab";
import { showSuccess } from "../../utils/showSuccess";
import { useNavigate } from "react-router-dom";
import {
  updateProfile,
  updateProfileImage,
} from "../../store/actions/userAction";

function Profile() {
  const navigate = useNavigate();
  const { data: user, error } = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch<any>();

  const form = useFormik({
    initialValues: profileForm.initialValues,
    validationSchema: profileForm.validationSchema,
    onSubmit: (values) => {
      updateMutation.mutate(values);
    },
  });

  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    setInitialFormValues();
  }, []);

  const setInitialFormValues = () => {
    form.setFieldValue("email", user.email);
    form.setFieldValue("lastName", user.lastName);
    form.setFieldValue("firstName", user.firstName);
    form.setFieldValue("profileImageURL", user.profileImageURL ?? "");
  };

  const handleFileChange = async (e: any) => {
    if (!e.target.files) {
      return;
    }
    const fileData = new FormData();
    fileData.append("file", e.target.files[0]);
    const res = await FileApi.saveFile(fileData);
    form.setFieldValue("profileImageURL", res);
    dispatch(updateProfileImage({ profileImageURL: res }));
  };

  const updateMutation = useMutation(UserApi.updateUser, {
    onSuccess: (res) => {
      dispatch(updateProfile(res, form.values));
      showSuccess("Your Profile has been updated successfully");
      navigate(`/`);
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
        <Avatar
          alt={user.firstName + user.lastName}
          src={isHover ? "" : user.profileImageURL ?? ""}
          style={{ height: 180, width: 180 }}
          onClick={() => {
            const handleFile = document.getElementById("profile-file");
            handleFile?.click();
          }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {isHover
            ? "Upload"
            : user.firstName?.at(0)?.toUpperCase()! +
              user.lastName?.at(0)?.toUpperCase()}
        </Avatar>
        <input
          type="file"
          hidden
          onChange={handleFileChange}
          accept="image/*"
          id="profile-file"
        />
        <TextInput name="email" label="email" form={form} disabled={true} />
        <TextInput name="firstName" label="firstName" form={form} />
        <TextInput name="lastName" label="lastName" form={form} />
        <LoadingButton
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          // disabled={isLoading}
          loading={updateMutation.isLoading}
        >
          Upload Profile
        </LoadingButton>
      </Container>
    </form>
  );
}

export default Profile;
