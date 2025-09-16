<template>
  <MobilePage title="ContentCard 内容卡片">
    <DemoBlock title="基础用法">
      <JContentCard
        title="重要通知"
        desc="组件库已完成 monorepo 架构重构，新版本提供了更好的开发体验和更强的类型安全"
      />
    </DemoBlock>

    <DemoBlock title="带图片">
      <JContentCard
        title="产品发布"
        desc="我们很高兴地宣布新产品正式发布，欢迎大家体验使用"
        :images="singleImage"
        display-mode="single"
        :meta="{ tagText: '推荐', tagStatus: 'success', timeText: '1天前' }"
      />
    </DemoBlock>

    <DemoBlock title="多图模式">
      <JContentCard
        title="活动预告"
        desc="精彩活动即将开始，敬请期待更多惊喜内容"
        :images="multipleImages"
        display-mode="multi"
        :meta="{ tagText: '活动', tagStatus: 'warning', timeText: '3小时前' }"
      />
    </DemoBlock>

    <DemoBlock title="不同状态标签">
      <JContentCard
        title="系统维护"
        desc="系统将于今晚进行维护升级，期间可能影响部分功能使用"
        :meta="{ tagText: '维护', tagStatus: 'info', timeText: '30分钟前' }"
      />
    </DemoBlock>
  </MobilePage>
</template>

<script setup lang="ts">
import { JContentCard } from '@jname/components';
import { ref } from 'vue';
import DemoBlock from '../components/DemoBlock.vue';
import MobilePage from '../components/MobilePage.vue';

const singleImage = ref([
  'https://img.yzcdn.cn/vant/cat.jpeg'
]);

const multipleImages = ref([
  'https://img.yzcdn.cn/vant/cat.jpeg',
  'https://img.yzcdn.cn/vant/tree.jpg',
  'https://img.yzcdn.cn/vant/apple-1.jpg'
]);
</script>
