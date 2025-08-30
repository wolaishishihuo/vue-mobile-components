// 引入 Vant 组件库
import Vant from "vant";
import { createApp } from "vue";

import App from "./App.vue";
import "vant/lib/index.css";

const app = createApp(App);
app.use(Vant);
app.mount("#app");
