<template>
  <van-pull-refresh
    v-if="!disablePullRefresh"
    v-model="state.isLoading"
    pulling-text="下拉释放刷新"
    loosing-text="下拉释放刷新"
    loading-text="刷新中..."
    v-bind="$attrs"
    @refresh="onRefresh"
  >
    <van-list
      v-model:loading="state.loading"
      v-model:error="state.error"
      :finished="state.finished"
      :immediate-check="false"
      :offset="50"
      finished-text="没有更多了"
      loading-text="加载中..."
      v-bind="$attrs"
      @load="onLoad"
    >
      <template #default>
        <slot :data="dataSource || []" />
      </template>
    </van-list>
  </van-pull-refresh>

  <van-list
    v-if="disablePullRefresh"
    v-model:loading="state.loading"
    v-model:error="state.error"
    :finished="state.finished"
    :immediate-check="false"
    :offset="50"
    finished-text="没有更多了"
    loading-text="加载中..."
    v-bind="$attrs"
    @load="onLoad"
  >
    <template #default>
      <slot :data="dataSource || []" />
    </template>
  </van-list>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import useRefreshList from '@/hooks/useRefreshList';

interface Props {
  extraParams?: Record<string, unknown>;
  apiFn: (params: any) => Promise<any>;
  immediate?: boolean;
  disablePullRefresh?: boolean;
  [key: string]: any;
}

const props = withDefaults(defineProps<Props>(), {
  disablePullRefresh: false,
  extraParams: () => ({}),
  immediate: true
});

const { dataSource, state, onRefresh, onLoad, onSearch, onReset } = useRefreshList({
  api: props.apiFn,
  extraParams: props.extraParams
});

onMounted(() => {
  props.immediate && onLoad();
});

defineExpose({
  onRefresh,
  onLoad,
  onSearch,
  onReset,
  dataSource
});
</script>
