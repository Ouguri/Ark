<template>
  <NavGloal class="nav_position_open"></NavGloal>
  <div class="flex">
    <el-row class="tac text-center w-80" style="min-width: 20rem">
      <el-col class="menu min-w-full" :span="12">
        <div class="py-7">
          <RouterLink to="/markdown">
            <button class="menu-btn px-8 py-4">开始创作</button>
          </RouterLink>
        </div>
        <el-menu
          active-text-color="rgb(106,210,120)"
          background-color="rgb(23, 23, 25)"
          class="el-menu-vertical-demo w-full menu-ark overflow-hidden"
          default-active="1"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
        >
          <router-link :to="{ name: 'personindex' }">
            <el-menu-item index="1">
              <el-icon><icon-menu /></el-icon>
              <span>个人主页</span>
            </el-menu-item>
          </router-link>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><location /></el-icon>
              <span>文章管理</span>
            </template>
            <el-menu-item-group>
              <router-link :to="{ name: 'articles' }">
                <el-menu-item index="2-1">个人文章</el-menu-item>
              </router-link>
              <el-menu-item index="2-2">个人收藏</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="3">
            <router-link :to="{ name: 'comments' }">
              <el-icon><document /></el-icon>
              <span>评论管理</span>
            </router-link>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <div class="px-36 py-8 w-full">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Document, Menu as IconMenu, Location } from "@element-plus/icons-vue";
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixins.scss";

.menu {
  background-color: rgb(23, 23, 25);
  height: calc(100vh - 7rem);
  border-right: 1px solid rgb(75, 155, 96);
}
.menu-ark {
  border-style: none;
}

.menu-btn {
  @include btn_basic;
  &:hover {
    background-position: 50%;
  }
}

.nav_position_open {
  position: relative;
  background-color: $background_color_dark !important;
  box-shadow: 0px 0.2rem 0.5rem rgb(0, 0, 0);
}
</style>
