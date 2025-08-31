<template>
  <div class="button-demo">
    <h3>按钮类型</h3>
    <div class="demo-section">
      <JButton type="default">
        默认按钮
      </JButton>
      <JButton type="primary">
        主要按钮
      </JButton>
      <JButton type="success">
        成功按钮
      </JButton>
      <JButton type="warning">
        警告按钮
      </JButton>
      <JButton type="danger">
        危险按钮
      </JButton>
    </div>

    <h3>按钮尺寸</h3>
    <div class="demo-section">
      <JButton size="small">
        小按钮
      </JButton>
      <JButton size="medium">
        中按钮
      </JButton>
      <JButton size="large">
        大按钮
      </JButton>
    </div>

    <h3>按钮状态</h3>
    <div class="demo-section">
      <JButton :disabled="true">
        禁用按钮
      </JButton>
      <JButton :loading="true">
        加载中
      </JButton>
      <JButton :loading="loading" @click="handleLoading">
        {{ loading ? '加载中...' : '点击加载' }}
      </JButton>
    </div>

    <h3>按钮样式</h3>
    <div class="demo-section">
      <JButton :round="true" type="primary">
        圆角按钮
      </JButton>
      <JButton :plain="true" type="primary">
        朴素按钮
      </JButton>
      <JButton :block="true" type="primary">
        块级按钮
      </JButton>
    </div>

    <h3>点击事件</h3>
    <div class="demo-section">
      <JButton @click="handleClick">
        点击我
      </JButton>
      <p v-if="clickCount > 0">
        已点击 {{ clickCount }} 次
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import JButton from '../index.vue';

const loading = ref(false);
const clickCount = ref(0);

const handleLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};

const handleClick = () => {
  clickCount.value++;
};
</script>

<style scoped>
.button-demo {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}

h3 {
  margin: 20px 0 10px 0;
  color: #323233;
  font-size: 16px;
  font-weight: 500;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.demo-section :deep(.vm-button) {
  margin-bottom: 8px;
}

p {
  margin: 10px 0;
  color: #646566;
  font-size: 14px;
}
</style>
