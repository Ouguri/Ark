<template>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 使用环境变量
console.log(import.meta.env.VITE_API);
</script>

<style lang="scss" scoped></style>
