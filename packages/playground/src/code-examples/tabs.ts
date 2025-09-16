// Tabs 组件代码示例
export const tabsExamples = {
  vue: `<template>
  <JTabs v-model="activeTab" :tab-options="tabs" />
  <div class="result">当前选中: {{ activeTab }}</div>
</template>

<script setup>
import { JTabs } from '@jname/components';
import { ref } from 'vue';

const activeTab = ref('home');
const tabs = ref([
  { label: '首页', value: 'home' },
  { label: '发现', value: 'discover' },
  { label: '我的', value: 'mine' }
]);
<\/script>`,

  api: `interface TabItem {
  label: string;
  value: string;
  count?: number;
}

interface TabsProps {
  modelValue: string;
  tabOptions: TabItem[];
}

interface TabsEmits {
  'update:modelValue': [value: string];
  'change': [value: string];
}`
};
