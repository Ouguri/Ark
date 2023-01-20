<template>
  <div class="manager_ark relative">
    <div class="p-8">
      <div class="flex justify-between">
        <h2 class="text-4xl mb-8">文章管理</h2>
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
          <el-select
            v-model="selectValue"
            clearable
            placeholder="Select"
            style="width: 12rem"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div>
        <div class="ark_card" v-for="item in searchShow" :key="item.articleID">
          <div>
            <h2>
              <i-ep-management style="vertical-align: -0.25rem" />
              <span>{{ item.title }}</span>
            </h2>
            <div class="my-4 w-3/5">
              <i-ep-postcard style="vertical-align: -0.12rem" />
              <span>
                {{ item.content.slice(0, 100) }}
              </span>
            </div>
            <div>
              <el-tag>{{ item.topic }}</el-tag>
            </div>
            <el-divider />
          </div>
          <div
            class="absolute right-0 top-2/4"
            style="transform: translateY(-50%)"
          >
            <el-button
              color="rgb(106, 210, 120)"
              :dark="true"
              plain
              @click="publishArticle(item)"
              >发布</el-button
            >
            <el-button
              color="rgb(41, 123, 255)"
              :dark="true"
              plain
              @click="updateArticle(item)"
              >更新</el-button
            >
            <el-button
              color="rgb(194,54,22)"
              :dark="true"
              plain
              @click="deleteArticle(item)"
              >删除</el-button
            >
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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { articleStore } from "@/stores/article";
import { useRouter } from "vue-router";

const router = useRouter();
const useArticleStore = articleStore();

const searchData = ref<string>("");
// 按什么内容搜索
const selectValue = ref<number>(0);
const options = [
  {
    value: 0,
    label: "按内容",
  },
  {
    value: 1,
    label: "按主题",
  },
];

const searchShow = ref<any>();
const total = ref<number>();

const searchContent = async (
  skip: number = 1,
  take: number = 6
): Promise<void> => {
  let result = [];
  if (selectValue.value === 0) {
    const res = await useArticleStore.searchArticle({
      content: searchData.value,
      take: take,
      skip: skip,
    });
    result = res.data;
  }
  if (selectValue.value === 1) {
    const res = await useArticleStore.searchArticle({
      topic: searchData.value,
      take: take,
      skip: skip,
    });
    result = res.data;
  }
  searchShow.value = result[0];
  total.value = result[1];
};

await searchContent();

const handleCurrentChange = async (skip: number) => await searchContent(skip);

// 发布
const publishArticle = (data: any) => {
  console.log(data);
};

// 删除
const deleteArticle = async (data: any) => {
  Promise.all([
    await useArticleStore.deleteArticle(data.id),
    await searchContent(),
  ]);
};

// 更新
const updateArticle = (data: any) => {
  useArticleStore.article_content = data;
  useArticleStore.update = true;
  router.push({
    name: "markdown",
  });
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
  width: 100%;

  transition: all 0.5s;
  position: relative;
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
</style>
