<template>
  <div class="mobile-page">
    <VanNavBar title="Tabs 标签页" />

    <div class="demo-content">
      <div class="demo-block">
        <h3>基础用法</h3>
        <JTabs v-model="activeTab" :tab-options="tabs" />
        <div class="result">
          当前选中: {{ activeTab }}
        </div>
      </div>

      <div class="demo-block">
        <h3>带数量的标签</h3>
        <JTabs v-model="activeTab2" :tab-options="tabsWithCount" />
      </div>

      <div class="demo-block">
        <h3>多个标签</h3>
        <JTabs v-model="activeTab3" :tab-options="manyTabs" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { JTabs } from '@jname/components';
import { NavBar as VanNavBar } from 'vant';
import { ref } from 'vue';

const activeTab = ref('home');
const activeTab2 = ref('all');
const activeTab3 = ref('tab1');

const tabs = ref([
  { label: '首页', value: 'home' },
  { label: '发现', value: 'discover' },
  { label: '我的', value: 'mine' }
]);

const tabsWithCount = ref([
  { label: '全部', value: 'all', count: 99 },
  { label: '待处理', value: 'pending', count: 5 },
  { label: '已完成', value: 'done', count: 24 }
]);

const manyTabs = ref([
  { label: '推荐', value: 'tab1' },
  { label: '热点', value: 'tab2' },
  { label: '科技', value: 'tab3' },
  { label: '体育', value: 'tab4' },
  { label: '娱乐', value: 'tab5' }
]);
</script>

<style scoped>
.mobile-page {
  height: 100%;
  background: #f8f9fa;
}

.demo-content {
  padding: 16px;
}

.demo-block {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.demo-block h3 {
  font-size: 16px;
  color: #323233;
  margin-bottom: 16px;
}

.result {
  margin-top: 16px;
  padding: 12px;
  background: #f2f3f5;
  border-radius: 4px;
  font-size: 14px;
  color: #646566;
}
</style>
