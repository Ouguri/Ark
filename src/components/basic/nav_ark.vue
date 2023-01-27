<template>
  <nav class="nav">
    <div class="nav_ark_logo">
      <router-link to="/">
        <img src="../../assets/images/logo/logo-green-small-2x.png" alt="" />
      </router-link>
      <ul class="nav_ul">
        <li class="nav_ul_select">
          <router-link to="/search">精选</router-link>
        </li>
        <li class="nav_ul_select">
          <router-link to="/">留言</router-link>
        </li>
        <li class="nav_ul_select">
          <div class="search_box">
            <input
              type="text"
              v-model="searchData"
              @focus="searchData = ``"
              @blur="searchData = `测试`"
            />
            <button class="search_box_icon" @click="searchContent">
              <i-ep-search style="font-size: 1.5rem" />
            </button>
            <div class="overlay"></div>
          </div>
        </li>
      </ul>
    </div>

    <!-- active-text="黑夜"
    inactive-text="白天" -->
    <div class="nav_right">
      <span><el-switch v-model="isDarkTheme" @change="history_theme" /></span>
      <span
        v-if="useUserStore.status"
        @click="exitLogin"
        class="cursor-pointer exit"
        >EXIT LINK</span
      >
      <span v-else><RouterLink to="/login">JOIN US</RouterLink></span>
      <router-link :to="`/platform/${username}`">
        <HeaderImg
          size="4.3rem"
          tran-x="-1rem"
          text-tranx="1rem"
          :img="token ? avatar : `/nat-8.jpg`"
        >
          <template #yourName> &nbsp; </template>
        </HeaderImg>
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useTheme } from "@/hook/themeChange";
import { useSearch } from "@/hook/searchData";
import { setTheme, getTheme } from "@/utils/saveTheme";
import { onMounted, ref, inject } from "vue";
import { getUserAvater } from "@/hook/getAvatar";
import { userStore } from "@/stores/user";
import { getToken } from "@/utils/savetoken";
import { useRouter } from "vue-router";
import HeaderImg from "@/components/basic/theme_component/header_img.vue";

const useUserStore = userStore();
const router = useRouter();
const { isDarkTheme, changeTheme } = useTheme();
const { searchData, searchContent } = useSearch();
const { avatar, username, avatarGetStart, usernameGetStart } = getUserAvater();
const updateData = inject<Function>("reload") as Function;

const token = ref<string>("");

onMounted(() => {
  const themeData = getTheme();
  const change = !themeData;
  avatarGetStart();
  usernameGetStart();
  token.value = getToken() as string;
  if (themeData) isDarkTheme.value = change;
  changeTheme();
});

const history_theme = () => {
  isDarkTheme.value ? true : false;
  changeTheme();
  setTheme(isDarkTheme.value);
};

const exitLogin = () => {
  useUserStore.exitLogin();
  updateData();
  router.push("/ark");
};
</script>

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

  img {
    position: absolute;
    top: 45%;
    left: 1%;
    transform: translateY(-50%);
    width: 16rem;
  }

  &_ul {
    display: flex;
    padding-left: 22rem;
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
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    span {
      margin-left: 1.5rem;
      transform: translateX(2.5rem);
    }
  }
}

.search_box {
  width: 20rem;
  position: relative;
  bottom: 0.3rem;
  z-index: 999;

  &_icon {
    position: absolute;
    top: 22%;
    right: -6%;
    border: none;
    background-color: transparent;
    color: $light_font_color;

    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      transform: scale(1.08);
    }
  }

  input {
    width: 100%;
    height: 1rem;
    border-radius: 5px;
    outline: none;
    padding: 1rem;
    font-size: 0.5em;
    background-color: transparent;
    border: 1px solid $light_font_color;
    transition: all 0.2s;
    &:focus {
      background-color: #fff;
      color: $dark_font_color;
      border: 1px solid #fff;
    }
  }
  input:focus + .search_box_icon {
    color: $dark_font_color;
  }
}

.exit {
  color: $light_font_color;
}

.overlay {
  position: fixed;
  width: 100vw;
  height: 100vw;
  top: 0;
  left: 0;
  visibility: hidden;
  z-index: -1;
  transition: all 0.3s;
}

input:focus ~ .overlay {
  background-color: rgba(12, 12, 12, 0.7);
  visibility: visible;
}
</style>
