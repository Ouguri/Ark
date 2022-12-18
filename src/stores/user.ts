// 用户数据仓库，这里是用户个人信息，文章等的处理中心
import { defineStore } from "pinia";
import { Names } from "./store_name";

interface userDatas {
  username: string;
  password: string;
}

const useStore = defineStore(Names.userStore, {
  state: () => {
    return {
      user: <userDatas>{},
    };
  },

  getters: {},

  actions: {},
});
