<template>
  <div class="pull-refresh-demo">
    <h3>基础用法</h3>
    <div class="demo-section">
      <div class="scroll-container">
        <PullToRefreshList :api-fn="mockApiBasic">
          <template #default="{ data }: { data: any[] }">
            <div v-for="item in data" :key="item.id" class="list-item">
              <div class="item-content">
                <div class="item-title">
                  {{ item.title }}
                </div>
                <div class="item-desc">
                  {{ item.desc }}
                </div>
                <div class="item-time">
                  {{ item.createTime }}
                </div>
              </div>
            </div>
          </template>
        </PullToRefreshList>
      </div>
    </div>

    <h3>禁用下拉刷新</h3>
    <div class="demo-section">
      <div class="scroll-container small">
        <PullToRefreshList :api-fn="mockApiBasic" :disable-pull-refresh="true">
          <template #default="{ data }: { data: any[] }">
            <div v-for="item in data" :key="item.id" class="list-item simple">
              <div class="item-title">
                {{ item.title }}
              </div>
            </div>
          </template>
        </PullToRefreshList>
      </div>
    </div>

    <h3>带搜索功能</h3>
    <div class="demo-section">
      <div class="search-section">
        <van-search
          v-model="searchKeyword"
          shape="round"
          placeholder="请输入关键词搜索"
          @search="handleSearch"
          @clear="handleReset"
        />
      </div>
      <div class="scroll-container">
        <PullToRefreshList
          ref="searchListRef"
          :api-fn="mockApiWithSearch"
          :extra-params="{ keyword: searchKeyword }"
        >
          <template #default="{ data }: { data: any[] }">
            <div v-for="item in data" :key="item.id" class="list-item">
              <div class="item-content">
                <div class="item-title">
                  <!-- 高亮搜索关键词 -->
                  <span v-html="highlightKeyword(item.title, searchKeyword)" />
                </div>
                <div class="item-desc">
                  {{ item.desc }}
                </div>
                <div class="item-meta">
                  <span class="tag" :class="item.status">{{ item.statusText }}</span>
                  <span class="time">{{ item.createTime }}</span>
                </div>
              </div>
            </div>
          </template>
        </PullToRefreshList>
      </div>
    </div>

    <h3>新闻列表示例</h3>
    <div class="demo-section">
      <div class="scroll-container large">
        <PullToRefreshList :api-fn="mockNewsApi">
          <template #default="{ data }: { data: any[] }">
            <div v-for="item in data" :key="item.id" class="news-item">
              <div v-if="item.image" class="news-image">
                <img :src="item.image" :alt="item.title">
              </div>
              <div class="news-content">
                <div class="news-title">
                  {{ item.title }}
                </div>
                <div class="news-summary">
                  {{ item.summary }}
                </div>
                <div class="news-meta">
                  <span class="news-source">{{ item.source }}</span>
                  <span class="news-time">{{ item.publishTime }}</span>
                  <span class="news-views">{{ item.views }}浏览</span>
                </div>
              </div>
            </div>
          </template>
        </PullToRefreshList>
      </div>
    </div>

    <h3>商品列表示例</h3>
    <div class="demo-section">
      <div class="scroll-container large">
        <PullToRefreshList :api-fn="mockProductApi">
          <template #default="{ data }: { data: any[] }">
            <div class="product-grid">
              <div v-for="item in data" :key="item.id" class="product-item">
                <div class="product-image">
                  <img :src="item.image" :alt="item.name">
                </div>
                <div class="product-info">
                  <div class="product-name">
                    {{ item.name }}
                  </div>
                  <div class="product-price">
                    <span class="current-price">¥{{ item.price }}</span>
                    <span v-if="item.originalPrice" class="original-price">¥{{ item.originalPrice }}</span>
                  </div>
                  <div class="product-sales">
                    已售{{ item.sales }}件
                  </div>
                </div>
              </div>
            </div>
          </template>
        </PullToRefreshList>
      </div>
    </div>

    <h3>空状态示例</h3>
    <div class="demo-section">
      <div class="scroll-container small">
        <PullToRefreshList :api-fn="mockEmptyApi">
          <template #default="{ data }: { data: any[] }">
            <div v-if="data.length === 0" class="empty-state">
              <div class="empty-icon">
                📝
              </div>
              <div class="empty-text">
                暂无数据
              </div>
              <div class="empty-desc">
                下拉刷新试试看
              </div>
            </div>
            <div v-for="item in data" :key="item.id" class="list-item">
              <div class="item-title">
                {{ item.title }}
              </div>
            </div>
          </template>
        </PullToRefreshList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PullToRefreshList from '../index.vue';

