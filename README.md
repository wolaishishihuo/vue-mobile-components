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

**⚠️ 设计基准说明**
- 本组件库基于 **375px** 设计稿开发（与 Vant 4.x 保持一致）
- 项目使用时，请确保 postcss 转换配置匹配此基准

## 使用

### ⚠️ 重要：必须注册 Vant 组件

本组件库依赖以下 Vant 组件，使用前**必须在项目中注册**：
`Button`, `Icon`, `Image`, `Search`, `Checkbox`, `Uploader`, `List`, `Popup`, `PullRefresh`

### 方案1：全量引入（推荐）

```typescript
import VueMobileComponents from '@jname/vue-mobile-components';
import '@jname/vue-mobile-components/lib/style.css';
import Vant from 'vant';
import 'vant/lib/index.css';

app.use(VueMobileComponents);
app.use(Vant);
```

### 方案2：按需引入

```typescript
import { JTabs, JOrganization } from '@jname/vue-mobile-components';
import '@jname/vue-mobile-components/lib/style.css';

// 注册组件库依赖的 Vant 组件
import { Button, Icon, Image, Search, Checkbox, Uploader, List, Popup, PullRefresh } from 'vant';
import 'vant/lib/index.css';

[Button, Icon, Image, Search, Checkbox, Uploader, List, Popup, PullRefresh]
  .forEach(component => app.use(component));
```

### PostCSS 配置（重要）

为避免样式尺寸错乱，项目的 postcss 配置应匹配组件库的设计基准：

```javascript
// postcss.config.js
export default {
  plugins: {
    'postcss-mobile-forever': {
      viewportWidth: (file) => {
        // 组件库和 vant 都按 375px 基准转换
        if (file.includes('vant') || file.includes('@jname/vue-mobile-components')) {
          return 375;
        }
        // 项目自己的代码按实际设计稿基准
        return 750; // 根据你的设计稿调整
      }
    }
  }
};
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
