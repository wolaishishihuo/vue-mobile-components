<template>
  <div class="code-example">
    <div class="tabs">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        class="tab"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </div>
    </div>

    <div class="code-content">
      <pre><code>{{ currentCode }}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { contentCardExamples } from '../code-examples/content-card';
import { imageUploaderExamples } from '../code-examples/image-uploader';
import { organizationExamples } from '../code-examples/organization';
import { pullRefreshExamples } from '../code-examples/pull-refresh';
import { stepsCardExamples } from '../code-examples/steps-card';
import { tabsExamples } from '../code-examples/tabs';
import { useRefreshListExamples } from '../code-examples/use-refresh-list';

interface Props {
  currentDemo: string;
}

const props = defineProps<Props>();

const activeTab = ref('basic');

const tabs = computed(() => {
  const demo = codeExamples[props.currentDemo as keyof typeof codeExamples] as any;
  if (!demo) return [];

  const availableTabs = [];

  // 根据组件类型显示不同的标签页
  if (props.currentDemo === 'use-refresh-list') {
    // Hook 文档
    if (demo.vue) availableTabs.push({ key: 'vue', label: 'Vue 用法' });
    if (demo.api) availableTabs.push({ key: 'api', label: 'API 接口' });
    if (demo.usage) availableTabs.push({ key: 'usage', label: '使用方法' });
  } else {
    // 组件文档
    if (demo.basic) availableTabs.push({ key: 'basic', label: '基础用法' });
    if (demo.vue) availableTabs.push({ key: 'vue', label: 'Vue' });
    if (demo.withImages) availableTabs.push({ key: 'withImages', label: '带图片' });
    if (demo.multiImages) availableTabs.push({ key: 'multiImages', label: '多图模式' });
    if (demo.compress) availableTabs.push({ key: 'compress', label: '图片压缩' });
    if (demo.multiSelect) availableTabs.push({ key: 'multiSelect', label: '多选' });
    if (demo.withSearch) availableTabs.push({ key: 'withSearch', label: '搜索' });
    if (demo.dynamic) availableTabs.push({ key: 'dynamic', label: '动态' });
    if (demo.events) availableTabs.push({ key: 'events', label: '事件' });
    if (demo.customStyle) availableTabs.push({ key: 'customStyle', label: '自定义样式' });
    if (demo.slots) availableTabs.push({ key: 'slots', label: '插槽用法' });
    if (demo.api) availableTabs.push({ key: 'api', label: 'API 接口' });
    if (demo.fullExample) availableTabs.push({ key: 'fullExample', label: '完整示例' });
    if (demo.scenarios) availableTabs.push({ key: 'scenarios', label: '使用场景' });
    if (demo.realWorld) availableTabs.push({ key: 'realWorld', label: '实际应用' });
  }

  return availableTabs;
});

// 代码示例映射
const codeExamples = {
  'tabs': tabsExamples,
  'content-card': contentCardExamples,
  'steps-card': stepsCardExamples,
  'organization': organizationExamples,
  'image-uploader': imageUploaderExamples,
  'pull-refresh': pullRefreshExamples,
  'use-refresh-list': useRefreshListExamples
};

const currentCode = computed(() => {
  const demo = codeExamples[props.currentDemo as keyof typeof codeExamples] as any;
  if (!demo) return '// 暂无代码示例';

  // 根据当前标签页返回对应的代码
  const code = demo[activeTab.value];
  if (code) return code;

  // 如果当前标签页没有对应代码，尝试返回基础用法或默认代码
  return demo.basic || demo.vue || '// 暂无代码示例';
});

// 当切换组件时，重置到第一个可用的标签页
watch(() => props.currentDemo, () => {
  const availableTabs = tabs.value;
  if (availableTabs.length > 0) {
    activeTab.value = availableTabs[0].key;
  }
});
</script>

<style scoped>
.code-example {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #ebedf0;
  background: #fff;
}

.tab {
  padding: 12px 24px;
  font-size: 14px;
  color: #646566;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.tab:hover {
  color: #323233;
}

.tab.active {
  color: #1976d2;
  border-bottom-color: #1976d2;
}

.code-content {
  flex: 1;
  overflow: auto;
  background: #f8f9fa;
}

pre {
  margin: 0;
  padding: 24px;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #323233;
  background: #fff;
  overflow: auto;
}

code {
  display: block;
}
</style>
