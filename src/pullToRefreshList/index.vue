<template>
  <PullRefresh
    v-if="!disablePullRefresh"
    v-model="state.isLoading"
    pulling-text="下拉释放刷新"
    loosing-text="下拉释放刷新"
    loading-text="刷新中..."
    v-bind="$attrs"
    @refresh="onRefresh"
  >
    <List
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
    </List>
  </PullRefresh>

  <List
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
  </List>
</template>

<script lang="ts" setup>
import type { Props } from './types';
import { List, PullRefresh } from 'vant';
import { onMounted, toRefs } from 'vue';
import useRefreshList from '@/hooks/useRefreshList';

defineOptions({
  name: 'JPullToRefreshList',
  inheritAttrs: false
});

const props = withDefaults(defineProps<Props>(), {
  disablePullRefresh: false,
  extraParams: () => ({}),
  immediate: true
});

const { extraParams } = toRefs(props);

const { dataSource, state, onRefresh, onLoad, onSearch, onReset } = useRefreshList({
  api: props.apiFn,
  extraParams
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
