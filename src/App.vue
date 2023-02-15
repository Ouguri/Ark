<template>
  <div>
    <Suspense>
      <template #default>
        <RouterView v-if="isAlive"></RouterView>
      </template>
      <template #fallback> loading... </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, provide } from "vue";

// 使用环境变量
console.log(import.meta.env.VITE_API);
const isAlive = ref<boolean>(true);
const reload = () => {
  isAlive.value = false;
  nextTick(() => {
    isAlive.value = true;
  });
};

provide("reload", reload);
</script>

<style lang="scss" scoped>
:deep(.el-dialog.is-align-center) {
  background-color: #141414 !important;
}
:deep(.el-dialog__body) {
  color: #fff !important;
}
:deep(.el-dialog__title) {
  color: #fff !important;
}
</style>
