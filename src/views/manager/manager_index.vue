<template>
  <IndexPage></IndexPage>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
const IndexPage = defineAsyncComponent(
  () => import("@/layout_platform/content/indexpage.vue")
);
</script>

<style scoped></style>
