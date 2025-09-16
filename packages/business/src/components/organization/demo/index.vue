<template>
  <div class="organization-demo">
    <!-- 页面头部 -->
    <div class="demo-header">
      <h1>组织架构选择器演示</h1>
      <p>基于真实API的组织架构人员选择组件</p>
    </div>

    <!-- 组件演示区域 -->
    <div class="demo-section">
      <h2>基础使用演示</h2>

      <!-- 多选模式 -->
      <div class="demo-item">
        <h3>多选模式（最多选择10人）</h3>
        <div class="demo-controls">
          <van-button type="primary" @click="showMultipleDemo">
            打开多选模式
          </van-button>
          <div v-if="selectedPersonnelMultiple.length > 0" class="selected-result">
            <h4>已选择人员：</h4>
            <div class="selected-list">
              <van-tag
                v-for="person in selectedPersonnelMultiple"
                :key="person.id"
                type="primary"
                closeable
                @close="removeSelectedPerson(person, 'multiple')"
              >
                {{ person.xm }}({{ person.xgh }})
              </van-tag>
            </div>
          </div>
        </div>
      </div>

      <!-- 单选模式 -->
      <div class="demo-item">
        <h3>单选模式</h3>
        <div class="demo-controls">
          <van-button type="success" @click="showSingleDemo">
            打开单选模式
          </van-button>
          <div v-if="selectedPersonnelSingle.length > 0" class="selected-result">
            <h4>已选择人员：</h4>
            <div class="selected-list">
              <van-tag
                v-for="person in selectedPersonnelSingle"
                :key="person.id"
                type="success"
                closeable
                @close="removeSelectedPerson(person, 'single')"
              >
                {{ person.xm }}({{ person.xgh }})
              </van-tag>
            </div>
          </div>
        </div>
      </div>

      <!-- 限制数量演示 -->
      <div class="demo-item">
        <h3>限制数量（最多选择3人）</h3>
        <div class="demo-controls">
          <van-button type="warning" @click="showLimitedDemo">
            打开限制数量模式
          </van-button>
          <div v-if="selectedPersonnelLimited.length > 0" class="selected-result">
            <h4>已选择人员：</h4>
            <div class="selected-list">
              <van-tag
                v-for="person in selectedPersonnelLimited"
                :key="person.id"
                type="warning"
                closeable
                @close="removeSelectedPerson(person, 'limited')"
              >
                {{ person.xm }}({{ person.xgh }})
              </van-tag>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 组织架构组件实例 -->
    <!-- 多选模式 -->
    <JOrganization
      v-model="showMultiplePicker"
      :multiple="true"
      :max-selected="10"
      :api-config="apiConfig"
      popup-title="选择人员（多选）"
      @confirm="handleMultipleConfirm"
      @cancel="handleCancel"
      @close="handleClose"
    />

    <!-- 单选模式 -->
    <JOrganization
      v-model="showSinglePicker"
      :multiple="false"
      :max-selected="1"
      :api-config="apiConfig"
      popup-title="选择人员（单选）"
      @confirm="handleSingleConfirm"
      @cancel="handleCancel"
      @close="handleClose"
    />

    <!-- 限制数量模式 -->
    <JOrganization
      v-model="showLimitedPicker"
      :multiple="true"
      :max-selected="3"
      :api-config="apiConfig"
      popup-title="选择人员（最多3人）"
      @confirm="handleLimitedConfirm"
      @cancel="handleCancel"
      @close="handleClose"
    />

    <!-- API测试区域 -->
    <div class="demo-section">
      <h2>API 调用测试</h2>
      <div class="demo-item">
        <div class="api-buttons">
          <van-button type="primary" @click="testGetOrganizations">
            获取组织架构根节点
          </van-button>
          <van-button type="success" @click="testGetPersonnelList">
            获取人员列表
          </van-button>
          <van-button type="warning" @click="testSearchPersonnel">
            搜索人员(姓名:张)
          </van-button>
        </div>
        <div v-if="apiResult" class="api-result">
          <h4>API 返回结果：</h4>
          <pre>{{ apiResult }}</pre>
        </div>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="demo-section">
      <h2>使用说明</h2>
      <div class="demo-item">
        <div class="usage-info">
          <h4>基本配置：</h4>
          <pre class="code-block">{{ usageCode }}</pre>

          <h4>API配置说明：</h4>
          <ul>
            <li><code>baseUrl</code>: API基础地址</li>
            <li><code>getToken</code>: 获取认证token的函数</li>
          </ul>

          <h4>组件属性：</h4>
          <ul>
            <li><code>v-model</code>: 控制弹窗显示状态</li>
            <li><code>multiple</code>: 是否支持多选，默认true</li>
            <li><code>maxSelected</code>: 最大选择数量，默认10</li>
            <li><code>apiConfig</code>: API配置对象，包含baseUrl和getToken</li>
            <li><code>popupTitle</code>: 弹窗标题，默认"选择人员"</li>
            <li><code>popupHeight</code>: 弹窗高度，默认"80%"</li>
          </ul>

          <h4>组件事件：</h4>
          <ul>
            <li><code>@confirm</code>: 确认选择时触发，参数为选中的人员数组</li>
            <li><code>@cancel</code>: 取消选择时触发</li>
            <li><code>@close</code>: 弹窗关闭时触发</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ApiConfig, PersonnelItem } from '../types';
