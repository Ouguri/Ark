<template>
  <div class="header">
    <div class="header_content">
      <video src="../../assets/videos/ark_bg.mp4" autoplay loop muted></video>
      <div class="overlay"></div>

      <div class="header_content_title">
        <h2>你好，欢迎来到“Ark”！</h2>
        <h3>在这里，记录你的生活</h3>
        <h3>分享你的旅程 ......</h3>
        <div class="search_box">
          <input placeholder="Search" type="text" />
          <button class="search_box_icon">
            <i-ep-search style="font-size: 2.4rem" />
          </button>
        </div>
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
      color: $light_font_color;
      position: absolute;
      top: 0;
      left: 0;
    }

    &_title {
      position: absolute;
      top: 30%;
      padding-left: 25rem;
      color: $light_font_color;
      text-shadow: $shadow_font;
      h2 {
        font-size: $h2_font_size;
        margin-bottom: calc($title_margin_top + 1.2rem);
      }
      h3 {
        font-size: $h3_font_size;
        margin-top: $title_margin_top;
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

.search_box {
  margin-top: 2rem;
  width: 40rem;
  position: relative;

  input {
    width: 100%;
    height: 2rem;
    border-radius: 5px;
    border: none;
    outline: none;
    padding: 2rem;
    font-size: 1.6rem;
    color: $dark_font_color;
  }

  &_icon {
    position: absolute;
    top: 28%;
    right: -5%;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      transform: scale(1.08);
    }
  }
}
</style>
