<template>
  <div id="app" class="app">
    <div class="container">
      <h1>Vue Mobile Components</h1>
      <p>基于 Vue 3 + Vant 4 的移动端组件库</p>

      <div class="status">
        <h2>当前状态</h2>
        <ul>
          <li>✅ 基础项目结构已搭建</li>
          <li>✅ 构建配置已完成</li>
          <li>✅ TypeScript 支持已配置</li>
          <li>✅ 样式系统已配置</li>
          <li>⏳ 等待添加组件...</li>
        </ul>
      </div>

      <div class="tips">
        <h2>下一步</h2>
        <p>
          在 <code>src/components</code> 目录下添加您的组件，然后在
          <code>src/index.ts</code> 中导入和导出。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里可以导入和使用您的组件
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px;
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 0.5rem;
}

h2 {
  color: #555;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
}

p {
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
}

.status ul {
  list-style: none;
  padding: 0;
}

.status li {
  padding: 0.5rem 0;
  font-size: 1.1rem;
}

.tips {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
}

code {
  background: #e9ecef;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: "Courier New", monospace;
}
</style>
