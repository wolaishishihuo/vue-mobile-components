import { createApp } from "vue";
import App from "./App.vue";
import VueMobileComponents from "./index";

const app = createApp(App);
app.use(VueMobileComponents);
app.mount("#app");
