<template>
  <div class="demo-container">
    <h1>Tabs 选项卡组件演示</h1>

    <!-- 基础用法 -->
    <section class="demo-section">
      <h2>基础用法</h2>
      <Tabs
        v-model:model-value="activeTab1"
        :tab-options="basicTabs"
        @change="handleTabChange"
      />
      <p class="result">
        当前选中：{{ activeTab1 }}
      </p>
    </section>

    <!-- 带计数的标签 -->
    <section class="demo-section">
      <h2>带计数的标签</h2>
      <Tabs
        v-model:model-value="activeTab2"
        :tab-options="tabsWithCount"
        @change="handleCountTabChange"
      />
      <p class="result">
        当前选中：{{ activeTab2 }}
      </p>
    </section>

    <!-- 多标签场景 -->
    <section class="demo-section">
      <h2>多标签场景</h2>
      <Tabs
        v-model:model-value="activeTab3"
        :tab-options="manyTabs"
        @change="handleManyTabChange"
      />
      <p class="result">
        当前选中：{{ activeTab3 }}
      </p>
    </section>

    <!-- 内容展示区域 -->
    <section class="demo-section">
      <h2>内容区域</h2>
      <Tabs
        v-model:model-value="activeTab4"
        :tab-options="contentTabs"
        @change="handleContentTabChange"
      />
      <div class="content-area">
        <div v-if="activeTab4 === 'home'" class="tab-content">
          <h3>首页内容</h3>
          <p>这里是首页的内容区域，展示主要功能和信息。</p>
        </div>
        <div v-else-if="activeTab4 === 'products'" class="tab-content">
          <h3>产品列表</h3>
          <p>这里展示所有的产品信息和分类。</p>
        </div>
        <div v-else-if="activeTab4 === 'about'" class="tab-content">
          <h3>关于我们</h3>
          <p>了解更多关于我们公司的信息和历史。</p>
        </div>
        <div v-else-if="activeTab4 === 'contact'" class="tab-content">
          <h3>联系方式</h3>
          <p>获取我们的联系信息和地址。</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { TabItem } from '../types';
import { ref } from 'vue';
import Tabs from '../index.vue';

defineOptions({
  name: 'TabsDemo'
});

// 基础标签数据
const basicTabs: TabItem[] = [
  { label: '推荐', value: 'recommend' },
  { label: '热门', value: 'hot' },
  { label: '最新', value: 'latest' }
];

// 带计数的标签数据
const tabsWithCount: TabItem[] = [
  { label: '全部', value: 'all', count: 128 },
  { label: '待处理', value: 'pending', count: 12 },
  { label: '已完成', value: 'completed', count: 96 },
  { label: '已取消', value: 'cancelled', count: 20 }
];

// 多标签数据
const manyTabs: TabItem[] = [
  { label: '科技', value: 'tech' },
  { label: '体育', value: 'sports' },
  { label: '娱乐', value: 'entertainment' },
  { label: '财经', value: 'finance' },
  { label: '教育', value: 'education' },
  { label: '旅游', value: 'travel' },
  { label: '健康', value: 'health' }
];

// 内容标签数据
const contentTabs: TabItem[] = [
  { label: '首页', value: 'home' },
  { label: '产品', value: 'products' },
  { label: '关于', value: 'about' },
  { label: '联系', value: 'contact' }
];

// 响应式数据
const activeTab1 = ref('recommend');
const activeTab2 = ref('all');
const activeTab3 = ref('tech');
const activeTab4 = ref('home');

// 事件处理函数
const handleTabChange = (value: string) => {
  console.log('基础标签切换:', value);
};

const handleCountTabChange = (value: string) => {
  console.log('计数标签切换:', value);
};

const handleManyTabChange = (value: string) => {
  console.log('多标签切换:', value);
};

const handleContentTabChange = (value: string) => {
  console.log('内容标签切换:', value);
};
</script>

<style scoped>
.demo-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
}

.demo-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
}

.result {
  margin-top: 15px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
}

.content-area {
  margin-top: 20px;
  min-height: 120px;
  border: 1px dashed #ccc;
  border-radius: 6px;
  padding: 20px;
  background: #fafafa;
}

.tab-content h3 {
  margin-top: 0;
  color: #333;
  font-size: 16px;
}

.tab-content p {
  color: #666;
  line-height: 1.6;
}
</style>
