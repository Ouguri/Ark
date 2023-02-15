<template>
  <div class="flex">
    <div class="flex flex-col" style="width: 35rem; margin-right: 4rem">
      <div class="relative">
        <div class="follower">{{ useUserStore.user.followers }}</div>
        <div class="star">empty</div>
        <HeaderImg
          size="28rem"
          tran-x="-5.6rem"
          text-tranx="0"
          :img="`http://localhost:3000/avatar/${userData?.avatar}`"
        >
        </HeaderImg>
      </div>
      <h2 class="text-3xl my-1">{{ userData?.username }}</h2>
      <div class="mt-2 w-full flex justify-between">
        <button
          class="menu-btn edit"
          @click="
            reward({
              followers: followStatus ? -1 : 1,
              username: userData?.username,
              avatar: userData?.avatar,
            })
          "
        >
          {{ followStatus ? `已关注` : `关注` }}
        </button>
      </div>
      <div class="mt-2">
        Lv 1：<el-progress :percentage="percentage" color="rgb(75, 155, 96)" />
      </div>
    </div>
    <div class="ark mt-2">
      <div class="ark_title text-6xl mb-14">My Ark</div>
      <div class="grid gap-4 grid-cols-3">
        <div class="ark_card">
          <h2>
            <i-ep-management style="vertical-align: -0.25rem" />
            <span>nestjs的优劣分析</span>
          </h2>
          <div class="my-4">
            <i-ep-postcard style="vertical-align: -0.12rem" />
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
              vitae delectus voluptas. Voluptatibus ratione suscipit saepe a
              ipsam aliquid ea!
            </span>
          </div>
          <div>
            <el-tag>Tag 2</el-tag>
          </div>
        </div>
        <div class="ark_card">空空如也~</div>
        <div class="ark_card">空空如也~</div>
        <div class="ark_card">空空如也~</div>
        <div class="ark_card">空空如也~</div>
        <div class="ark_card">空空如也~</div>
      </div>

      <div>
        <div class="mt-8 text-3xl">数据展示：</div>
      </div>
      <div class="text-8xl w-full relative">
        <img
          class="notfound"
          src="@/assets/images/main_img/notfound.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderImg from "@/components/basic/theme_component/header_img.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { userStore } from "@/stores/user";
import type { User } from "@/libcommon";
import { rewardUser } from "@/hook/followUser";

const useUserStore = userStore();
const route = useRoute();
const followStatus = ref<boolean>(false);

const userData = ref<User>();
const percentage = ref(20);

const res = await useUserStore.enterUserCenter(route.params.username as string);
userData.value = res.data;
// 是否关注了该作者
if (useUserStore.user.follows) {
  followStatus.value = useUserStore.user.follows
    .map((item) => item.username)
    .includes(userData.value?.username);
}

const reward = async (reward: any) => {
  await rewardUser(reward, followStatus);
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixins.scss";
.menu-btn {
  @include btn_basic;
  &:hover {
    background-position: 50%;
  }
}

:deep(.demo-progress .el-progress--line) {
  margin-bottom: 15px;
  width: 350px;
}
:deep(.el-progress-bar__outer) {
  background-color: rgb(54, 54, 55);
}
:deep(.el-progress__text) {
  display: none;
}
:deep(.el-divider--horizontal) {
  border-top: 1px solid rgb(94, 94, 94);
  margin: 2.4rem 0 1rem 0;
}

.edit {
  width: 100%;
  padding: 0.8rem 0;
}
.follow {
  width: 48%;
  padding: 0.8rem 0;
}

.ark_card {
  max-width: 36rem;
  height: 11rem;
  background-color: $manager-primary-card-color;
  border-radius: 5px;
  padding: 2rem;
  box-shadow: 0 0 1rem $manager-primary-card-shadow;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 1.5rem $manager-primary-card-shadow;
  }
}

.notfound {
  position: absolute;
  top: 50%;
  left: 20%;
}

.follower {
  @include starAndFollower;
  top: 50%;
  left: 88%;
  &::before {
    content: "";
    opacity: 0;
    transition: all 0.6s;
  }
  &:hover {
    &::before {
      content: "关注数: ";
      opacity: 1;
    }
    width: 10rem;
    border-radius: 10px;
  }
}
.star {
  @include starAndFollower;
  top: 75%;
  left: 77%;
  &::before {
    content: "";
    opacity: 0;
    transition: all 0.6s;
  }
  &:hover {
    &::before {
      content: "Stars: ";
      opacity: 1;
    }
    width: 10rem;
    border-radius: 10px;
  }
}
</style>
