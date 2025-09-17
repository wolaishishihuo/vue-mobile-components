// Organization 组件完整代码示例和文档
export const organizationExamples = {
  // 基础用法
  basic: `<template>
  <div>
    <van-button type="primary" @click="showOrganization">
      选择人员
    </van-button>

    <JOrganization
      v-model="visible"
      :api-config="apiConfig"
      :popup-title="'选择组织人员'"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />

    <div v-if="selectedUsers.length > 0" class="result">
      已选择: {{ selectedUsers.map(u => u.xm).join(', ') }}
    </div>
  </div>
</template>

<script setup>
import { JOrganization } from '@jname/business';
import { Button as VanButton } from 'vant';
import { ref } from 'vue';

const visible = ref(false);
const selectedUsers = ref([]);

// API 配置
const apiConfig = {
  baseUrl: 'https://api.example.com',
  getToken: () => 'your-token'
};

const showOrganization = () => {
  visible.value = true;
};

const handleConfirm = (personnel) => {
  selectedUsers.value = personnel;
  visible.value = false;
};

const handleCancel = () => {
  visible.value = false;
};
<\/script>`,

  // 多选模式
  multiSelect: `<template>
  <div>
    <van-button type="primary" @click="showMultiSelect">
      多选人员（最多5人）
    </van-button>

    <JOrganization
      v-model="visible"
      :api-config="apiConfig"
      :multiple="true"
      :max-selected="5"
      :popup-title="'选择团队成员'"
      @confirm="handleMultiConfirm"
    />

    <div v-if="selectedTeam.length > 0" class="team-list">
      <van-tag
        v-for="user in selectedTeam"
        :key="user.id"
        type="primary"
        closeable
        @close="removeUser(user)"
      >
        {{ user.xm }}
      </van-tag>
    </div>
  </div>
</template>

<script setup>
import { JOrganization } from '@jname/business';
import { Button as VanButton, Tag as VanTag } from 'vant';
import { ref } from 'vue';

const visible = ref(false);
const selectedTeam = ref([]);

const apiConfig = {
  baseUrl: 'https://api.example.com',
  getToken: () => localStorage.getItem('token')
};

const showMultiSelect = () => {
  visible.value = true;
};

const handleMultiConfirm = (personnel) => {
  selectedTeam.value = personnel;
  visible.value = false;
};

const removeUser = (user) => {
  selectedTeam.value = selectedTeam.value.filter(u => u.id !== user.id);
};
<\/script>`,

  // 完整配置
  fullConfig: `<template>
  <JOrganization
    v-model="visible"
    :api-config="apiConfig"
    :multiple="isMultiple"
    :max-selected="maxCount"
    :popup-title="popupTitle"
    :popup-height="'70%'"
    @confirm="handleConfirm"
    @cancel="handleCancel"
    @close="handleClose"
  />
</template>

<script setup>
import { JOrganization } from '@jname/business';
import { ref } from 'vue';

const visible = ref(false);
const isMultiple = ref(true);
const maxCount = ref(10);
const popupTitle = ref('选择组织人员');

// 完整的 API 配置
const apiConfig = {
  baseUrl: process.env.VUE_APP_API_BASE_URL,
  getToken: () => {
    // 从 localStorage 或其他地方获取 token
    return localStorage.getItem('access_token') || '';
  }
};

const handleConfirm = (personnel) => {
  console.log('确认选择', personnel);
  // 处理选中的人员数据
  personnel.forEach(person => {
    console.log(\`选中: \${person.xm} (工号: \${person.xgh})\`);
  });
};

const handleCancel = () => {
  console.log('取消选择');
};

const handleClose = () => {
  console.log('弹窗关闭');
};
<\/script>`,

  // API 接口定义
  api: `interface OrganizationApiConfig {
  /** API 基础地址 */
  baseUrl: string;
  /** 获取访问令牌的函数 */
  getToken: () => string;
}

interface OrganizationPersonnel {
  /** 人员 ID */
  id: string;
  /** 学工号 */
  xgh: string;
  /** 姓名 */
  xm: string;
  /** 其他扩展字段 */
  [key: string]: any;
}

interface OrganizationPersonnelItem extends OrganizationPersonnel {
  /** 是否已选中 */
  checked?: boolean;
  /** 组织代码 */
  dwh?: string;
  /** 是否为父节点 */
  isParent?: boolean;
  /** 显示名称 */
  name?: string;
}

interface OrganizationProps {
  /** 弹窗显示状态 */
  modelValue: boolean;
  /** API 配置 */
  apiConfig: OrganizationApiConfig;
  /** 是否支持多选 */
  multiple?: boolean;
  /** 最大选择数量 */
  maxSelected?: number;
  /** 弹窗标题 */
  popupTitle?: string;
  /** 弹窗高度 */
  popupHeight?: string;
}

interface OrganizationEmits {
  /** 弹窗状态更新 */
  'update:modelValue': [value: boolean];
  /** 确认选择 */
  'confirm': [personnel: OrganizationPersonnelItem[]];
  /** 取消选择 */
  'cancel': [];
  /** 弹窗关闭 */
  'close': [];
}`,

  // 使用场景
  scenarios: `// 场景1: 单人选择（如：负责人选择）
const selectManager = () => {
  // multiple: false（默认）
  // maxSelected: 1
};

// 场景2: 团队选择（如：项目团队）
const selectTeam = () => {
  // multiple: true
  // maxSelected: 10
};

// 场景3: 抄送人选择（如：邮件抄送）
const selectCCUsers = () => {
  // multiple: true
  // maxSelected: 20
  // 可以预设已选人员
};

// 场景4: 审批流选择（如：审批人员）
const selectApprovers = () => {
  // multiple: true
  // 按部门或角色筛选
  // 支持搜索功能
};`
};
