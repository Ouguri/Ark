<template>
  <div class="article_box">
    <div class="article_box_left">
      <div class="article_box_left_link">
        <div class="article_box_left_link_author">
          <router-link
            class="card"
            :to="`/ark/${article_content.user.username}`"
          >
            <HeaderImg
              class="card_img"
              size="7.3rem"
              :img="`http://localhost:3000/avatar/${article_content.user.avatar}`"
            >
              <template #yourName>
                {{ article_content.user.username }}
              </template>
            </HeaderImg>
            <div class="card_data">
              <span style="font-size: 3em; margin: 0 0 1rem -2rem"
                >{{ article_content.user.username }}
              </span>
              <span style="font-size: 1.5em; margin: 0 0 0 -1.6rem"
                >Lv: {{ article_content.user.level }}</span
              >
            </div>
          </router-link>
          <div class="card_btn">
            <button
              @click="
                reward({
                  followers: 1,
                  username: article_content.user.username,
                  avatar: article_content.user.avatar,
                })
              "
              class="card_btn_first"
              v-if="!followStatus"
            >
              关注
            </button>
            <button
              @click="
                reward({
                  followers: -1,
                  username: article_content.user.username,
                  avatar: article_content.user.avatar,
                })
              "
              class="card_btn_second"
              v-else
            >
              已关注
            </button>
            <button class="card_btn_first">私信</button>
          </div>
          <div class="card_user_data">
            <span class="card_user_data_text">
              <i-ep-avatar style="font-size: 1.2rem; vertical-align: middle" />
              <span> 关注数：{{ article_content.user.followers }}</span>
            </span>
            <span class="card_user_data_text">
              <span> 打个分吧：</span>
              <i-ep-star style="font-size: 1.2rem; vertical-align: middle" />
              <i-ep-star style="font-size: 1.2rem; vertical-align: middle" />
              <i-ep-star style="font-size: 1.2rem; vertical-align: middle" />
              <i-ep-star style="font-size: 1.2rem; vertical-align: middle" />
              <i-ep-star style="font-size: 1.2rem; vertical-align: middle" />
            </span>
          </div>
        </div>
        <div class="article_box_left_link_title">
          <div>
            <h1 style="margin-bottom: 1.3rem">目录</h1>
            <hr />
          </div>
          <div
            v-for="(anchor, index) in titles"
            :key="index"
            @click="handleAnchorClick(anchor.lineIndex)"
          >
            <a>{{ anchor.title }}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="article_box_right">
      <div class="article_box_right_articlepart">
        <h1>{{ article_content.title }}</h1>
        <div class="article_box_right_author">
          <router-link :to="`/ark/${article_content.user.username}`">
            <HeaderImg
              size="6.3rem"
              :img="`http://localhost:3000/avatar/${article_content.user.avatar}`"
            ></HeaderImg>
          </router-link>
          <div class="article_box_right_author_data">
            <div class="author_link">
              <span>{{ article_content.user?.username }}&nbsp;</span>
              <span>Lv: {{ article_content.user?.level }}</span>
            </div>
            <div class="author_watch">
              <span>发布时间：{{ useArticleStore.formatDate }}</span>
              <span> -- </span>
              <span>浏览量：{{ article_content.commentData }}</span>
            </div>
          </div>
        </div>
        <v-md-preview
          :text="article_content.content"
          ref="preview"
        ></v-md-preview>
      </div>
      <Suspense>
        <template #default>
          <ArticleComment
            :userID="article_content.user.id"
            :id="article_content.id"
            :topic_type="article_content.topic"
            class="article_box_right_commentpart"
          ></ArticleComment>
        </template>
        <template #fallback>
          <div>loading...</div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import { articleStore } from "@/stores/article";
import { useCommentStore } from "@/stores/comment";
import { userStore } from "@/stores/user";
import { useRoute } from "vue-router";
import { onMounted, ref, reactive, nextTick, defineAsyncComponent } from "vue";
import HeaderImg from "@/components/basic/theme_component/header_img.vue";
import { storeToRefs } from "pinia";
import { rewardUser } from "@/hook/followUser";

const ArticleComment = defineAsyncComponent(
  () => import("@/components/basic/article_page/comment_part.vue")
);

const commentStore = useCommentStore();
const useArticleStore = articleStore();
const useUserStore = userStore();
const route = useRoute();

const titles = reactive<any>([]);
const preview = ref();

const followStatus = ref<boolean>(false);

