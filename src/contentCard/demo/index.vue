<template>
  <div class="content-card-demo">
    <h3>基础用法</h3>
    <div class="demo-section">
      <ContentCard
        title="这是基础的内容卡片标题"
        desc="这是内容卡片的描述文字，用来展示主要信息摘要，支持多行文本显示。"
      />
    </div>

    <h3>纯文本 + 元信息</h3>
    <div class="demo-section">
      <ContentCard
        title="纯文本内容卡片"
        desc="这个卡片只包含文本信息和元信息，没有图片。"
        :meta="{
          tagText: '已发布',
          tagStatus: 'success',
          timeText: '2024-01-15',
        }"
      />
    </div>

    <h3>单图模式</h3>
    <div class="demo-section">
      <ContentCard
        title="单图展示的内容卡片"
        desc="这个卡片包含一张图片，图片会显示在右侧。"
        :images="['https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg']"
        :meta="{
          timeText: '2024-01-16',
        }"
      />
    </div>

    <h3>多图模式</h3>
    <div class="demo-section">
      <ContentCard
        title="多图展示的内容卡片"
        desc="这个卡片包含多张图片，会以网格形式展示。"
        :images="[
          'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
          'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
          'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        ]"
        :meta="{
          tagText: '热门',
          tagStatus: 'warning',
          timeText: '2024-01-17',
        }"
        :max-images="3"
      />
    </div>

    <h3>不同状态标签</h3>
    <div class="demo-section">
      <ContentCard
        title="成功状态标签"
        desc="展示成功状态的标签样式。"
        :meta="{ tagText: '已完成', tagStatus: 'success' }"
      />
      <ContentCard
        title="信息状态标签"
        desc="展示信息状态的标签样式。"
        :meta="{ tagText: '进行中', tagStatus: 'info' }"
      />
      <ContentCard
        title="警告状态标签"
        desc="展示警告状态的标签样式。"
        :meta="{ tagText: '待处理', tagStatus: 'warning' }"
      />
      <ContentCard
        title="错误状态标签"
        desc="展示错误状态的标签样式。"
        :meta="{ tagText: '已拒绝', tagStatus: 'error' }"
      />
    </div>

    <h3>完整示例</h3>
    <div class="demo-section">
      <ContentCard
        title="完整功能展示卡片"
        desc="这是一个展示所有功能的完整示例，包含标题、描述、图片、标签和时间信息。"
        :images="['https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg']"
        :meta="{
          tagText: '推荐',
          tagStatus: 'success',
          timeText: '刚刚',
        }"
      />
    </div>

    <h3>插槽自定义</h3>
    <div class="demo-section">
      <ContentCard
        title="插槽自定义标签"
        desc="使用插槽完全自定义标签区域的显示。"
        :meta="{ tagText: '特殊标签', tagStatus: 'success' }"
      >
        <template #tag="{ tag }">
          <van-tag type="success">
            🎯 {{ tag?.tagText }}
          </van-tag>
        </template>
      </ContentCard>

      <ContentCard
        title="插槽自定义时间"
        desc="使用插槽完全自定义时间区域的显示。"
        :meta="{ timeText: '2024-01-24' }"
      >
        <template #time="{ time }">
          <div class="custom-time">
            📅 发布于 {{ time }}
          </div>
        </template>
      </ContentCard>
    </div>

    <h3>最简用法</h3>
    <div class="demo-section">
      <ContentCard
        title="只有标题的卡片"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
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

  .custom-time {
    font-size: 24px;
    color: #1976d2;
    font-weight: 500;
  }
}
</style>
