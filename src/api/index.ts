import type { AxiosResponse } from "axios";
import requestUser from "./request_user";

// 登录接口
export const signIn = async (signin_data: any): Promise<AxiosResponse> =>
  await requestUser({ url: `/user/signin`, method: "post", data: signin_data });

// 注册接口
export const signUp = async (signup_data: any): Promise<AxiosResponse> =>
  await requestUser({ url: `/user/signup`, method: "post", data: signup_data });
