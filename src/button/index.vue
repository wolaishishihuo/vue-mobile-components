<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <VanLoading
      v-if="loading"
      size="14px"
      color="currentColor"
      class="j-button__loading"
    />
    <span v-if="!loading" class="j-button__text">
      <slot>{{ text }}</slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { Loading as VanLoading } from 'vant';
import { computed } from 'vue';

export interface ButtonProps {
  /**
   * 按钮类型
   */
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger';

  /**
   * 按钮尺寸
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * 按钮文字
   */
  text?: string;

  /**
   * 是否禁用
   */
  disabled?: boolean;

  /**
   * 是否显示加载状态
   */
  loading?: boolean;

  /**
   * 是否为块级元素
   */
  block?: boolean;

  /**
   * 是否为圆形按钮
   */
  round?: boolean;

  /**
   * 是否为朴素按钮
   */
  plain?: boolean;
}

export interface ButtonEmits {
  click: [event: MouseEvent];
}

defineOptions({
  name: 'JButton'
});

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'medium',
  disabled: false,
  loading: false,
  block: false,
  round: false,
  plain: false
});

const emit = defineEmits<ButtonEmits>();

const buttonClasses = computed(() => [
  'j-button',
  `j-button--${props.type}`,
  `j-button--${props.size}`,
  {
    'j-button--disabled': props.disabled,
    'j-button--loading': props.loading,
    'j-button--block': props.block,
    'j-button--round': props.round,
    'j-button--plain': props.plain
  }
]);

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return;
  emit('click', event);
};
</script>

<style lang="less" scoped>
.j-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 44px;
  margin: 0;
  padding: 0 16px;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: opacity 0.2s;
  -webkit-appearance: none;
  appearance: none;
  user-select: none;
  outline: none;

  &__loading {
    margin-right: 4px;
  }

  &__text {
    font-size: 16px;
    line-height: 1.2;
  }

  // 类型样式
  &--default {
    color: #323233;
    background: #fff;
    border-color: #ebedf0;

    &:active {
      background: #f2f3f5;
    }
  }

  &--primary {
    color: #fff;
    background: #1989fa;
    border-color: #1989fa;

    &:active {
      background: #1770d6;
    }
  }

  &--success {
    color: #fff;
    background: #07c160;
    border-color: #07c160;

    &:active {
      background: #06ad56;
    }
  }

  &--danger {
    color: #fff;
    background: #ee0a24;
    border-color: #ee0a24;

    &:active {
      background: #d5001e;
    }
  }

  &--warning {
    color: #fff;
    background: #ff976a;
    border-color: #ff976a;

    &:active {
      background: #ff8855;
    }
  }

  // 尺寸样式
  &--small {
    height: 32px;
    padding: 0 8px;
    font-size: 12px;
  }

  &--large {
    height: 50px;
    padding: 0 20px;
    font-size: 18px;
  }

  // 状态样式
  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;

    &:active {
      background: inherit !important;
    }
  }

  &--loading {
    cursor: default;

    &:active {
      background: inherit !important;
    }
  }

  // 形状样式
  &--block {
    display: flex;
    width: 100%;
  }

  &--round {
    border-radius: 999px;
  }

  &--plain {
    background: #fff;

    &.j-button--primary {
      color: #1989fa;
      border-color: #1989fa;
    }

    &.j-button--success {
      color: #07c160;
      border-color: #07c160;
    }

    &.j-button--danger {
      color: #ee0a24;
      border-color: #ee0a24;
    }

    &.j-button--warning {
      color: #ff976a;
      border-color: #ff976a;
    }
  }
}
</style>
