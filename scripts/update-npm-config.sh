#!/bin/bash

# Vue Mobile Components - NPM 配置更新脚本
# 用于项目交接时快速更新所有配置

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 打印标题
echo ""
echo "=================================================="
echo "  Vue Mobile Components 配置更新工具"
echo "=================================================="
echo ""

# 1. 获取新的配置信息
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

# 2. 备份重要文件
print_info "创建备份..."
BACKUP_DIR=".config-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

# 备份所有 package.json（保持目录结构）
find . -name "package.json" -not -path "*/node_modules/*" | while read file; do
    # 创建对应的目录结构
    dir=$(dirname "$file")
    mkdir -p "$BACKUP_DIR/$dir"
    cp "$file" "$BACKUP_DIR/$file"
done

# 备份 changeset 配置
if [ -f ".changeset/config.json" ]; then
    mkdir -p "$BACKUP_DIR/.changeset"
    cp .changeset/config.json "$BACKUP_DIR/.changeset/"
fi

# 备份 .npmrc
if [ -f ".npmrc" ]; then
    cp .npmrc "$BACKUP_DIR/"
fi

# 备份文档
mkdir -p "$BACKUP_DIR/docs"
cp -r docs/*.md "$BACKUP_DIR/docs/" 2>/dev/null || true

print_success "备份已保存到: $BACKUP_DIR"
echo ""

# 3. 更新所有 package.json 中的包名
print_info "更新包名 (@${OLD_SCOPE} → @${NEW_SCOPE})..."

if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    find . -name "package.json" -not -path "*/node_modules/*" -exec sed -i '' "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" {} \;
else
    # Linux
    find . -name "package.json" -not -path "*/node_modules/*" -exec sed -i "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" {} \;
fi

print_success "包名更新完成"
echo ""

# 4. 更新作者信息
print_info "更新作者信息..."

if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    find . -name "package.json" -not -path "*/node_modules/*" -exec sed -i '' "s/\"author\": \"Jname\"/\"author\": \"${NEW_AUTHOR}\"/g" {} \;
    find . -name "package.json" -not -path "*/node_modules/*" -exec sed -i '' "s/\"author\": \"jname\"/\"author\": \"${NEW_AUTHOR}\"/g" {} \;
else
    # Linux
    find . -name "package.json" -not -path "*/node_modules/*" -exec sed -i "s/\"author\": \"Jname\"/\"author\": \"${NEW_AUTHOR}\"/g" {} \;
    find . -name "package.json" -not -path "*/node_modules/*" -exec sed -i "s/\"author\": \"jname\"/\"author\": \"${NEW_AUTHOR}\"/g" {} \;
fi

print_success "作者信息更新完成"
echo ""

# 5. 更新仓库地址（只更新根目录的 package.json）
print_info "更新仓库地址..."

if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s|\"url\": \"https://github.com/[^\"]*\"|\"url\": \"${NEW_REPO}\"|g" package.json
else
    # Linux
    sed -i "s|\"url\": \"https://github.com/[^\"]*\"|\"url\": \"${NEW_REPO}\"|g" package.json
fi

print_success "仓库地址更新完成"
echo ""

# 6. 更新 changeset 配置
print_info "更新 Changeset 配置..."

if [ -f ".changeset/config.json" ]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" .changeset/config.json
    else
        # Linux
        sed -i "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" .changeset/config.json
    fi
    print_success "Changeset 配置更新完成"
else
    print_warning "未找到 .changeset/config.json"
fi

echo ""

# 7. 更新 .npmrc 配置
print_info "更新 .npmrc 配置..."

if [ -f ".npmrc" ]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/@${OLD_SCOPE}:/@${NEW_SCOPE}:/g" .npmrc
    else
        # Linux
        sed -i "s/@${OLD_SCOPE}:/@${NEW_SCOPE}:/g" .npmrc
    fi
    print_success ".npmrc 配置更新完成"
else
    print_warning "未找到 .npmrc 文件"
fi

echo ""

# 8. 更新文档中的包名引用
print_info "更新文档中的包名引用..."

if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    find . -name "*.md" -not -path "*/node_modules/*" -not -path "*/.config-backup-*/*" -exec sed -i '' "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" {} \;
else
    # Linux
    find . -name "*.md" -not -path "*/node_modules/*" -not -path "*/.config-backup-*/*" -exec sed -i "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" {} \;
fi

print_success "文档更新完成"
echo ""

# 9. 更新 tsconfig.json 中的 paths
print_info "更新 tsconfig.json 中的路径配置..."

if [ -f "tsconfig.json" ]; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" tsconfig.json
    else
        # Linux
        sed -i "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" tsconfig.json
    fi
    print_success "tsconfig.json 更新完成"
else
    print_warning "未找到 tsconfig.json"
fi

echo ""

# 10. 更新 vite.config.ts 中的配置
print_info "更新 vite.config.ts 中的包名引用..."

# 将 scope 首字母转大写（兼容处理）
NEW_SCOPE_CAPITALIZED=$(echo "$NEW_SCOPE" | awk '{print toupper(substr($0,1,1)) tolower(substr($0,2))}')

if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    find packages -name "vite.config.ts" -not -path "*/node_modules/*" -exec sed -i '' "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" {} \;
    # 更新构建输出的全局变量名（Jname → NewScope）
    find packages -name "vite.config.ts" -not -path "*/node_modules/*" -exec sed -i '' "s/Jname/${NEW_SCOPE_CAPITALIZED}/g" {} \;
else
    # Linux
    find packages -name "vite.config.ts" -not -path "*/node_modules/*" -exec sed -i "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" {} \;
    # 更新构建输出的全局变量名（Jname → NewScope）
    find packages -name "vite.config.ts" -not -path "*/node_modules/*" -exec sed -i "s/Jname/${NEW_SCOPE_CAPITALIZED}/g" {} \;
fi

print_success "vite.config.ts 更新完成"
print_info "全局变量名: Jname → ${NEW_SCOPE_CAPITALIZED}"
echo ""

# 11. 更新 playground 源代码中的引用
print_info "更新 playground 源代码中的包名引用..."

if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    find packages/playground/src -type f \( -name "*.ts" -o -name "*.vue" \) -exec sed -i '' "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" {} \;
    # 更新 index.html
    if [ -f "packages/playground/index.html" ]; then
        sed -i '' "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" packages/playground/index.html
    fi
    if [ -f "index.html" ]; then
        sed -i '' "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" index.html
    fi
else
    # Linux
    find packages/playground/src -type f \( -name "*.ts" -o -name "*.vue" \) -exec sed -i "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" {} \;
    # 更新 index.html
    if [ -f "packages/playground/index.html" ]; then
        sed -i "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" packages/playground/index.html
    fi
    if [ -f "index.html" ]; then
        sed -i "s/@${OLD_SCOPE}/@${NEW_SCOPE}/g" index.html
    fi
fi

print_success "Playground 源代码更新完成"
echo ""

# 12. 清理并重新安装依赖
print_info "清理旧的依赖..."
rm -rf node_modules packages/*/node_modules pnpm-lock.yaml

