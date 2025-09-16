<template>
  <div class="sidebar-menu">
    <!-- 基础组件 -->
    <div class="menu-group">
      <div class="group-title">
        基础组件
      </div>
      <div
        v-for="item in basicComponents"
        :key="item.name"
        class="menu-item"
        :class="{ active: selectedDemo === item.name }"
        @click="selectDemo(item.name)"
      >
        {{ item.title }}
      </div>
    </div>

    <!-- 业务组件 -->
    <div class="menu-group">
      <div class="group-title">
        业务组件
      </div>
      <div
        v-for="item in businessComponents"
        :key="item.name"
        class="menu-item"
        :class="{ active: selectedDemo === item.name }"
        @click="selectDemo(item.name)"
      >
        {{ item.title }}
      </div>
    </div>

    <!-- Hooks -->
    <div class="menu-group">
      <div class="group-title">
        Hooks
      </div>
      <div
        v-for="item in hooks"
        :key="item.name"
        class="menu-item"
        :class="{ active: selectedDemo === item.name }"
        @click="selectDemo(item.name)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface MenuItem {
  name: string;
  title: string;
}

const emit = defineEmits<{
  select: [demoName: string];
}>();

const selectedDemo = ref('tabs');

const basicComponents: MenuItem[] = [
  { name: 'tabs', title: 'Tabs 标签页' },
  { name: 'content-card', title: 'ContentCard 内容卡片' },
  { name: 'steps-card', title: 'StepsCard 步骤卡片' }
];

const businessComponents: MenuItem[] = [
  { name: 'organization', title: 'Organization 组织架构' },
  { name: 'image-uploader', title: 'ImageUploader 图片上传' },
  { name: 'pull-refresh', title: 'PullRefresh 下拉刷新' }
];

const hooks: MenuItem[] = [
  { name: 'use-refresh-list', title: 'useRefreshList' }
];

const selectDemo = (demoName: string) => {
  selectedDemo.value = demoName;
  emit('select', demoName);
};
</script>

<style scoped>
.sidebar-menu {
  padding: 0 20px;
}

.menu-group {
  margin-bottom: 24px;
}

.group-title {
  font-size: 14px;
  font-weight: 600;
  color: #323233;
  margin-bottom: 12px;
  padding-left: 12px;
}

.menu-item {
  padding: 12px;
  font-size: 14px;
  color: #646566;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
  margin-bottom: 4px;
}

.menu-item:hover {
  background: #f2f3f5;
  color: #323233;
}

.menu-item.active {
  background: #e3f2fd;
  color: #1976d2;
  font-weight: 500;
}
</style>
