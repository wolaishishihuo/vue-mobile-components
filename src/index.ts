import type { App } from 'vue';

import JContentCard from './contentCard';
import JImgUploader from './imgUploader';
import JPullToRefreshList from './pullToRefreshList';
import JStepsCard from './stepsCard';
import JTabs from './tabs';

// 导入样式
import './styles/index.less';

// 导出类型
export * from './types';

// 导出组件
export { JContentCard, JImgUploader, JPullToRefreshList, JStepsCard, JTabs };

// 组件列表
const components = [JStepsCard, JTabs, JContentCard, JImgUploader, JPullToRefreshList];

// 定义安装函数
const install = (app: App) => {
  components.forEach((component) => {
    if (component.name) {
      app.component(component.name, component);
    }
  });
};

// 默认导出
export default {
  install,
  version: '1.0.0'
};

// 支持通过 CDN 使用
if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue);
}
