import { createApp } from 'vue';
import App from './App.vue';

// 模拟真实用户的导入方式
import 'vant/lib/index.css';
import '@jname/themes/variables';
import '@jname/components/style.css';

const app = createApp(App);
app.mount('#app');
