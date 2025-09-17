// useRefreshList Hook 代码示例
export const useRefreshListExamples = {
  vue: `<template>
  <div class="list-demo">
    <!-- 状态信息 -->
    <div class="status-info">
      <span>加载状态: {{ loading ? '加载中' : '已完成' }}</span>
      <span>数据总数: {{ list.length }}</span>
      <span>是否有更多: {{ hasMore ? '是' : '否' }}</span>
    </div>

    <!-- 操作按钮 -->
    <div class="actions">
      <button @click="refresh" :disabled="loading">刷新数据</button>
      <button @click="loadMore" :disabled="!hasMore || loading">加载更多</button>
      <button @click="reset">重置状态</button>
    </div>

    <!-- 列表数据 -->
    <div class="list-container">
      <div v-for="(item, index) in list" :key="index" class="list-item">
        {{ item.name }} - {{ item.description }}
      </div>

      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="!hasMore && list.length > 0" class="finished">
        没有更多数据了
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRefreshList } from '@jname/core';
import { computed } from 'vue';

// 定义 API 函数
const api = async (params = {}) => {
  const { pageNum = 1, pageSize = 10, keyword = '' } = params;

  // 模拟 API 请求
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 模拟数据
  const mockData = [
    { name: '张三', description: '前端工程师' },
    { name: '李四', description: '后端工程师' },
    { name: '王五', description: '产品经理' }
    // ... 更多数据
  ];

  // 分页处理
  const startIndex = (pageNum - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const records = mockData.slice(startIndex, endIndex);

  return {
    data: {
      records,
      total: mockData.length
    }
  };
};

// 使用 Hook
const {
  dataSource: list,  // 数据列表
  state,            // 状态对象
  onRefresh,        // 刷新函数
  onSearch,         // 搜索函数
  onReset          // 重置函数
} = useRefreshList({
  api,
  immediate: true  // 立即执行
});

// 从 state 中获取状态
const loading = computed(() => state.loading);
const hasMore = computed(() => !state.finished);

// 封装操作函数
const refresh = onRefresh;
const reset = onReset;

const loadMore = () => {
  if (!state.finished && !state.loading) {
    state.loading = true;
    state.pageable.pageNum += 1;
    onRefresh();
  }
};

// 搜索功能
const handleSearch = (keyword) => {
  onSearch({ keyword });
};
<\/script>`,

  api: `interface RefreshListOptions<T> {
  /** API 函数 */
  api: (params: any) => Promise<{
    data: {
      records: T[];
      total: number;
    };
  }>;
  /** 额外参数 */
  extraParams?: Ref<Record<string, unknown>>;
  /** 是否立即执行 */
  immediate?: boolean;
}

interface RefreshListReturn<T> {
  /** 数据源 */
  dataSource: Ref<T[]>;
  /** 状态对象 */
  state: {
    finished: boolean;      // 是否已完成
    isLoading: boolean;     // 是否正在加载
    loading: boolean;       // 加载状态
    error: boolean;         // 错误状态
    pageable: {
      pageNum: number;      // 页码
      pageSize: number;     // 页大小
      totalRow: number;     // 总行数
    };
    totalParam: object;     // 总参数
    searchParam: object;    // 搜索参数
  };
  /** 加载函数 */
  onLoad: () => Promise<void>;
  /** 刷新函数 */
  onRefresh: () => Promise<void>;
  /** 搜索函数 */
  onSearch: (searchParams?: object) => void;
  /** 重置函数 */
  onReset: () => void;
}

/**
 * 列表数据管理 Hook
 * 提供分页、刷新、加载更多等功能
 */
function useRefreshList<T extends object>(
  options: RefreshListOptions<T>
): RefreshListReturn<T>`,

  usage: `// 基础用法
const { dataSource, state, onRefresh, onSearch } = useRefreshList({
  api: async (params) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(params)
    });
    return response.json();
  },
  immediate: true
});

// 带搜索功能
const handleSearch = (keyword: string) => {
  onSearch({ keyword });
};

// 手动刷新
const handleRefresh = () => {
  onRefresh();
};

// 重置状态
const handleReset = () => {
  onReset();
};`
};
