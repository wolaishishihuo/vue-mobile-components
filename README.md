# Vue Mobile Components

基于 Vue 3 + Vant 4 的移动端组件库

## 安装

```bash
pnpm add @jname/vue-mobile-components
```

**依赖要求**
- Vue 3.3+
- Vant 4.0+

**⚠️ 设计基准说明**
- 本组件库基于 **375px** 设计稿开发（与 Vant 4.x 保持一致）
- 项目使用时，请确保 postcss 转换配置匹配此基准

## 使用

### 全局引入

```typescript
import VueMobileComponents from '@jname/vue-mobile-components';
import '@jname/vue-mobile-components/lib/style.css';

// 注册所有组件
app.use(VueMobileComponents);
```

### 按需引入

```typescript
import { JTabs, JOrganization } from '@jname/vue-mobile-components';
import '@jname/vue-mobile-components/lib/style.css';

// 注册需要的组件
app.component('JTabs', JTabs);
app.component('JOrganization', JOrganization);
```

### 与 auto-import 配合使用

本组件库内部使用的 Vant 组件已采用 PascalCase 形式（如 `<Button>`、`<Popup>` 等），完美支持 `unplugin-auto-import` 和 `unplugin-vue-components` 自动导入：

```typescript
// vite.config.ts
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default {
  plugins: [
    Components({
      resolvers: [
        VantResolver()  // 默认 importStyle: true，会自动引入组件样式
      ]
    })
  ]
}
```

**样式引入说明**：
- 组件库**不包含** Vant 样式，需要用户项目自行处理
- 使用 `VantResolver()` 时会自动按需引入样式（推荐）
- 如果已全量引入 Vant 样式，可设置 `VantResolver({ importStyle: false })`

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
