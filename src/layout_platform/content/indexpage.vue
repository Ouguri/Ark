<template>
  <div class="flex">
    <div class="flex flex-col" style="width: 35rem; margin-right: 4rem">
      <HeaderImg
        size="28rem"
        tran-x="-5.6rem"
        text-tranx="0"
        @click="centerDialogVisible = true"
        :img="avatar"
      >
      </HeaderImg>
      <h2 class="text-3xl my-1">{{ useUserStore.user.username }}</h2>
      <div class="mt-2 w-full flex justify-center">
        <button class="menu-btn edit mr-2">编辑资料</button>
        <button class="menu-btn follow">关注</button>
      </div>
      <el-divider />
      Lv 1：<el-progress :percentage="percentage" color="rgb(75, 155, 96)" />
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
        <div class="ark_card"></div>
        <div class="ark_card"></div>
        <div class="ark_card"></div>
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

  <el-dialog
    v-model="centerDialogVisible"
    title="更换头像"
    width="30%"
    align-center
  >
    <div class="flex justify-center">
      <HeaderChange></HeaderChange>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="avatarFinish"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import HeaderImg from "@/components/basic/theme_component/header_img.vue";
import HeaderChange from "@/components/basic/theme_component/header_change.vue";
import { ref, onMounted, inject } from "vue";
import { userStore } from "@/stores/user";
import { getUserAvater } from "@/hook/getAvatar";

const useUserStore = userStore();

const percentage = ref(20);
const centerDialogVisible = ref(false);
const { avatar, avatarGetStart } = getUserAvater();

const updateData = inject<Function>("reload") as Function;

onMounted(() => {
  avatarGetStart();
});

const avatarFinish = () => {
  centerDialogVisible.value = false;
  updateData();
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
  width: 60%;
  padding: 0.8rem 0;
}
.follow {
  width: 40%;
}

.ark_card {
  max-width: 36rem;
  height: 11rem;
  background-color: $manager-primary-card-color;
  border-radius: 5px;
  padding: 2rem;
  box-shadow: 0 0 1rem $manager-primary-card-shadow;
  transition: all 0.5s;
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
</style>
