// 用户数据仓库，这里是用户个人信息，文章等的处理中心
import type { User } from "@/libcommon";
import { defineStore } from "pinia";
import { Names } from "./store_name";
import { saveToken, removeToken } from "@/utils/savetoken";
import {
  signIn,
  signUp,
  updateByOther,
  fetchUserFollowList,
  fetchUserCenter,
} from "@/api/index";
import type { AxiosResponse } from "axios";

export const userStore = defineStore(Names.userStore, {
  state: () => {
    return {
      user: <User>{},
      status: <boolean>false,
    };
  },

  persist: true,

  getters: {},

  actions: {
    // 登录
    async userSignIn(signin_data: User): Promise<AxiosResponse> {
      const result = await signIn(signin_data);
      this.user = result.data.user;
      this.status = true;

      saveToken(result.data.accessToken);
      return result;
    },

    // 退出登录
    exitLogin() {
      removeToken();
      this.user.VipEndDate = new Date();
      this.user.avatar = "/nat-8.jpg";
      this.user.username = "游客";
      this.user.level = 1;
      this.user.superAdmin = 0;
      this.user.id = "empty";
      this.user.articles = [];
      this.user.comments = [];
      this.user.follows = [];
      this.status = false;
    },

    // 注册
    async userSignUp(signup_data: User): Promise<AxiosResponse> {
      const result = await signUp(signup_data);
      return result;
    },

    // 点赞关注
    async updateByOther(updateData: any) {
      console.log(updateData);

      const result = await updateByOther(updateData);
      this.user.follows = result.data.follows;
      return result;
    },

    // 个人关注列表
    async searchPersonalFollow(searchdata: any): Promise<any> {
      const res = await fetchUserFollowList(searchdata);
      return res;
    },

    // 查看用户界面
    async enterUserCenter(username: string): Promise<any> {
      const res = await fetchUserCenter(username);
      return res;
    },
  },
});
