import { AxiosError } from "axios";
import { api } from "../../api/axios";
import { UserError } from "../../types/error";
import {
  Login,
  LoginForm,
  RefreshToken,
  User,
  UserDispatch,
} from "../../types/user";
import { removeToken, setToken } from "../../utils/token";

export const login = (creds: LoginForm) => async (dispatch: UserDispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const { data } = await api.post<Login>("/user/login", creds);
    setToken(data);
    dispatch({ type: "LOGIN_SUCCESS" });
    dispatch(userMe());
  } catch (error) {
    const err = error as AxiosError<UserError>;
    dispatch({
      type: "LOGIN_ERROR",
      payload: err.response?.data?.message ?? "Something went wrong",
    });
  }
};

export const logout = () => (dispatch: UserDispatch) => {
  removeToken();
  dispatch({ type: "LOGOUT" });
};

export const userMe = () => async (dispatch: UserDispatch) => {
  dispatch({ type: "USER_START" });
  try {
    const { data } = await api.get<User>("/user/me");
    dispatch({ type: "USER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "USER_ERROR" });
    dispatch(refreshToken());
  }
};

export const refreshToken = () => async (dispatch: UserDispatch) => {
  try {
    const { data } = await api.get<RefreshToken>("/user/token/refresh", {
      headers: {
        "refresh-token": localStorage.getItem("refresh-token"),
      },
    });
    setToken(data);
    dispatch(userMe());
  } catch (error) {
    removeToken();
    dispatch({ type: "REFRESH_TOKEN_ERROR" });
  }
};
