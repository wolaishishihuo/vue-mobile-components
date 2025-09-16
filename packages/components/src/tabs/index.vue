<template>
  <div class="j-tabs">
    <div
      v-for="item in tabOptions"
      :key="item.value"
      class="j-tabs__item"
      :class="{ 'j-tabs__item--active': modelValue === item.value }"
      @click="handleClick(item.value)"
    >
      {{ item.label }}
      <span v-if="!!item.count" class="j-tabs__count">({{ item.count }})</span>
      <div
        class="j-tabs__indicator"
        :class="{ 'j-tabs__indicator--active': modelValue === item.value }"
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { PropType } from 'vue';
import type { TabItem } from './types';

defineOptions({
  name: 'JTabs'
});

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  tabOptions: {
    type: Array as PropType<TabItem[]>,
    default: () => []
  }
});

const emit = defineEmits(['change', 'update:modelValue']);
const handleClick = (value: string) => {
  emit('update:modelValue', value);
  emit('change', value);
};
</script>

<style lang="less">
@import './index.less';
</style>
