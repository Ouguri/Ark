<template>
  <div>
    <div class="box">
      <div class="carousel">
        <div class="carousel__box">
          <img class="firstImg" src="" alt="" />
        </div>

        <div class="carousel__box" v-for="item in props.item" :key="item.id">
          <!-- <img :src="`/images/${props.item?.at(-1)?.name}`" alt="" /> -->
          <img :src="imgName(item)" alt="" />
        </div>

        <div class="carousel__box">
          <img class="lastImg" src="" alt="" />
        </div>
      </div>

      <div class="btn btn-left" @click="prev">&nbsp;</div>
      <div class="btn btn-right" @click="next">&nbsp;</div>

      <ul class="btnList">
        <li
          ref="currenLi"
          @click="btnPages(index, $event)"
          class="btnList-li btnList-unitBtn"
          v-for="(item, index) in props.item"
          :key="item.id"
        >
          <slot>
            <span>&nbsp;</span>
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect, computed } from "vue";
import type { Ref } from "vue";
import "@/auto-imports";

interface PropImg {
  // item: { id: number; name: string; url?: string }[];
  item?: string[];
}

// prop 接受外面传入的图片
const props: any = defineProps<PropImg>();

let count = 2; // 轮播图的切换计数
const currenLi = ref<HTMLElement[]>(); // 使用 ref 获取轮播图的切换按钮，这是一份 li
const imgLength = ref<number>(0); // img dom元素列表的长度
const imgDomList = reactive<Array<HTMLElement>>([]); // 图片的总共的 dom 元素，他应比图片列表多 2 个

const imgName = computed<Function>(() => {
  return function (name: string): string {
    const url = `http://localhost:3000/mainpage/${name}`;
    return new URL(url, import.meta.url).href;
  };
});

// 上一页
const prev = () => {
  ctrPages(imgLength, imgDomList, false);
};

// 下一页
const next = () => {
  ctrPages(imgLength, imgDomList, true);
};

// 按钮切换
const btnPages = (imgsId: number, btnDom: any, ifClick: boolean = true) => {
  const btn: NodeListOf<HTMLElement> = document.querySelectorAll(".btnList-li");
  btn.forEach((btnClass) =>
    btnClass.classList.remove("btnList-active", "btnList-unitBtn")
  );
  btnDom.target.classList.add("btnList-active");
  count = 2;
  const calcId: number = imgsId - 1;
  count += calcId;
  if (ifClick) ctrPages(imgLength, imgDomList, true);
};

// 初始化/清除按钮样式
const initBtnClass = () => {
  currenLi.value?.forEach((btnClass) =>
    btnClass.classList.remove("btnList-active", "btnList-unitBtn")
  );
};

const ctrPages = (
  imgLength: Ref<number>,
  imgDomList: Array<HTMLElement>,
  imgPosition: boolean,
  slideTime: number = 0.5
): void => {
  const lenghts: number = imgLength.value;
  let currentCount: number = count; // 当前的轮播图计数
  if (currentCount < lenghts) {
    imgDomList.forEach((item) => {
      item.style.transition = `transform ${slideTime}s`;
      imgPosition
        ? (item.style.transform = `translateX(-${currentCount}00%)`)
        : (item.style.transform = `translateX(-${currentCount - 2}00%)`);
      // 重置轮播图到第一张或者最后一张
      if (currentCount === lenghts - 1 && imgPosition) {
        setTimeout(() => {
          item.style.transition = "none";
          item.style.transform = `translateX(-100%)`;
          count = 2;
        }, slideTime * 1000);
      }
      if (currentCount === 2 && !imgPosition) {
        setTimeout(() => {
          item.style.transition = "none";
          item.style.transform = `translateX(-400%)`;
          count = lenghts - 1;
        }, slideTime * 1000);
      }
    });

    // imgPosition 为 true，意味轮播图向右走，否则向左
    // 此处主要工作是匹配按钮和当前图片的张数一致
    if (currentCount < lenghts - 1 && imgPosition) {
      // 向右
      initBtnClass();
      currenLi.value![currentCount - 1].classList.add("btnList-active");
    }

    if (currentCount < lenghts && currentCount > 2 && !imgPosition) {
      //向左
      initBtnClass();
      currenLi.value!.at(currentCount - 3)?.classList.add("btnList-active");
    }

    // 当为右边最后一张时
    if (currentCount === lenghts - 1 && imgPosition) {
      initBtnClass();
      currenLi.value![0].classList.add("btnList-active");
    }

    // 当为左边最后一张时
    if (currentCount === 2 && !imgPosition) {
      initBtnClass();
      currenLi.value!.at(-1)?.classList.add("btnList-active");
    }
    imgPosition ? currentCount++ : currentCount--;
    count = currentCount;
  }
};

defineExpose({
  ctrPages,
});

watchEffect(
  (_) => {
    const imgData: NodeListOf<HTMLElement> =
      document.querySelectorAll(".carousel__box");
    const firstImg = document.querySelector(".firstImg") as HTMLImageElement;
    const lastImg = document.querySelector(".lastImg") as HTMLImageElement;

    imgLength.value = imgData.length;

    imgData.forEach((item) => imgDomList.push(item));

    const firstUrl = `http://localhost:3000/mainpage/${
      props.item?.at(-1) ?? "carousel1.jpg"
    }`;

    const secondUrl = `http://localhost:3000/mainpage/${
      props.item?.at(0) ?? "carousel1.jpg"
    }`;

    // 赋予第一张和最后一张图为传进来的图片数据的第一张和最后一张
    firstImg.src = new URL(firstUrl, import.meta.url).href;
    lastImg.src = new URL(secondUrl, import.meta.url).href;
  },
  {
    flush: "post", // 开启此项以获得 dom 元素
  }
);
</script>

<style lang="scss" scoped>
@import "@/assets/css/_carousel.scss";
</style>
