<template>
  <div id="app" class="app">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="
        currentView === 'list'
          ? 'Vue Mobile Components'
          : currentComponent?.name
      "
      fixed
      placeholder
      :left-arrow="currentView === 'detail'"
      @click-left="goBack"
    />
    <!-- 组件列表 -->
    <div v-if="currentView === 'list'" class="content">
      <van-cell-group inset>
        <van-cell
          v-for="component in componentList"
          :key="component.id"
          :title="component.name"
          :label="component.desc"
          :icon="component.icon"
          is-link
          @click="showComponent(component)"
        >
          <template #right-icon>
            <van-tag
              :type="component.status === '已完成' ? 'success' : 'warning'"
              size="medium"
            >
              {{ component.status }}
            </van-tag>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 组件预览 -->
    <div v-else class="content">
      <div class="demo-section">
        <component :is="currentComponent?.demo" v-if="currentComponent?.demo" />
        <div v-else class="demo-placeholder">
          <van-empty description="组件开发中..." />
        </div>
      </div>

      <van-cell-group inset>
        <van-cell title="描述" :value="currentComponent?.desc" />
        <van-cell title="状态" :value="currentComponent?.status" />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ButtonDemo from './button/demo/index.vue';
import StepsCardDemo from './stepsCard/demo/index.vue';

// 页面状态管理
const currentView = ref('list'); // 'list' | 'detail'
const currentComponent = ref<any>(null);

// 组件列表数据
const componentList = ref([
  {
    id: 'button',
    name: 'Button 按钮',
    desc: '按钮用于开始一个即时操作',
    icon: 'plus',
    status: '已完成',
    demo: ButtonDemo
  },
  {
    id: 'stepsCard',
    name: 'StepsCard 步骤卡片',
    desc: '用于展示步骤流程或时间轴信息',
    icon: 'todo-list-o',
    status: '已完成',
    demo: StepsCardDemo
  },
  {
    id: 'input',
    name: 'Input 输入框',
    desc: '用户可以在文本框内输入或编辑文字',
    icon: 'edit',
    status: '开发中',
    demo: null
  },
  {
    id: 'card',
    name: 'Card 卡片',
    desc: '用于展示信息的卡片容器',
    icon: 'card',
    status: '开发中',
    demo: null
  },
  {
    id: 'list',
    name: 'List 列表',
    desc: '用于展示一系列相关信息的列表',
    icon: 'apps-o',
    status: '计划中',
    demo: null
  }
]);

// 导航方法
const showComponent = (component: any) => {
  currentComponent.value = component;
  currentView.value = 'detail';
};

const goBack = () => {
  currentView.value = 'list';
  currentComponent.value = null;
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: #f7f8fa;
}

.content {
  padding: 16px;
  padding-bottom: 20px;
  min-height: calc(100vh - 46px);
}

.van-cell-group {
  margin-bottom: 16px;
}

.van-divider {
  margin: 20px 0 16px 0;
}

.demo-section {
  padding: 20px;
  background: white;
  border-radius: 8px;
  margin-bottom: 16px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-placeholder {
  text-align: center;
}
</style>
