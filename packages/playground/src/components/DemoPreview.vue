<template>
  <div class="demo-preview">
    <component :is="currentComponent" :api-config="apiConfig" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ContentCardDemo from '../demos/ContentCardDemo.vue';
import ImageUploaderDemo from '../demos/ImageUploaderDemo.vue';
import OrganizationDemo from '../demos/OrganizationDemo.vue';
import PullRefreshDemo from '../demos/PullRefreshDemo.vue';
import StepsCardDemo from '../demos/StepsCardDemo.vue';
import TabsDemo from '../demos/TabsDemo.vue';
import UseRefreshListDemo from '../demos/UseRefreshListDemo.vue';

interface Props {
  currentDemo: string;
  apiConfig?: any;
}

const props = defineProps<Props>();

const demoComponents = {
  'tabs': TabsDemo,
  'content-card': ContentCardDemo,
  'steps-card': StepsCardDemo,
  'organization': OrganizationDemo,
  'image-uploader': ImageUploaderDemo,
  'pull-refresh': PullRefreshDemo,
  'use-refresh-list': UseRefreshListDemo
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
