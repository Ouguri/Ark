import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 此为页面结构，之下应是之内的各个路由
      // 本页是首页展示页
      component: Layout,
      path: "/",
      children: [
        /* 需要拥有的路由： */
        // 富文本编辑页 ---> 发布成功页
        // 文章展示页
        // 个人中心页
        // 搜索展示页
        // ark 主页
      ],
    },
    {
      component: () => import("@/components/core/Login.vue"),
      path: "/login",
    },
  ],
});

export default router;
