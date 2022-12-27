import { UserAction, User, UserState, UserReducer } from "../../types/user";

const defaultState: UserState = {
  data: {} as UserReducer,
  loading: false,
  error: "",
};

const userReducer = (state: UserState = defaultState, action: UserAction) => {
  switch (action.type) {
    case "LOGIN_START":
    case "USER_START":
      return { ...state, loading: true, error: "" };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        data: { ...state.data, isLogedIn: true } as UserReducer,
      };
    case "USER_SUCCESS":
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          ...action.payload,
          isLogedIn: true,
        } as UserReducer,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: { isLogedIn: false } as UserReducer,
      };
    case "USER_ERROR":
      return {
        ...state,
        loading: false,
      };
    case "REFRESH_TOKEN_ERROR":
      return {
        ...state,
        loading: false,
        data: {
          isLogedIn: false,
        } as UserReducer,
      };
    case "LOGOUT":
      return { ...state, data: { isLogedIn: false } as UserReducer };
    default:
      return state;
  }
};

export default userReducer;
