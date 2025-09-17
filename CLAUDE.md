# CLAUDE.md

这是一个基于 Vue 3 + Vant 4 的移动端组件库项目，采用 **Monorepo** 架构，使用 TypeScript 开发，专为中文环境设计。

## 📦 Monorepo 架构

### 包结构
```
packages/
├── core/             # @jname/core - 核心包
│   └── src/
│       ├── constants/# 常量定义
│       ├── types/    # 类型定义
│       ├── utils/    # 工具函数（分类）
│       │   ├── dom/  # DOM 操作
│       │   ├── format/# 格式化
│       │   └── validate/# 验证
│       └── hooks/    # Vue hooks
├── components/       # @jname/components - 基础 UI 组件
│   └── src/
│       ├── components/
│       │   ├── tabs/
│       │   ├── content-card/
│       │   └── steps-card/
│       ├── styles/   # 样式系统
│       └── themes/   # 组件主题
├── business/         # @jname/business - 业务组件
│   └── src/
│       └── components/
│           ├── organization/
│           ├── image-uploader/
│           └── pull-refresh/
├── themes/           # @jname/themes - 主题包
│   └── src/
│       ├── default/  # 默认主题
│       ├── dark/     # 暗色主题
│       └── shared/   # 共享主题工具
└── playground/       # 开发调试环境
```

### 依赖关系
- `@jname/core` - 基础包，无外部依赖
- `@jname/components` - 依赖 `@jname/core`
- `@jname/business` - 依赖 `@jname/core` 和 `@jname/components`
- `@jname/themes` - 独立主题包，无依赖
- `playground` - 依赖所有包，用于开发调试

## 🚀 开发命令

### Monorepo 工作区命令
```bash
# 开发环境
pnpm dev              # 启动 playground 开发环境
pnpm --filter playground dev

# 构建所有包
pnpm build            # 构建所有生产包（排除 playground）
pnpm -r --filter='!playground' build

# 构建特定包
pnpm --filter @jname/core build
pnpm --filter @jname/components build
pnpm --filter @jname/business build
pnpm --filter @jname/themes build

# 质量检查
pnpm typecheck        # 全局类型检查
pnpm lint            # 全局代码检查
pnpm lint:fix        # 修复代码格式问题

# 清理
pnpm clean           # 清理所有构建产物

# 部署相关
pnpm --filter playground preview  # 本地预览构建结果
vercel                            # Vercel 预览部署
vercel --prod                     # Vercel 生产部署
```

### 版本发布
```bash
# 使用 Changesets 管理版本
pnpm changeset             # 创建变更集
pnpm version-packages      # 更新版本号
pnpm publish-packages      # 发布到 npm

# 单独发布某个包
pnpm --filter @jname/core release
pnpm --filter @jname/components release
pnpm --filter @jname/business release
```

## 🏗️ 项目架构

### 核心依赖
- **Vue 3**: 组件库基础框架
- **Vant 4**: UI 组件库依赖
- **TypeScript**: 类型系统
- **pnpm workspaces**: Monorepo 包管理
- **Vite**: 构建工具和开发服务器
- **Less**: CSS 预处理器

### 包说明

#### @jname/core
- **用途**: 核心工具、类型定义、可复用 hooks
- **包含**: `types/`, `utils/`, `hooks/`
- **依赖**: 仅 Vue 3（peer dependency）
- **构建产物**: ES 模块和 UMD 格式

#### @jname/components
- **用途**: 基础 UI 组件
- **包含**: `JTabs`, `JContentCard`, `JStepsCard`
- **依赖**: `@jname/core`, Vant（peer dependency）
- **构建产物**: ES 模块、UMD 格式 + 样式文件

#### @jname/business
- **用途**: 业务相关的复杂组件
- **包含**: `JOrganization`, `JImgUploader`, `JPullToRefreshList`
- **依赖**: `@jname/core`, `@jname/components`, Vant
- **构建产物**: ES 模块、UMD 格式，各组件独立样式文件
- **样式导入**: 各组件样式独立，无统一样式入口文件

#### playground
- **用途**: 开发环境和组件演示
- **包含**: 所有组件的演示页面
- **依赖**: 所有内部包 + Vant
- **特点**: 仅用于开发，不发布

