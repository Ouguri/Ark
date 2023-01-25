import { defineStore } from "pinia";
import { Names } from "./store_name";
import { createComment, fetchComments, deleteComments } from "@/api/index";

export const useCommentStore = defineStore(Names.commentStore, {
  state: () => ({
    commentList: <any[]>[],
  }),

  getters: {},

  actions: {
    async getCommentList(articleID: string): Promise<any> {
      try {
        const res = await fetchComments(articleID);
        if (res.status == 200) {
          this.commentList = res.data;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async addComment(data: any): Promise<any> {
      try {
        const res = await createComment(data);
        return res;
      } catch (error) {
        console.log(error);
      }
    },

    async deletComment(id: string, commentID: string[]): Promise<any> {
      try {
        const data = {
          articleID: id,
          id: commentID,
        };
        const res = await deleteComments(data);
        return res;
      } catch (error) {
        console.log("删除失败", error);
      }
    },
  },
});
