import { ThunkDispatch } from "redux-thunk";
import { State } from "./state";

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  passwordConfirm?: string;
  firstName: string;
  lastName: string;
}

export interface Login {
  accessToken: string;
  refreshToken: string;
  role: string;
}

interface LOGIN_START {
  type: "LOGIN_START";
}

interface LOGIN_SUCCESS {
  type: "LOGIN_SUCCESS";
}

interface LOGIN_ERROR {
  type: "LOGIN_ERROR";
  payload: string;
}

interface USER_START {
  type: "USER_START";
}

interface USER_SUCCESS {
  type: "USER_SUCCESS";
  payload: User;
}

interface USER_ERROR {
  type: "USER_ERROR";
  payload: string;
}

interface LOGOUT {
  type: "LOGOUT";
}

export type UserReducer = User & {
  isLogedIn: boolean;
};

export type UserAction =
  | LOGIN_START
  | LOGIN_SUCCESS
  | LOGIN_ERROR
  | LOGOUT
  | USER_START
  | USER_SUCCESS
  | USER_ERROR;

export type UserState = State<UserReducer>;

export type UserDispatch = ThunkDispatch<UserState, void, UserAction>;
