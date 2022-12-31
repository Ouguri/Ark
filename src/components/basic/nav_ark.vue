<template>
  <nav class="nav">
    <div class="nav_ark_logo">
      <!-- <img src="" alt="" /> -->
      <ul class="nav_ul">
        <li class="nav_ul_select">
          <router-link to="/">首页</router-link>
        </li>
        <li class="nav_ul_select">
          <router-link to="">精选</router-link>
        </li>
        <li class="nav_ul_select">
          <router-link to="">个人中心</router-link>
        </li>
        <li class="nav_ul_select">
          <RouterLink to="markdown">写作</RouterLink>
        </li>
      </ul>
    </div>

    <div class="nav_right">
      <RouterLink to="/login">JOIN US</RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
$main-background-color: rgb(17, 17, 17, 0.5);
$primary-font-color: rgb(240, 240, 240);
.nav {
  z-index: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  transition: all 0.2s;
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 7rem;
  background: transparent;

  &_ul {
    display: flex;
    padding-left: 3rem;
    margin-top: 2.2rem;
    &_select {
      font-weight: 500;
      color: $primary-font-color;
      font-size: 1.6rem;
      &:not(:first-child) {
        padding-left: 3.5rem;
      }
    }
  }

  &_right {
    padding-right: 3.5rem;
    font-size: 1.6rem;
    margin-top: 2.2rem;
  }
}
</style>
