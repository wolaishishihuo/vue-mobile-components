<template>
  <div class="tabs-demo">
    <h3>基础用法</h3>
    <div class="demo-section">
      <Tabs
        v-model:model-value="activeTab1"
        :tab-options="basicTabs"
        @change="handleTabChange"
      />
      <p class="result">
        当前选中：{{ activeTab1 }}
      </p>
    </div>

    <h3>带计数的标签</h3>
    <div class="demo-section">
      <Tabs
        v-model:model-value="activeTab2"
        :tab-options="tabsWithCount"
        @change="handleCountTabChange"
      />
      <p class="result">
        当前选中：{{ activeTab2 }}
      </p>
    </div>

    <h3>多标签场景</h3>
    <div class="demo-section">
      <Tabs
        v-model:model-value="activeTab3"
        :tab-options="manyTabs"
        @change="handleManyTabChange"
      />
      <p class="result">
        当前选中：{{ activeTab3 }}
      </p>
    </div>

    <h3>内容区域</h3>
    <div class="demo-section">
      <Tabs
        v-model:model-value="activeTab4"
        :tab-options="contentTabs"
        @change="handleContentTabChange"
      />
      <div class="content-area">
        <div v-if="activeTab4 === 'home'" class="tab-content">
          <h4>首页内容</h4>
          <p>这里是首页的内容区域，展示主要功能和信息。</p>
        </div>
        <div v-else-if="activeTab4 === 'products'" class="tab-content">
          <h4>产品列表</h4>
          <p>这里展示所有的产品信息和分类。</p>
        </div>
        <div v-else-if="activeTab4 === 'about'" class="tab-content">
          <h4>关于我们</h4>
          <p>了解更多关于我们公司的信息和历史。</p>
        </div>
        <div v-else-if="activeTab4 === 'contact'" class="tab-content">
          <h4>联系方式</h4>
          <p>获取我们的联系信息和地址。</p>
        </div>
      </div>
    </div>
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
.tabs-demo {
  width: 100%;
  padding: 0;
  background: transparent;
}

h3 {
  margin: 20px 0 15px 0;
  color: #323233;
  font-size: 16px;
  font-weight: 600;
  padding: 0 5px;
}

.demo-section {
  margin-bottom: 25px;
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.result {
  margin-top: 15px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
  color: #646566;
}

.content-area {
  margin-top: 20px;
  min-height: 120px;
  border: 1px dashed #ccc;
  border-radius: 6px;
  padding: 20px;
  background: #fafafa;
}

.tab-content h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #323233;
  font-size: 16px;
  font-weight: 600;
}

.tab-content p {
  color: #646566;
  line-height: 1.5;
  margin: 0;
}
</style>
