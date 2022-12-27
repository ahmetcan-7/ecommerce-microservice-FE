import { Token } from "../types/user";

export const setToken = (token: Token) => {
  localStorage.setItem("access-token", "Bearer " + token.accessToken);
  localStorage.setItem("refresh-token", "Bearer " + token.refreshToken);
};

export const removeToken = () => {
  localStorage.removeItem("access-token");
  localStorage.removeItem("refresh-token");
};
