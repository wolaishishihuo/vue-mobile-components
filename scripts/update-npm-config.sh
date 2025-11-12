#!/bin/bash

# Vue Mobile Components - NPM 配置更新脚本
# 用于项目交接时快速更新所有配置

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 打印函数
print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }

# 打印标题
echo ""
echo "=================================================="
echo "  Vue Mobile Components 配置更新工具"
echo "=================================================="
echo ""

# 1. 获取配置信息
print_info "请输入新的配置信息："
echo ""

read -p "📦 新的 npm scope (例如: your-org): " NEW_SCOPE
if [ -z "$NEW_SCOPE" ]; then
    print_error "scope 不能为空！"
    exit 1
fi

read -p "👤 作者名称 (例如: Your Name): " NEW_AUTHOR
if [ -z "$NEW_AUTHOR" ]; then
    print_error "作者名称不能为空！"
    exit 1
fi

read -p "🔗 Git 仓库地址 (例如: https://github.com/username/repo.git): " NEW_REPO
if [ -z "$NEW_REPO" ]; then
    print_error "仓库地址不能为空！"
    exit 1
fi

echo ""
print_info "配置预览："
echo "  Scope: @${NEW_SCOPE}"
echo "  Author: ${NEW_AUTHOR}"
echo "  Repository: ${NEW_REPO}"
echo ""

read -p "确认以上配置正确吗? (y/n): " CONFIRM
if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    print_warning "已取消操作"
    exit 0
fi

OLD_SCOPE="jname"

echo ""
echo "=================================================="
print_info "开始更新配置..."
echo "=================================================="
echo ""

# 2. 创建备份
print_info "创建备份..."
BACKUP_DIR=".config-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

# 备份所有 package.json（保持目录结构）
find . -name "package.json" -not -path "*/node_modules/*" | while read file; do
    dir=$(dirname "$file")
    mkdir -p "$BACKUP_DIR/$dir"
    cp "$file" "$BACKUP_DIR/$file"
done

# 备份关键配置文件
for file in .changeset/config.json .npmrc tsconfig.json; do
    if [ -f "$file" ]; then
        dir=$(dirname "$file")
        mkdir -p "$BACKUP_DIR/$dir"
        cp "$file" "$BACKUP_DIR/$file"
    fi
done

# 备份文档和 GitHub Actions
mkdir -p "$BACKUP_DIR/docs" "$BACKUP_DIR/.github/workflows"
cp -r docs/*.md "$BACKUP_DIR/docs/" 2>/dev/null || true
cp -r .github/workflows/*.yml "$BACKUP_DIR/.github/workflows/" 2>/dev/null || true

print_success "备份已保存到: $BACKUP_DIR"
echo ""

# 3. 更新所有 package.json 中的包名
print_info "更新所有 package.json 中的包名..."

if [[ "$OSTYPE" == "darwin"* ]]; then
    find . -name "package.json" -not -path "*/node_modules/*" -exec sed -i '' "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" {} \;
else
    find . -name "package.json" -not -path "*/node_modules/*" -exec sed -i "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" {} \;
fi

print_success "包名更新完成"
echo ""

# 3.1 移除 package.json scripts 中的引号（兼容 Windows）
print_info "移除 scripts 中的引号（Windows 兼容性）..."

if [ -f "package.json" ]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # 将 --filter='!playground' 替换为 --filter=!playground
        sed -i '' "s/--filter='!playground'/--filter=!playground/g" package.json
        # 将 --filter=\"!playground\" 替换为 --filter=!playground
        sed -i '' "s/--filter=\"!playground\"/--filter=!playground/g" package.json
    else
        sed -i "s/--filter='!playground'/--filter=!playground/g" package.json
        sed -i "s/--filter=\"!playground\"/--filter=!playground/g" package.json
    fi
    print_success "scripts 引号已移除（Windows 兼容）"
else
    print_warning "未找到根目录 package.json"
fi

echo ""

# 4. 将内部依赖改为 workspace 协议（关键步骤！）
print_info "将内部依赖改为 workspace:* 协议..."

for pkg_json in packages/*/package.json; do
    if [ -f "$pkg_json" ]; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' -E "s/\"@${NEW_SCOPE}\/(core|components|business|themes)\": \"[^^]*\"/\"@${NEW_SCOPE}\/\1\": \"workspace:*\"/g" "$pkg_json"
        else
            sed -i -E "s/\"@${NEW_SCOPE}\/(core|components|business|themes)\": \"[^^]*\"/\"@${NEW_SCOPE}\/\1\": \"workspace:*\"/g" "$pkg_json"
        fi
        print_success "  $(basename $(dirname $pkg_json))/package.json ✓"
    fi
