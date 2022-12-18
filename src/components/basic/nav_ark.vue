<template>
  <nav class="nav">
    <div class="nav_ark_logo">
      <img src="" alt="" />
    </div>
    <ul class="nav_ul">
      <li class="nav_ul_select">
        <router-link to="">论坛</router-link>
      </li>
      <li class="nav_ul_select">
        <router-link to="">精选</router-link>
      </li>
      <li class="nav_ul_select">
        <router-link to="">个人中心</router-link>
      </li>
      <li class="nav_ul_select">
        <RouterLink to="/login">加入我们</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
$main-background-color: rgb(17, 17, 17, 0.5);
$primary-font-color: rgb(240, 240, 240);
.nav {
  z-index: 1;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 7rem;
  background: $main-background-color;

  &_ul {
    display: flex;
    align-items: center;
    padding-left: 4rem;
    &_select {
      padding-left: 3rem;
      color: $primary-font-color;
      font-size: 1.6rem;
    }
  }
}
</style>
