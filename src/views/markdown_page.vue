<template>
  <div style="background-color: #fff; height: 100vh">
    <v-md-editor v-model="content" height="96%"></v-md-editor>
    <div style="padding: 4px 14px; float: right">
      <el-button type="primary" @click="saveArticle">保存并发布</el-button>
      <el-button>保存至个人</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { articleStore } from "@/stores/article";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
const useArticleStore = articleStore();

let content = ref("test");

const saveArticle = async () => {
  const res = await useArticleStore.saveArticle(content.value);

  if (res == "保存成功") {
    ElMessage({ message: "保存成功", type: "success" });
    router.push("article");
  } else {
    ElMessage({ message: "保存成功", type: "error" });
  }
};
</script>

<style scoped></style>
