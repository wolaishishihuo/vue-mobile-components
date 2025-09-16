// StepsCard 组件代码示例
export const stepsCardExamples = {
  vue: `<template>
  <JStepsCard>
    <template #header>
      <strong>步骤 1: 安装依赖</strong>
    </template>
    <p>使用 npm 或 pnpm 安装组件库</p>
    <code>pnpm add @jname/components</code>
  </JStepsCard>
</template>

<script setup>
import { JStepsCard } from '@jname/components';
<\/script>`,

  api: `interface StepsCardProps {
  // 该组件主要通过插槽使用，无特殊 props
}

// 插槽说明
/*
#header - 头部内容插槽
#default - 主要内容插槽
*/`
};
