<template>
  <van-popup
    v-model:show="popupVisible"
    position="bottom"
    :style="{ height: popupHeight }"
    round
    closeable
    :destroy-on-close="true"
    close-icon-position="top-right"
    @close="handlePopupClose"
  >
    <div class="organization-popup">
      <!-- 弹窗头部 -->
      <div class="popup-header">
        <h3 class="popup-title">
          {{ popupTitle }}
        </h3>
        <div v-if="selectedCount > 0" class="header-actions">
          <div class="selected-count">
            已选择{{ selectedCount }}人
          </div>
          <van-button
            size="mini"
            @click="handleClear"
          >
            清空
          </van-button>
        </div>
      </div>

      <!-- 面包屑导航 -->
      <div v-if="breadcrumbs.length > 1" class="breadcrumb-nav">
        <div ref="breadcrumbRef" class="breadcrumb-content">
          <span
            v-for="(item, index) in breadcrumbs"
            :key="item.id || 'root'"
            class="breadcrumb-item"
            :class="{ active: index === breadcrumbs.length - 1 }"
            @click="handleBreadcrumbClick(index)"
          >
            {{ item.name }}
            <van-icon v-if="index < breadcrumbs.length - 1" name="arrow" />
          </span>
        </div>
      </div>

      <!-- 搜索栏 -->
      <div class="search-section">
        <van-search
          v-model="searchKeyword"
          placeholder="请输入姓名搜索"
          clearable
          @search="handleSearch"
          @clear="handleSearchClear"
        />
      </div>

      <!-- 组织架构内容 -->
      <div v-if="popupVisible" class="popup-content">
        <PullToRefreshList
          ref="refreshListRef"
          :api-fn="getOrganizationList"
          :extra-params="searchState"
          :disable-pull-refresh="true"
        >
          <template #default="{ data }">
            <div class="org-list">
              <TransitionGroup name="list" tag="div">
                <template v-for="item in (data as PersonnelItem[])" :key="item.id">
                  <!-- 组织机构项 -->
                  <div
                    v-if="item.isParent"
                    class="org-item"
                    @click="handleOrgClick(item)"
                  >
                    <div class="item-content">
                      <div class="org-info">
                        <van-icon name="friends-o" class="org-icon" />
                        <span class="org-name">{{ item.name }}</span>
                      </div>
                      <van-icon name="arrow" class="arrow-icon" />
                    </div>
                  </div>

                  <!-- 人员项 -->
                  <div v-else class="person-item" @click="handlePersonClick(item)">
                    <div class="item-content">
                      <div class="person-info">
                        <van-icon name="contact" class="person-icon" />
                        <div class="person-details">
                          <div class="person-name">
                            {{ item.xm }}
                          </div>
                          <div class="person-id">
                            {{ item.xgh }}
                          </div>
                        </div>
                      </div>
                      <van-checkbox
                        :model-value="item.checked"
                        :disabled="isPersonDisabled(item)"
                      />
                    </div>
                  </div>
                </template>
              </TransitionGroup>
            </div>
          </template>
        </PullToRefreshList>
      </div>

      <!-- 弹窗底部操作 -->
      <div class="popup-footer">
        <van-button size="large" @click="handlePopupCancel">
          取消
        </van-button>
        <van-button
          type="primary"
          size="large"
          :disabled="selectedCount === 0"
          @click="handlePopupConfirm"
        >
          确定 {{ selectedCount > 0 ? `(${selectedCount})` : '' }}
        </van-button>
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import type { PersonnelItem } from './types';
import { computed, nextTick, ref, watch } from 'vue';
import PullToRefreshList from '@/pullToRefreshList/index.vue';
import { useOrganizationActions, useOrganizationApi, useOrganizationState } from './composables';

defineOptions({
  name: 'JOrganization'
});

const props = withDefaults(defineProps<Props>(), {
  multiple: true,
  maxSelected: 10,
  modelValue: false,
  popupTitle: '选择人员',
  popupHeight: '80%'
});

const emit = defineEmits<Emits>();

