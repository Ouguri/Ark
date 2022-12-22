<template>
  <div class="header">
    <NavGloal></NavGloal>
    <div class="header_content">
      <video src="../../assets/videos/ark_bg.mp4" autoplay loop muted></video>
      <div class="overlay"></div>

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
.header {
  min-height: 85rem;
  &_content {
    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 85%;
      /* 让背景视频覆盖屏幕 */
      object-fit: cover;
      opacity: 0.8;
    }

    &_user {
      color: $dark_font_color;
      position: absolute;
      top: 0;
      left: 0;
    }

    &_title {
      position: absolute;
      top: 40%;
      padding-left: 25rem;
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
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 85%;
  background: rgb(62, 63, 63);
  /* 添加蒙版的效果 */
  mix-blend-mode: overlay;
}
</style>
