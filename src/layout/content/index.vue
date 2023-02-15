<template>
  <div class="content">
    <FirstPart></FirstPart>
    <SecondPart></SecondPart>
    <ThirdPart></ThirdPart>
    <FourthPart></FourthPart>
  </div>
</template>

<script setup lang="ts">
import FirstPart from "@/components/basic/main_page/main_first_part.vue";
import SecondPart from "@/components/basic/main_page/main_second_part.vue";
import ThirdPart from "@/components/basic/main_page/main_third_part.vue";
import FourthPart from "@/components/basic/main_page/main_fourth_part.vue";
</script>

<style lang="scss" scoped>
.content {
  width: $main_page_width;
  margin: 4rem auto;
}
</style>
