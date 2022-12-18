<template>
  <div class="content">
    <h1>content</h1>
    <WhatArk></WhatArk>
    <ShowUser></ShowUser>
    <ShowWrite></ShowWrite>
    <AuthorSay></AuthorSay>
  </div>
</template>

<script setup lang="ts">
import WhatArk from "@/components/basic/main_page/what_is_ark.vue";
import ShowUser from "@/components/basic/main_page/show_user.vue";
import ShowWrite from "@/components/basic/main_page/show_write.vue";
import AuthorSay from "@/components/basic/main_page/author_saying.vue";
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
.content {
  width: $main_page_width;
  margin: 0 auto;
}
h1 {
  color: $dark_font_color;
}
</style>
