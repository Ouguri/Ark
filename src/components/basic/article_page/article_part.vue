<template>
  <div class="article_box">
    <div class="article_box_left">
      <div class="article_box_left_link">
        <div class="article_box_left_link_author">
          <router-link class="card" to="/platform">
            <HeaderImg
              class="card_img"
              size="7.3rem"
              :img="
                token
                  ? `http://localhost:3000/avatar/${useUserStore.user.avatar}`
                  : `/nat-8.jpg`
              "
            >
              <template #yourName> {{ useUserStore.user.username }} </template>
            </HeaderImg>
            <div class="card_data">
              <span style="font-size: 3em; margin: 0 0 1rem -2rem"
                >{{ useUserStore.user.username }}
              </span>
              <span style="font-size: 1.5em; margin: 0 0 0 -1.6rem">Lv: 1</span>
            </div>
          </router-link>
          <div class="card_btn">
            <button>关注</button>
            <button>为他点赞</button>
          </div>
          <div class="card_user_data">
            <span class="card_user_data_text">
              <i-ep-avatar style="font-size: 1.2rem; vertical-align: middle" />
              <span> 关注数：100w</span>
            </span>
            <span class="card_user_data_text">
              <i-ep-star style="font-size: 1.2rem; vertical-align: middle" />
              <span> 获得点赞：4.52w</span>
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
          <router-link to="/">
            <HeaderImg
              size="6.3rem"
              :img="`http://localhost:3000/avatar/${article_content.user.avatar}`"
            ></HeaderImg>
          </router-link>
          <div class="article_box_right_author_data">
            <router-link class="author_link" to="/">
              <span>{{ article_content.user?.username }}&nbsp;</span>
              <span>Lv: {{ article_content.user?.level }}</span>
            </router-link>
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
import { getToken } from "@/utils/savetoken";

const ArticleComment = defineAsyncComponent(
  () => import("@/components/basic/article_page/comment_part.vue")
);

const commentStore = useCommentStore();
const useArticleStore = articleStore();
const useUserStore = userStore();
const route = useRoute();

const token = ref<string>("");
const titles = reactive<any>([]);
const preview = ref();

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

  token.value = getToken() as string;
});

const handleAnchorClick = (lineIndex: number): void => {
  const heading = preview.value.$el.querySelector(
    `[data-v-md-line="${lineIndex}"]`
  );

  if (heading) heading.scrollIntoView({ behavior: "smooth" });
};
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
        border-radius: 3px;
        border-top-left-radius: 3rem;
        background-color: $article_card_bgc_color;
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
          button {
            padding: 0.4rem 4.3rem;
            cursor: pointer;
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
        border-radius: 3px;
        background-color: $article_card_bgc_color;
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
          border-radius: 2px;
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
      border-radius: 3px;
      background-color: $article_card_bgc_color;
    }

    &_commentpart {
      border-radius: 3px;
      background-color: $article_card_bgc_color;
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
  background-color: $article_card_bgc_color;
  color: $article_font_color_dark;
  h2 {
    border-bottom: 1px solid rgb(92, 92, 92);
  }
}

:deep(.v-md-plugin-tip) {
  background-color: #282c34;
}
</style>
