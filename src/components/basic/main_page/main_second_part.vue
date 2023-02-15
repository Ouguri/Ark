<template>
  <div class="container">
    <TitleMain>特别呈现</TitleMain>
    <div class="flex justify-center c_box">
      <Suspense>
        <template #default>
          <Carousel :item="carouselItem"></Carousel>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, inject, computed } from "vue";
import TitleMain from "../theme_component/title_main.vue";
const Carousel = defineAsyncComponent(
  () => import("@/components/basic/Carousel.vue")
);

const indexData: any = inject("indexData");

const carouselItem = computed(() => indexData.carouselData);
</script>

<style lang="scss" scoped></style>
