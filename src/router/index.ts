import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 重定向
      path: "/",
      redirect: "ark",
    },
    {
      // 本页是首页
      component: Layout,
      path: "/ark",
      name: "ark",
    },
    {
      path: "/login",
      component: () => import("@/components/core/Login.vue"),
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
    // {
    //   path: '/articles:classily',
    //   name: 'articles',
    //   component: () => import()
    // },
    // {
    //   path: '/personal:id',
    //   name: 'personalcenter',
    //   component: () => import()
    //   children: [],
    // }
  ],
});

export default router;
