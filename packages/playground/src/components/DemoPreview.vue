<template>
  <div class="demo-preview">
    <component :is="currentComponent" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ContentCardDemo from '../demos/ContentCardDemo.vue';
import StepsCardDemo from '../demos/StepsCardDemo.vue';
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
  overflow-y: auto;
  background: #f8f9fa;
}
</style>
