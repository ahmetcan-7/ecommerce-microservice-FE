import { UserCredentials } from "../types/user";
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

export const UserApi = {
  getUserById,
  resetPassword,
};
