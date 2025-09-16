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
# 安装核心包
npm install @jname/core

# 安装基础组件
npm install @jname/components

# 安装业务组件
npm install @jname/business

# 安装主题
npm install @jname/themes
```

## 🚀 快速开始

### 1. 导入样式

```typescript
// main.ts
import '@jname/themes/variables';
import '@jname/components/style.css';
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

```less
// 自定义主题变量
:root {
  --j-primary: #your-color;
  --j-success: #your-color;
}
```

## 🔗 相关链接

- [在线演示](http://localhost:5173) - Playground 展示
- [发布指南](./docs/发布指南.md) - 开发者发布说明

## 📄 License

MIT