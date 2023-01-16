<template>
  <div class="content">
    <WhatArk></WhatArk>
    <ShowUser></ShowUser>
    <ShowWrite></ShowWrite>
    <AuthorSay></AuthorSay>
  </div>
</template>

<script setup lang="ts">
import WhatArk from "@/components/basic/main_page/main_first_part.vue";
import ShowUser from "@/components/basic/main_page/main_second_part.vue";
import ShowWrite from "@/components/basic/main_page/main_third_part.vue";
import AuthorSay from "@/components/basic/main_page/main_fourth_part.vue";
</script>

<style lang="scss" scoped>
.content {
  width: $main_page_width;
  margin: 4rem auto;
}
</style>
