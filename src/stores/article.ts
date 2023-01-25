// 文章处理仓库
import { defineStore } from "pinia";
import { Names } from "./store_name";
import {
  createArticle,
  fetchArticle,
  fetchAnArticle,
  fetchPersonalArticle,
  deleteArticle,
  updateArticle,
} from "@/api";
import type { Article } from "@/libcommon/index";
import type { ANARTICLE, SEARCHARG } from "@/interface";
import { useDateFormat } from "@vueuse/shared";

export const articleStore = defineStore(Names.articleStore, {
  state: () => ({
    article_content: <ANARTICLE>{},
    update: <boolean>false,
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
      const res = await createArticle({ content, title, topic });
      return res;
    },

    async searchArticle(searchdata: SEARCHARG): Promise<any> {
      const res = await fetchArticle(searchdata);
      return res;
    },

    async searchPersonalArticle(searchdata: SEARCHARG): Promise<any> {
      const res = await fetchPersonalArticle(searchdata);
      return res;
    },

    async updateArticle(updateData: any, id: string) {
      await updateArticle(updateData, id);
    },

    async deleteArticle(id: string) {
      await deleteArticle(id);
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
