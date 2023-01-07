<template>
  <div class="bg-white h-screen">
    <div class="flex items-center p-3">
      <input
        class="border-none p-6 text-black text-4xl w-screen outline-none"
        placeholder="请输入标题..."
        type="text"
        v-model="articleData.title"
      />
    </div>
    <v-md-editor v-model="articleData.content" height="89%"></v-md-editor>
    <div class="py-1 px-6 float-right">
      <el-button type="primary" @click="saveArticle">保存并发布</el-button>
      <el-button>保存至个人</el-button>
      <router-link to="/"><el-button>取消</el-button></router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { articleStore } from "@/stores/article";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import type { Article } from "@/libcommon";

const router = useRouter();
const useArticleStore = articleStore();

const articleData = reactive<Article>({
  content: "请输入文章的内容...",
  title: "123",
});

const saveArticle = async () => {
  const res = await useArticleStore.saveArticle(articleData);

  if (res.status == 200) {
    ElMessage({ message: "保存成功", type: "success" });
    // router.push(`/article/${res.data.id}`);
    router.push({
      name: "article",
      params: { id: res.data.id },
    });
  } else {
    ElMessage({ message: "保存失败，请稍后重试！", type: "error" });
  }
};
</script>

<style scoped></style>