interface Props {
  /** 是否支持多选 */
  multiple?: boolean;
  /** 最大选择数量 */
  maxSelected?: number;
  /** API配置 */
  apiConfig: {
    baseUrl: string;
    getToken: () => string;
  };
  /** 弹窗显示状态 */
  modelValue?: boolean;
  /** 弹窗标题 */
  popupTitle?: string;
  /** 弹窗高度 */
  popupHeight?: string;
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'confirm', personnel: PersonnelItem[]): void;
  (e: 'cancel'): void;
  (e: 'close'): void;
}

// 弹窗显示状态
const popupVisible = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
});

// 下拉刷新列表引用
const refreshListRef = ref<InstanceType<typeof PullToRefreshList>>();

// 面包屑容器引用
const breadcrumbRef = ref<HTMLElement>();

// 组织架构API
const { organizationCatch, getOrganizationList } = useOrganizationApi({
  apiConfig: props.apiConfig
});

// 状态管理
const { searchState, breadcrumbs, addBreadcrumb, navigateToBreadcrumb, resetState } = useOrganizationState();

// 搜索关键词
const searchKeyword = computed({
  get: () => searchState.value.xm,
  set: (value) => {
    searchState.value.xm = value;
  }
});

// 操作逻辑
const {
  selectedCount,
  selectedItems,
  handlePersonClick,
  handleClear,
  isPersonDisabled
} = useOrganizationActions({
  multiple: props.multiple,
  maxSelected: props.maxSelected,
  organizationCatch,
  searchState,
  onRefresh: () => refreshListRef.value?.onRefresh()
});

const currentList = computed(() => refreshListRef.value?.dataSource || []);

// 同步选中状态到当前列表
const syncSelectedState = () => {
  const dataSource = currentList.value;
  if (!dataSource) return;

  dataSource.forEach((item: PersonnelItem) => {
    if (!item.isParent) {
      item.checked = selectedItems.value.some(selected => selected.id === item.id);
    }
  });
};

// 监听选中项变化，同步到列表
watch(selectedItems, () => {
  syncSelectedState();
}, { deep: true });

// 滚动面包屑到最新位置
const scrollBreadcrumbToEnd = async () => {
  await nextTick();
  if (breadcrumbRef.value) {
    breadcrumbRef.value.scrollLeft = breadcrumbRef.value.scrollWidth;
  }
};

// 处理组织点击
const handleOrgClick = async (org: PersonnelItem) => {
  // 添加到面包屑
  addBreadcrumb({
    id: org.id,
    name: org.name || org.xm, // 组织结构可能使用 name，人员使用 xm
    dwh: org.dwh || org.id // 如果没有 dwh 字段，尝试使用 id
  });

  // 清空缓存并刷新数据
  organizationCatch.value.clear();
  refreshListRef.value?.onRefresh();
};

// 处理面包屑点击
const handleBreadcrumbClick = async (index: number) => {
  if (index === breadcrumbs.value.length - 1) return;

  // 导航到指定层级
  navigateToBreadcrumb(index);

  // 清空缓存并刷新数据
  organizationCatch.value.clear();
  refreshListRef.value?.onRefresh();
};

// 处理搜索
const handleSearch = () => {
  refreshListRef.value?.onRefresh();
};

// 处理搜索清空
const handleSearchClear = () => {
  refreshListRef.value?.onRefresh();
};

// 弹窗确认
const handlePopupConfirm = () => {
  emit('confirm', selectedItems.value);
  popupVisible.value = false;
};

// 弹窗取消
const handlePopupCancel = () => {
  emit('cancel');
  popupVisible.value = false;
};

// 弹窗关闭
const handlePopupClose = () => {
  emit('close');
};

// 初始化状态 - 仅在打开时调用
const initializeState = () => {
  // 重置搜索状态和面包屑
  resetState();
  // 清空选中的人员
  handleClear();
  // 清空组织架构缓存
  organizationCatch.value.clear();
};

// 监听面包屑变化，自动滚动到最新位置
watch(breadcrumbs, () => {
  scrollBreadcrumbToEnd();
}, { deep: true });

// 监听弹窗状态变化
watch(popupVisible, (newVal) => {
  if (newVal) {
    initializeState();
    refreshListRef.value?.onRefresh();
  }
});
</script>

<style lang="less" scoped>
@import './index.less';
</style>
