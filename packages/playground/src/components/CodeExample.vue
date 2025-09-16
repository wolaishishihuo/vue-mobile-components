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
import { computed, ref } from 'vue';
import { contentCardExamples } from '../code-examples/content-card';
import { stepsCardExamples } from '../code-examples/steps-card';
import { tabsExamples } from '../code-examples/tabs';

interface Props {
  currentDemo: string;
}

const props = defineProps<Props>();

const activeTab = ref('vue');

const tabs = [
  { key: 'vue', label: 'Vue' },
  { key: 'api', label: 'API' }
];

// 代码示例映射
const codeExamples = {
  'tabs': tabsExamples,
  'content-card': contentCardExamples,
  'steps-card': stepsCardExamples
};

const currentCode = computed(() => {
  const demo = codeExamples[props.currentDemo as keyof typeof codeExamples];
  return demo ? demo[activeTab.value as keyof typeof demo] || demo.vue : '';
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