echo ""
print_info "重新安装依赖..."
pnpm install

print_success "依赖安装完成"
echo ""

# 13. 显示总结
echo "=================================================="
print_success "配置更新完成！"
echo "=================================================="
echo ""
print_info "已完成的操作："
echo "  ✅ 包名: @${OLD_SCOPE} → @${NEW_SCOPE}"
echo "  ✅ 作者: Jname → ${NEW_AUTHOR}"
echo "  ✅ 仓库: ${NEW_REPO}"
echo "  ✅ 所有 package.json 已更新"
echo "  ✅ Changeset 配置已更新"
echo "  ✅ .npmrc 配置已更新"
echo "  ✅ tsconfig.json 路径配置已更新"
echo "  ✅ vite.config.ts 配置已更新"
echo "  ✅ 文档中的包名引用已更新"
echo "  ✅ Playground 源代码已更新"
echo "  ✅ 依赖已重新安装"
echo ""
print_warning "后续步骤："
echo "  1. 运行 'pnpm build' 测试构建"
echo "  2. 运行 'pnpm typecheck' 进行类型检查"
echo "  3. 运行 'pnpm lint' 进行代码检查"
echo "  4. 登录 npm: 'npm login'"
echo "  5. 发布包: 'pnpm -r --filter='!playground' publish --access public'"
echo ""
print_info "备份文件保存在: $BACKUP_DIR"
print_info "如有问题可手动恢复"
echo ""

