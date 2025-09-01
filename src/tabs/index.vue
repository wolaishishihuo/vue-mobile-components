<template>
  <div class="tabs-container">
    <div
      v-for="item in tabOptions"
      :key="item.value"
      class="tab-item"
      :class="{ active: modelValue === item.value }"
      @click="handleClick(item.value)"
    >
      {{ item.label }}
      <span v-if="!!item.count" class="tab-count">({{ item.count }})</span>
      <div
        class="tab-indicator"
        :class="{ active: modelValue === item.value }"
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { PropType } from 'vue';
import type { TabItem } from './types';

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
  emit('change', value);
  emit('update:modelValue', value);
};
</script>

<style lang="less">
@import './index.less';
</style>
