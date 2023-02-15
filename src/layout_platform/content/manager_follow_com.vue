<template>
  <div class="manager_ark relative">
    <div class="p-8">
      <div class="flex justify-between">
        <h2 class="text-4xl mb-8">关注列表</h2>
        <div class="flex relative bottom-1">
          <div class="relative">
            <el-input
              style="width: 43rem"
              v-model="searchData"
              placeholder="想找点什么..."
            />
            <button class="search_box_icon" @click="searchContent()">
              <i-ep-search style="font-size: 1.8rem" />
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="ark_card" v-for="item in searchShow" :key="item.articleID">
          <div class="ark_card_data">
            <div class="flex items-center">
              <HeaderImg
                class="card_img"
                size="4.3rem"
                textTranx="-3rem"
                :img="`http://localhost:3000/avatar/${item.avatar}`"
              >
                <template #yourName> &nbsp; </template>
              </HeaderImg>
              <h2 class="test">{{ item.username }}</h2>
            </div>
            <div>
              <el-button
                color="rgb(194,54,22)"
                :dark="true"
                plain
                @click="openCancelModel(item.username)"
                >取消关注
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 每页7个 -->
    <div class="absolute right-0">
      <el-pagination
        :page-size="6"
        :pager-count="5"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog
      v-model="centerDialogVisible"
      title="提示"
      width="30%"
      align-center
      class="dialog"
    >
      <span>确定取消关注吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            color="#535355"
            :dark="true"
            plain
            @click="centerDialogVisible = false"
            >取消</el-button
          >
          <el-button
            color="rgb(41, 123, 255)"
            :dark="true"
            style="margin-left: 2rem"
            @click="cancelFollow"
          >
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "@/stores/user";
import HeaderImg from "@/components/basic/theme_component/header_img.vue";
import { getUserAvater } from "@/hook/getAvatar";

const { avatar, avatarGetStart } = getUserAvater();

const router = useRouter();
const useUserStore = userStore();

const centerDialogVisible = ref(false);
const enterUsername = ref<string>("");

const searchData = ref<string>("");

const searchShow = ref<any>();
const total = ref<number>();

const searchContent = async (
  skip: number = 1,
  take: number = 6
): Promise<void> => {
  let result = [];
  const res = await useUserStore.searchPersonalFollow({
    take: take,
    skip: skip,
    content: searchData.value,
  });
  result = res.data;
  result = res.data;
  searchShow.value = result[0];
  total.value = result[1];
};

await searchContent();
onMounted(() => {
  avatarGetStart();
});

const handleCurrentChange = async (skip: number) => await searchContent(skip);

const openCancelModel = (username: string) => {
  centerDialogVisible.value = true;
  enterUsername.value = username;
};

// router.push({
//   name: "arkcenter",
//   params: { id: enterUsername.value },
// });

const cancelFollow = async () => {
  const username = enterUsername.value;

  if (username !== useUserStore.user.username) {
    centerDialogVisible.value = false;
    await useUserStore.updateByOther({ followers: -1, username });
    await searchContent();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixins.scss";
:deep(.el-divider--horizontal) {
  border-top: 1px solid rgb(94, 94, 94);
}
.manager_ark {
  width: 100%;
  background-color: $manager-primary-card-color;
  border-radius: 5px;
}

.ark_card {
  margin: 1rem;
  padding: 1rem;
  width: 30%;
  transition: all 0.3s;
  position: relative;
  user-select: none;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0.2rem 0.2rem 1rem $article_card_shadow;

  &_data {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0.3rem 0.3rem 1rem $article_card_shadow;
  }
}

:deep(.el-pagination) {
  --el-pagination-button-color: none;
  --el-pagination-text-color: $article_font_color_dark;
  --el-pagination-bg-color: transparent;
  --el-pagination-button-disabled-bg-color: transparent;
  --el-pagination-hover-color: rgb(106, 210, 120);
}
:deep(.el-select) {
  --el-select-input-focus-border-color: transparent;
}

:deep(.el-button + .el-button) {
  margin-left: 2px;
}

:deep(.el-input__wrapper) {
  @include input_basis;
  &:focus-within {
    border-bottom: 2px solid rgb(223, 223, 223);
  }
  &:hover {
    background-color: rgb(80, 85, 97);
  }
}

:deep(.el-input__inner) {
  color: #fff;
  outline: none;
}

.search_box_icon {
  position: absolute;
  right: 1%;
  top: 15%;
  border: none;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.08);
  }
}

.test {
  margin-left: -5rem;
}
</style>
