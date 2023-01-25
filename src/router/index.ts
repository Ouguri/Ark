import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 重定向
      path: "/",
      redirect: "/ark",
    },
    {
      // 首页
      component: Layout,
      path: "/ark",
      name: "ark",
    },
    // 登录页
    {
      path: "/login",
      name: "login",
      component: () => import("@/components/core/Login.vue"),
    },
    // 写文章
    {
      path: "/markdown",
      name: "markdown",
      component: () => import("@/views/markdown_page.vue"),
    },
    // 文章页
    {
      path: "/article/:id",
      name: "article",
      component: () => import("@/views/article_show.vue"),
    },
    // 搜索页
    {
      path: "/search",
      name: "search",
      component: () => import("@/views/search_show.vue"),
    },
    // 个人中心
    {
      path: "/platform",
      name: "personalCenter",
      component: () => import("@/views/personal_center.vue"),
      children: [
        {
          path: "",
          name: "personindex",
          component: () => import("@/views/manager/manager_index.vue"),
        },
        {
          path: "articles",
          name: "articles",
          component: () => import("@/views/manager/manager_article.vue"),
        },
        {
          path: "comments",
          name: "comments",
          component: () => import("@/views/manager/manager_comments.vue"),
        },
      ],
    },
    // 404
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: () => import("@/views/404.vue"),
    },
  ],
});

export default router;
