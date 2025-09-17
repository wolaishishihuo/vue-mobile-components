<template>
  <MobilePage title="useRefreshList Hook">
    <DemoBlock title="Hook 说明">
      <div class="hook-description">
        <p>useRefreshList 是一个用于管理列表数据的 Hook，提供以下功能：</p>
        <ul>
          <li>自动分页管理</li>
          <li>下拉刷新支持</li>
          <li>上拉加载更多</li>
          <li>搜索功能集成</li>
          <li>加载状态管理</li>
        </ul>
      </div>
    </DemoBlock>

    <DemoBlock title="基础用法">
      <div class="code-block">
        <pre><code>{{ basicUsageCode }}</code></pre>
      </div>
    </DemoBlock>

    <DemoBlock title="API 接口">
      <div class="code-block">
        <pre><code>{{ apiInterfaceCode }}</code></pre>
      </div>
    </DemoBlock>

    <DemoBlock title="返回值">
      <div class="code-block">
        <pre><code>{{ returnValueCode }}</code></pre>
      </div>
    </DemoBlock>
  </MobilePage>
</template>

<script setup lang="ts">
import DemoBlock from '../components/DemoBlock.vue';
import MobilePage from '../components/MobilePage.vue';

const basicUsageCode = `import { useRefreshList } from '@jname/core';

const api = async (params) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(params)
  });
  return response.json();
};

const {
  dataSource: list,
  state,
  onRefresh,
  onSearch,
  onReset
} = useRefreshList({
  api,
  immediate: true
});`;

const apiInterfaceCode = `interface RefreshListOptions<T> {
  api: (params: any) => Promise<{
    data: {
      records: T[];
      total: number;
    };
  }>;
  extraParams?: Ref<Record<string, unknown>>;
  immediate?: boolean;
}`;

const returnValueCode = `interface RefreshListReturn<T> {
  dataSource: Ref<T[]>;     // 数据列表
  state: {
    finished: boolean;      // 是否已完成
    loading: boolean;       // 加载状态
    error: boolean;         // 错误状态
    pageable: {
      pageNum: number;      // 页码
      pageSize: number;     // 页大小
      totalRow: number;     // 总行数
    };
  };
  onLoad: () => Promise<void>;     // 加载函数
  onRefresh: () => Promise<void>;  // 刷新函数
  onSearch: (params?: object) => void;  // 搜索函数
  onReset: () => void;             // 重置函数
}`;
</script>

<style scoped>
.hook-description {
  font-size: 14px;
  line-height: 1.6;
  color: #646566;
}

.hook-description p {
  margin-bottom: 12px;
}

.hook-description ul {
  padding-left: 20px;
}

.hook-description li {
  margin-bottom: 4px;
}

.code-block {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 16px;
  border: 1px solid #ebedf0;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-family: 'SF Mono', Monaco, 'Roboto Mono', monospace;
  font-size: 12px;
  line-height: 1.5;
  color: #323233;
}

.code-block code {
  white-space: pre;
  word-wrap: normal;
  word-break: normal;
}
</style>
