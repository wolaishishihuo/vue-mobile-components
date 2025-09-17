// PullRefresh 组件完整代码示例和文档
export const pullRefreshExamples = {
  // 基础用法
  basic: `<template>
  <JPullRefresh :api-fn="loadDataApi">
    <template #default="{ data }">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="list-item"
      >
        <h4>{{ item.title }}</h4>
        <p>{{ item.description }}</p>
        <span class="time">{{ item.time }}</span>
      </div>
    </template>
  </JPullRefresh>
</template>

<script setup>
import { JPullRefresh } from '@jname/business';

// API 函数 - 必须返回指定格式
const loadDataApi = async (params) => {
  const { pageNum = 1, pageSize = 10 } = params;

  // 模拟 API 请求
  const response = await fetch(\`/api/news?page=\${pageNum}&size=\${pageSize}\`);
  const result = await response.json();

  return {
    data: {
      records: result.list,  // 数据列表
      total: result.total    // 总数量
    }
  };
};
<\/script>`,

  // 禁用下拉刷新
  disablePull: `<template>
  <JPullRefresh
    :api-fn="loadDataApi"
    :disable-pull-refresh="true"
    :immediate="false"
  >
    <template #default="{ data }">
      <div
        v-for="item in data"
        :key="item.id"
        class="list-item"
      >
        {{ item.title }}
      </div>
    </template>
  </JPullRefresh>

  <!-- 手动控制 -->
  <div class="controls">
    <van-button @click="$refs.listRef.onRefresh()">
      手动刷新
    </van-button>
    <van-button @click="$refs.listRef.onLoad()">
      加载更多
    </van-button>
  </div>
</template>

<script setup>
import { JPullRefresh } from '@jname/business';
import { Button as VanButton } from 'vant';

const loadDataApi = async (params) => {
  // API 实现...
  return { data: { records: [], total: 0 } };
};
<\/script>`,

  // 带搜索功能
  withSearch: `<template>
  <div>
    <van-search
      v-model="searchValue"
      placeholder="搜索内容"
      @search="handleSearch"
      @clear="handleClear"
    />

    <JPullRefresh
      ref="listRef"
      :api-fn="searchApi"
      :extra-params="searchParams"
    >
      <template #default="{ data }">
        <div
          v-for="item in data"
          :key="item.id"
          class="search-item"
        >
          <div class="item-title">{{ item.title }}</div>
          <div class="item-content">{{ item.content }}</div>
        </div>
      </template>
    </JPullRefresh>
  </div>
</template>

<script setup>
import { JPullRefresh } from '@jname/business';
import { Search as VanSearch } from 'vant';
import { ref, reactive } from 'vue';

const searchValue = ref('');
const searchParams = reactive({});

const searchApi = async (params) => {
  const { pageNum = 1, pageSize = 10, ...extraParams } = params;

  // 合并搜索参数
  const searchParams = {
    page: pageNum,
    size: pageSize,
    keyword: extraParams.keyword || ''
  };

  const response = await fetch('/api/search', {
    method: 'POST',
    body: JSON.stringify(searchParams)
  });

  return response.json();
};

const handleSearch = () => {
  // 更新搜索参数，组件会自动重新加载
  Object.assign(searchParams, { keyword: searchValue.value });
};

const handleClear = () => {
  searchValue.value = '';
  Object.assign(searchParams, { keyword: '' });
};
<\/script>`,

  // 自定义状态
  customStates: `<template>
  <JPullRefresh
    :api-fn="loadDataApi"
    pulling-text="下拉可以刷新"
    loosing-text="释放立即刷新"
    loading-text="刷新中..."
    success-text="刷新成功"
    finished-text="已经到底了"
    error-text="加载失败，点击重试"
  >
    <template #default="{ data }">
      <div v-for="item in data" :key="item.id">
        {{ item.title }}
      </div>
    </template>

    <!-- 自定义空状态 -->
    <template #empty>
      <div class="empty-state">
        <van-icon name="search" size="48" />
        <p>暂无数据</p>
        <van-button size="small" @click="refresh">重新加载</van-button>
      </div>
    </template>

    <!-- 自定义错误状态 -->
    <template #error>
      <div class="error-state">
        <van-icon name="warning-o" size="48" />
        <p>加载失败</p>
        <van-button size="small" type="primary" @click="retry">
          重试
        </van-button>
      </div>
    </template>
  </JPullRefresh>
</template>

<script setup>
import { JPullRefresh } from '@jname/business';
import { Button as VanButton, Icon as VanIcon } from 'vant';
import { ref } from 'vue';

const loadDataApi = async (params) => {
  // API 实现...
};

const refresh = () => {
  // 刷新逻辑
};

const retry = () => {
  // 重试逻辑
};
<\/script>`,

  // API 接口
  api: `interface PullRefreshListProps {
  /** API 函数 */
  apiFn: (params: any) => Promise<{
    data: {
      records: any[];
      total: number;
    };
  }>;
  /** 额外参数 */
  extraParams?: Record<string, unknown>;
  /** 是否立即执行 */
  immediate?: boolean;
  /** 是否禁用下拉刷新 */
  disablePullRefresh?: boolean;
  /** 下拉提示文本 */
  pullingText?: string;
  /** 释放提示文本 */
  loosingText?: string;
  /** 加载中文本 */
  loadingText?: string;
  /** 成功文本 */
  successText?: string;
  /** 完成文本 */
  finishedText?: string;
  /** 错误文本 */
  errorText?: string;
}

interface PullRefreshSlots {
  /** 默认插槽 - 数据列表 */
  default?: (props: { data: any[] }) => any;
  /** 空状态插槽 */
  empty?: () => any;
  /** 错误状态插槽 */
  error?: () => any;
  /** 加载中插槽 */
  loading?: () => any;
  /** 完成状态插槽 */
  finished?: () => any;
}

interface PullRefreshEmits {
  /** 加载成功 */
  'load-success': [data: any];
  /** 加载错误 */
  'load-error': [error: any];
  /** 刷新事件 */
  'refresh': [];
  /** 加载事件 */
  'load': [];
}

// 暴露的方法
interface PullRefreshExpose {
  /** 手动刷新 */
  onRefresh: () => Promise<void>;
  /** 手动加载 */
  onLoad: () => Promise<void>;
  /** 搜索 */
  onSearch: (params?: object) => void;
  /** 重置 */
  onReset: () => void;
  /** 数据源 */
  dataSource: Ref<any[]>;
}`,

  // 实际应用示例
  realWorld: `<template>
  <div class="news-app">
    <!-- 筛选条件 -->
    <div class="filters">
      <van-dropdown-menu>
        <van-dropdown-item v-model="category" :options="categoryOptions" />
        <van-dropdown-item v-model="sortBy" :options="sortOptions" />
      </van-dropdown-menu>
    </div>

    <!-- 新闻列表 -->
    <JPullRefresh
      ref="newsListRef"
      :api-fn="loadNewsApi"
      :extra-params="filterParams"
      @load-success="handleLoadSuccess"
      @load-error="handleLoadError"
    >
      <template #default="{ data }">
        <NewsItem
          v-for="news in data"
          :key="news.id"
          :news="news"
          @click="viewNews(news)"
          @share="shareNews(news)"
        />
      </template>

      <template #empty>
        <div class="empty-news">
          <van-icon name="newspaper-o" size="64" />
          <p>暂无新闻</p>
          <van-button size="small" @click="loadDefaultNews">
            加载推荐内容
          </van-button>
        </div>
      </template>
    </JPullRefresh>
  </div>
</template>

<script setup>
import { JPullRefresh } from '@jname/business';
import {
  DropdownMenu as VanDropdownMenu,
  DropdownItem as VanDropdownItem,
  Button as VanButton,
  Icon as VanIcon
} from 'vant';
import { ref, computed, watch } from 'vue';
import NewsItem from './NewsItem.vue';

const newsListRef = ref();
const category = ref('');
const sortBy = ref('latest');

// 筛选选项
const categoryOptions = [
  { text: '全部', value: '' },
  { text: '科技', value: 'tech' },
  { text: '财经', value: 'finance' },
  { text: '体育', value: 'sports' }
];

const sortOptions = [
  { text: '最新', value: 'latest' },
  { text: '热门', value: 'popular' },
  { text: '推荐', value: 'recommend' }
];

// 计算筛选参数
const filterParams = computed(() => ({
  category: category.value,
  sort: sortBy.value
}));

// 监听筛选条件变化，自动刷新
watch(filterParams, () => {
  newsListRef.value?.onRefresh();
}, { deep: true });

// 新闻 API
const loadNewsApi = async (params) => {
  const { pageNum, pageSize, category, sort } = params;

  const response = await fetch('/api/news', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      page: pageNum,
      size: pageSize,
      category,
      sort
    })
  });

  if (!response.ok) throw new Error('加载失败');

  return response.json();
};

const handleLoadSuccess = (data) => {
  console.log('加载成功', data);
};

const handleLoadError = (error) => {
  console.error('加载失败', error);
};

const viewNews = (news) => {
  // 跳转到新闻详情
  router.push(\`/news/\${news.id}\`);
};

const shareNews = (news) => {
  // 分享新闻
  console.log('分享新闻', news);
};

const loadDefaultNews = () => {
  category.value = '';
  sortBy.value = 'recommend';
};
<\/script>`
};