done

echo ""

# 5. 更新作者信息
print_info "更新作者信息..."

if [[ "$OSTYPE" == "darwin"* ]]; then
    find . -name "package.json" -not -path "*/node_modules/*" -exec sed -i '' "s/\"author\": \"Jname\"/\"author\": \"${NEW_AUTHOR}\"/g" {} \;
    find . -name "package.json" -not -path "*/node_modules/*" -exec sed -i '' "s/\"author\": \"jname\"/\"author\": \"${NEW_AUTHOR}\"/g" {} \;
else
    find . -name "package.json" -not -path "*/node_modules/*" -exec sed -i "s/\"author\": \"Jname\"/\"author\": \"${NEW_AUTHOR}\"/g" {} \;
    find . -name "package.json" -not -path "*/node_modules/*" -exec sed -i "s/\"author\": \"jname\"/\"author\": \"${NEW_AUTHOR}\"/g" {} \;
fi

print_success "作者信息更新完成"
echo ""

# 6. 更新仓库地址
print_info "更新仓库地址..."

if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s|\"url\": \"https://github.com/[^\"]*\"|\"url\": \"${NEW_REPO}\"|g" package.json
else
    sed -i "s|\"url\": \"https://github.com/[^\"]*\"|\"url\": \"${NEW_REPO}\"|g" package.json
fi

print_success "仓库地址更新完成"
echo ""

# 7. 更新 Changeset 配置
print_info "更新 Changeset 配置..."

if [ -f ".changeset/config.json" ]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" .changeset/config.json
    else
        sed -i "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" .changeset/config.json
    fi
    print_success "Changeset 配置更新完成"
else
    print_warning "未找到 .changeset/config.json"
fi

echo ""

# 8. 更新 .npmrc
print_info "更新 .npmrc 配置..."

if [ -f ".npmrc" ]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/@${OLD_SCOPE}:/@${NEW_SCOPE}:/g" .npmrc
    else
        sed -i "s/@${OLD_SCOPE}:/@${NEW_SCOPE}:/g" .npmrc
    fi
    print_success ".npmrc 配置更新完成"
else
    print_warning "未找到 .npmrc 文件"
fi

echo ""

# 9. 更新 tsconfig.json
print_info "更新 tsconfig.json..."

if [ -f "tsconfig.json" ]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" tsconfig.json
    else
        sed -i "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" tsconfig.json
    fi
    print_success "tsconfig.json 更新完成"
else
    print_warning "未找到 tsconfig.json"
fi

echo ""

# 10. 更新 vite.config.ts
print_info "更新 vite.config.ts..."

# 将 scope 首字母转大写
NEW_SCOPE_CAPITALIZED=$(echo "$NEW_SCOPE" | awk '{print toupper(substr($0,1,1)) tolower(substr($0,2))}')

if [[ "$OSTYPE" == "darwin"* ]]; then
    find packages -name "vite.config.ts" -not -path "*/node_modules/*" -exec sed -i '' "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" {} \;
    find packages -name "vite.config.ts" -not -path "*/node_modules/*" -exec sed -i '' "s/Jname/${NEW_SCOPE_CAPITALIZED}/g" {} \;
