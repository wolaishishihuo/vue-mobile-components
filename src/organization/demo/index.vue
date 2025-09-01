<template>
  <div class="h-full flex-col bg-white">
    <NavBar title="组织架构选择器演示" />

    <div class="flex-1 overflow-y-auto p-30">
      <!-- 功能介绍 -->
      <div class="mb-40">
        <h2 class="mb-20 text-42px text-[#333] font-bold">
          功能介绍
        </h2>
        <div class="text-32px text-[#666] leading-relaxed space-y-20">
          <p>• 支持层级组织架构浏览和人员选择</p>
          <p>• 搜索功能：可按姓名快速查找人员</p>
          <p>• 多选模式：支持选择多个人员</p>
          <p>• 回调机制：选择完成后触发回调函数</p>
        </div>
      </div>

      <!-- 演示区域 -->
      <div class="space-y-30">
        <!-- 单选演示 -->
        <div class="border border-hex-e9e9e9 rounded-12 p-30">
          <h3 class="mb-20 text-36px text-[#333] font-bold">
            单人选择演示
          </h3>
          <div class="mb-20">
            <van-button type="primary" block @click="handleSingleSelect">
              选择一个人员
            </van-button>
          </div>
          <div v-if="singleSelected" class="rounded-8 bg-hex-f5f5f5 p-20">
            <p class="text-28px text-[#666]">
              已选择：
            </p>
            <div class="mt-10 flex-center text-32px text-[#333]">
              <van-icon name="contact" class="mr-10 text-primary" />
              {{ singleSelected.xm }} ({{ singleSelected.xgh }})
            </div>
          </div>
        </div>

        <!-- 多选演示 -->
        <div class="border border-hex-e9e9e9 rounded-12 p-30">
          <h3 class="mb-20 text-36px text-[#333] font-bold">
            多人选择演示
          </h3>
          <div class="mb-20">
            <van-button type="primary" block @click="handleMultiSelect">
              选择多个人员
            </van-button>
          </div>
          <div v-if="multiSelected.length > 0" class="rounded-8 bg-hex-f5f5f5 p-20">
            <p class="text-28px text-[#666]">
              已选择 {{ multiSelected.length }} 人：
            </p>
            <div class="mt-10 space-y-10">
              <div
                v-for="person in multiSelected"
                :key="person.id"
                class="flex-center text-32px text-[#333]"
              >
                <van-icon name="contact" class="mr-10 text-primary" />
                {{ person.xm }} ({{ person.xgh }})
              </div>
            </div>
          </div>
        </div>

        <!-- API 演示 -->
        <div class="border border-hex-e9e9e9 rounded-12 p-30">
          <h3 class="mb-20 text-36px text-[#333] font-bold">
            API 调用演示
          </h3>
          <div class="space-y-20">
            <van-button block @click="testGetOrganizations">
              获取组织架构根节点
            </van-button>
            <van-button block @click="testGetPersonnelList">
              获取人员列表
            </van-button>
          </div>
          <div v-if="apiResult" class="mt-20 rounded-8 bg-hex-f5f5f5 p-20">
            <p class="mb-10 text-28px text-[#666]">
              API 结果：
            </p>
            <pre class="whitespace-pre-wrap text-24px text-[#333]">{{ apiResult }}</pre>
          </div>
        </div>

        <!-- 组合式函数演示 -->
        <div class="border border-hex-e9e9e9 rounded-12 p-30">
          <h3 class="mb-20 text-36px text-[#333] font-bold">
            Composables 功能
          </h3>
          <div class="text-28px text-[#666] space-y-15">
            <p>• useOrganizationPicker：人员选择器调用</p>
            <p>• useOrganizationSelection：选择状态管理</p>
            <p>• useOrganizationApi：API 调用封装</p>
            <p>• useOrganizationState：状态管理</p>
            <p>• useOrganizationActions：交互逻辑</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PersonnelItem } from '../types';
import { showFailToast, showLoadingToast, showSuccessToast } from 'vant';
import NavBar from '@/components/base/NavBar/index.vue';
import { getOrganizations, getPersonnelList } from '../api';
import { useOrganizationPicker } from '../index';

defineOptions({
  name: 'OrganizationDemo'
});

const { openPersonnelPicker } = useOrganizationPicker();

// 单选结果
const singleSelected = ref<PersonnelItem | null>(null);

// 多选结果
const multiSelected = ref<PersonnelItem[]>([]);

// API 结果
const apiResult = ref('');

// 单人选择
const handleSingleSelect = () => {
  openPersonnelPicker(async (personnel: PersonnelItem[]) => {
    if (personnel.length > 0) {
      singleSelected.value = personnel[0];
      showSuccessToast(`已选择：${personnel[0].xm}`);
    }
  });
};

// 多人选择
const handleMultiSelect = () => {
  openPersonnelPicker(async (personnel: PersonnelItem[]) => {
    multiSelected.value = personnel;
    showSuccessToast(`已选择 ${personnel.length} 人`);
  });
};

// 测试获取组织架构
const testGetOrganizations = async () => {
  try {
    showLoadingToast('加载中...');
    const result = await getOrganizations();
    apiResult.value = JSON.stringify(result, null, 2);
    closeToast();
    showSuccessToast('获取成功');
  } catch (error) {
    closeToast();
    showFailToast('获取失败');
    apiResult.value = `Error: ${error}`;
  }
};

// 测试获取人员列表
const testGetPersonnelList = async () => {
  try {
    showLoadingToast('加载中...');
    const result = await getPersonnelList({ pageNum: 1, pageSize: 10 });
    apiResult.value = JSON.stringify(result, null, 2);
    closeToast();
    showSuccessToast('获取成功');
  } catch (error) {
    closeToast();
    showFailToast('获取失败');
    apiResult.value = `Error: ${error}`;
  }
};
</script>

<style lang="less" scoped>
.space-y-10 > * + * {
  margin-top: 10px;
}

.space-y-15 > * + * {
  margin-top: 15px;
}

.space-y-20 > * + * {
  margin-top: 20px;
}

.space-y-30 > * + * {
  margin-top: 30px;
}
</style>
