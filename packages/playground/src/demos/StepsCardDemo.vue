<template>
  <div class="mobile-page">
    <VanNavBar title="StepsCard 步骤卡片" />

    <div class="demo-content">
      <div class="demo-block">
        <h3>基础用法</h3>
        <JStepsCard>
          <template #header>
            <strong>步骤 1: 安装依赖</strong>
          </template>
          <p>使用 npm 或 pnpm 安装组件库</p>
          <code>pnpm add @jname/components</code>
        </JStepsCard>

        <JStepsCard>
          <template #header>
            <strong>步骤 2: 导入组件</strong>
          </template>
          <p>在项目中导入所需的组件</p>
          <code>import { JStepsCard } from '@jname/components'</code>
        </JStepsCard>

        <JStepsCard>
          <template #header>
            <strong>步骤 3: 使用组件</strong>
          </template>
          <p>在模板中使用组件并传入相应的 props</p>
        </JStepsCard>
      </div>

      <div class="demo-block">
        <h3>只有标题</h3>
        <JStepsCard>
          <template #header>
            <strong>完成项目配置</strong>
          </template>
        </JStepsCard>

        <JStepsCard>
          <template #header>
            <strong>开始开发</strong>
          </template>
        </JStepsCard>
      </div>

      <div class="demo-block">
        <h3>复杂内容</h3>
        <JStepsCard>
          <template #header>
            <strong>提交代码审查</strong>
          </template>
          <div>
            <p>请确保代码符合以下要求：</p>
            <ul style="margin: 8px 0; padding-left: 20px;">
              <li>代码格式化</li>
              <li>通过 ESLint 检查</li>
              <li>包含单元测试</li>
              <li>更新文档</li>
            </ul>
            <VanButton type="primary" size="small" style="margin-top: 12px;">
              提交审查
            </VanButton>
          </div>
        </JStepsCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { JStepsCard } from '@jname/components';
import { Button as VanButton, NavBar as VanNavBar } from 'vant';
</script>

<style scoped>
.mobile-page {
  height: 100%;
  background: #f8f9fa;
}

.demo-content {
  padding: 16px;
}

.demo-block {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.demo-block h3 {
  font-size: 16px;
  color: #323233;
  margin-bottom: 16px;
}

code {
  display: inline-block;
  background: #f2f3f5;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 12px;
  color: #e83e8c;
}
</style>
