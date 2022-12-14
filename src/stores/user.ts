// 用户数据仓库，这里是用户个人信息，文章等的处理中心
import type { User } from "@/libcommon";
import { defineStore } from "pinia";
import { Names } from "./store_name";
import { saveToken } from "@/utils/savetoken";
import { signIn, signUp } from "@/api/index";
import type { AxiosResponse } from "axios";

export const userStore = defineStore(Names.userStore, {
  state: () => {
    return {
      user: <User>{},
    };
  },

  getters: {},

  actions: {
    // 登录
    async userSignIn(signin_data: User): Promise<AxiosResponse> {
      const result = await signIn(signin_data);
      this.user.token = result.data;
      saveToken(result.data);
      this.user.username = signin_data.username;
      return result;
    },

    // 注册
    async userSignUp(signup_data: User): Promise<AxiosResponse> {
      const result = await signUp(signup_data);
      return result;
    },
  },
});
