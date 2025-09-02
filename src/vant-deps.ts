// 静态导入 Vant 组件，确保样式正确加载

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
 * 导入组件库依赖的 Vant 组件样式
 * 解决自动导入插件无法处理第三方库内部 Vant 组件的问题
 */
export async function importVantStyles() {
  // 只导入组件库实际使用的 Vant 组件样式
  await import('vant/es/button/style');
  await import('vant/es/icon/style');
  await import('vant/es/image/style');
  await import('vant/es/search/style');
  await import('vant/es/checkbox/style');
  await import('vant/es/uploader/style');
  await import('vant/es/list/style');
  await import('vant/es/popup/style');
  await import('vant/es/pull-refresh/style');
}

/**
 * @deprecated 使用 registerVantComponents 可能导致样式缺失
 * 建议直接在项目中导入和注册所需的 Vant 组件
 */
export async function registerVantComponents(app: any) {
  const vant = await import('vant');

  VANT_COMPONENTS.forEach((componentName) => {
    const component = vant[componentName];
    if (component) {
      app.use(component);
    }
  });
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
