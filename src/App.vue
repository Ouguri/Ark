<template>
  <div>
    <RouterView v-if="isAlive"></RouterView>
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

<style lang="scss" scoped></style>
