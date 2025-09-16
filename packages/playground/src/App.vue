<template>
  <div id="app">
    <h1>Vue Mobile Components - Playground</h1>

    <section>
      <h2>Core Package</h2>
      <p>测试 @jname/core 包的功能</p>
    </section>

    <section>
      <h2>Components Package</h2>
      <p>测试 @jname/components 包的基础组件</p>
      <JTabs v-model="activeTab" :tab-options="tabs" />
      <JContentCard title="内容卡片" content="这是一个内容卡片组件" />
    </section>

    <section>
      <h2>Business Package</h2>
      <p>测试 @jname/business 包的业务组件</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { JContentCard, JTabs } from '@jname/components';
import { ref } from 'vue';

const activeTab = ref('tab1');
const tabs = ref([
  { label: '标签1', value: 'tab1' },
  { label: '标签2', value: 'tab2' },
  { label: '标签3', value: 'tab3' }
]);
</script>

<style scoped>
#app {
  padding: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

section {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
}

h1 {
  color: #1989fa;
}

h2 {
  color: #333;
  margin-bottom: 10px;
}
</style>
