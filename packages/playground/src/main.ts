import { createApp } from 'vue';
import App from './App.vue';

// 新架构的导入方式
import 'vant/lib/index.css'; // Vant 样式
import '@jname/themes/variables'; // 主题变量（必需）
import '../components/style.less'; // 组件样式

const app = createApp(App);
app.mount('#app');
