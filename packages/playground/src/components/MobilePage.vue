<template>
  <div class="mobile-page">
    <VanNavBar :title="title" />
    <div class="demo-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NavBar as VanNavBar } from 'vant';

interface Props {
  title: string;
}

defineProps<Props>();
</script>

<style scoped>
.mobile-page {
  height: 100%;
  background: #f8f9fa;
}
</style>
