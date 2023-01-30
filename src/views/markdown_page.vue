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
    <v-md-editor
      v-model="articleData.content"
      left-toolbar="undo redo | image"
      :disabled-menus="[]"
      @upload-image="handleUploadImage"
      height="89%"
    ></v-md-editor>
    <div class="py-1 px-6 float-right">
      <el-button v-show="!isShow">保存至个人</el-button>
      <el-button v-show="!isShow" type="primary" @click="saveArticle"
        >保存</el-button
      >
      <el-button v-show="isShow" type="primary" @click="saveUpdate"
        >保存更新</el-button
      >
      <el-button @click="cancelEdit">取消</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { articleStore } from "@/stores/article";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import type { Article } from "@/libcommon";

const router = useRouter();
const useArticleStore = articleStore();
const isShow = ref<boolean>(false);

const articleData = reactive<Article>({
  content: "请输入文章的内容...",
  title: "",
  topic: "normal",
});

onMounted(async () => {
  isShow.value = await useArticleStore.update;
  if (isShow.value) {
    articleData.content = useArticleStore.article_content.content;
    articleData.title = useArticleStore.article_content.title;
    articleData.topic = useArticleStore.article_content.topic;
  } else {
    articleData.content = "请输入文章的内容...";
    articleData.title = "";
  }
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

const saveUpdate = async () => {
  const id = useArticleStore.article_content.id;
  await useArticleStore.updateArticle(articleData, id);
  router.push({
    name: "article",
    params: { id },
  });
};

const handleUploadImage = (_: any, insertImage: any, files: any) => {
  const formData = new FormData();
  formData.append("file", files[0]);

  useArticleStore.uploadArticleImg(formData).then((res) => {
    insertImage({
      url: `http://localhost:3000/articleimg/${res.data}`,
      desc: "ouguri",
      width: "auto",
      height: "auto",
    });
  });
};

const cancelEdit = () => {
  router.go(-1);
  useArticleStore.update = false;
};
</script>

<style lang="scss" scoped>
:deep(.vuepress-markdown-body) {
  p,
  li,
  ol {
    color: #2c3e50 !important;
  }
}
</style>
