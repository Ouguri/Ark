<template>
  <div class="layout">
    <NavGloal class="nav_position"></NavGloal>
    <Header class="header_position"></Header>
    <Content class="content_position"></Content>
  </div>
</template>

<script setup lang="ts">
import Header from "@/layout/header/index.vue";
import Content from "@/layout/content/index.vue";
import { onMounted, nextTick, reactive, provide } from "vue";
import { fetchIndexData } from "@/api";

interface Data {
  carouselData?: string[];
  id?: number;
  indexTitleText?: string;
  indexVideo?: string;
  name?: string;
}

const data = reactive<Data>({});
const storedIndex = JSON.parse(sessionStorage.getItem("indexData") as string);

if (storedIndex) {
  Object.assign(data, storedIndex);
} else {
  const indexData = await fetchIndexData("default");
  Object.assign(data, indexData.data);
  sessionStorage.setItem("indexData", JSON.stringify(indexData.data));
}
console.log(data);

provide("indexData", data);

onMounted(async () => {
  await nextTick();
  const navEl = document.querySelector(".nav_position") as Element;
  const contentEl = document.querySelector(".content_position") as Element;

  const obsCallback = function (entries: any) {
    if (!entries[0].isIntersecting) navEl.classList.remove("nav_position_open");
    if (entries[0].isIntersecting) navEl.classList.add("nav_position_open");
  };
  const obsOptions = {
    root: null,
    threshold: [0.25],
  };
  const observer = new IntersectionObserver(obsCallback, obsOptions);
  observer.observe(contentEl);
});
</script>

<style lang="scss" scoped>
.layout {
}

.nav_position_open {
  background-color: $nav_color_dark !important;
  box-shadow: 0px 0px 1.4rem rgb(12, 12, 12);
}
</style>
