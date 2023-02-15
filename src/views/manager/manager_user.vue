<template>
  <div class="container">
    <Suspense>
      <template #default>
        <IndexPage></IndexPage>
      </template>
      <template #fallback>
        <span>Loading...</span>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
const IndexPage = defineAsyncComponent(
  () => import("@/layout_platform/content/indexpage.vue")
);
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  padding: 3rem 0;
}
.nav_position_open {
  position: relative;
  background-color: $background_color_dark !important;
  box-shadow: 0px 0.2rem 0.5rem rgb(0, 0, 0);
}
</style>
