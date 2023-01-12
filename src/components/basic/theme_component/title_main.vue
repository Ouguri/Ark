<template>
  <div class="container">
    <h2>
      <slot> 佳作推荐 </slot>
    </h2>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
  color: $light_font_color;
  margin-top: 6rem;
  h2 {
    font-size: $title_font_size;
    margin: 2rem 0;
    user-select: none;
  }
}
</style>
