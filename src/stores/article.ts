// 文章处理仓库
import { defineStore } from "pinia";
import { Names } from "./store_name";
import { createArticle } from "@/api";
import type { Article } from "@/libcommon/index";

export const articleStore = defineStore(Names.articleStore, {
  state: () => {
    return {
      article: "214444444444444",
      title: "",
    };
  },

  getters: {},

  actions: {
    async saveArticle(articleData: Article) {
      const { content, title, topic = "nestjs" } = articleData;
      this.article = content;
      this.title = title;
      // 发起 axios 请求传到后端
      const res = await createArticle({ content, title, topic });
      return res;
    },
  },
});
