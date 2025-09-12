<template>
  <div class="content-card-demo">
    <h3>基础用法</h3>
    <div class="demo-section">
      <ContentCard
        title="基础内容卡片"
        desc="这是内容卡片的描述文字，支持多行文本显示。"
      />
    </div>

    <h3>带元信息</h3>
    <div class="demo-section">
      <ContentCard
        title="带元信息的内容卡片"
        desc="包含标签和时间信息的卡片。"
        :meta="{
          tagText: '已发布',
          tagStatus: 'success',
          timeText: '2024-01-15',
        }"
      />
    </div>

    <h3>图片模式</h3>
    <div class="demo-section">
      <ContentCard
        title="单图模式"
        desc="图片显示在右侧。"
        :images="['https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg']"
        :meta="{ timeText: '2024-01-16' }"
      />
      <ContentCard
        title="多图模式"
        desc="多张图片以网格形式展示。"
        :images="[
          'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
          'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
          'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        ]"
        :meta="{ tagText: '热门', tagStatus: 'warning', timeText: '2024-01-17' }"
      />
    </div>

    <h3>自定义元信息插槽</h3>
    <div class="demo-section">
      <ContentCard
        title="自定义元信息显示"
        desc="使用 meta 插槽完全自定义元信息区域，无需传入 meta 属性。"
      >
        <template #meta>
          <div class="custom-meta">
            <VanTag type="success">
              🎯 自定义标签
            </VanTag>
            <span class="custom-time">📅 2024-01-24</span>
          </div>
        </template>
      </ContentCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tag as VanTag } from 'vant';
import ContentCard from '../index.vue';
</script>

<style lang="less" scoped>
.content-card-demo {
  width: 100%;

  h3 {
    margin: 30px 0 15px 0;
    font-size: 18px;
    color: #333;

    &:first-child {
      margin-top: 0;
    }
  }

  .demo-section {
    background: white;
    border-radius: 8px;
    margin-bottom: 20px;
    overflow: hidden;

    .content-card {
      &:not(:last-child) {
        border-bottom: 1px solid #eee;
      }
    }
  }

  .custom-meta {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .custom-time {
    font-size: 14px;
    color: #1976d2;
    font-weight: 500;
  }
}
</style>
