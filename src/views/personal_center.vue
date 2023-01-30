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
          :default-active="currentPath"
          text-color="#fff"
          @select="handleSelect"
        >
          <router-link :to="{ name: 'personindex' }">
            <el-menu-item :index="useUserStore.user.username">
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
              <router-link :to="{ name: 'articleManager' }">
                <el-menu-item :index="`${useUserStore.user.username}/articles`"
                  >个人文章</el-menu-item
                >
              </router-link>
              <el-menu-item :index="`${useUserStore.user.username}/store`"
                >个人收藏</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>
          <router-link :to="{ name: 'commentManager' }">
            <el-menu-item :index="`${useUserStore.user.username}/comments`">
              <el-icon><document /></el-icon>
              <span>评论管理</span>
            </el-menu-item>
          </router-link>
          <el-menu-item :index="`${useUserStore.user.username}/follows`">
            <el-icon><document /></el-icon>
            <span>关注列表</span>
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
import { userStore } from "@/stores/user";
import { onMounted, onUnmounted, ref } from "vue";

const useUserStore = userStore();

const currentPath = ref<string | null>("");

onMounted(() => {
  currentPath.value =
    sessionStorage.getItem("historyPath") ?? useUserStore.user.username;
});

onUnmounted(() => {
  sessionStorage.removeItem("historyPath");
});

const handleSelect = (index: string) => {
  sessionStorage.setItem("historyPath", index);
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
