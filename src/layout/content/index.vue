<template>
  <div class="content">
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
.content {
  width: $main_page_width;
  margin: 4rem auto;
}
</style>
