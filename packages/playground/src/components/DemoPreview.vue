<template>
  <div class="demo-preview">
    <component :is="currentComponent" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
// @ts-expect-error - Demo components
import ContentCardDemo from '../demos/ContentCardDemo.vue';
// @ts-expect-error - Demo components
import StepsCardDemo from '../demos/StepsCardDemo.vue';
// @ts-expect-error - Demo components
import TabsDemo from '../demos/TabsDemo.vue';

interface Props {
  currentDemo: string;
}

const props = defineProps<Props>();

const demoComponents = {
  'tabs': TabsDemo,
  'content-card': ContentCardDemo,
  'steps-card': StepsCardDemo,
  'organization': TabsDemo, // 临时使用
  'image-uploader': TabsDemo, // 临时使用
  'pull-refresh': TabsDemo, // 临时使用
  'use-refresh-list': TabsDemo // 临时使用
};

const currentComponent = computed(() => {
  return demoComponents[props.currentDemo as keyof typeof demoComponents] || TabsDemo;
});
</script>

<style scoped>
.demo-preview {
  width: 100%;
  height: 100%;
  padding: 16px;
  overflow-y: auto;
  background: #f8f9fa;
}
</style>
