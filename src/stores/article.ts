// 文章处理仓库
import { defineStore } from "pinia";
import { Names } from "./store_name";

export const articleStore = defineStore(Names.articleStore, {
  state: () => {
    return {
      article: "214444444444444",
    };
  },

  getters: {},

  actions: {
    async saveArticle(article_data: any) {
      this.article = article_data;
      // 发起 axios 请求传到后端
      const result = "保存成功";
      return result;
    },
  },
});
