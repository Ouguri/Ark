<template>
  <NavGloal class="nav_position_open"></NavGloal>
  <div class="theme_box">
    <h1 class="text-7xl">搜索结果</h1>
    <div class="theme_box_content mt-12 p-8">
      <div class="theme_box_content_search p-6 bg-slate-800">
        <div class="text-3xl font-bold">关于治疗儿子不举的365种方案</div>
        <div class="mt-5 text-2xl text-neutral-400">
          2022的最后一天12.31号羊的，到医院检查出了肺炎， 今天才差不多好点了。
          现在已经开播了，后续几天会恢复正常的直播+更新
          大家千万照顾好自己，如果阳了该去医院还得去，别硬抗[给心心]
        </div>
        <div class="footer flex justify-between mt-5">
          <div class="footer_left">
            <span>
              <i-ep-star style="font-size: 2rem; vertical-align: bottom" />
              <span>20</span>
            </span>
            <span>
              <i-ep-comment style="font-size: 2rem; vertical-align: bottom" />
              <span>32</span>
            </span>
            <span>
              <i-ep-comment style="font-size: 2rem; vertical-align: bottom" />
              <span>32</span>
            </span>
          </div>
          <div class="footer_right">
            <span>by: ouguri</span>
            <span>2022-11-14</span>
          </div>
        </div>
      </div>
      <div class="theme_box_content_search p-6 bg-slate-800">
        <div class="text-3xl font-bold">关于治疗儿子不举的365种方案</div>
        <div class="mt-5 text-2xl text-neutral-400">
          2022的最后一天12.31号羊的，到医院检查出了肺炎， 今天才差不多好点了。
          现在已经开播了，后续几天会恢复正常的直播+更新
          大家千万照顾好自己，如果阳了该去医院还得去，别硬抗[给心心]
        </div>
        <div class="footer flex justify-between mt-5">
          <div class="footer_left">
            <span>
              <i-ep-star style="font-size: 2rem; vertical-align: bottom" />
              <span>20</span>
            </span>
            <span>
              <i-ep-comment style="font-size: 2rem; vertical-align: bottom" />
              <span>32</span>
            </span>
            <span>
              <i-ep-comment style="font-size: 2rem; vertical-align: bottom" />
              <span>32</span>
            </span>
          </div>
          <div class="footer_right">
            <span>by: ouguri</span>
            <span>2022-11-14</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "@/assets/css/mixins.scss";
.theme_box {
  @include page_width;
  margin-top: 5rem;
  &_content {
    background-color: $article_bgc_color_dark;
    border-radius: 3px;
    min-height: 67vh;
    &_search {
      border-radius: 5px;
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }

  .footer {
    &_left,
    &_right {
      span {
        font-size: 1.5rem;
      }
      span:not(:last-child) {
        margin-right: 1.2rem;
      }
    }
  }
}
.nav_position_open {
  position: relative;
  background-color: $background_color_dark !important;
  box-shadow: 0px 0.2rem 1.9rem rgb(0, 0, 0);
}
</style>
