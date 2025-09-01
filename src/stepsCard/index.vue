<template>
  <div class="steps-card">
    <!-- 左侧时间轴 -->
    <div class="steps-card__timeline">
      <!-- 点和线的容器 -->
      <div class="steps-card__timeline-container">
        <!-- 双点结构 -->
        <div class="steps-card__dot-container">
          <!-- 外层大点 -->
          <div class="steps-card__outer-dot" />
          <!-- 内层小点 -->
          <div class="steps-card__inner-dot" />
        </div>
        <!-- 连接线 -->
        <div
          v-if="hasBodyContent"
          class="steps-card__line"
          :class="[bodyHeight > 0 ? 'steps-card__line--visible' : 'steps-card__line--hidden']"
        />
      </div>
    </div>

    <!-- 右侧内容 -->
    <div class="steps-card__content">
      <!-- 头部内容 -->
      <div v-if="slots.header" class="steps-card__content-header">
        <slot name="header" />
      </div>

      <!-- 内容区域 -->
      <div v-if="slots.default" ref="bodyRef" class="steps-card__content-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, onMounted, onUpdated, ref, useSlots } from 'vue';

defineOptions({
  name: 'JStepsCard'
});

const slots = useSlots();
const hasBodyContent = computed(() => !!slots.default);

const bodyRef = ref<HTMLElement | null>(null);
const bodyHeight = ref(0);

const updateHeight = () => {
  if (bodyRef.value) {
    bodyHeight.value = bodyRef.value.offsetHeight;
  }
};

onMounted(updateHeight);
onUpdated(updateHeight);
</script>

<style lang="less" scoped>
@import './index.less';
</style>
