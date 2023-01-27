<template>
  <Suspense>
    <template #default>
      <ArticleManager></ArticleManager>
    </template>
    <template #fallback>
      <div>loading...</div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
const ArticleManager = defineAsyncComponent(
  () => import("@/layout_platform/content/manager_comments_com.vue")
);
</script>

<style scoped></style>
