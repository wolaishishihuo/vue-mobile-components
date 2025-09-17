<template>
  <MobilePage title="Organization 组织架构">
    <DemoBlock title="基础用法">
      <VanButton
        type="primary"
        @click="showOrganization"
      >
        选择组织架构
      </VanButton>
      <div v-if="selectedUsers.length > 0" class="result">
        已选择: {{ selectedUsers.map(user => user.xm || user.name).join(', ') }}
      </div>
    </DemoBlock>

    <DemoBlock title="多选模式">
      <VanButton
        type="primary"
        @click="showMultiSelectOrg"
      >
        多选组织成员
      </VanButton>
      <div v-if="multiSelectedUsers.length > 0" class="result">
        已选择 {{ multiSelectedUsers.length }} 人:
        <div class="user-tags">
          <VanTag
            v-for="user in multiSelectedUsers"
            :key="user.id"
            type="primary"
            size="medium"
            closeable
            @close="removeUser(user)"
          >
            {{ user.xm || user.name }}
          </VanTag>
        </div>
      </div>
    </DemoBlock>

    <JOrganization
      v-model="showPopup"
      :api-config="apiConfig"
      :multiple="isMultiSelect"
      :popup-title="popupTitle"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </MobilePage>
</template>

<script setup lang="ts">
import type { OrganizationApiConfig, OrganizationPersonnelItem } from '@jname/business';
import { JOrganization } from '@jname/business';
import { Button as VanButton, Tag as VanTag } from 'vant';
import { computed, ref } from 'vue';
import DemoBlock from '../components/DemoBlock.vue';
import MobilePage from '../components/MobilePage.vue';

interface Props {
  apiConfig?: OrganizationApiConfig;
}

const props = defineProps<Props>();

const showPopup = ref(false);
const selectedUsers = ref<OrganizationPersonnelItem[]>([]);
const multiSelectedUsers = ref<OrganizationPersonnelItem[]>([]);
const popupTitle = ref('选择组织架构');
const isMultiSelect = ref(false);

const apiConfig = computed(() => props.apiConfig);

const showOrganization = () => {
  popupTitle.value = '选择组织架构';
  isMultiSelect.value = false;
  showPopup.value = true;
};

const showMultiSelectOrg = () => {
  popupTitle.value = '选择组织成员';
  isMultiSelect.value = true;
  showPopup.value = true;
};

const handleConfirm = (personnel: OrganizationPersonnelItem[]) => {
  if (isMultiSelect.value) {
    multiSelectedUsers.value = [...personnel];
  } else {
    selectedUsers.value = [...personnel];
  }
  showPopup.value = false;
};

const handleCancel = () => {
  showPopup.value = false;
  console.log('取消选择');
};

const removeUser = (user: OrganizationPersonnelItem) => {
  multiSelectedUsers.value = multiSelectedUsers.value.filter(u => u.id !== user.id);
};
</script>

<style scoped>
.result {
  margin-top: 16px;
  padding: 12px;
  background: #f2f3f5;
  border-radius: 4px;
  font-size: 14px;
  color: #646566;
}

.user-tags {
  margin-top: 8px;
}

.user-tags .van-tag {
  margin: 4px 8px 4px 0;
}
</style>
