<template>
  <NavGloal></NavGloal>
  <div class="article_box">
    <div class="article_box_left">
      <div class="article_box_left_link">
        <div
          v-for="(anchor, index) in titles"
          :key="index"
          style="padding: 10px; color: black"
          @click="handleAnchorClick(anchor.lineIndex)"
        >
          <a style="cursor: pointer; color: black">{{ anchor.title }}</a>
        </div>
      </div>
    </div>
    <div class="article_box_middle">
      <v-md-preview
        :text="content"
        ref="preview"
        class="article_box_middle_text"
      ></v-md-preview>
    </div>
  </div>
</template>

<script setup lang="ts">
import { articleStore } from "@/stores/article";
import { onMounted, ref, reactive, nextTick } from "vue";
const useArticleStore = articleStore();

const content = ref<string>("");
const preview = ref();
const titles = reactive<any>([]);

onMounted(async () => {
  content.value = await useArticleStore.$state.article;
  await nextTick();

  const anchors = preview.value.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");

  const hTags = [
    ...new Set([...anchors].map((title: HTMLHeadingElement) => title.tagName)),
  ].sort();

  [...anchors].forEach((el: HTMLHeadingElement) =>
    titles.push({
      title: el.innerText,
      lineIndex: el.getAttribute("data-v-md-line"),
      indent: hTags.indexOf(el.tagName),
    })
  );
});

const handleAnchorClick = (lineIndex: number): void => {
  const heading = preview.value.$el.querySelector(
    `[data-v-md-line="${lineIndex}"]`
  );

  if (heading) heading.scrollIntoView({ behavior: "smooth" });
};
</script>

<style lang="scss" scoped>
.article_box {
  width: 114rem;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  &_left {
    display: flex;
    justify-content: center;
    &_link {
      border: 1px solid black;
    }
  }
  &_middle {
    width: 85rem;
    border: 1px solid black;
    &_text {
      padding: 0 10rem;
    }
  }
}
</style>