// 搜索相关
const searchKeyword = ref('');
const searchListRef = ref();

// 模拟基础API
const mockApiBasic = async (params: any) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟网络延迟

  const { pageNum = 1, pageSize = 20 } = params;
  const total = 50;
  const records = [];

  const startIndex = (pageNum - 1) * pageSize;
  for (let i = 0; i < pageSize && startIndex + i < total; i++) {
    const index = startIndex + i + 1;
    records.push({
      id: index,
      title: `列表项目 ${index}`,
      desc: `这是第 ${index} 个项目的描述信息`,
      createTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleString()
    });
  }

  return {
    data: {
      records,
      total
    }
  };
};

// 模拟搜索API
const mockApiWithSearch = async (params: any) => {
  await new Promise(resolve => setTimeout(resolve, 800));

  const { pageNum = 1, pageSize = 20, keyword = '' } = params;
  const allData = [];

  // 生成测试数据
  const titles = [
    'Vue.js 最佳实践',
    'React 组件开发',
    'TypeScript 进阶教程',
    '微前端架构设计',
    '前端性能优化',
    'CSS 动画效果',
    'JavaScript ES6+',
    'Webpack 配置详解',
    '移动端适配方案',
    'Node.js 后端开发',
    'GraphQL 入门',
    'Docker 容器化'
  ];

  const statuses = ['success', 'warning', 'error', 'info'];
  const statusTexts = ['已发布', '草稿', '已删除', '待审核'];

  for (let i = 1; i <= 60; i++) {
    const statusIndex = Math.floor(Math.random() * 4);
    allData.push({
      id: i,
      title: `${titles[Math.floor(Math.random() * titles.length)]} ${i}`,
      desc: `文章描述内容 ${i}，包含更多详细信息...`,
      status: statuses[statusIndex],
      statusText: statusTexts[statusIndex],
      createTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
    });
  }

  // 根据关键词筛选
  const filteredData = keyword
    ? allData.filter(item => item.title.includes(keyword) || item.desc.includes(keyword))
    : allData;

  const total = filteredData.length;
  const startIndex = (pageNum - 1) * pageSize;
  const records = filteredData.slice(startIndex, startIndex + pageSize);

  return {
    data: {
      records,
      total
    }
  };
};

// 模拟新闻API
const mockNewsApi = async (params: any) => {
  await new Promise(resolve => setTimeout(resolve, 1200));

  const { pageNum = 1, pageSize = 10 } = params;
  const total = 35;
  const records = [];

  const newsData = [
    { title: '科技创新推动数字经济发展', summary: '随着人工智能、大数据等技术的快速发展，数字经济已成为推动经济增长的重要引擎。' },
    { title: '绿色能源建设取得重大突破', summary: '新型太阳能发电技术效率提升30%，为碳中和目标提供强有力支撑。' },
    { title: '教育改革持续深化发展', summary: '素质教育理念深入人心，学生综合能力培养成为教育重点。' },
    { title: '医疗健康服务不断完善', summary: '智慧医疗系统全面升级，为患者提供更加便民的医疗服务体验。' },
    { title: '城市交通智能化水平提升', summary: '智能交通系统有效缓解城市拥堵问题，出行效率显著提高。' }
  ];

  const sources = ['科技日报', '经济观察', '新华网', '人民网', '央视新闻'];

  const startIndex = (pageNum - 1) * pageSize;
  for (let i = 0; i < pageSize && startIndex + i < total; i++) {
    const index = startIndex + i;
    const newsItem = newsData[index % newsData.length];
    records.push({
      id: index + 1,
      title: newsItem.title,
      summary: newsItem.summary,
      image: Math.random() > 0.3 ? 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg' : null,
      source: sources[Math.floor(Math.random() * sources.length)],
      publishTime: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toLocaleString(),
      views: Math.floor(Math.random() * 10000) + 100
    });
  }

  return {
    data: {
      records,
      total
    }
  };
};

