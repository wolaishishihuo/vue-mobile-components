# 更新日志

## [1.0.0] - 2024-12-19

### 新增

- ✨ 初始化Vue移动端组件库项目
- ✨ 添加Button组件，支持多种类型、尺寸和状态
  - 支持default、primary、success、warning、danger类型
  - 支持small、medium、large尺寸
  - 支持loading状态、禁用状态
  - 支持block、round、plain样式
- 🔧 配置TypeScript和Vue 3支持
- 🔧 配置Vite构建工具，支持ES和UMD格式输出
- 🔧 集成Vant UI组件库
- 📦 配置npm包发布支持

### 功能特性

- 📱 移动端优先设计
- 💪 TypeScript全量支持
- 🎨 基于Vant UI的设计语言
- 📦 支持按需引入
- 🔧 支持Tree Shaking

### 构建配置

- ⚡ Vite构建工具
- 📝 TypeScript类型声明自动生成
- 🗜️ 代码压缩和优化
- 📦 支持ES Module和UMD格式

## 开发指南

### 安装依赖

```bash
pnpm install
```

### 开发调试

```bash
pnpm dev
```

### 构建组件库

```bash
pnpm build
```

### 类型检查

```bash
pnpm typecheck
```

### 代码规范检查

```bash
pnpm lint
pnpm lint:fix
```

### 版本发布

```bash
# 补丁版本 (1.0.0 -> 1.0.1)
pnpm release:patch

# 次要版本 (1.0.0 -> 1.1.0)
pnpm release:minor

# 主要版本 (1.0.0 -> 2.0.0)
pnpm release:major
```

## 使用说明

### 全量引入

```typescript
import VueMobileComponents from '@jname/vue-mobile-components'
import '@jname/vue-mobile-components/lib/style.css'

app.use(VueMobileComponents)
```

### 按需引入

```typescript
import { Button } from '@jname/vue-mobile-components'
import '@jname/vue-mobile-components/lib/style.css'

export default {
  components: {
    Button
  }
}
```

### 组件使用

```vue
<template>
  <div>
    <!-- 基础按钮 -->
    <Button text="默认按钮" />

    <!-- 不同类型 -->
    <Button type="primary" text="主要按钮" />
    <Button type="success" text="成功按钮" />
    <Button type="warning" text="警告按钮" />
    <Button type="danger" text="危险按钮" />

    <!-- 不同尺寸 -->
    <Button size="small" text="小按钮" />
    <Button size="medium" text="中按钮" />
    <Button size="large" text="大按钮" />

    <!-- 不同状态 -->
    <Button loading text="加载中" />
    <Button disabled text="禁用状态" />

    <!-- 不同样式 -->
    <Button block text="块级按钮" />
    <Button round text="圆角按钮" />
    <Button plain text="朴素按钮" />
  </div>
</template>
```

---

更多详细信息请参阅[README.md](./README.md)
