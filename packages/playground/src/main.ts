import { createApp } from 'vue';
import App from './App.vue';

// 开发环境直接导入源文件（获取最新修改）
import 'vant/lib/index.css';
import '@jname/themes/variables';
import '../../components/style.less';

const app = createApp(App);
app.mount('#app');
