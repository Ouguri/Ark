<template>
  <div class="article_box">
    <div class="article_box_left">
      <div class="article_box_left_link">
        <div class="article_box_left_link_author">
          <router-link class="card" to="/">
            <HeaderImg class="card_img" size="7.3rem">
              <template #name> Ouguri </template>
            </HeaderImg>
            <div class="card_data">
              <span style="font-size: 3em; margin: 0 0 1rem -2rem"
                >Ouguri
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
        <h1>{{ articleData.title }}</h1>
        <div class="article_box_right_author">
          <router-link to="/">
            <HeaderImg size="6.3rem"></HeaderImg>
          </router-link>
          <div class="article_box_right_author_data">
            <router-link class="author_link" to="/">
              <span>{{ articleData.username }}&nbsp;</span>
              <span>Lv: {{ articleData.level }}</span>
            </router-link>
            <div class="author_watch">
              <span>{{ articleData.date }}</span>
              <span> -- </span>
              <span>{{ articleData.commentData }}</span>
            </div>
          </div>
        </div>
        <v-md-preview
          :text="articleData.content"
          ref="preview"
          class="article_box_right_text"
        ></v-md-preview>
      </div>
      <ArticleComment class="article_box_right_commentpart"></ArticleComment>
    </div>
  </div>
</template>

<script setup lang="ts">
import { articleStore } from "@/stores/article";
import { useRoute } from "vue-router";
import { onMounted, ref, reactive, nextTick } from "vue";
import HeaderImg from "@/components/basic/theme_component/header_img.vue";
import ArticleComment from "@/components/basic/article_page/comment_part.vue";
import type { ANARTICLE } from "@/interface/index";

const useArticleStore = articleStore();
const route = useRoute();

const articleData = reactive<ANARTICLE>({});

const titles = reactive<any>([]);
const preview = ref();

onMounted(async () => {
  // 测试用，之后换成接口请求
  const id = route.params.id as string;

  const article_res = await useArticleStore.enterArticle(id);

  const { content, goods, commentData, title, topic, user, date } = article_res;

  articleData.content = content;
  articleData.goods = goods;
  articleData.avatar = user.avatar;
  articleData.commentData = commentData;
  articleData.title = title;
  articleData.topic = topic;
  articleData.username = user.username;
  articleData.level = user.level;
  articleData.vip = user.vip;
  articleData.date = date;

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
});

const handleAnchorClick = (lineIndex: number): void => {
  const heading = preview.value.$el.querySelector(
    `[data-v-md-line="${lineIndex}"]`
  );

  if (heading) heading.scrollIntoView({ behavior: "smooth" });
};
</script>

<style lang="scss" scoped>
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
        border: 1px solid $article_border_dark;
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
        border: 1px solid $article_border_dark;

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
      border: 1px solid $article_border_dark;
    }

    &_commentpart {
      border-radius: 3px;
      background-color: $article_card_bgc_color;
      border: 1px solid $article_border_dark;
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
          color: rgb(233, 223, 204);
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
</style>