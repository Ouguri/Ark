<template>
  <div class="comment">
    <h1 style="margin-bottom: 2rem">评论</h1>
    <div>
      <div class="comment_input">
        <el-input
          type="text"
          id="commentData"
          class="comment_input_box"
          v-model="commentContent"
          placeholder="评论点什么吧！"
        />
        <button class="comment_input_btn" @click="addComment">
          发&nbsp;表
        </button>
      </div>
    </div>
    <!-- 写评论 -->
    <div class="comment_title">
      <h1>全部评论</h1>
      <div class="comment_title-btn">
        <button>最新</button>
        <button>最热</button>
      </div>
    </div>
    <hr />
    <!-- 评论内容 -- loop -->
    <div class="comment_box" v-for="item in commentList" :key="item.id">
      <!-- headerImg -->
      <div class="comment_box_avatar">
        <HeaderImg class="card_avatar" size="4.3rem">
          <template #name> {{ item.user?.username }} </template>
        </HeaderImg>
      </div>
      <!-- content -->
      <div class="comment_box_data">
        <!-- name -->
        <!-- level -->
        <div class="comment_box_data_header">
          <span>{{ item.user?.username }}&nbsp; </span>
          <span>Lv{{ item.user?.level }}</span>
        </div>
        <!-- comment content -->
        <div class="comment_box_data_main">{{ item.content }}</div>
        <!-- give a good & comment it -->
        <div class="comment_box_data_footer">
          <span>
            <i-ep-star style="font-size: 1.5rem; vertical-align: text-top" />
            <span>20</span>
          </span>
          <span>
            <i-ep-comment style="font-size: 1.5rem; vertical-align: bottom" />
            <span>32</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderImg from "@/components/basic/theme_component/header_img.vue";
import { ref, inject } from "vue";
import { useCommentStore } from "@/stores/comment";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";

const commentStore = useCommentStore();

const commentContent = ref<string>("");

interface Props {
  id: string;
  topic_type: string;
}

const props = defineProps<Props>();

const { commentList } = storeToRefs(commentStore);

const updateData = inject<Function>("reload") as Function;

const addComment = async () => {
  const commentData = {
    content: commentContent.value,
    articleID: props.id,
    topic_type: props.topic_type,
  };
  const res = await commentStore.addComment(commentData);
  if (res.status == 200) {
    ElMessage({ message: "评论成功", type: "success" });
    updateData();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixins.scss";
:deep(.el-input__wrapper) {
  @include input_box;
  &:focus-within {
    border-bottom: 2px solid rgb(223, 223, 223);
  }
  &:hover {
    background-color: rgb(80, 85, 97);
  }
}

:deep(.el-input__inner) {
  color: #fff;
}

.comment {
  &_title {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  &_input {
    display: flex;
    justify-content: space-between;
    &_btn {
      width: 10rem;
      font-size: 1.5rem;
      &,
      &:link,
      &:visited {
        @include btn_basic;
      }
      &:hover {
        background-position: 50%;
      }
    }
  }

  &_box {
    display: flex;
    margin-top: 1.2rem;
    &_avatar {
      max-width: 7rem;
    }
    &_data {
      &_header {
        font-size: 1.6em;
        margin-top: 0.7rem;
        span:nth-child(2) {
          font-size: 0.5em;
        }
      }
      &_main {
        font-size: 1.4em;
        margin-top: 1rem;
      }
      &_footer {
        margin-top: 0.6rem;
        span {
          margin-right: 0.3rem;
        }
      }
    }
  }
}
</style>
