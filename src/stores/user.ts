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

  persist: true,

  getters: {},

  actions: {
    // 登录
    async userSignIn(signin_data: User): Promise<AxiosResponse> {
      const result = await signIn(signin_data);
      const { avatar, username, level, superAdmin, id } = result.data.user;
      this.user.token = result.data.accessToken;
      this.user.avatar = avatar;
      this.user.username = username;
      this.user.level = level;
      this.user.superAdmin = superAdmin;
      this.user.id = id;

      console.log(id);

      saveToken(result.data.accessToken);
      return result;
    },

    // 注册
    async userSignUp(signup_data: User): Promise<AxiosResponse> {
      const result = await signUp(signup_data);
      return result;
    },
  },
});
