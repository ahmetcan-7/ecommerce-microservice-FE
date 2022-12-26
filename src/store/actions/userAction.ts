import { Axios, AxiosError } from "axios";
import { api } from "../../api/axios";
import { UserError } from "../../types/error";
import {
  Login,
  LoginForm,
  RegisterForm,
  User,
  UserDispatch,
} from "../../types/user";

export const login = (creds: LoginForm) => async (dispatch: UserDispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const { data } = await api.post<Login>("/user/login", creds);
    localStorage.setItem("access-token", "Bearer " + data.accessToken);
    localStorage.setItem("refresh-token", "Bearer " + data.refreshToken);
    dispatch({ type: "LOGIN_SUCCESS" });
  } catch (error) {
    const err = error as AxiosError<UserError>;
    dispatch({
      type: "LOGIN_ERROR",
      payload: err.response?.data?.message ?? "Something went wrong",
    });
  }
};

export const logout = () => (dispatch: UserDispatch) => {
  localStorage.removeItem("access-token");
  localStorage.removeItem("refresh-token");
  dispatch({ type: "LOGOUT" });
};

export const userMe = () => async (dispatch: UserDispatch) => {
  dispatch({ type: "USER_START" });
  try {
    const { data } = await api.get<User>("/user/me");
    dispatch({ type: "USER_SUCCESS", payload: data });
  } catch (error) {
    const err = error as AxiosError<UserError>;
    dispatch({
      type: "USER_ERROR",
      payload: err.response?.data?.message ?? "Something went wrong",
    });
  }
};
