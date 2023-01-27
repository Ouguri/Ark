import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import NavGloal from "./components/basic/nav_ark.vue";
import "@/assets/css/reset.scss";
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";

import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import "@kangc/v-md-editor/lib/style/preview.css";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import Prism from "prismjs";
import createLineNumbertPlugin from "@kangc/v-md-editor/lib/plugins/line-number/index";

const app = createApp(App);

app.component("NavGloal", NavGloal);

// 代码行号
VueMarkdownEditor.use(createLineNumbertPlugin());
// 代码块复制
VueMarkdownEditor.use(createCopyCodePlugin());

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

VMdPreview.use(vuepressTheme, {
  Prism,
});

app.use(VMdPreview);
app.use(VueMarkdownEditor);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);

app.mount("#app");
