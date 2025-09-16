import { createApp } from 'vue';
import App from './App.vue';

// 真实项目中的导入方式：
import 'vant/lib/index.css';
import '@jname/themes/variables';
import '@jname/components/style.css';

const app = createApp(App);
app.mount('#app');
