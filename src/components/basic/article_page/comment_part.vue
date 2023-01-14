<template>
  <div class="comment">
    <h1 style="margin-bottom: 2rem">评论</h1>
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
    <div class="comment_box">
      <!-- headerImg -->
      <div class="comment_box_avatar">
        <HeaderImg class="card_avatar" size="4.3rem">
          <template #name> Ouguri </template>
        </HeaderImg>
      </div>
      <!-- content -->
      <div class="comment_box_data">
        <!-- name -->
        <!-- level -->
        <div class="comment_box_data_header">
          <span>区区区区 </span>
          <span>Lv1</span>
        </div>
        <!-- comment content -->
        <div class="comment_box_data_main">一键三连，这次一定哦！</div>
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
        <div class="comment_box">
          <!-- headerImg -->
          <div class="comment_box_avatar">
            <HeaderImg class="card_avatar" size="4.3rem">
              <template #name> Akira </template>
            </HeaderImg>
          </div>
          <div class="comment_box_data">
            <!-- name -->
            <div class="comment_box_data_header">Akira</div>
            <!-- comment content -->
            <div class="comment_box_data_main">好的好的，这次一定！</div>
            <!-- give a good & reply -->
            <div class="comment_box_data_footer">
              <span>
                <i-ep-star
                  style="font-size: 1.5rem; vertical-align: text-top"
                />
                <span>20</span>
              </span>
              <span>
                <i-ep-comment
                  style="font-size: 1.5rem; vertical-align: bottom"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderImg from "@/components/basic/theme_component/header_img.vue";
</script>

<style lang="scss" scoped>
.comment {
  &_title {
    display: flex;
    justify-content: space-between;
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
