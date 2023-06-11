import { ProfileForm } from "../types/profile";
import { Login, UserCredentials } from "../types/user";
import { api } from "./axios";

const getUserById = async (customerId: string) => {
  const { data } = await api.get<UserCredentials>(
    `/user/getById/${customerId}`
  );
  return data;
};

const resetPassword = async (gmail: string) => {
  const { data } = await api.get<UserCredentials>(
    `/user/resetpassword/${gmail}`
  );

  return data;
};

const updateUser = async (profile: ProfileForm) => {
  const { data } = await api.put<Login>(`/user/update`, profile);
  return data;
};

export const UserApi = {
  getUserById,
  resetPassword,
  updateUser,
};
