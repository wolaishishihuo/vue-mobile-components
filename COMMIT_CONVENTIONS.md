# Git 提交规范

本项目采用 [Conventional Commits](https://www.conventionalcommits.org/) 规范来规范化 Git 提交信息。

## 提交格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

必须是下面的其中一个：

- **feat**: 新功能
- **fix**: 修复Bug
- **docs**: 文档修改
- **style**: 代码格式修改（不影响代码运行的变动）
- **refactor**: 重构、优化（既不增加新功能，也不是修复Bug）
- **perf**: 性能优化
- **test**: 增加测试
- **chore**: 构建过程或辅助工具的变动
- **revert**: 回退
- **build**: 打包

### Scope 范围（可选）

用于说明 commit 影响的范围，比如数据层、控制层、视图层等等。

### Subject 主题

- 使用祈使句，现在时："change" 而不是 "changed" 或 "changes"
- 首字母小写
- 结尾不加句号

### Body 内容（可选）

详细描述本次提交的内容，解释为什么做这个变更。

### Footer 页脚（可选）

放置不兼容变更和关闭 issue 的信息。

## 示例

### 新功能

```
feat(components): 添加Search搜索组件

- 支持实时搜索
- 支持历史记录
- 支持自定义样式

Closes #123
```

### 修复Bug

```
fix(utils): 修复debounce函数类型定义错误

修复了防抖函数在TypeScript环境下的类型推断问题
```

### 文档更新

```
docs: 更新README安装说明

添加了pnpm安装方式的说明
```

### 样式调整

```
style: 统一代码缩进格式

使用prettier格式化所有源文件
```

### 重构

```
refactor(build): 优化vite构建配置

- 移除未使用的插件
- 优化打包体积
- 提升构建速度
```

## 工具配置

项目已配置以下工具来强制执行提交规范：

- **commitlint**: 检查提交信息格式
- **husky**: Git hooks 管理
- **lint-staged**: 提交前代码检查

当您提交代码时，系统会自动：

1. 运行代码格式化和检查
2. 验证提交信息格式
3. 如果不符合规范，提交将被拒绝

## 常用命令

```bash
# 提交代码（推荐使用完整格式）
git commit -m "feat(components): 添加新的Button组件"

# 如果提交被拒绝，可以修改最后一次提交
git commit --amend -m "fix(components): 修复Button组件样式问题"
```
