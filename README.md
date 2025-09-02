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
