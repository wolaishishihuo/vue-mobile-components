<template>
  <div class="organization-container">
    <!-- 吸顶搜索区域 -->
    <div class="search-section">
      <van-search
        v-model="searchState.xm"
        placeholder="请输入姓名"
        clearable
        @search="handleSearch"
      />
    </div>

    <!-- 内容区域 -->
    <div class="content-section">
      <RefreshList
        ref="refreshListRef"
        :api-fn="getOrganizationList"
        :extra-params="searchState"
        @change="handleRefreshChange"
      >
        <template #default="{ data }">
          <TransitionGroup name="list" tag="div" class="list-container">
            <template v-for="item in (data as PersonnelItem[])" :key="item.id">
              <!-- 组织机构项 -->
              <div
                v-if="item.isParent"
                class="org-item"
                @click="handleCellClick(item as PersonnelItem)"
              >
                <div class="item-content">
                  <div class="org-info">
                    <img src="@/assets/images/org.png" class="org-icon">
                    {{ item.name }}
                  </div>
                  <van-icon name="arrow" class="arrow-icon" />
                </div>
              </div>

              <!-- 人员项 -->
              <div v-else class="person-item">
                <div class="item-content">
                  <div class="person-info">
                    <van-icon name="contact" class="person-icon" />
                    {{ item.xm }}
                  </div>
                  <van-checkbox
                    v-model="item.checked"
                    @click="handleCheckChange(item as PersonnelItem)"
                  />
                </div>
              </div>
            </template>
          </TransitionGroup>
        </template>
      </RefreshList>
    </div>

    <!-- 底部操作栏 -->
    <div v-if="!!selectedCount" class="footer-bar">
      <div class="selected-count">
        {{ `已选择${selectedCount}人` }}
      </div>
      <div class="footer-buttons">
        <slot name="footer-left" />
        <van-button size="small" @click="handleClear">
          清空
        </van-button>
        <van-button type="primary" size="small" @click="handleConfirm">
          确定
        </van-button>
        <slot name="footer-right" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { PersonnelItem } from './types';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useOrganizationSelection } from '@/hooks/useOrganizationSelection';
import RefreshList from '@/pullToRefreshList/index.vue';
import { useOrganizationActions, useOrganizationApi, useOrganizationRouteParams, useOrganizationState } from './composables';

defineOptions({
  name: 'JOrganization'
});

const props = defineProps({
  multiple: {
    type: Boolean,
    default: true
  },
  maxSelected: {
    type: Number,
    default: 10
  },
  apiConfig: {
    type: Object as PropType<{
      baseUrl: string;
      getToken: () => string;
    }>,
    required: true
  }
});

const refreshListRef = ref<InstanceType<typeof RefreshList>>();
const router = useRouter();
const { routeState } = useOrganizationRouteParams();
const { searchState } = useOrganizationState();
const { getOrganizationList, organizationCatch } = useOrganizationApi({
  routeState,
  apiConfig: props.apiConfig
});
const { selectedCount, selectedItems, handleRefreshChange, handleCheckChange, handleCellClick, handleSearch, handleClear } = useOrganizationActions({
  routeState,
  organizationCatch,
  refreshListRef,
  searchState
});

const { executeCallback } = useOrganizationSelection();

const handleConfirm = async () => {
  await executeCallback(selectedItems.value as PersonnelItem[]);
  router.go(-routeState.depth);
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