else
    find packages -name "vite.config.ts" -not -path "*/node_modules/*" -exec sed -i "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" {} \;
    find packages -name "vite.config.ts" -not -path "*/node_modules/*" -exec sed -i "s/Jname/${NEW_SCOPE_CAPITALIZED}/g" {} \;
fi

print_success "vite.config.ts 更新完成"
print_info "  全局变量名: Jname → ${NEW_SCOPE_CAPITALIZED}"
echo ""

# 11. 更新文档
print_info "更新文档中的包名引用..."

if [[ "$OSTYPE" == "darwin"* ]]; then
    find . -name "*.md" -not -path "*/node_modules/*" -not -path "*/.config-backup-*/*" -exec sed -i '' "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" {} \;
else
    find . -name "*.md" -not -path "*/node_modules/*" -not -path "*/.config-backup-*/*" -exec sed -i "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" {} \;
fi

print_success "文档更新完成"
echo ""

# 12. 更新 GitHub Actions 工作流
print_info "更新 GitHub Actions 工作流..."

if [ -d ".github/workflows" ]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        find .github/workflows -name "*.yml" -exec sed -i '' "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" {} \;
    else
        find .github/workflows -name "*.yml" -exec sed -i "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" {} \;
    fi
    print_success "GitHub Actions 更新完成"
else
    print_warning "未找到 .github/workflows 目录"
fi

echo ""

# 13. 更新 playground 源代码
print_info "更新 playground 源代码..."

if [ -d "packages/playground/src" ]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        find packages/playground/src -type f \( -name "*.ts" -o -name "*.vue" \) -exec sed -i '' "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" {} \;
    else
        find packages/playground/src -type f \( -name "*.ts" -o -name "*.vue" \) -exec sed -i "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" {} \;
    fi
    print_success "Playground 源代码更新完成"
fi

echo ""

# 14. 更新 HTML 文件
print_info "更新 HTML 文件..."

for html_file in index.html packages/playground/index.html; do
    if [ -f "$html_file" ]; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" "$html_file"
        else
            sed -i "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" "$html_file"
        fi
        print_success "  $html_file ✓"
    fi
done

echo ""

# 15. 清理并重新安装依赖
print_info "清理旧的依赖..."
rm -rf node_modules packages/*/node_modules pnpm-lock.yaml

echo ""
print_info "重新安装依赖（使用 workspace 协议，不会从 npm 下载）..."

if pnpm install; then
    print_success "依赖安装完成"
else
    print_error "依赖安装失败！"
    print_warning "可能的原因："
    echo "  1. 检查内部依赖是否已改为 workspace:*"
    echo "  2. 手动修复后重新运行: pnpm install"
    exit 1
fi

echo ""

# 16. 显示总结
echo "=================================================="
print_success "🎉 配置更新完成！"
echo "=================================================="
echo ""
print_info "已完成的操作："
echo "  ✅ 包名: @${OLD_SCOPE} → @${NEW_SCOPE}"
echo "  ✅ 作者: Jname → ${NEW_AUTHOR}"
echo "  ✅ 仓库: ${NEW_REPO}"
echo "  ✅ 内部依赖已改为 workspace:* 协议（关键！）"
echo "  ✅ scripts 引号已移除（Windows 兼容）"
echo "  ✅ 所有配置文件已更新"
echo "  ✅ GitHub Actions 已更新"
echo "  ✅ 文档已更新"
echo "  ✅ 依赖已重新安装"
echo ""
print_warning "后续步骤："
echo "  1. 验证构建: pnpm build"
echo "  2. 类型检查: pnpm typecheck"
echo "  3. 代码检查: pnpm lint"
echo "  4. 登录 npm: npm login"
echo "  5. 发布包: pnpm -r --filter='!playground' publish --access public"
echo ""
print_info "备份位置: $BACKUP_DIR"
print_info "如有问题可从备份恢复"
echo ""
print_success "现在可以开始发布了！ 🚀"
echo ""
