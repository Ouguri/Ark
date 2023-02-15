import { createRouter, createWebHistory } from "vue-router";
import { getToken } from "@/utils/savetoken";
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
      path: "/search/:content",
      name: "search",
      component: () => import("@/views/search_show.vue"),
    },
    // 他人视角-用户中心
    {
      path: "/ark/:username",
      name: "arkcenter",
      component: () => import("@/views/user_center.vue"),
    },
    // 个人中心
    {
      path: "/platform/:username",
      name: "personalCenter",
      component: () => import("@/views/personal_center.vue"),
      children: [
        {
          path: "",
          name: "personindex",
          component: () => import("@/views/manager/manager_user.vue"),
        },
        {
          path: "articles",
          name: "articleManager",
          component: () => import("@/views/manager/manager_article.vue"),
        },
        {
          path: "comments",
          name: "commentManager",
          component: () => import("@/views/manager/manager_article.vue"),
        },
        {
          path: "follows",
          name: "followsManager",
          component: () => import("@/views/manager/manager_follow.vue"),
        },
        {
          path: "mainindex",
          name: "mainindexManager",
          component: () => import("@/views/manager/manager_index.vue"),
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

const whiteList = ["404", "search", "article", "login", "ark"];

router.beforeEach((to, _, next) => {
  if (whiteList.includes(to.name as string)) {
    next();
  } else {
    const token = getToken();
    if (token) next();
    else {
      next("/login");
    }
  }
});

export default router;
