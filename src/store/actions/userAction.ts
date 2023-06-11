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
import { ProfileForm, ProfileImage } from "../../types/profile";

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
    const err = error as AxiosError<UserError>;
    if (err.response?.status === 403) {
      dispatch({ type: "USER_ERROR" });
      dispatch(refreshToken());
    }
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
    const err = error as AxiosError<UserError>;
    if (err.response?.status === 403) {
      removeToken();
      dispatch({ type: "REFRESH_TOKEN_ERROR" });
    }
  }
};

export const updateProfile =
  (res: Login, user: ProfileForm) => async (dispatch: UserDispatch) => {
    setToken(res);
    dispatch({ type: "UPDATE_PROFILE", payload: user });
  };

export const updateProfileImage =
  (profileImage: ProfileImage) => async (dispatch: UserDispatch) => {
    dispatch({ type: "UPDATE_PROFILE_IMAGE", payload: profileImage });
  };
