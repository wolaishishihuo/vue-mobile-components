<template>
  <div class="jname-content-card">
    <!-- 左侧内容 -->
    <div class="jname-content-card__content">
      <!-- 标题 -->
      <div class="jname-content-card__title">
        {{ title }}
      </div>

      <!-- 描述 -->
      <div v-if="desc" class="jname-content-card__description">
        {{ desc }}
      </div>

      <!-- 多图模式 -->
      <div
        v-if="displayMode === 'multi'"
        class="jname-content-card__images"
      >
        <Image
          v-for="(image, index) in images.slice(0, maxImages)"
          :key="index"
          :src="image"
          fit="cover"
          lazy-load
          radius="10"
          class="jname-content-card__image"
        />
      </div>

      <!-- 元信息 -->
      <div v-if="meta?.tagText || meta?.timeText" class="jname-content-card__meta">
        <!-- 标签插槽 -->
        <slot name="tag" :tag="meta">
          <div
            v-if="meta?.tagText"
            class="jname-content-card__tag"
            :class="`content-card__tag--${meta?.tagStatus || 'info'}`"
          >
            {{ meta.tagText }}
          </div>
        </slot>

        <!-- 时间插槽 -->
        <slot name="time" :time="meta?.timeText">
          <span v-if="meta?.timeText" class="jname-content-card__time">
            <Icon name="clock-o" size="16" />
            {{ meta.timeText }}
          </span>
        </slot>
      </div>
    </div>

    <!-- 右侧单图 -->
    <Image
      v-if="displayMode === 'single'"
      :src="images[0]"
      fit="cover"
      lazy-load
      radius="10"
      class="jname-content-card__image-single"
    />
  </div>
</template>

<script setup lang="ts">
import type { ContentCardProps } from './types';
import { Icon, Image } from 'vant';
import { computed } from 'vue';

defineOptions({
  name: 'JContentCard',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ContentCardProps>(), {
  maxImages: 3
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
