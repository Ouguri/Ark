<template>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
// 使用环境变量
console.log(import.meta.env.VITE_API);
</script>

<style scoped></style>
