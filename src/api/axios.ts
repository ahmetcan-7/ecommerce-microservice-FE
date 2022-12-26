import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create();

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { origin } = new URL(process.env.REACT_APP_BASE_URL + config.url!);
    const allowedOrigins = [process.env.REACT_APP_BASE_URL];
    const token = localStorage.getItem("access-token");

    if (allowedOrigins.includes(origin)) {
      config.headers = config.headers ?? {};
      config.headers.authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
