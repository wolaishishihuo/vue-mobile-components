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

### ✨ 开箱即用：自动注册依赖

本组件库**已内置自动注册**所依赖的 Vant 组件，无需手动注册！
依赖的 Vant 组件：`Button`, `Icon`, `Image`, `Search`, `Checkbox`, `Uploader`, `List`, `Popup`, `PullRefresh`

### 简单使用

```typescript
import VueMobileComponents from '@jname/vue-mobile-components';
import '@jname/vue-mobile-components/lib/style.css';
import 'vant/lib/index.css'; // 仍需引入Vant样式

app.use(VueMobileComponents); // 自动注册所有依赖的Vant组件！
```

### 按需引入组件

```typescript
import { JTabs, JOrganization } from '@jname/vue-mobile-components';
import '@jname/vue-mobile-components/lib/style.css';
import 'vant/lib/index.css';

// 注意：按需引入时，Vant组件不会自动注册，需要手动注册
import { Button, Icon, Image, Search, Checkbox, Uploader, List, Popup, PullRefresh } from 'vant';
[Button, Icon, Image, Search, Checkbox, Uploader, List, Popup, PullRefresh]
  .forEach(component => app.use(component));
```

### 按需自动引入组件

```typescript
import VueMobileComponents from '@jname/vue-mobile-components';
import '@jname/vue-mobile-components/lib/style.css';
import 'vant/lib/index.css'; // 仍需引入Vant样式

app.use(VueMobileComponents); // 自动注册所有依赖的Vant组件！

// 需要关闭自动引入样式
resolvers: [VantResolver({ importStyle: false })]
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
