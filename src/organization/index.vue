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
            @click="clearAllSelections"
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
          v-model="searchState.xm"
          placeholder="请输入姓名搜索"
          clearable
          @search="executeSearch"
          @clear="executeSearch"
        />
      </div>

      <!-- 组织架构内容 -->
      <div v-if="popupVisible" class="popup-content">
        <van-list
          v-model:loading="state.loading"
          v-model:error="state.error"
          :finished="state.finished"
          :immediate-check="false"
          :offset="50"
          finished-text="没有更多了"
          loading-text="加载中..."
          v-bind="$attrs"
          @load="onLoad"
        >
          <div class="org-list">
            <TransitionGroup name="list" tag="div">
              <template v-for="item in dataSource" :key="item.id">
                <!-- 组织机构项 -->
                <div
                  v-if="item.isParent"
                  class="org-item"
                  @click="handleOrganizationNavigation(item)"
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
                <div v-else class="person-item" @click="handlePersonSelection(item)">
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
        </van-list>
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
import type { Emits, PersonnelItem, Props } from './types';
import { computed, watch } from 'vue';
import { useRefreshList } from '@/hooks';
import {
  useOrganizationActions,
  useOrganizationApi,
  useOrganizationState
} from './composables';

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

// 弹窗显示状态
const popupVisible = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
});

// 组织架构API
const { organizationCatch, getOrganizationList } = useOrganizationApi({
  apiConfig: props.apiConfig
});

// 状态管理
const { searchState, breadcrumbRef, breadcrumbs, addBreadcrumb, navigateToBreadcrumb, resetState } = useOrganizationState();

// 下拉刷新列表
const { dataSource, state, onRefresh, onLoad } = useRefreshList<PersonnelItem>({
  api: getOrganizationList,
  extraParams: searchState
});

// 操作逻辑
const {
  selectedCount,
  selectedPersonnel,
  handlePersonSelection,
  executeSearch,
  clearAllSelections,
  isPersonDisabled,
  syncListSelectionState
} = useOrganizationActions({
  multiple: props.multiple,
  maxSelected: props.maxSelected,
  organizationCache: organizationCatch,
  searchState,
  onRefreshList: () => onRefresh()
});

// 监听选中人员变化，同步到列表显示
watch(selectedPersonnel, () => {
  syncListSelectionState(dataSource.value);
}, { deep: true });

// 处理组织点击
const handleOrganizationNavigation = async (org: PersonnelItem) => {
  addBreadcrumb({
    id: org.id,
    name: org.name || org.xm,
    dwh: org.dwh || org.id
  });
  organizationCatch.value.clear();
  onRefresh();
};

// 处理面包屑点击
const handleBreadcrumbClick = async (index: number) => {
  if (index === breadcrumbs.value.length - 1) return;
  navigateToBreadcrumb(index);
  organizationCatch.value.clear();
  onRefresh();
};

// 弹窗事件
const handlePopupConfirm = () => {
  emit('confirm', selectedPersonnel.value);
  popupVisible.value = false;
};

const handlePopupCancel = () => {
  emit('cancel');
  popupVisible.value = false;
};

const handlePopupClose = () => emit('close');

// 监听弹窗打开，初始化状态
watch(popupVisible, (newVal) => {
  if (newVal) {
    resetState();
    clearAllSelections();
    organizationCatch.value.clear();
    onLoad();
  }
});
</script>

<style lang="less" scoped>
@import './index.less';
</style>
