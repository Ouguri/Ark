import type { AxiosResponse } from "axios";
import requestUser from "./request_user";
import type { Article } from "@/libcommon/index";

// 登录接口
export const signIn = async (signin_data: any): Promise<AxiosResponse> =>
  await requestUser({ url: `/user/signin`, method: "post", data: signin_data });

// 注册接口
export const signUp = async (signup_data: any): Promise<AxiosResponse> =>
  await requestUser({ url: `/user/signup`, method: "post", data: signup_data });

// 新增文章接口
export const createArticle = async (
  Article_data: Article
): Promise<AxiosResponse> =>
  await requestUser({ url: `/articles`, method: "post", data: Article_data });

// 搜索获取文章接口
export const fetchArticle = async (
  searchdata: string
): Promise<AxiosResponse> =>
  await requestUser({
    url: `/articles/search`,
    method: "get",
    params: searchdata,
  });

// 进入文章的接口
export const fetchAnArticle = async (id: string): Promise<AxiosResponse> => {
  return await requestUser({ url: `/articles/getone?id=${id}`, method: "get" });
  // return await requestUser({
  //   url: `/articles/getone`,
  //   params: id,
  //   method: "get",
  // });
};
