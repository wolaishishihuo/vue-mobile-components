// Tabs 组件完整代码示例和文档
export const tabsExamples = {
  // 基础用法
  basic: `<template>
  <JTabs v-model="activeTab" :tab-options="tabs" />
  <div class="tab-content">
    当前选中: {{ activeTab }}
  </div>
</template>

<script setup>
import { JTabs } from '@jname/components';
import { ref } from 'vue';

const activeTab = ref('home');

const tabs = ref([
  { label: '首页', value: 'home' },
  { label: '发现', value: 'discover' },
  { label: '我的', value: 'mine' }
]);
<\/script>`,

  // 带数量标签
  withCount: `<template>
  <JTabs v-model="activeTab" :tab-options="tabsWithCount" />

  <div class="tab-content">
    <div v-if="activeTab === 'all'">
      全部任务列表 ({{ getAllCount() }} 个)
    </div>
    <div v-else-if="activeTab === 'pending'">
      待处理任务 ({{ getPendingCount() }} 个)
    </div>
    <div v-else-if="activeTab === 'done'">
      已完成任务 ({{ getDoneCount() }} 个)
    </div>
  </div>
</template>

<script setup>
import { JTabs } from '@jname/components';
import { ref } from 'vue';

const activeTab = ref('all');

const tabsWithCount = ref([
  { label: '全部', value: 'all', count: 99 },
  { label: '待处理', value: 'pending', count: 5 },
  { label: '已完成', value: 'done', count: 24 }
]);

const getAllCount = () => tabsWithCount.value.find(t => t.value === 'all')?.count || 0;
const getPendingCount = () => tabsWithCount.value.find(t => t.value === 'pending')?.count || 0;
const getDoneCount = () => tabsWithCount.value.find(t => t.value === 'done')?.count || 0;
<\/script>`,

  // 多标签滑动
  manyTabs: `<template>
  <JTabs v-model="activeTab" :tab-options="manyTabs" />

  <div class="tab-content">
    <KeepAlive>
      <component :is="getCurrentComponent()" />
    </KeepAlive>
  </div>
</template>

<script setup>
import { JTabs } from '@jname/components';
import { ref, shallowRef } from 'vue';
import RecommendPage from './pages/RecommendPage.vue';
import HotPage from './pages/HotPage.vue';
import TechPage from './pages/TechPage.vue';
import SportsPage from './pages/SportsPage.vue';
import EntertainmentPage from './pages/EntertainmentPage.vue';

const activeTab = ref('recommend');

const manyTabs = ref([
  { label: '推荐', value: 'recommend' },
  { label: '热点', value: 'hot' },
  { label: '科技', value: 'tech' },
  { label: '体育', value: 'sports' },
  { label: '娱乐', value: 'entertainment' }
]);

const componentMap = {
  'recommend': RecommendPage,
  'hot': HotPage,
  'tech': TechPage,
  'sports': SportsPage,
  'entertainment': EntertainmentPage
};

const getCurrentComponent = () => {
  return componentMap[activeTab.value] || RecommendPage;
};
<\/script>`,

  // 动态标签
  dynamic: `<template>
  <div>
    <JTabs
      v-model="activeTab"
      :tab-options="dynamicTabs"
      @change="handleTabChange"
    />

    <div class="tab-management">
      <van-button size="small" @click="addTab">添加标签</van-button>
      <van-button size="small" @click="removeTab" :disabled="dynamicTabs.length <= 1">
        删除当前标签
      </van-button>
      <van-button size="small" @click="updateCount">更新数量</van-button>
    </div>

    <div class="tab-content">
      当前标签: {{ getCurrentTabLabel() }}
    </div>
  </div>
</template>

<script setup>
import { JTabs } from '@jname/components';
import { Button as VanButton } from 'vant';
import { ref, computed } from 'vue';

const activeTab = ref('tab1');

const dynamicTabs = ref([
  { label: '标签1', value: 'tab1', count: 0 },
  { label: '标签2', value: 'tab2', count: 5 },
  { label: '标签3', value: 'tab3', count: 12 }
]);

const getCurrentTabLabel = () => {
  return dynamicTabs.value.find(tab => tab.value === activeTab.value)?.label || '';
};

const handleTabChange = (value) => {
  console.log('标签切换到:', value);
};

const addTab = () => {
  const newIndex = dynamicTabs.value.length + 1;
  const newTab = {
    label: \`标签\${newIndex}\`,
    value: \`tab\${newIndex}\`,
    count: Math.floor(Math.random() * 20)
  };
  dynamicTabs.value.push(newTab);
};

const removeTab = () => {
  const currentIndex = dynamicTabs.value.findIndex(tab => tab.value === activeTab.value);
  if (dynamicTabs.value.length > 1) {
    dynamicTabs.value.splice(currentIndex, 1);
    // 如果删除的是当前标签，切换到第一个标签
    if (!dynamicTabs.value.find(tab => tab.value === activeTab.value)) {
      activeTab.value = dynamicTabs.value[0].value;
    }
  }
};

const updateCount = () => {
  dynamicTabs.value.forEach(tab => {
    tab.count = Math.floor(Math.random() * 50);
  });
};
<\/script>`,

  // 插槽用法
  slots: `<template>
  <!-- 自定义标签内容 -->
  <JTabs v-model="activeTab" :tab-options="customTabs">
    <template #tab="{ tab, active }">
      <div class="custom-tab" :class="{ active }">
        <van-icon :name="tab.icon" />
        <span>{{ tab.label }}</span>
        <van-badge v-if="tab.count > 0" :content="tab.count" />
      </div>
    </template>
  </JTabs>

  <!-- 自定义标签栏 -->
  <JTabs v-model="activeTab2">
    <template #tabs>
      <div class="custom-tabs-bar">
        <div
          v-for="tab in customTabs2"
          :key="tab.value"
          class="custom-tab-item"
          :class="{ active: activeTab2 === tab.value }"
          @click="activeTab2 = tab.value"
        >
          <div class="tab-icon">{{ tab.emoji }}</div>
          <div class="tab-label">{{ tab.label }}</div>
        </div>
      </div>
    </template>
  </JTabs>
</template>

<script setup>
import { JTabs } from '@jname/components';
import { Icon as VanIcon, Badge as VanBadge } from 'vant';
import { ref } from 'vue';

const activeTab = ref('message');
const activeTab2 = ref('home');

const customTabs = ref([
  { label: '消息', value: 'message', icon: 'chat-o', count: 5 },
  { label: '联系人', value: 'contacts', icon: 'friends-o', count: 0 },
  { label: '发现', value: 'discover', icon: 'search', count: 2 }
]);

const customTabs2 = ref([
  { label: '首页', value: 'home', emoji: '🏠' },
  { label: '搜索', value: 'search', emoji: '🔍' },
  { label: '消息', value: 'message', emoji: '💬' },
  { label: '我的', value: 'profile', emoji: '👤' }
]);
<\/script>`,

  // API 接口
  api: `interface TabItem {
  /** 标签文本 */
  label: string;
  /** 标签值 */
  value: string;
  /** 数量徽章 */
  count?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义图标 */
  icon?: string;
  /** 自定义类名 */
  className?: string;
}

interface TabsProps {
  /** 当前激活的标签值 */
  modelValue: string;
  /** 标签选项列表 */
  tabOptions: TabItem[];
  /** 标签栏位置 */
  position?: 'top' | 'bottom';
  /** 是否显示滑动动画 */
  animated?: boolean;
  /** 是否开启手势滑动 */
  swipeable?: boolean;
  /** 标签栏样式类型 */
  type?: 'line' | 'card';
  /** 标签颜色 */
  color?: string;
  /** 背景色 */
  background?: string;
}

interface TabsSlots {
  /** 默认插槽 - 标签内容区域 */
  default?: () => any;
  /** 标签插槽 - 自定义单个标签 */
  tab?: (props: { tab: TabItem; active: boolean; index: number }) => any;
  /** 标签栏插槽 - 自定义整个标签栏 */
  tabs?: () => any;
}

interface TabsEmits {
  /** 标签值更新 */
  'update:modelValue': [value: string];
  /** 标签切换事件 */
  'change': [value: string, tab: TabItem];
  /** 标签点击事件 */
  'click': [value: string, tab: TabItem, event: Event];
}`,

  // 完整应用示例
  fullExample: `<template>
  <div class="app-layout">
    <!-- 顶部标签栏 -->
    <JTabs
      v-model="currentTab"
      :tab-options="appTabs"
      position="top"
      type="line"
      @change="handleTabChange"
    >
      <template #tab="{ tab, active }">
        <div class="app-tab" :class="{ active }">
          <van-icon :name="tab.icon" />
          <span>{{ tab.label }}</span>
          <van-badge v-if="tab.count > 0" :content="tab.count" />
        </div>
      </template>
    </JTabs>

    <!-- 标签内容区域 -->
    <div class="tab-panels">
      <KeepAlive>
        <component :is="currentComponent" :key="currentTab" />
      </KeepAlive>
    </div>

    <!-- 底部标签栏 -->
    <JTabs
      v-model="bottomTab"
      :tab-options="bottomTabs"
      position="bottom"
      type="card"
      class="bottom-tabs"
    />
  </div>
</template>

<script setup>
import { JTabs } from '@jname/components';
import { Icon as VanIcon, Badge as VanBadge } from 'vant';
import { ref, computed } from 'vue';

const currentTab = ref('news');
const bottomTab = ref('home');

const appTabs = ref([
  { label: '新闻', value: 'news', icon: 'newspaper-o', count: 3 },
  { label: '视频', value: 'video', icon: 'video-o', count: 0 },
  { label: '图片', value: 'photo', icon: 'photo-o', count: 1 },
  { label: '专题', value: 'topic', icon: 'bookmark-o', count: 0 }
]);

const bottomTabs = ref([
  { label: '首页', value: 'home', icon: 'wap-home-o' },
  { label: '分类', value: 'category', icon: 'apps-o' },
  { label: '购物车', value: 'cart', icon: 'shopping-cart-o', count: 2 },
  { label: '我的', value: 'profile', icon: 'user-o' }
]);

// 组件映射
const componentMap = {
  'news': () => import('./pages/NewsPage.vue'),
  'video': () => import('./pages/VideoPage.vue'),
  'photo': () => import('./pages/PhotoPage.vue'),
  'topic': () => import('./pages/TopicPage.vue')
};

const currentComponent = computed(() => {
  return componentMap[currentTab.value] || componentMap.news;
});

const handleTabChange = (value, tab) => {
  console.log('切换到标签:', value, tab);

  // 清除该标签的数量提示
  const targetTab = appTabs.value.find(t => t.value === value);
  if (targetTab) {
    targetTab.count = 0;
  }
};
<\/script>

<style scoped>
.app-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 12px;
}

.app-tab .van-icon {
  margin-bottom: 4px;
}

.tab-panels {
  flex: 1;
  overflow: hidden;
}

.bottom-tabs {
  border-top: 1px solid #ebedf0;
}
</style>`,

  // 自定义样式
  customStyle: `<template>
  <div class="custom-tabs-demo">
    <!-- 卡片风格 -->
    <JTabs
      v-model="cardTab"
      :tab-options="cardTabs"
      type="card"
      color="#1989fa"
      background="#f7f8fa"
    />

    <!-- 线条风格 -->
    <JTabs
      v-model="lineTab"
      :tab-options="lineTabs"
      type="line"
      color="#07c160"
    />

    <!-- 自定义颜色主题 -->
    <JTabs
      v-model="themeTab"
      :tab-options="themeTabs"
      type="line"
      color="#ff976a"
    >
      <template #tab="{ tab, active }">
        <div class="theme-tab" :class="{ active }">
          {{ tab.label }}
          <div v-if="active" class="active-indicator"></div>
        </div>
      </template>
    </JTabs>
  </div>
</template>

<script setup>
import { JTabs } from '@jname/components';
import { ref } from 'vue';

const cardTab = ref('design');
const lineTab = ref('frontend');
const themeTab = ref('vue');

const cardTabs = ref([
  { label: '设计', value: 'design' },
  { label: '前端', value: 'frontend' },
  { label: '后端', value: 'backend' }
]);

const lineTabs = ref([
  { label: '前端开发', value: 'frontend' },
  { label: '后端开发', value: 'backend' },
  { label: '移动开发', value: 'mobile' },
  { label: '运维部署', value: 'devops' }
]);

const themeTabs = ref([
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' }
]);
<\/script>

<style scoped>
.custom-tabs-demo {
  padding: 16px;
}

.custom-tabs-demo > * {
  margin-bottom: 24px;
}

.theme-tab {
  position: relative;
  padding: 8px 16px;
  transition: all 0.3s;
}

.theme-tab.active {
  color: #ff976a;
  font-weight: 500;
}

.active-indicator {
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background: #ff976a;
  border-radius: 2px;
}
</style>`,

  // 事件处理
  events: `<template>
  <div>
    <JTabs
      v-model="activeTab"
      :tab-options="tabs"
      @change="handleChange"
      @click="handleClick"
    />

    <div class="event-logs">
      <h4>事件日志:</h4>
      <div
        v-for="(log, index) in eventLogs"
        :key="index"
        class="log-item"
      >
        <span class="log-time">{{ log.time }}</span>
        <span class="log-event">{{ log.event }}</span>
        <span class="log-data">{{ log.data }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { JTabs } from '@jname/components';
import { ref } from 'vue';

const activeTab = ref('home');
const eventLogs = ref([]);

const tabs = ref([
  { label: '首页', value: 'home' },
  { label: '消息', value: 'message', count: 3 },
  { label: '设置', value: 'settings' }
]);

const addLog = (event, data) => {
  eventLogs.value.unshift({
    time: new Date().toLocaleTimeString(),
    event,
    data: JSON.stringify(data)
  });

  // 只保留最近 10 条日志
  if (eventLogs.value.length > 10) {
    eventLogs.value = eventLogs.value.slice(0, 10);
  }
};

const handleChange = (value) => {
  addLog('change', { value });
};

const handleClick = (value, tab, event) => {
  addLog('click', { value, label: tab.label });
};
<\/script>`,

  // API 接口
  api: `interface TabItem {
  /** 标签文本 */
  label: string;
  /** 标签值 */
  value: string;
  /** 数量徽章 */
  count?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义图标 */
  icon?: string;
  /** 自定义类名 */
  className?: string;
}

interface TabsProps {
  /** 当前激活的标签值 */
  modelValue: string;
  /** 标签选项列表 */
  tabOptions: TabItem[];
  /** 标签栏位置 */
  position?: 'top' | 'bottom';
  /** 是否显示滑动动画 */
  animated?: boolean;
  /** 是否开启手势滑动 */
  swipeable?: boolean;
  /** 标签栏样式类型 */
  type?: 'line' | 'card';
  /** 标签颜色 */
  color?: string;
  /** 背景色 */
  background?: string;
  /** 是否粘性定位 */
  sticky?: boolean;
  /** 粘性定位偏移量 */
  offsetTop?: number;
}

interface TabsSlots {
  /** 默认插槽 - 标签内容区域 */
  default?: () => any;
  /** 标签插槽 - 自定义单个标签 */
  tab?: (props: { tab: TabItem; active: boolean; index: number }) => any;
  /** 标签栏插槽 - 自定义整个标签栏 */
  tabs?: () => any;
}

interface TabsEmits {
  /** 标签值更新 */
  'update:modelValue': [value: string];
  /** 标签切换事件 */
  'change': [value: string, tab: TabItem];
  /** 标签点击事件 */
  'click': [value: string, tab: TabItem, event: Event];
  /** 滑动事件 */
  'swipe': [direction: 'left' | 'right'];
}`
};
