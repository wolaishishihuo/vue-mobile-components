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
        <div class="item-title">
          {{ item.title }}
        </div>
        <div v-if="item.description && selectedDemo === item.name" class="item-description">
          {{ item.description }}
        </div>
      </div>
    </div>

    <!-- 业务组件 -->
    <div class="menu-group">
      <div class="group-title">
        业务组件 (基于vant组件)
      </div>
      <div
        v-for="item in businessComponents"
        :key="item.name"
        class="menu-item"
        :class="{ active: selectedDemo === item.name }"
        @click="selectDemo(item.name)"
      >
        <div class="item-title">
          {{ item.title }}
        </div>
        <div v-if="item.description && selectedDemo === item.name" class="item-description">
          {{ item.description }}
        </div>
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
        <div class="item-title">
          {{ item.title }}
        </div>
        <div v-if="item.description && selectedDemo === item.name" class="item-description">
          {{ item.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface MenuItem {
  name: string;
  title: string;
  description?: string;
}

const emit = defineEmits<{
  select: [demoName: string];
}>();

const selectedDemo = ref('tabs');

const basicComponents: MenuItem[] = [
  {
    name: 'tabs',
    title: 'Tabs 标签页',
    description: '支持滑动切换的标签页组件，适用于内容分类展示'
  },
  {
    name: 'content-card',
    title: 'ContentCard 内容卡片',
    description: '灵活的内容卡片组件，支持标题、内容、操作按钮等'
  },
  {
    name: 'steps-card',
    title: 'StepsCard 步骤卡片',
    description: '步骤流程展示卡片，清晰展示多步骤操作流程'
  }
];

const businessComponents: MenuItem[] = [
  {
    name: 'organization',
    title: 'Organization 组织架构',
    description: '企业组织架构树形展示组件，支持层级展示和交互操作'
  },
  {
    name: 'image-uploader',
    title: 'ImageUploader 图片上传',
    description: '多功能图片上传组件，支持压缩、预览、批量上传等功能'
  },
  {
    name: 'pull-refresh',
    title: 'PullRefresh 下拉刷新',
    description: '下拉刷新列表组件，集成分页加载和数据刷新功能'
  }
];

const hooks: MenuItem[] = [
  {
    name: 'use-refresh-list',
    title: 'useRefreshList',
    description: '列表数据管理 Hook，提供分页、刷新、加载更多等功能'
  }
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

.item-title {
  font-weight: 500;
  margin-bottom: 4px;
}

.item-description {
  font-size: 12px;
  color: #969799;
  line-height: 1.4;
  opacity: 0.8;
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px solid #f2f3f5;
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
    max-height: 0;
  }
  to {
    opacity: 0.8;
    transform: translateY(0);
    max-height: 50px;
  }
}

.menu-item.active .item-description {
  color: #1976d2;
  opacity: 0.7;
  border-top-color: #e3f2fd;
}
</style>