import { closeToast, showFailToast, showLoadingToast, showSuccessToast, showToast } from 'vant';

import { ref } from 'vue';
import { createOrganizationApi } from '../api';
import JOrganization from '../index.vue';

defineOptions({
  name: 'OrganizationDemo'
});

// API配置 - 使用提供的地址和token
const apiConfig: ApiConfig = {
  baseUrl: 'https://dev.psctech.net:18100/electronicscreen/api',
  getToken: () => 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJzeXNhZG1pbiIsImRldmljZSI6ImRlZmF1bHQtZGV2aWNlIiwiZWZmIjoxNzU2Nzk5Nzk5NTE1LCJyblN0ciI6Inh2M1FDaE1rSTRXZlZYc3VQYTJCNm8yV0pqdGlCNjRjIn0.a608KXVKFp0gfY4MltS1Z0lkTJLhJaNIPbIhK-HzkCY'
};

// 创建API实例
const api = createOrganizationApi(apiConfig);

// API 结果
const apiResult = ref('');

// 弹窗控制状态
const showMultiplePicker = ref(false);
const showSinglePicker = ref(false);
const showLimitedPicker = ref(false);

// 选中的人员数据
const selectedPersonnelMultiple = ref<PersonnelItem[]>([]);
const selectedPersonnelSingle = ref<PersonnelItem[]>([]);
const selectedPersonnelLimited = ref<PersonnelItem[]>([]);

// 显示多选演示
const showMultipleDemo = () => {
  showMultiplePicker.value = true;
};

// 显示单选演示
const showSingleDemo = () => {
  showSinglePicker.value = true;
};

// 显示限制数量演示
const showLimitedDemo = () => {
  showLimitedPicker.value = true;
};

// 处理多选确认
const handleMultipleConfirm = (personnel: PersonnelItem[]) => {
  selectedPersonnelMultiple.value = personnel;
  showSuccessToast(`已选择 ${personnel.length} 人`);
  console.log('多选确认:', personnel);
};

// 处理单选确认
const handleSingleConfirm = (personnel: PersonnelItem[]) => {
  selectedPersonnelSingle.value = personnel;
  showSuccessToast(`已选择：${personnel[0]?.xm || ''}`);
  console.log('单选确认:', personnel);
};

// 处理限制数量确认
const handleLimitedConfirm = (personnel: PersonnelItem[]) => {
  selectedPersonnelLimited.value = personnel;
  showSuccessToast(`已选择 ${personnel.length} 人（最多3人）`);
  console.log('限制数量确认:', personnel);
};

// 处理取消
const handleCancel = () => {
  showToast('已取消选择');
  console.log('用户取消选择');
};

// 处理关闭
const handleClose = () => {
  console.log('弹窗已关闭');
};

// 移除选中的人员
const removeSelectedPerson = (person: PersonnelItem, type: 'multiple' | 'single' | 'limited') => {
  switch (type) {
    case 'multiple':
      selectedPersonnelMultiple.value = selectedPersonnelMultiple.value.filter(p => p.id !== person.id);
      break;
    case 'single':
      selectedPersonnelSingle.value = [];
      break;
    case 'limited':
      selectedPersonnelLimited.value = selectedPersonnelLimited.value.filter(p => p.id !== person.id);
      break;
  }
  showToast(`已移除：${person.xm}`);
};

