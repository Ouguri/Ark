<template>
  <NavGloal class="nav_position_open"></NavGloal>
  <div class="theme_box">
    <h1 class="text-7xl">搜索结果</h1>
    <div
      class="theme_box_content mt-12 p-8"
      v-for="item in showingData"
      :key="item"
      @click="goTOAnArticle(item)"
    >
      <div class="theme_box_content_search p-6 bg-slate-800">
        <div class="text-3xl font-bold">{{ item.title }}</div>
        <div class="mt-5 text-2xl text-neutral-400">
          {{ item.content }}
        </div>
        <div class="footer flex justify-between mt-5">
          <div class="footer_left">
            <span>
              <i-ep-star style="font-size: 2rem; vertical-align: bottom" />
              <span>{{ item.goods }}</span>
            </span>
            <span>
              <i-ep-comment style="font-size: 2rem; vertical-align: bottom" />
              <span>{{ item.comment }}</span>
            </span>
            <span>
              <i-ep-comment style="font-size: 2rem; vertical-align: bottom" />
              <span>{{ item.watchData }}</span>
            </span>
          </div>
          <div class="footer_right">
            <span>by: {{ item.username }}</span>
            <span>2022-11-14</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { articleStore } from "@/stores/article";
const useArticleStore = articleStore();

const Route = useRoute();
const showingData = ref<any>();

onMounted(async () => {
  const searchData = Route.query;
  // const res = await useArticleStore.searchArticle(searchData);
});

const goTOAnArticle = (item: any) => {};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixins.scss";
.theme_box {
  @include page_width;
  margin-top: 5rem;
  &_content {
    background-color: $article_bgc_color_dark;
    border-radius: 3px;
    min-height: 67vh;
    &_search {
      border-radius: 5px;
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }

  .footer {
    &_left,
    &_right {
      span {
        font-size: 1.5rem;
      }
      span:not(:last-child) {
        margin-right: 1.2rem;
      }
    }
  }
}
.nav_position_open {
  position: relative;
  background-color: $background_color_dark !important;
  box-shadow: 0px 0.2rem 1.9rem rgb(0, 0, 0);
}
</style>
