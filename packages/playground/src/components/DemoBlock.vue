<template>
  <div class="demo-block">
    <h3 v-if="title">
      {{ title }}
    </h3>
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
}

defineProps<Props>();
</script>

<style scoped>
.demo-block {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.demo-block h3 {
  font-size: 16px;
  color: #323233;
  margin-bottom: 16px;
}
</style>
