# Vue Mobile Components

基于 Vue 3 + Vant 4 的移动端组件库，采用 Monorepo 架构，提供基础组件、业务组件和实用工具。

## ✨ 特性

- 🚀 基于 Vue 3 + TypeScript 开发
- 📱 专为移动端优化设计
- 🎨 完整的设计系统和主题支持
- 📦 Monorepo 架构，按需安装
- 🔧 开箱即用的业务组件

## 📦 安装

```bash
# 基础组件包
npm install @jname/components @jname/themes

# 业务组件包
npm install @jname/business @jname/themes

# 完整安装
npm install @jname/components @jname/business @jname/themes @jname/core
```

## 🚀 快速开始

### 1. 导入样式

```typescript
// main.ts
import '@jname/themes/variables';      // 主题变量（必需）
import '@jname/components/style.css';  // 基础组件样式
import '@jname/business/style.css';    // 业务组件样式（按需）
```

### 2. 导入组件

```typescript
// 按需导入
import { JTabs, JContentCard } from '@jname/components';
import { JOrganization } from '@jname/business';

// 使用组件
<template>
  <JTabs v-model="activeTab" :tab-options="tabs" />
  <JContentCard title="标题" desc="描述" />
</template>
```

## 📚 组件列表

### 基础组件 (@jname/components)
- **JTabs** - 标签页切换
- **JContentCard** - 内容卡片展示
- **JStepsCard** - 步骤流程卡片

### 业务组件 (@jname/business)
- **JOrganization** - 组织架构选择器
- **JImageUploader** - 图片上传组件
- **JPullRefresh** - 下拉刷新列表

### 核心工具 (@jname/core)
- **useRefreshList** - 列表刷新 Hook
- 类型定义和工具函数

## 🎨 主题定制

### 简单定制（推荐）

```css
/* 直接覆盖 CSS 变量 */
:root {
  --j-primary: #your-color;
  --j-success: #your-color;
}
```

### 高级定制

如需深度定制主题，可安装主题包：

```bash
npm install @jname/themes
```

```typescript
// 导入完整主题系统
import '@jname/themes/variables';
```

## 🔗 相关链接

- [在线演示](https://vue-mobile-components-playground.vercel.app/) - Playground 展示
- [发布指南](./docs/发布指南.md) - 开发者发布说明

## 📄 License

MIT
