import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const requestUser = axios.create({
  baseURL: `http://localhost:3000/api/v1`,
  timeout: 5000,
});

requestUser.interceptors.request.use((config): AxiosRequestConfig => {
  return config;
});

// 响应拦截器
requestUser.interceptors.response.use(
  // success - callback
  (res): AxiosResponse => {
    return res.data;
  },
  // false - callback
  (error) => {
    return Promise.reject(new error("faile"));
  }
);

export default requestUser;