// 使用代码示例
const usageCode = `<!-- 多选模式 -->
<JOrganization
  v-model="showPicker"
  :multiple="true"
  :max-selected="10"
  :api-config="apiConfig"
  popup-title="选择人员"
  @confirm="handleConfirm"
  @cancel="handleCancel"
  @close="handleClose"
/>

<!-- 单选模式 -->
<JOrganization
  v-model="showPicker"
  :multiple="false"
  :max-selected="1"
  :api-config="apiConfig"
  popup-title="选择人员（单选）"
  @confirm="handleConfirm"
/>`;

// 测试获取组织架构根节点
const testGetOrganizations = async () => {
  try {
    showLoadingToast('获取组织架构中...');
    const result = await api.getOrganizations();
    apiResult.value = JSON.stringify(result, null, 2);
    closeToast();
    showSuccessToast('获取成功');
    console.log('组织架构根节点:', result);
  } catch (error) {
    closeToast();
    showFailToast('获取失败');
    apiResult.value = `Error: ${error}`;
    console.error('获取组织架构失败:', error);
  }
};

// 测试获取人员列表
const testGetPersonnelList = async () => {
  try {
    showLoadingToast('获取人员列表中...');
    const result = await api.getPersonnelList({
      pageNum: 1,
      pageSize: 10
    });
    apiResult.value = JSON.stringify(result, null, 2);
    closeToast();
    showSuccessToast('获取成功');
    console.log('人员列表:', result);
  } catch (error) {
    closeToast();
    showFailToast('获取失败');
    apiResult.value = `Error: ${error}`;
    console.error('获取人员列表失败:', error);
  }
};

// 测试搜索人员
const testSearchPersonnel = async () => {
  try {
    showLoadingToast('搜索人员中...');
    const result = await api.getPersonnelList({
      xm: '张',
      pageNum: 1,
      pageSize: 10
    });
    apiResult.value = JSON.stringify(result, null, 2);
    closeToast();
    showSuccessToast('搜索成功');
    console.log('搜索结果:', result);
  } catch (error) {
    closeToast();
    showFailToast('搜索失败');
    apiResult.value = `Error: ${error}`;
    console.error('搜索人员失败:', error);
  }
};
</script>

<style lang="less" scoped>
.organization-demo {
  min-height: 100vh;
  background: #f8f8f8;
  padding: 20px;
}

.demo-header {
  text-align: center;
  margin-bottom: 30px;

  h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    color: #666;
    margin: 0;
  }
}

.demo-section {
  margin-bottom: 30px;

  h2 {
    font-size: 18px;
    color: #333;
    margin-bottom: 15px;
    padding-left: 10px;
    border-left: 3px solid #1989fa;
  }
}

.demo-item {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;

  h3 {
    font-size: 16px;
    color: #333;
    margin: 0 0 15px 0;
  }

  h4 {
    font-size: 14px;
    color: #666;
    margin: 15px 0 10px 0;
  }
}

.demo-controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.selected-result {
  margin-top: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;

  h4 {
    color: #495057;
    margin: 0 0 12px 0;
    font-size: 14px;
    font-weight: 500;
  }
}

.selected-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  .van-tag {
    margin: 0;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 4px;
    max-width: 100%;

    &.van-tag--primary {
      background: #e3f2fd;
      color: #1976d2;
      border-color: #bbdefb;
    }

    &.van-tag--success {
      background: #e8f5e8;
      color: #2e7d32;
      border-color: #c8e6c9;
    }

    &.van-tag--warning {
      background: #fff3e0;
      color: #f57c00;
      border-color: #ffcc02;
    }
  }
}

.api-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.api-result {
  background: #f5f5f5;
  border-radius: 6px;
  padding: 15px;

  pre {
    margin: 0;
    white-space: pre-wrap;
    word-break: break-all;
    font-size: 12px;
    color: #333;
    max-height: 300px;
    overflow-y: auto;
  }
}

.usage-info {
  .code-block {
    background: #f8f8f8;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    padding: 12px;
    font-size: 12px;
    color: #333;
    margin: 10px 0;
    overflow-x: auto;
  }

  ul {
    margin: 10px 0;
    padding-left: 20px;

    li {
      margin: 8px 0;
      font-size: 14px;
      color: #666;

      code {
        background: #f0f0f0;
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 12px;
        color: #e74c3c;
      }
    }
  }
}
</style>
