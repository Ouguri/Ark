import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import NavGloal from "./components/basic/nav_ark.vue";

import "@/assets/css/reset.css";

const app = createApp(App);

app.component("NavGloal", NavGloal);

app.use(createPinia());
app.use(router);

app.mount("#app");
