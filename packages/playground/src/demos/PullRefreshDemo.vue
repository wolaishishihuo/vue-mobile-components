<template>
  <MobilePage title="PullRefresh 下拉刷新">
    <DemoBlock title="下拉刷新 + 上拉加载">
      <div class="demo-tip">
        下拉刷新列表，上拉加载更多
      </div>
      <JPullRefresh :api-fn="loadNewsApi">
        <template #default="{ data }: { data: NewsItem[] }">
          <div
            v-for="(item, index) in data"
            :key="index"
            class="news-item"
          >
            <div class="news-title">
              {{ item.title }}
            </div>
            <div class="news-desc">
              {{ item.description }}
            </div>
            <div class="news-time">
              {{ item.time }}
            </div>
          </div>
        </template>
      </JPullRefresh>
    </DemoBlock>

    <DemoBlock title="仅上拉加载">
      <div class="demo-tip">
        禁用下拉刷新，只支持上拉加载更多
      </div>
      <JPullRefresh
        :api-fn="loadNewsApi"
        :disable-pull-refresh="true"
      >
        <template #default="{ data }: { data: NewsItem[] }">
          <div
            v-for="(item, index) in data"
            :key="index"
            class="news-item simple"
          >
            <div class="news-title">
              {{ item.title }}
            </div>
            <div class="news-time">
              {{ item.time }}
            </div>
          </div>
        </template>
      </JPullRefresh>
    </DemoBlock>
  </MobilePage>
</template>

<script setup lang="ts">
import { JPullRefresh } from '@jname/business';
import DemoBlock from '../components/DemoBlock.vue';
import MobilePage from '../components/MobilePage.vue';

interface NewsItem {
  title: string;
  description: string;
  time: string;
}

// 模拟新闻数据
const newsData: NewsItem[] = [
  { title: '科技前沿：AI 技术新突破', description: '人工智能在医疗领域取得重大进展', time: '1小时前' },
  { title: '市场动态：股市今日收涨', description: '科技股领涨，市场情绪乐观', time: '2小时前' },
  { title: '体育赛事：世界杯精彩回顾', description: '昨夜比赛精彩纷呈，球迷热情高涨', time: '3小时前' },
  { title: '文化娱乐：新电影即将上映', description: '备受期待的大片将于下周上映', time: '4小时前' },
  { title: '社会热点：环保新政策发布', description: '政府推出绿色发展新举措', time: '5小时前' },
  { title: '财经要闻：央行政策解读', description: '专家分析最新货币政策影响', time: '6小时前' },
  { title: '教育资讯：在线学习新趋势', description: '疫情推动教育数字化转型', time: '7小时前' },
  { title: '健康生活：养生小贴士', description: '专家分享健康生活方式', time: '8小时前' },
  { title: '旅游推荐：春季出行指南', description: '精选春季旅游目的地推荐', time: '9小时前' },
  { title: '美食分享：家常菜谱大全', description: '简单易做的家常美食制作', time: '10小时前' }
];

// 模拟 API - 返回分页数据
const loadNewsApi = async (params: { pageNum?: number; pageSize?: number } = {}) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800));

  const { pageNum = 1, pageSize = 4 } = params;
  const startIndex = (pageNum - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const records = newsData.slice(startIndex, endIndex);
  const total = newsData.length;

  return {
    data: {
      records,
      total
    }
  };
};
</script>

<style scoped>
.demo-tip {
  padding: 8px 12px;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 4px;
  font-size: 12px;
  color: #856404;
  margin-bottom: 12px;
}

.news-item {
  padding: 16px 0;
  border-bottom: 1px solid #f2f3f5;
}

.news-item:last-child {
  border-bottom: none;
}

.news-item.simple {
  padding: 12px 0;
}

.news-title {
  font-size: 14px;
  font-weight: 500;
  color: #323233;
  margin-bottom: 4px;
  line-height: 1.4;
}

.news-desc {
  font-size: 12px;
  color: #969799;
  line-height: 1.4;
  margin-bottom: 6px;
}

.news-time {
  font-size: 11px;
  color: #c8c9cc;
}
</style>
