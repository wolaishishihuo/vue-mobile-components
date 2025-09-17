// ContentCard 组件完整代码示例和文档
export const contentCardExamples = {
  // 基础用法
  basic: `<template>
  <JContentCard
    title="重要通知"
    desc="组件库已完成 monorepo 架构重构，新版本提供了更好的开发体验"
  />
</template>

<script setup>
import { JContentCard } from '@jname/components';
<\/script>`,

  // 带图片
  withImages: `<template>
  <JContentCard
    title="产品发布"
    desc="我们很高兴地宣布新产品正式发布，欢迎大家体验使用"
    :images="singleImage"
    display-mode="single"
    :meta="{ tagText: '推荐', tagStatus: 'success', timeText: '1天前' }"
  />
</template>

<script setup>
import { JContentCard } from '@jname/components';
import { ref } from 'vue';

const singleImage = ref([
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg'
]);
<\/script>`,

  // 多图模式
  multiImages: `<template>
  <JContentCard
    title="活动预告"
    desc="精彩活动即将开始，敬请期待更多惊喜内容"
    :images="multipleImages"
    display-mode="multi"
    :meta="{ tagText: '活动', tagStatus: 'warning', timeText: '3小时前' }"
  />
</template>

<script setup>
import { JContentCard } from '@jname/components';
import { ref } from 'vue';

const multipleImages = ref([
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg'
]);
<\/script>`,

  // 不同状态标签
  statusTags: `<template>
  <div class="demo-list">
    <JContentCard
      title="成功消息"
      desc="操作已成功完成"
      :meta="{ tagText: '成功', tagStatus: 'success', timeText: '刚刚' }"
    />

    <JContentCard
      title="警告信息"
      desc="请注意相关事项"
      :meta="{ tagText: '警告', tagStatus: 'warning', timeText: '5分钟前' }"
    />

    <JContentCard
      title="错误提示"
      desc="操作失败，请重试"
      :meta="{ tagText: '错误', tagStatus: 'error', timeText: '10分钟前' }"
    />

    <JContentCard
      title="普通信息"
      desc="这是一条普通的信息内容"
      :meta="{ tagText: '信息', tagStatus: 'info', timeText: '1小时前' }"
    />
  </div>
</template>

<script setup>
import { JContentCard } from '@jname/components';
<\/script>`,

  // 插槽用法
  slots: `<template>
  <!-- 自定义操作按钮 -->
  <JContentCard title="自定义操作" desc="可以添加自定义操作按钮">
    <template #actions>
      <van-button size="mini" type="primary">编辑</van-button>
      <van-button size="mini">删除</van-button>
    </template>
  </JContentCard>

  <!-- 自定义标签内容 -->
  <JContentCard title="自定义标签" desc="可以自定义标签区域的内容">
    <template #meta>
      <div class="custom-meta">
        <van-icon name="fire" color="#ff4444" />
        <span>热门</span>
        <span class="time">2小时前</span>
      </div>
    </template>
  </JContentCard>

  <!-- 自定义图片展示 -->
  <JContentCard title="自定义图片" desc="可以完全自定义图片展示方式">
    <template #images>
      <div class="custom-images">
        <img src="image1.jpg" class="custom-img" />
        <div class="image-overlay">自定义覆盖层</div>
      </div>
    </template>
  </JContentCard>
</template>

<script setup>
import { JContentCard } from '@jname/components';
import { Button as VanButton, Icon as VanIcon } from 'vant';
<\/script>`,

  // API 接口
  api: `interface MetaInfo {
  /** 标签文本 */
  tagText?: string;
  /** 标签状态 */
  tagStatus?: 'success' | 'info' | 'warning' | 'error';
  /** 时间文本 */
  timeText?: string;
}

interface ContentCardProps {
  /** 卡片标题 */
  title: string;
  /** 卡片描述 */
  desc?: string;
  /** 图片列表 */
  images?: string[];
  /** 元信息（标签、时间等） */
  meta?: MetaInfo;
  /** 图片显示模式 */
  displayMode?: 'single' | 'multi';
  /** 最大图片数量 */
  maxImages?: number;
  /** 是否显示操作区域 */
  showActions?: boolean;
}

interface ContentCardSlots {
  /** 默认插槽 - 替换整个内容区域 */
  default?: () => any;
  /** 操作区域插槽 */
  actions?: () => any;
  /** 元信息区域插槽 */
  meta?: () => any;
  /** 图片区域插槽 */
  images?: () => any;
  /** 标题区域插槽 */
  title?: () => any;
  /** 描述区域插槽 */
  desc?: () => any;
}

interface ContentCardEmits {
  /** 图片点击事件 */
  'image-click': [index: number, url: string];
  /** 卡片点击事件 */
  'card-click': [event: Event];
  /** 操作按钮点击事件 */
  'action-click': [action: string];
}`,

  // 完整用法示例
  fullExample: `<template>
  <div class="content-demo">
    <!-- 新闻卡片 -->
    <JContentCard
      v-for="article in articles"
      :key="article.id"
      :title="article.title"
      :desc="article.description"
      :images="article.images"
      :display-mode="article.images?.length > 1 ? 'multi' : 'single'"
      :meta="{
        tagText: article.category,
        tagStatus: getTagStatus(article.category),
        timeText: article.publishTime
      }"
      @image-click="handleImageClick"
      @card-click="handleCardClick"
    >
      <template #actions>
        <van-button size="mini" @click="shareArticle(article)">
          分享
        </van-button>
        <van-button size="mini" @click="favoriteArticle(article)">
          收藏
        </van-button>
      </template>
    </JContentCard>
  </div>
</template>

<script setup>
import { JContentCard } from '@jname/components';
import { Button as VanButton } from 'vant';
import { ref } from 'vue';

const articles = ref([
  {
    id: 1,
    title: '技术分享：Vue 3 最佳实践',
    description: '深入了解 Vue 3 的新特性和开发技巧',
    category: '技术',
    publishTime: '2小时前',
    images: ['https://example.com/tech.jpg']
  },
  {
    id: 2,
    title: '产品发布：新版本上线',
    description: '我们很高兴地宣布新版本正式发布',
    category: '产品',
    publishTime: '1天前',
    images: [
      'https://example.com/product1.jpg',
      'https://example.com/product2.jpg'
    ]
  }
]);

const getTagStatus = (category) => {
  const statusMap = {
    '技术': 'info',
    '产品': 'success',
    '新闻': 'warning',
    '公告': 'error'
  };
  return statusMap[category] || 'info';
};

const handleImageClick = (index, url) => {
  console.log('图片点击', index, url);
};

const handleCardClick = (event) => {
  console.log('卡片点击', event);
};

const shareArticle = (article) => {
  console.log('分享文章', article);
};

const favoriteArticle = (article) => {
  console.log('收藏文章', article);
};
<\/script>

<style scoped>
.content-demo {
  padding: 16px;
}

.content-demo .j-content-card {
  margin-bottom: 16px;
}
</style>`
};
