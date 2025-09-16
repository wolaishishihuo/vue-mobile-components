<template>
  <div class="j-content-card">
    <!-- 左侧内容 -->
    <div class="j-content-card__content">
      <!-- 标题 -->
      <div class="j-content-card__title">
        {{ title }}
      </div>

      <!-- 描述 -->
      <div v-if="desc" class="j-content-card__description">
        {{ desc }}
      </div>

      <!-- 多图模式 -->
      <div
        v-if="displayMode === 'multi'"
        class="j-content-card__images"
      >
        <img
          v-for="(image, index) in images.slice(0, maxImages)"
          :key="index"
          :src="image"
          :loading="lazyLoad ? 'lazy' : 'eager'"
          class="j-content-card__image"
          alt=""
        >
      </div>

      <!-- 元信息 -->
      <div
        v-if="$slots.meta || meta?.tagText || meta?.timeText"
        class="j-content-card__meta"
      >
        <!-- 元信息插槽 -->
        <slot name="meta">
          <div
            v-if="meta?.tagText"
            class="j-content-card__tag"
            :class="`j-content-card__tag--${meta?.tagStatus || 'info'}`"
          >
            {{ meta.tagText }}
          </div>
          <div v-if="meta?.timeText" class="j-content-card__time">
            <span class="j-content-card__time-icon">🕐</span>
            {{ meta.timeText }}
          </div>
        </slot>
      </div>
    </div>

    <!-- 右侧单图 -->
    <img
      v-if="displayMode === 'single'"
      :src="images[0]"
      :loading="lazyLoad ? 'lazy' : 'eager'"
      class="j-content-card__image-single"
      alt=""
    >
  </div>
</template>

<script setup lang="ts">
import type { ContentCardProps } from './types';
import { computed } from 'vue';

defineOptions({
  name: 'JContentCard'
});

const props = withDefaults(defineProps<ContentCardProps>(), {
  maxImages: 3,
  lazyLoad: false
});

// 根据图片数量自动判断显示模式
const displayMode = computed(() => {
  if (!props.images?.length) return 'text';
  if (props.images.length === 1) return 'single';
  return 'multi';
});
</script>

<style lang="less" scoped>
@import './index.less';
</style>
