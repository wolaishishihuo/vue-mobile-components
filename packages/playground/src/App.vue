<template>
  <div class="mobile-app">
    <!-- 移动端顶部导航 -->
    <VanNavBar
      title="组件库演示"
      left-text="返回"
      right-text="菜单"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <!-- 主要内容区域 -->
    <div class="content">
      <!-- Tab 切换演示 -->
      <div class="demo-section">
        <h3>标签页切换</h3>
        <JTabs v-model="activeTab" :tab-options="tabs" />
        <div class="tab-content">
          <div v-if="activeTab === 'home'">
            <h4>首页内容</h4>
            <JContentCard
              title="新闻标题"
              desc="这是一条重要新闻的摘要信息，点击查看详情..."
              :images="newsImages"
              :meta="{ tagText: '热点', tagStatus: 'danger', timeText: '2小时前' }"
            />
            <JContentCard
              title="产品发布"
              desc="我们很高兴地宣布新产品正式发布，欢迎大家体验使用"
              :images="productImages"
              display-mode="single"
              :meta="{ tagText: '推荐', tagStatus: 'success', timeText: '1天前' }"
            />
          </div>
          <div v-else-if="activeTab === 'discover'">
            <h4>发现页面</h4>
            <JStepsCard>
              <template #header>
                <strong>步骤 1: 注册账号</strong>
              </template>
              <p>填写您的个人信息，创建新账号</p>
              <VanButton type="primary" size="small">
                立即注册
              </VanButton>
            </JStepsCard>

            <JStepsCard>
              <template #header>
                <strong>步骤 2: 完善资料</strong>
              </template>
              <p>上传头像，完善个人资料信息</p>
              <VanButton size="small">
                去完善
              </VanButton>
            </JStepsCard>
          </div>
          <div v-else>
            <h4>我的页面</h4>
            <JOrganization
              v-if="showOrganization"
              v-model:visible="showOrganization"
              :selected-users="selectedUsers"
              @confirm="onOrganizationConfirm"
            />
            <VanCellGroup>
              <VanCell title="选择团队成员" is-link @click="showOrganization = true">
                <template #value>
                  {{ selectedUsers.length > 0 ? `已选择${selectedUsers.length}人` : '未选择' }}
                </template>
              </VanCell>
              <VanCell title="上传图片" is-link @click="showUploader = true" />
              <VanCell title="设置" is-link />
            </VanCellGroup>

            <!-- 图片上传组件 -->
            <JImgUploader
              v-if="showUploader"
              v-model:visible="showUploader"
              :max-count="3"
              @upload="onImageUpload"
            />
          </div>
        </div>
      </div>

      <!-- 下拉刷新列表演示 -->
      <div class="demo-section">
        <h3>下拉刷新列表</h3>
        <JPullRefresh
          :list="listData"
          @refresh="onRefresh"
          @load-more="onLoadMore"
        >
          <template #item="{ item }">
            <JContentCard
              :title="item.title"
              :desc="item.desc"
              :images="item.images"
              :meta="item.meta"
            />
          </template>
        </JPullRefresh>
      </div>
    </div>

    <!-- 底部导航 -->
    <VanTabbar v-model="activeBottom" fixed>
      <VanTabbarItem icon="home-o">
        首页
      </VanTabbarItem>
      <VanTabbarItem icon="search">
        发现
      </VanTabbarItem>
      <VanTabbarItem icon="friends-o">
        消息
      </VanTabbarItem>
      <VanTabbarItem icon="setting-o">
        我的
      </VanTabbarItem>
    </VanTabbar>
  </div>
</template>

<script setup lang="ts">
import { JImageUploader as JImgUploader, JOrganization, JPullRefresh } from '@jname/business';
// 真实用户的导入方式
import { JContentCard, JStepsCard, JTabs } from '@jname/components';
import { Button as VanButton, Cell as VanCell, CellGroup as VanCellGroup, NavBar as VanNavBar, Tabbar as VanTabbar, TabbarItem as VanTabbarItem } from 'vant';
import { ref } from 'vue';

// 模拟真实业务数据
const activeTab = ref('home');
const activeBottom = ref(0);
const showOrganization = ref(false);
const showUploader = ref(false);
const selectedUsers = ref([]);

const tabs = ref([
  { label: '首页', value: 'home' },
  { label: '发现', value: 'discover' },
  { label: '我的', value: 'mine' }
]);

const newsImages = ref([
  'https://img.yzcdn.cn/vant/cat.jpeg',
  'https://img.yzcdn.cn/vant/tree.jpg'
]);

const productImages = ref([
  'https://img.yzcdn.cn/vant/apple-1.jpg'
]);

const listData = ref([
  {
    title: '重要公告',
    desc: '关于系统升级维护的通知，请各位用户注意...',
    images: ['https://img.yzcdn.cn/vant/cat.jpeg'],
    meta: { tagText: '公告', tagStatus: 'info', timeText: '3小时前' }
  },
  {
    title: '功能更新',
    desc: '新版本增加了多项实用功能，提升用户体验',
    images: ['https://img.yzcdn.cn/vant/tree.jpg'],
    meta: { tagText: '更新', tagStatus: 'success', timeText: '6小时前' }
  }
]);

// 模拟真实业务逻辑
const onClickLeft = () => {
  console.log('返回上一页');
};

const onClickRight = () => {
  console.log('打开菜单');
};

const onOrganizationConfirm = (users: any[]) => {
  selectedUsers.value = users;
  console.log('选择的用户:', users);
};

const onImageUpload = (files: File[]) => {
  console.log('上传的图片:', files);
};

const onRefresh = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('刷新完成');
      resolve(true);
    }, 1000);
  });
};

const onLoadMore = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('加载更多');
      resolve(true);
    }, 1000);
  });
};
</script>

<style>
/* 模拟真实移动端应用样式 */
body {
  margin: 0;
  padding: 0;
  background-color: var(--j-background-2);
}

.mobile-app {
  max-width: 375px;
  margin: 0 auto;
  background-color: var(--j-background);
  min-height: 100vh;
}

.content {
  padding: var(--j-padding-md);
  padding-bottom: 80px; /* 为底部导航留空间 */
}

.demo-section {
  margin-bottom: var(--j-padding-xl);
  background: var(--j-background);
  border-radius: var(--j-radius-lg);
  padding: var(--j-padding-md);
  box-shadow: var(--j-shadow-1);
}

.demo-section h3 {
  margin: 0 0 var(--j-padding-md) 0;
  color: var(--j-text-color);
  font-size: var(--j-font-size-lg);
  font-weight: var(--j-font-bold);
}

.demo-section h4 {
  margin: 0 0 var(--j-padding-sm) 0;
  color: var(--j-text-color-2);
  font-size: var(--j-font-size-md);
}

.tab-content {
  margin-top: var(--j-padding-md);
}
</style>
