import type { App } from 'vue';

// 导入依赖的Vant组件
import { Button, Checkbox, Icon, Image, List, Popup, PullRefresh, Search, Uploader } from 'vant';
import JContentCard from './contentCard';
import JImgUploader from './imgUploader';
import JOrganization from './organization';
import JPullToRefreshList from './pullToRefreshList';
import JStepsCard from './stepsCard';

import JTabs from './tabs';

// 导入样式
import './styles/index.less';

// 导出 hooks
export * from './hooks';

// 导出类型
export * from './types';

// 导出组件
export { JContentCard, JImgUploader, JOrganization, JPullToRefreshList, JStepsCard, JTabs };

// 组件列表
const components = [JStepsCard, JTabs, JContentCard, JImgUploader, JPullToRefreshList, JOrganization];

// 依赖的Vant组件列表
const vantComponents = [Button, Icon, Image, Search, Checkbox, Uploader, List, Popup, PullRefresh];

// 定义安装函数
const install = (app: App) => {
  vantComponents.forEach((component) => {
    app.use(component);
  });

  // 注册自己的组件
  components.forEach((component) => {
    if (component.name) {
      app.component(component.name, component);
    }
  });
};

// 默认导出
export default {
  install,
  version: '1.3.0'
};

// 支持通过 CDN 使用
if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue);
}
