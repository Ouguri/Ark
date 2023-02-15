import type { AxiosResponse } from "axios";
import requestUser from "./request_user";
import type { Article } from "@/libcommon/index";
import type { SEARCHARG } from "@/interface";

// 登录接口
export const signIn = async (signin_data: any): Promise<AxiosResponse> =>
  await requestUser({ url: `/user/signin`, method: "post", data: signin_data });

// 注册接口
export const signUp = async (signup_data: any): Promise<AxiosResponse> =>
  await requestUser({ url: `/user/signup`, method: "post", data: signup_data });

// 查看用户中心
export const fetchUserCenter = async (username: string) =>
  await requestUser({
    url: `/user/${username}`,
    method: "get",
  });

// 新增文章接口
export const createArticle = async (
  Article_data: Article
): Promise<AxiosResponse> =>
  await requestUser({ url: `/articles`, method: "post", data: Article_data });

// 搜索获取文章接口
export const fetchArticle = async (
  searchdata: SEARCHARG
): Promise<AxiosResponse> =>
  await requestUser({
    url: `/articles/search`,
    method: "get",
    params: searchdata,
  });

// 搜索当前用户文章
export const fetchPersonalArticle = async (
  searchdata: SEARCHARG
): Promise<AxiosResponse> =>
  await requestUser({
    url: `/articles/personsearch`,
    method: "get",
    params: searchdata,
  });

// 更新文章接口
export const updateArticle = async (updateData: any, id: string) => {
  return await requestUser({
    url: `/articles?id=${id}`,
    method: "patch",
    data: updateData,
  });
};

// 上传文章图片接口
export const uploadArticleImg = async (file: FormData) => {
  return await requestUser({
    url: `/articles/articleimgs`,
    method: "post",
    data: file,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 删除文章接口
export const deleteArticle = async (id: string) =>
  await requestUser({
    url: `/articles/${id}`,
    method: "delete",
  });

// 进入文章的接口
export const fetchAnArticle = async (id: string): Promise<AxiosResponse> => {
  return await requestUser({ url: `/articles/getone?id=${id}`, method: "get" });
};

// 评论接口
export const createComment = async (data: any): Promise<AxiosResponse> => {
  return await requestUser({ url: `/comment`, method: "post", data });
};

// 获取评论接口
export const fetchComments = async (
  articleID: string
): Promise<AxiosResponse> => {
  return await requestUser({
    url: `/comment?articleID=${articleID}`,
    method: "get",
  });
};

// 点赞和回复
export const replyAndGoodsComment = async (
  data: any
): Promise<AxiosResponse> => {
  return await requestUser({
    url: `/comment/update`,
    method: "post",
    data,
  });
};

// 删除评论
export const deleteComments = async (data: any) => {
  return await requestUser({
    url: `/comment`,
    method: "delete",
    data,
  });
};

// 更新用户信息（关注、点赞）
export const updateByOther = async (updateData: any) => {
  return await requestUser({
    url: `/user`,
    method: "patch",
    data: updateData,
  });
};

// 获取关注列表
export const fetchUserFollowList = async (searchdata: any) => {
  return await requestUser({
    url: `/user/follow`,
    method: "post",
    data: searchdata,
  });
};

// 获取主页信息
export const fetchIndexData = async (name: string) => {
  return await requestUser({
    url: `/managerindex`,
    method: "get",
    params: { name },
  });
};
