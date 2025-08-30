# Vue Mobile Components

基于 Vue 3 + Vant 4 的移动端组件库

## 特性

- 🚀 基于 Vue 3 + TypeScript 开发
- 📱 专为移动端设计
- 🎨 支持主题定制
- 📦 支持按需引入
- 🔥 支持 Tree Shaking
- 💪 完整的 TypeScript 类型定义

## 安装

```bash
# npm
npm install @jname/vue-mobile-components

# yarn
yarn add @jname/vue-mobile-components

# pnpm
pnpm add @jname/vue-mobile-components
```

## 使用

### 全局引入

```typescript
import VueMobileComponents from '@jname/vue-mobile-components';
import { createApp } from 'vue';
import App from './App.vue';
import '@jname/vue-mobile-components/lib/style.css';

const app = createApp(App);
app.use(VueMobileComponents);
app.mount('#app');
```

### 按需引入

```typescript
import { ComponentName } from '@jname/vue-mobile-components';
import '@jname/vue-mobile-components/lib/style.css';
```

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 类型检查
pnpm typecheck

# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

## 许可证

MIT License
