# Vue Mobile Components

基于 Vue 3 + Vant 4 的移动端组件库

## 安装

```bash
pnpm add @jname/vue-mobile-components
```

**依赖要求**
- Vue 3.3+
- Vant 4.0+
- @vueuse/core 13.0+

## 使用

### 全局引入

```typescript
import VueMobileComponents from '@jname/vue-mobile-components';
import '@jname/vue-mobile-components/lib/style.css';

// 必须手动注册 Vant 或使用全局引入
import Vant from 'vant';
import 'vant/lib/index.css';

app.use(VueMobileComponents);
app.use(Vant); // 全局注册 Vant
```

### 按需引入 + 自动导入

```typescript
// 1. 引入组件库和工具函数
import { JTabs, JPullToRefreshList, registerVantComponents } from '@jname/vue-mobile-components';
import '@jname/vue-mobile-components/lib/style.css';

// 2. 自动注册所有依赖的 Vant 组件 (推荐)
await registerVantComponents(app);

// 3. vite.config.ts 配置自动导入
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [VantResolver()]
    })
  ]
})
```

### 手动引入方式

```typescript
// 手动导入所需的 Vant 组件和函数
import {
  Button, Icon, Image, Search, Checkbox,
  Uploader, List, Popup, PullRefresh,
  showToast, showImagePreview
} from 'vant';

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

// 函数 showToast, showImagePreview 可直接使用
```

## 组件列表

- **JTabs** - 标签页组件
- **JStepsCard** - 步骤卡片
- **JContentCard** - 内容卡片
- **JImgUploader** - 图片上传
- **JPullToRefreshList** - 下拉刷新列表
- **JOrganization** - 组织机构选择

## Hooks

- **useRefreshList** - 列表刷新逻辑
- **useOrganizationPicker** - 组织选择器
- **useOrganizationSelection** - 组织选择状态

## 开发

```bash
pnpm dev      # 开发模式
pnpm build    # 构建
pnpm lint     # 代码检查
```

## License

MIT
