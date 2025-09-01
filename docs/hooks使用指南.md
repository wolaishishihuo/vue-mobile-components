# Hooks 使用指南

本组件库除了提供现成的组件外，还提供了一些实用的 hooks，方便您在项目中复用逻辑。

## useRefreshList

`useRefreshList` 是一个用于处理列表数据的 hook，支持分页、搜索、下拉刷新和上拉加载等功能。

### 基础用法

```typescript
import { useRefreshList } from '@jname/vue-mobile-components';

// 在组件中使用
export default {
  setup() {
    // 定义 API 函数
    const fetchList = async (params: any) => {
      const response = await fetch('/api/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      return response.json();
    };

    // 使用 hook
    const {
      dataSource, // 数据源
      state, // 状态管理
      onLoad, // 加载数据
      onRefresh, // 刷新数据
      onSearch, // 搜索
      onReset // 重置
    } = useRefreshList({
      api: fetchList,
      extraParams: { status: 'active' }
    });

    return {
      dataSource,
      state,
      onLoad,
      onRefresh,
      onSearch,
      onReset
    };
  }
};
```

### API 参数

| 参数        | 类型     | 必填 | 默认值 | 说明                |
| ----------- | -------- | ---- | ------ | ------------------- |
| api         | Function | 是   | -      | 获取数据的 API 函数 |
| extraParams | Object   | 否   | {}     | 额外的请求参数      |

### API 函数格式

API 函数需要返回符合以下格式的数据：

```typescript
{
  data: {
    records: T[],    // 数据列表
    total: number    // 总数量
  }
}
```

### 返回值

| 属性       | 类型     | 说明                                       |
| ---------- | -------- | ------------------------------------------ |
| dataSource | Ref<T[]> | 当前数据列表                               |
| state      | Reactive | 状态对象，包含 loading、finished、error 等 |
| onLoad     | Function | 加载数据函数                               |
| onRefresh  | Function | 刷新数据函数                               |
| onSearch   | Function | 搜索函数，接受搜索参数                     |
| onReset    | Function | 重置搜索函数                               |

### 状态说明

```typescript
state = {
  finished: boolean, // 是否已加载完所有数据
  isLoading: boolean, // 是否正在刷新
  loading: boolean, // 是否正在加载更多
  error: boolean, // 是否有错误
  pageable: {
    pageNum: number, // 当前页码
    pageSize: number, // 每页大小
    totalRow: number // 总行数
  },
  totalParam: object, // 总请求参数
  searchParam: object // 搜索参数
};
```

### 完整示例

```vue
<template>
  <div>
    <!-- 搜索栏 -->
    <van-search
      v-model="searchKeyword"
      placeholder="请输入搜索关键词"
      @search="handleSearch"
      @clear="handleReset"
    />

    <!-- 下拉刷新列表 -->
    <van-pull-refresh v-model="state.isLoading" @refresh="onRefresh">
      <van-list
        v-model:loading="state.loading"
        v-model:error="state.error"
        :finished="state.finished"
        @load="onLoad"
      >
        <div v-for="item in dataSource" :key="item.id">
          {{ item.title }}
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { useRefreshList } from '@J/vue-h5-components';
import { ref } from 'vue';

const searchKeyword = ref('');

// API 函数
const fetchArticles = async (params) => {
  const response = await fetch('/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
  return response.json();
};

// 使用 hook
const {
  dataSource,
  state,
  onLoad,
  onRefresh,
  onSearch,
  onReset
} = useRefreshList({
  api: fetchArticles,
  extraParams: { category: 'tech' }
});

// 搜索处理
const handleSearch = () => {
  onSearch({ keyword: searchKeyword.value });
};

const handleReset = () => {
  searchKeyword.value = '';
  onReset();
};
</script>
```

## 添加更多 Hooks

如果您需要添加更多的 hooks，可以：

1. 在 `src/hooks/` 目录下创建新的 hook 文件
2. 在 `src/hooks/index.ts` 中导出新的 hook
3. 新的 hook 会自动通过主入口文件导出

示例：

```typescript
// src/hooks/useCustomHook.ts
export default function useCustomHook() {
  // hook 逻辑
  return {
    // 返回值
  };
}

export { default as useCustomHook } from './useCustomHook';
// src/hooks/index.ts
export { default as useRefreshList } from './useRefreshList';
```
