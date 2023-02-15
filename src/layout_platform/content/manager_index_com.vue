<template>
  <div>
    <h1 class="mb-8">欢迎您！超级管理员：{{ useUserStore.user.username }}</h1>
    <div class="managertable">
      <div>
        <h2>宣传语</h2>
        {{ data?.indexTitleText }}
      </div>
      <div>
        <h2>首页视频</h2>
        <carousel_change class="flex mt-8"></carousel_change>
      </div>
      <div>
        <h2>首页轮播图</h2>
        <div class="mt-8 flex justify-between items-center">
          <carousel_change
            class="upload_select"
            @on-updateMsg="carouselUpdate"
          ></carousel_change>
          <i-ep-caretRight class="arrow_right" />
          <Suspense>
            <template #default>
              <Carousel :item="toRaw(data.carouselData)"></Carousel>
            </template>
            <template #fallback> loading.. </template>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userStore } from "@/stores/user";
import carousel_change from "@/components/basic/theme_component/carousel_change.vue";
import { defineAsyncComponent, reactive, toRaw } from "vue";
import type { CAROUSEL } from "@/interface";

const Carousel = defineAsyncComponent(
  () => import("@/components/basic/Carousel.vue")
);

const useUserStore = userStore();

const indexData = JSON.parse(sessionStorage.getItem("indexData") as string);
const data = reactive<CAROUSEL>({});

Object.assign(data, indexData);

const carouselUpdate = (newData: any) => {
  Object.assign(data, newData);
};
</script>

<style lang="scss" scoped>
.managertable {
  display: flex;
  flex-direction: column;
  div {
    margin-bottom: 2rem;
  }
}

.arrow_right {
  font-size: 10rem;
  margin-bottom: 1rem;
  position: relative;
  transition: 0.4s all;
  // &:hover {
  //   transform: scale(1.2) translateX(1rem);
  // }
}

.upload_select:hover ~ .arrow_right {
  transform: scale(1.2) translateX(1rem);
}
</style>
