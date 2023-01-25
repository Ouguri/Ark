<template>
  <figure class="author_shape">
    <img :src="avatar" class="author_img" alt="" />
    <div class="author_caption">
      <slot name="yourName"> welcome </slot>
    </div>
  </figure>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { userStore } from "@/stores/user";

interface Props {
  img?: string;
  size?: string;
  tranX?: string;
  textTranx?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "6.3rem",
  img: "/nat-8.jpg",
  tranX: "-1.7rem",
  textTranx: "-3.2rem",
});
const size = ref<string>(props.size);

const useUserStore = userStore();
const avatar = ref<string>("");

onMounted(() => {
  avatar.value = `http://localhost:3000/avatar/${
    useUserStore.user.avatar as string
  }`;
});
</script>

<style lang="scss" scoped>
.author_shape {
  width: v-bind(size);
  height: v-bind(size);

  clip-path: circle(50% at 50% 50%);
  -webkit-clip-path: circle(50% at 50% 50%);

  // 谨记只使用 translate 增加圆与文字之间的间距
  transform: translateX(v-bind(textTranx));
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.author_img {
  height: 100%;
  // 1.7rem
  transform: translateX(v-bind(tranX)) scale(1.4); // 调整头像居中, 并让它大一点方便之后缩小
  transition: all 0.5s;
  backface-visibility: hidden;
}

.author_caption {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 20%);
  color: #fff;
  font-size: 1.1rem;
  text-transform: uppercase;
  text-align: center;
  opacity: 0;
  transition: all 0.5s;
  backface-visibility: hidden; // 消除动画结尾震动移位的 bug 的 css
}

// 悬停于 story 时 &__caption 将会
.author_shape:hover .author_caption {
  opacity: 1;
  transform: translate(-50%, -50%);
}

.author_shape:hover .author_img {
  transform: translateX(v-bind(tranX)) scale(1);
  // 过滤器让图片模糊
  // brightness: 亮度 小于 100 暗 大于 100 亮
  filter: blur(3px) brightness(80%);
}
</style>
