// 静态导入 Vant 组件，确保样式正确加载
import { Button, Checkbox, Icon, Image, List, Popup, PullRefresh, Search, Uploader } from 'vant';

export const VANT_COMPONENTS = [
  // 基础组件
  'Button', // van-button - 按钮组件 (organization)
  'Icon', // van-icon - 图标组件 (organization, contentCard)
  'Image', // van-image - 图片组件 (contentCard)

  // 表单组件
  'Search', // van-search - 搜索框 (organization)
  'Checkbox', // van-checkbox - 复选框 (organization)
  'Uploader', // van-uploader - 文件上传 (imgUploader)

  // 展示组件
  'List', // van-list - 列表 (organization, pullToRefreshList)

  // 反馈组件
  'Popup', // van-popup - 弹出层 (organization)
  'PullRefresh' // van-pull-refresh - 下拉刷新 (pullToRefreshList)
] as const;

/**
 * 组件库依赖的 Vant 函数列表
 */
export const VANT_FUNCTIONS = [
  'showToast', // 显示轻提示 (organization, imgUploader)
  'showImagePreview' // 图片预览 (imgUploader)
] as const;

/**
 * 组件映射关系 (组件名 -> 导入名)
 */
export const VANT_COMPONENT_MAP = {
  'van-button': 'Button',
  'van-icon': 'Icon',
  'van-image': 'Image',
  'van-search': 'Search',
  'van-checkbox': 'Checkbox',
  'van-uploader': 'Uploader',
  'van-list': 'List',
  'van-popup': 'Popup',
  'van-pull-refresh': 'PullRefresh'
} as const;

/**
 * 自动注册所有依赖的 Vant 组件
 * @param app Vue 应用实例
 */
export function registerVantComponents(app: any) {
  // 使用静态导入的组件，和你项目中的做法一致
  app.use(Button);
  app.use(Icon);
  app.use(Image);
  app.use(Search);
  app.use(Checkbox);
  app.use(Uploader);
  app.use(List);
  app.use(Popup);
  app.use(PullRefresh);
}

/**
 * 生成手动导入代码 (用于文档)
 */
export function generateManualImports() {
  const allImports = [...VANT_COMPONENTS, ...VANT_FUNCTIONS];
  return `// 手动导入所需的 Vant 组件和函数
import { ${allImports.join(', ')} } from 'vant';

// 导入组件样式
import 'vant/es/button/style';
import 'vant/es/icon/style';
import 'vant/es/image/style';
import 'vant/es/search/style';
import 'vant/es/checkbox/style';
import 'vant/es/uploader/style';
import 'vant/es/list/style';
import 'vant/es/popup/style';
import 'vant/es/pull-refresh/style';

// 注册组件
app.component('VanButton', Button);
app.component('VanIcon', Icon);
app.component('VanImage', Image);
app.component('VanSearch', Search);
app.component('VanCheckbox', Checkbox);
app.component('VanUploader', Uploader);
app.component('VanList', List);
app.component('VanPopup', Popup);
app.component('VanPullRefresh', PullRefresh);

// 函数 showToast, showImagePreview 可直接使用`;
}
