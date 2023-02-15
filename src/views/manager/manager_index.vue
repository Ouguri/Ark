<template>
  <MainPageManager></MainPageManager>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
const MainPageManager = defineAsyncComponent(
  () => import("@/layout_platform/content/manager_index_com.vue")
);
</script>

<style scoped></style>