### 构建配置
- **输出目录**: 各包的 `dist/` 目录
- **构建格式**: ES 模块 (`.mjs`) 和 UMD (`.umd.js`)
- **类型声明**: 自动生成 `.d.ts` 文件
- **样式**: 合并到 `style.css`

### 外部依赖处理
构建时以下依赖被标记为 external（不打包进组件库）：
- `vue`
- `vant`
- `@vueuse/core`
- `@vant/use`
- `dayjs`
- `lodash-es`
- `compressorjs`

## 🎯 代码规范

### 组件命名规范
- 组件名使用 `J` 前缀 (如 `JButton`)
- 文件结构采用目录形式，每个组件一个目录
- 组件导出通过 `index.ts` 统一处理

### 组件开发模式
- 使用 Composition API
- TypeScript 严格类型约束
- Props 接口定义 (`ComponentProps`)
- Emits 接口定义 (`ComponentEmits`)
- `defineOptions` 定义组件名
- Scoped 样式，BEM 命名规范

### 样式系统
- Less 预处理器
- CSS 类名采用 `j-` 前缀 + BEM 命名
- 颜色变量遵循设计规范：
  - Primary: `#1989fa`
  - Success: `#07c160`
  - Danger: `#ee0a24`
  - Warning: `#ff976a`

## 📋 ESLint 配置
- 基于 `@antfu/eslint-config`
- Vue 3 + TypeScript 支持
- 代码格式化集成
- 分号强制使用
- 逗号风格：不使用尾随逗号

## 🔄 Git 提交规范
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

## 🎨 TypeScript 配置
- 目标版本：ESNext
- 模块解析：Bundler
- 路径别名：各包的路径映射
- 严格检查：部分启用（`strictNullChecks: false`）

## 📚 开发工作流

### 新组件开发
1. 确定组件属于哪个包（core/components/business）
2. 在相应包中创建组件目录
3. 实现组件逻辑和样式
4. 在 playground 中添加演示
5. 运行测试和类型检查
6. 创建 changeset 记录变更

### 包间依赖
- 使用 `workspace:*` 语法引用内部包
- 通过 `@jname/package-name` 导入
- 构建时自动解析依赖关系

### NPM 包发布流程
1. 开发完成，确保所有检查通过
2. 运行 `pnpm changeset` 创建变更记录
3. 运行 `pnpm version-packages` 更新版本
4. 运行 `pnpm build` 构建所有包
5. 运行 `pnpm publish-packages` 发布

### Playground 部署流程
```bash
# 本地预览
pnpm --filter playground build
pnpm --filter playground preview

# Vercel 部署
vercel                    # 预览部署
vercel --prod            # 生产部署

# 或通过 Git 自动部署
git push origin main     # 推送到 main 分支自动触发部署
```

#### Vercel 配置说明
- **根目录 vercel.json**: 整个项目的部署配置
- **playground/vercel.json**: playground 专用配置
- **构建优化**: 只构建 playground，Vite 自动处理依赖打包
- **静态资源**: `/assets/*` 路径专门处理静态文件

## 🌟 特色功能

### Monorepo 优势
- **独立发布**: 每个包可独立版本控制和发布
- **依赖管理**: 清晰的包间依赖关系
- **代码复用**: 核心代码在 core 包中共享
- **开发效率**: 统一的开发工具和规范

### 开发体验
- **热重载**: playground 支持组件热更新
- **类型安全**: 完整的 TypeScript 支持
- **代码规范**: 统一的 ESLint 和 Prettier 配置
- **构建优化**: 基于 Vite 的快速构建
- **自动部署**: Git 推送自动触发 Vercel 部署
- **预览部署**: 每个 PR 都有独立的预览地址

## 📖 使用指南

### 安装使用
```bash
# 安装核心包
npm install @jname/core

# 安装基础组件
npm install @jname/components

# 安装业务组件
npm install @jname/business

# 或安装完整包
npm install @jname/core @jname/components @jname/business
```

### 导入使用
```typescript
// 导入核心工具
import { useRefreshList } from '@jname/core'

// 导入基础组件
import { JTabs, JContentCard } from '@jname/components'

// 导入业务组件
import { JOrganization } from '@jname/business'

// 导入样式
import '@jname/components/style.css'  // 基础组件统一样式

```

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
