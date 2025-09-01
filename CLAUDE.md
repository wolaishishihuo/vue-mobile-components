# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Vue 3 + Vant 4 的移动端组件库项目，使用 TypeScript 开发，专为中文环境设计。项目名称为 `@jname/vue-mobile-components`。

## 开发命令

### 常用开发命令
- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建生产版本的组件库
- `pnpm build:watch` - 监听模式下构建
- `pnpm preview` - 预览构建结果

### 代码质量检查
- `pnpm typecheck` - TypeScript 类型检查
- `pnpm lint` - ESLint 代码检查
- `pnpm lint:fix` - 自动修复 ESLint 问题

### 版本发布
- `pnpm release` - 构建并发布到 npm
- `pnpm release:patch` - 发布补丁版本 (1.0.0 -> 1.0.1)
- `pnpm release:minor` - 发布次要版本 (1.0.0 -> 1.1.0)
- `pnpm release:major` - 发布主要版本 (1.0.0 -> 2.0.0)

## 项目架构

### 核心依赖
- **Vue 3**: 组件库基础框架
- **Vant 4**: UI 组件库依赖，主要用于基础 UI 组件如 Loading
- **TypeScript**: 类型系统
- **Vite**: 构建工具和开发服务器
- **Less**: CSS 预处理器

### 项目结构
```
src/
├── button/                 # JButton 组件目录
│   ├── index.vue          # 组件实现
│   ├── index.ts           # 组件导出
│   └── demo/              # 组件演示
├── styles/                # 全局样式
│   ├── index.less         # 样式入口
│   ├── variables.less     # Less 变量
│   └── global.less        # 全局样式
├── types/                 # TypeScript 类型定义
├── utils/                 # 工具函数
├── App.vue               # 开发时的应用根组件
├── main.ts               # 开发时的入口文件
└── index.ts              # 组件库导出入口
```

### 构建配置
- **输出目录**: `lib/`
- **构建格式**: ES 模块 (`index.es.js`) 和 UMD (`index.umd.js`)
- **类型声明**: 自动生成到 `lib/index.d.ts`
- **样式**: 合并到 `lib/style.css`

### 组件架构模式

#### 1. 组件命名规范
- 组件名使用 `J` 前缀 (如 `JButton`)
- 文件结构采用目录形式，每个组件一个目录
- 组件导出通过 `index.ts` 统一处理

#### 2. 组件开发模式
- 使用 Composition API
- TypeScript 严格类型约束
- Props 接口定义 (`ButtonProps`)
- Emits 接口定义 (`ButtonEmits`)
- `defineOptions` 定义组件名
- Scoped 样式，BEM 命名规范

#### 3. 样式系统
- Less 预处理器
- CSS 类名采用 `j-` 前缀 + BEM 命名
- 颜色变量遵循设计规范：
  - Primary: `#1989fa`
  - Success: `#07c160`
  - Danger: `#ee0a24`
  - Warning: `#ff976a`

### 外部依赖处理
构建时以下依赖被标记为 external（不打包进组件库）：
- `vue`
- `vant`
- `@vueuse/core`
- `@vant/use`
- `dayjs`
- `lodash-es`

## 代码规范

### ESLint 配置
- 基于 `@antfu/eslint-config`
- Vue 3 + TypeScript 支持
- 代码格式化集成
- 分号强制使用 `;`
- 逗号风格：不使用尾随逗号

### Git 提交规范
使用 conventional commits：
- `feat`: 新功能
- `fix`: 修复bug
- `perf`: 性能优化
- `style`: 代码格式调整
- `docs`: 文档更新
- `test`: 测试相关
- `refactor`: 重构
- `build`: 构建相关
- `ci`: CI相关
- `chore`: 其他杂务

### TypeScript 配置
- 目标版本：ESNext
- 模块解析：Bundler
- 路径别名：`@/*` 指向 `src/*`
- 严格检查：部分启用（`strictNullChecks: false`）

## 发布流程

### 本地发布
1. 确保代码通过所有检查：`pnpm lint && pnpm typecheck`
2. 构建组件库：`pnpm build`
3. 发布到 npm：`pnpm release`

### 版本管理
- 遵循语义化版本规范
- 自动更新 package.json 版本号
- 构建前自动运行质量检查

## 特殊说明

### 中文环境适配
- README 和文档主要使用中文
- 专门为中文移动端场景设计
- 详细的中文发布指南位于 `docs/发布指南.md`

### 组件库使用
- 支持全局引入和按需引入
- 需要同时引入样式文件 `@jname/vue-mobile-components/lib/style.css`
- Peer dependencies 需要项目自行安装

### 开发环境要求
- Node.js >= 18
- 推荐使用 pnpm 作为包管理器
