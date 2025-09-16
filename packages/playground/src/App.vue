<template>
  <div class="mobile-app">
    <!-- 移动端顶部导航 -->
    <VanNavBar title="组件库演示" />

    <!-- 主要内容区域 -->
    <div class="content">
      <!-- Tab 切换演示 -->
      <div class="demo-section">
        <h3>标签页组件</h3>
        <JTabs v-model="activeTab" :tab-options="tabs" />
        <div class="tab-content">
          当前选中: {{ activeTab }}
        </div>
      </div>

      <!-- 内容卡片演示 -->
      <div class="demo-section">
        <h3>内容卡片组件</h3>
        <JContentCard
          title="重要通知"
          desc="组件库已完成 monorepo 架构重构，请开发者及时更新使用方式"
          :images="demoImages"
          :meta="{ tagText: '公告', tagStatus: 'info', timeText: '刚刚' }"
        />
      </div>

      <!-- 步骤卡片演示 -->
      <div class="demo-section">
        <h3>步骤卡片组件</h3>
        <JStepsCard>
          <template #header>
            <strong>安装组件库</strong>
          </template>
          <p>使用 npm 或 pnpm 安装组件库包</p>
          <code>pnpm add @jname/components</code>
        </JStepsCard>

        <JStepsCard>
          <template #header>
            <strong>导入使用</strong>
          </template>
          <p>在项目中导入所需组件</p>
          <code>import { JTabs } from '@jname/components'</code>
        </JStepsCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 真实用户的导入方式
import { JContentCard, JStepsCard, JTabs } from '@jname/components';
import { NavBar as VanNavBar } from 'vant';
import { ref } from 'vue';

const activeTab = ref('home');

const tabs = ref([
  { label: '首页', value: 'home' },
  { label: '发现', value: 'discover' },
  { label: '我的', value: 'mine' }
]);

const demoImages = ref([
  'https://img.yzcdn.cn/vant/cat.jpeg'
]);
</script>

<style>
/* 模拟真实移动端应用样式 */
body {
  margin: 0;
  padding: 0;
  background-color: var(--j-background-2);
}

.mobile-app {
  max-width: 375px;
  margin: 0 auto;
  background-color: var(--j-background);
  min-height: 100vh;
}

.content {
  padding: var(--j-padding-md);
}

.demo-section {
  margin-bottom: var(--j-padding-xl);
  background: var(--j-background);
  border-radius: var(--j-radius-lg);
  padding: var(--j-padding-md);
  box-shadow: var(--j-shadow-1);
}

.demo-section h3 {
  margin: 0 0 var(--j-padding-md) 0;
  color: var(--j-text-color);
  font-size: var(--j-font-size-lg);
  font-weight: var(--j-font-bold);
}

.tab-content {
  margin-top: var(--j-padding-md);
  padding: var(--j-padding-md);
  background: var(--j-background-2);
  border-radius: var(--j-radius-md);
  color: var(--j-text-color-2);
}

code {
  background: var(--j-gray-1);
  padding: 2px 6px;
  border-radius: var(--j-radius-sm);
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: var(--j-font-size-sm);
}
</style>