const id = route.params.id as string;

await Promise.all([
  useArticleStore.enterArticle(id),
  commentStore.getCommentList(id),
]);

const { article_content } = storeToRefs(useArticleStore);

onMounted(async () => {
  await nextTick();
  // 配置导航栏
  const anchors = preview.value.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");

  const hTags = [
    ...new Set([...anchors].map((title: HTMLHeadingElement) => title.tagName)),
  ].sort();

  [...anchors].forEach((el: HTMLHeadingElement) =>
    titles.push({
      title: el.innerText,
      lineIndex: el.getAttribute("data-v-md-line"),
      indent: hTags.indexOf(el.tagName),
    })
  );

  // 是否关注了该作者
  if (useUserStore.user.follows) {
    followStatus.value = useUserStore.user.follows
      .map((item) => item.username)
      .includes(article_content.value.user.username);
  }
});

const handleAnchorClick = (lineIndex: number): void => {
  const heading = preview.value.$el.querySelector(
    `[data-v-md-line="${lineIndex}"]`
  );

  if (heading) heading.scrollIntoView({ behavior: "smooth" });
};

// 关注
const reward = async (reward: any) => rewardUser(reward, followStatus);
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixins.scss";
.article_box {
  display: flex;
  &_left {
    min-width: 30rem;
    max-width: 30rem;
    margin-right: 10px;

    &_link {
      &_author {
        box-shadow: 0 0 1rem $article_card_shadow;
        border-radius: 3px;
        border-top-left-radius: 3rem;
        background-color: $background_color_dark;
        height: 18rem;
        margin-bottom: 1rem;
        overflow: hidden;
        .card {
          display: flex;
          &_img {
            margin: 1.2rem 0 0 4.5rem;
          }
          &_data {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        }
        .card_btn {
          padding: $article_user_card_padding;
          display: flex;
          justify-content: space-between;
          &_first {
            padding: 0.5rem 4.8rem;
            cursor: pointer;
            background-color: $article_font_color_dark;
            color: $dark_font_color;
            font-weight: 600;
            border: none;
            border-radius: 3px;
          }
          &_second {
            padding: 0.6rem 4.8rem;
            cursor: pointer;
            background-color: $article_tip_card;
            color: $dark_font_color;
            font-weight: 600;
            border: none;
            border-radius: 3px;
          }
        }
        .card_user_data {
          padding: 0 $article_user_card_padding;
          font-size: 1rem;
          &_text:nth-child(2) {
            margin-left: 2rem;
          }
          span {
            vertical-align: middle;
          }
        }
      }
      &_title {
        border-radius: 5px;
        background-color: $background_color_dark;
        box-shadow: 0 0 1rem $article_card_shadow;
        padding: 2rem;

        a {
          cursor: pointer;
        }
        a:before {
          content: "";
          display: inline-block;
          width: 0.5rem;
          height: 1rem;
          position: relative;
          transition: all 0.5s;
        }

        a:hover:before {
          content: "";
          background-color: $article_font_color_dark;
          border-radius: 5px;
          margin-right: 0.5rem;
        }
        div:not(:last-child) {
          margin-bottom: 1rem;
        }
      }
    }
  }
  &_right {
    width: 85rem;
    &_articlepart {
      background-color: $background_color_dark;
      box-shadow: 0 0 1rem $article_card_shadow;
      border-radius: 5px;
      overflow: hidden;
    }

    &_commentpart {
      border-radius: 5px;
      background-color: $background_color_dark;
      box-shadow: 0 0 1rem $article_card_shadow;
      margin-top: 1rem;
      padding: 2rem 3rem;
    }
    h1 {
      font-size: 4em;
      padding: 3rem 3rem 0 3rem;
    }
    &_author {
      display: flex;
      padding: 2rem 3rem 0 3rem;
      span:nth-child(1) {
        margin-left: -5.1rem;
      }
      &_data {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .author_link {
          color: $article_font_color_dark;
          font-size: 2.3em;
        }
        .author_watch {
          font-size: 1.3em;
          margin-left: -1rem;
        }
      }
    }
  }
}

// markdown 样式
:deep(.vuepress-markdown-body) {
  background-color: $background_color_dark;
  color: $article_font_color_dark;
  h2 {
    border-bottom: 1px solid rgb(92, 92, 92);
  }
}

:deep(.v-md-plugin-tip) {
  background-color: $article_tip_card;
}
</style>
