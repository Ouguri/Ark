<template>
  <div class="comment">
    <h1 class="mb-8">评论</h1>
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
        <el-button
          color="rgb(194,54,22)"
          :dark="true"
          @click="deleteCommentSelect"
          class="btn-sm"
          v-if="managerComment"
          >删除评论</el-button
        >
        <el-button
          color="rgb(41, 123, 255)"
          @click="sortComment(1)"
          :dark="true"
          plain
          class="btn-sm"
          >最新</el-button
        >
        <el-button
          color="rgb(41, 123, 255)"
          @click="sortComment(2)"
          :dark="true"
          plain
          class="btn-sm"
          >最热</el-button
        >
      </div>
    </div>
    <hr />
    <!-- 评论内容 -- loop -->
    <div
      class="comment_box"
      v-for="(item, index) in commentList"
      :key="item.id"
    >
      <!-- headerImg -->
      <div class="comment_box_avatar">
        <router-link :to="`/ark/${item.user.username}`">
          <HeaderImg
            class="card_avatar"
            size="4.3rem"
            :img="`http://localhost:3000/avatar/${item.user?.avatar}`"
          >
            <template #yourName> {{ item.user?.username[0] }} </template>
          </HeaderImg>
        </router-link>
      </div>
      <!-- content -->
      <div class="comment_box_data">
        <!-- name -->
        <!-- level -->
        <div class="comment_box_data_header">
          <router-link class="author_link" :to="`/ark/${item.user.username}`">
            <span
              >{{ item.user?.username
              }}{{
                item.to_uid && item.user.username !== item.to_username
                  ? `@${item.to_username}`
                  : ""
              }}
              &nbsp;
            </span>
            <span>Lv{{ item.user?.level }}</span>
          </router-link>
        </div>
        <!-- comment content -->
        <div class="comment_box_data_main">{{ item.content }}</div>
        <!-- give a good & comment it -->
        <div class="comment_box_data_footer">
          <span
            @click="goodsComment(true, item)"
            class="comment_box_data_footer_goods"
          >
            <i-ep-star style="font-size: 1.5rem; vertical-align: text-top" />
            <span>{{ item.goods }}</span>
          </span>
          <span
            @click="
              commentModel == -1 ? (commentModel = index) : (commentModel = -1)
            "
            class="comment_box_data_footer_reply"
            :class="commentModel == index ? `showing_reply` : ''"
          >
            <i-ep-comment style="font-size: 1.5rem; vertical-align: bottom" />
            <span>{{ item.reply }}</span>
          </span>
        </div>

        <div
          class="comment_box_data_reply"
          :class="commentModel == index ? `showing_reply` : ''"
        >
          <div class="comment_input">
            <el-input
              type="text"
              id="commentData"
              class="comment_input_box"
              v-model="replyContent"
              placeholder="想对他/她说点什么？"
            />
            <button class="comment_input_btn" @click="replyComment(item)">
              回&nbsp;复
            </button>
          </div>
        </div>
      </div>

      <div class="comment_box_select">
        <el-checkbox v-if="managerComment" @change="ifClick($event, item.id)"
          >&nbsp;</el-checkbox
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderImg from "@/components/basic/theme_component/header_img.vue";
import { ref, reactive, toRaw, inject, onMounted } from "vue";
import { useCommentStore } from "@/stores/comment";
import { userStore } from "@/stores/user";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";

const commentStore = useCommentStore();
const useUserStore = userStore();

const commentContent = ref<string>("");
const replyContent = ref<string>("");

const managerComment = ref<boolean>(false);
const commentModel = ref<number>(-1);

const commentListDelete = reactive<string[]>([]);

interface Props {
  userID: string;
  id: string;
  topic_type: string;
}

const props = defineProps<Props>();

const { commentList } = storeToRefs(commentStore);

const updateData = inject<Function>("reload") as Function;

onMounted(() => {
  if (useUserStore.user.id === props.userID) managerComment.value = true;
});

// 评论
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

// 回复
const replyComment = async (item: any) => {
  const commentData = {
    content: replyContent.value,
    articleID: props.id,
    topic_type: props.topic_type,
    to_uid: item.to_uid,
    to_username: item.username,
    id: item.id,
  };
  console.log(commentData);

  const res = await commentStore.replyAndGoods(commentData);
  if (res.status == 200) {
    ElMessage({ message: "回复成功", type: "success" });
    updateData();
  }
};

// 点赞
const goodsComment = async (goods: boolean, item: any) => {
  const res = await commentStore.replyAndGoods({ goods, id: item.id });
  if (res.status == 200 && goods) item.goods += 1;
  if (res.status == 200 && !goods) item.goods -= 1;
};

// 是否选择该条评论
const ifClick = (ifTrue: any, id: string) => {
  if (ifTrue) {
    commentListDelete.push(id);
  } else {
    // const resList = commentListDelete.filter((item) => item !== id);
    commentListDelete.forEach((item, index) => {
      if (item === id) commentListDelete.splice(index, 1);
    });
  }
};

// 排序评论
const sortComment = (way: number) => {
  if (way === 1) {
    // 以最新时间
    commentList.value.sort((t1, t2) => {
      return new Date(t1.date) < new Date(t2.date) ? 1 : -1;
    });
    return;
  }
  // 以回复量
  if (way === 2) {
    commentList.value.sort((t1, t2) => {
      return t1.reply < t2.reply ? 1 : -1;
    });
    return;
  }
};

// 删除评论
const deleteCommentSelect = async () => {
  const res = await commentStore.deletComment(
    props.id,
    toRaw(commentListDelete)
  );
  if (res.status == 200) {
    ElMessage({ message: "删除成功 ", type: "success" });
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
    position: relative;
    display: flex;
    margin-top: 1.2rem;
    &_avatar {
      max-width: 7rem;
    }
    &_select {
      position: absolute;
      right: 0;
      top: 0;
    }
    &_data {
      flex: 1;
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

        &_reply,
        &_goods {
          cursor: pointer;
          position: relative;
          transition: all 0.3s;
          &:hover {
            color: rgb(10, 182, 255);
          }
        }
      }
      &_reply {
        visibility: hidden;
        opacity: 0;
        margin-top: 1rem;
        height: 0;
        transition: all 0.5s;
        transform: translateY(-4.5rem);
      }
    }
  }
}

.showing_reply {
  visibility: visible;
  opacity: 1;
  height: 3rem;
  transform: translateY(0);
  color: rgb(10, 182, 255);
}

.author_link {
  color: $article_font_color_dark;
  font-size: 0.7em;
  position: relative;
  transition: all 0.3s;
  &:hover {
    color: #fff;
  }
}

:deep(.el-button + .el-button) {
  margin-left: 2px;
}
.btn-sm {
  height: 2.5rem;
}
</style>
