<template>
  <div class="container">
    <TitleMain>文章分类</TitleMain>
    <div class="container_box">
      <div class="container_box_type">
        <img src="../../../assets/images/main_img/code.jpg" alt="" />
        <router-link to="#"><span>技术</span></router-link>
        <div></div>
      </div>
      <div class="container_box_type">
        <img src="../../../assets/images/main_img/food.jpg" alt="" />
        <router-link to="#"><span>美食</span></router-link>
      </div>
      <div class="container_box_type">
        <img src="../../../assets/images/main_img/lived.jpg" alt="" />
        <router-link to="#"><span>生活</span></router-link>
      </div>
      <div class="container_box_type">
        <img src="../../../assets/images/main_img/game.jpg" alt="" />
        <router-link to="#"><span>游戏</span></router-link>
      </div>
      <div class="container_box_type">
        <img src="../../../assets/images/main_img/trip.jpg" alt="" />
        <router-link to="#"><span>旅行</span></router-link>
      </div>
      <div class="container_box_type">
        <img src="../../../assets/images/main_img/winter.jpg" alt="" />
        <router-link to="#"><span>季节</span></router-link>
      </div>
      <div class="container_box_type">
        <img src="../../../assets/images/main_img/cartoon.jpg" alt="" />
        <router-link to="#"><span>动漫</span></router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleMain from "../theme_component/title_main.vue";
</script>

<style lang="scss" scoped>
.container {
  color: $light_font_color;
  &_box {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -1rem;
    width: 100%;
    &_type {
      position: relative;
      max-width: 33.333%;
      margin: 1rem;
      height: 20rem;
      background-color: rgb(13, 13, 14);
      flex: 1 1 20%;
      border-radius: 2px;
      overflow: hidden;
      cursor: pointer;
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3) {
        height: 25rem;
        flex: 1 1 25%;
      }

      img {
        width: 100%;
        height: 100%;
        opacity: 0.8;
        transition: all 0.3s;

        &:hover {
          opacity: 0.5;
        }
      }

      span {
        position: absolute;
        font-size: 2rem;
        font-weight: 600;
        letter-spacing: 6px;
        color: rgb(253, 253, 253);
        left: 50%;
        top: 50%;
        transform: translate(-50%, -48%);
        text-shadow: $shadow_font;
      }
    }
  }
}
</style>
