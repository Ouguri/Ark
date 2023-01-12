// 主题页面仓库，需实现页面的主题颜色切换
import { defineStore } from "pinia";
import { Names } from "./store_name";

export const themeStore = defineStore(Names.userStore, {
  state: () => {
    return {
      themeModule: false,
    };
  },

  actions: {
    themeControl(): void {},
  },

  getters: {},
});
