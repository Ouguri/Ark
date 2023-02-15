<template>
  <Suspense>
    <template #default>
      <FollowsManager></FollowsManager>
    </template>
    <template #fallback>
      <div>loading...</div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
const FollowsManager = defineAsyncComponent(
  () => import("@/layout_platform/content/manager_follow_com.vue")
);
</script>

<style scoped></style>
