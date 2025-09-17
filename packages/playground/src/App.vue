<template>
  <div class="playground">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h1>@jname/components</h1>
        <div class="version">
          v1.3.13
        </div>
      </div>

      <nav class="sidebar-nav">
        <SidebarMenu @select="onMenuSelect" />
      </nav>

      <!-- API 配置区域 -->
      <div class="api-config-section">
        <div class="config-header">
          <h3>API 配置</h3>
        </div>
        <div class="config-form">
          <VanField
            v-model="apiConfig.baseUrl"
            label="API 地址"
            placeholder="请输入 API 基础地址"
          />
          <VanField
            v-model="apiConfig.token"
            label="Token"
            placeholder="请输入访问令牌"
            type="password"
          />
          <div class="config-status">
            <VanTag :type="isApiConfigValid ? 'success' : 'warning'">
              {{ isApiConfigValid ? '已配置' : '未配置' }}
            </VanTag>
          </div>
        </div>
      </div>
    </aside>

    <!-- 右侧内容区域 -->
    <main class="main-content">
      <!-- Demo 预览区 -->
      <div class="demo-container">
        <div class="mobile-frame">
          <div class="mobile-screen">
            <DemoPreview :current-demo="currentDemo" :api-config="computedApiConfig" />
          </div>
        </div>
      </div>

      <!-- 代码示例区 -->
      <div class="code-container">
        <CodeExample :current-demo="currentDemo" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Field as VanField, Tag as VanTag } from 'vant';
import { computed, reactive, ref } from 'vue';
import CodeExample from './components/CodeExample.vue';
import DemoPreview from './components/DemoPreview.vue';
import SidebarMenu from './components/SidebarMenu.vue';

const currentDemo = ref('tabs');

// API 配置状态
const apiConfig = reactive({
  baseUrl: 'https://dev.psctech.net:18100/electronicscreen/api',
  token: ''
});

// 检查 API 配置是否有效
const isApiConfigValid = computed(() => {
  return apiConfig.baseUrl.trim() !== '' && apiConfig.token.trim() !== '';
});

// 计算后的 API 配置对象
const computedApiConfig = computed(() => ({
  baseUrl: apiConfig.baseUrl,
  getToken: () => apiConfig.token
}));

const onMenuSelect = (demoName: string) => {
  currentDemo.value = demoName;
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f8f9fa;
}

.playground {
  display: flex;
  height: 100vh;
}

/* 左侧导航栏 */
.sidebar {
  width: 280px;
  background: #fff;
  border-right: 1px solid #ebedf0;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid #ebedf0;
}

.sidebar-header h1 {
  font-size: 20px;
  color: #323233;
  margin-bottom: 8px;
}

.version {
  color: #969799;
  font-size: 12px;
  text-align: end;
}

.sidebar-nav {
  padding: 16px 0;
  flex: 1;
  overflow-y: auto;
}

/* API 配置区域 */
.api-config-section {
  border-top: 1px solid #ebedf0;
  padding: 16px 20px;
  background: #f8f9fa;
}

.config-header {
  margin-bottom: 12px;
}

.config-header h3 {
  font-size: 14px;
  color: #323233;
  font-weight: 600;
}

.config-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.config-status {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}

/* 右侧内容区 */
.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* Demo 预览区 */
.demo-container {
  flex: 1;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #f8f9fa;
}

.mobile-frame {
  width: 750px;
  height: 667px;
  background: #000;
  border-radius: 24px;
  padding: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.mobile-screen {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}

/* 代码示例区 */
.code-container {
  width: 30vw;
  background: #fff;
  border-left: 1px solid #ebedf0;
  overflow: auto;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .code-container {
    display: none;
  }

  .demo-container {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>