// 模拟商品API
const mockProductApi = async (params: any) => {
  await new Promise(resolve => setTimeout(resolve, 900));

  const { pageNum = 1, pageSize = 10 } = params;
  const total = 40;
  const records = [];

  const products = [
    'iPhone 15 Pro Max',
    '小米14 Ultra',
    '华为Mate60 Pro',
    'OPPO Find X7',
    'iPad Pro',
    '小米平板6',
    '华为MatePad',
    '三星Galaxy Tab',
    'MacBook Pro',
    '联想ThinkPad',
    '华为MateBook',
    '戴尔XPS',
    'AirPods Pro',
    '小米Buds',
    '华为FreeBuds',
    '索尼WH-1000XM5'
  ];

  const startIndex = (pageNum - 1) * pageSize;
  for (let i = 0; i < pageSize && startIndex + i < total; i++) {
    const index = startIndex + i;
    const price = Math.floor(Math.random() * 8000) + 500;
    const originalPrice = Math.random() > 0.6 ? price + Math.floor(Math.random() * 1000) + 100 : null;

    records.push({
      id: index + 1,
      name: products[index % products.length],
      price: price.toLocaleString(),
      originalPrice: originalPrice?.toLocaleString(),
      image: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
      sales: Math.floor(Math.random() * 9999) + 1
    });
  }

  return {
    data: {
      records,
      total
    }
  };
};

// 模拟空数据API
const mockEmptyApi = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    data: {
      records: [],
      total: 0
    }
  };
};

// 搜索处理
const handleSearch = () => {
  searchListRef.value?.onSearch({ keyword: searchKeyword.value });
};

const handleReset = () => {
  searchKeyword.value = '';
  searchListRef.value?.onReset();
};

// 高亮关键词
const highlightKeyword = (text: string, keyword: string) => {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, 'gi');
  return text.replace(regex, '<span style="color: #1976d2; background: #e3f2fd; padding: 0 2px; border-radius: 2px;">$1</span>');
};
</script>

<style lang="less" scoped>
.pull-refresh-demo {
  width: 100%;

  h3 {
    margin: 30px 0 15px 0;
    font-size: 18px;
    color: #333;
    padding: 0 5px;

    &:first-child {
      margin-top: 0;
    }
  }

  .demo-section {
    background: white;
    border-radius: 8px;
    margin-bottom: 20px;
    overflow: hidden;
    border: 1px solid #eee;
  }

  // 滚动容器样式 - 关键修复
  .scroll-container {
    height: 300px;
    overflow: auto;
    position: relative;

    &.small {
      height: 200px;
    }

    &.large {
      height: 400px;
    }
  }

  // 搜索区域
  .search-section {
    padding: 15px;
    border-bottom: 1px solid #eee;
    background: #fafafa;
  }

  // 基础列表项
  .list-item {
    padding: 15px;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }

    &.simple {
      padding: 10px 15px;
    }
  }

  .item-content {
    width: 100%;
  }

  .item-title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin-bottom: 8px;
    line-height: 1.4;
  }

  .item-desc {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
    line-height: 1.5;
  }

  .item-time {
    font-size: 12px;
    color: #999;
  }

  .item-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
  }

  .tag {
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;

    &.success {
      background: #e8f5e8;
      color: #52c41a;
    }

    &.warning {
      background: #fff7e6;
      color: #fa8c16;
    }

    &.error {
      background: #ffebee;
      color: #f5222d;
    }

    &.info {
      background: #e6f7ff;
      color: #1890ff;
    }
  }

  .time {
    font-size: 12px;
    color: #999;
  }

  // 新闻列表项
  .news-item {
    padding: 15px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    gap: 12px;

    &:last-child {
      border-bottom: none;
    }
  }

  .news-image {
    flex-shrink: 0;
    width: 80px;
    height: 60px;
    border-radius: 4px;
    overflow: hidden;
    background: #f0f0f0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .news-content {
    flex: 1;
    min-width: 0;
  }

  .news-title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin-bottom: 6px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .news-summary {
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .news-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12px;
    color: #999;
  }

  .news-source {
    color: #1976d2;
    font-weight: 500;
  }

  // 商品网格
  .product-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: #f0f0f0;
  }

  .product-item {
    background: white;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .product-image {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 6px;
    overflow: hidden;
    background: #f8f8f8;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .product-name {
    font-size: 14px;
    color: #333;
    font-weight: 500;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .product-price {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }

  .current-price {
    font-size: 16px;
    color: #ff4757;
    font-weight: 600;
  }

  .original-price {
    font-size: 12px;
    color: #999;
    text-decoration: line-through;
  }

  .product-sales {
    font-size: 12px;
    color: #666;
  }

  // 空状态
  .empty-state {
    padding: 60px 20px;
    text-align: center;
  }

  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  .empty-text {
    font-size: 16px;
    color: #666;
    margin-bottom: 8px;
  }

  .empty-desc {
    font-size: 14px;
    color: #999;
  }
}
</style>
