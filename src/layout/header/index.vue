<template>
  <div>
    <NavGloal></NavGloal>
    <div class="header_content">
      <img
        src="@/assets/images/bg/ark_background.jpg"
        alt=""
        class="header_content_background"
      />

      <div class="header_content_title">
        <div>这里要放置一个头像</div>
        <h2>你好，欢迎来到“Ark”！</h2>
        <h3>在这里，记录你的生活</h3>
        <h3>分享你的旅程 ......</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
.header_content {
  &_background {
    width: 100%;
    max-height: 100vh;
    position: relative;
  }

  &_user {
    color: $dark_font_color;
    position: absolute;
    top: 0;
    left: 0;
  }

  &_title {
    position: absolute;
    top: 45%;
    padding-left: 12rem;
    color: $dark_font_color;
    text-shadow: $shadow_font;
    h2 {
      font-size: $h2_font_size;
      margin-bottom: 2rem;
    }
    h3 {
      font-size: $h3_font_size;
      margin-top: 0.8rem;
    }
  }
}
</style>
