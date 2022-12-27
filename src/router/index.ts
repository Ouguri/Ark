import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "ark",
    },
    {
      // 此为页面结构，之下应是之内的各个路由
      // 本页是首页展示页
      component: Layout,
      path: "/ark",
      name: "ark",
      children: [
        /* 需要拥有的路由： */
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
    {
      path: "/markdown",
      name: "markdown",
      component: () => import("@/views/markdown_page.vue"),
    },
    {
      path: "/article",
      name: "article",
      component: () => import("@/views/article_show.vue"),
    },
  ],
});

export default router;
