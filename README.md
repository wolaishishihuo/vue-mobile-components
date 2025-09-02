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

app.use(VueMobileComponents);
```

### 按需引入

```typescript
import { JTabs, JPullToRefreshList } from '@jname/vue-mobile-components';
import '@jname/vue-mobile-components/lib/style.css';
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
