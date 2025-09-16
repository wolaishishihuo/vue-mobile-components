// ContentCard 组件代码示例
export const contentCardExamples = {
  vue: `<template>
  <JContentCard
    title="重要通知"
    desc="组件库已完成重构"
    :images="images"
    :meta="meta"
  />
</template>

<script setup>
import { JContentCard } from '@jname/components';
import { ref } from 'vue';

const images = ref(['https://img.yzcdn.cn/vant/cat.jpeg']);
const meta = ref({
  tagText: '公告',
  tagStatus: 'info',
  timeText: '刚刚'
});
<\/script>`,

  api: `interface MetaInfo {
  tagText?: string;
  tagStatus?: 'success' | 'info' | 'warning' | 'error';
  timeText?: string;
}

interface ContentCardProps {
  title: string;
  desc?: string;
  images?: string[];
  meta?: MetaInfo;
  displayMode?: 'single' | 'multi';
  maxImages?: number;
}`
};
