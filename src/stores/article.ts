// 文章处理仓库
import { defineStore } from "pinia";
import { Names } from "./store_name";
import { createArticle, fetchArticle, fetchAnArticle } from "@/api";
import type { Article } from "@/libcommon/index";
import type { ANARTICLE } from "@/interface";
import { useDateFormat } from "@vueuse/shared";

export const articleStore = defineStore(Names.articleStore, {
  state: () => ({
    article_content: <ANARTICLE>{},
  }),

  getters: {
    formatDate(state) {
      return useDateFormat(state.article_content.date, "YYYY-MM-DD HH:mm:ss")
        .value;
    },
  },

  actions: {
    async saveArticle(articleData: Article) {
      const { content, title, topic = "nestjs" } = articleData;
      // 发起 axios 请求传到后端
      const res = await createArticle({ content, title, topic });
      return res;
    },

    async searchArticle(searchdata: string): Promise<any> {
      const res = await fetchArticle(searchdata);

      return res;
    },

    async enterArticle(id: string): Promise<void> {
      try {
        const res = await fetchAnArticle(id);
        if (res.status == 200) {
          this.article_content = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
