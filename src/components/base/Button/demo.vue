<template>
  <div class="button-demo">
    <!-- 基础用法 -->
    <div class="demo-row">
      <Button text="默认按钮" />
      <Button type="primary" text="主要按钮" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import Button from './index.vue';
</script>

<script lang="ts">
export default defineComponent({
  name: 'ButtonDemo'
});
</script>

<style lang="less" scoped>
.button-demo {
  padding: 16px;
}

.demo-section {
  margin-bottom: 24px;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
}

.demo-title {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.demo-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
}

.click-result {
  margin-top: 12px;
  padding: 8px 12px;
  background: #f0f9ff;
  border: 1px solid #bfdbfe;
  border-radius: 4px;
  color: #1e40af;
  font-size: 14px;
}
</style>
