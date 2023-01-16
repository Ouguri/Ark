<template>
  <NavGloal class="nav_position_open"></NavGloal>
  <div class="container_box">
    <Suspense>
      <template #default>
        <AriclePart></AriclePart>
      </template>
      <template #fallback>
        <div>loading</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const AriclePart = defineAsyncComponent(
  () => import("@/components/basic/article_page/article_part.vue")
);
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixins.scss";

.container_box {
  @include page_width;
}

.nav_position_open {
  position: relative;
  background-color: $background_color_dark !important;
  box-shadow: 0px 0.2rem 1.9rem rgb(0, 0, 0);
}
</style>
