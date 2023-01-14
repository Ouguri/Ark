// 文章处理仓库
import { defineStore } from "pinia";
import { Names } from "./store_name";
import { createArticle, fetchArticle, fetchAnArticle } from "@/api";
import type { Article } from "@/libcommon/index";
import type { AxiosResponse } from "axios";

export const articleStore = defineStore(Names.articleStore, {
  state: () => {
    return {
      article: "214444444444444",
      title: "",
      topic: "",
    };
  },

  getters: {},

  actions: {
    async saveArticle(articleData: Article) {
      const { content, title, topic = "nestjs" } = articleData;
      this.article = content;
      this.title = title;
      this.topic = topic;
      // 发起 axios 请求传到后端
      const res = await createArticle({ content, title, topic });
      return res;
    },

    async searchArticle(searchdata: string): Promise<any> {
      const res = await fetchArticle(searchdata);

      return res;
    },

    async enterArticle(id: string): Promise<any> {
      const res = await fetchAnArticle(id);

      if (res.status == 200) {
        return res.data;
      } else {
        return "没有该文章的信息呢。。";
      }
    },
  },
});
