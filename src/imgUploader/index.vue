<template>
  <van-uploader
    v-model="innerFileList"
    v-bind="$attrs"
    :max-count="maxCount"
    :max-size="maxSize"
    :multiple="multiple"
    :disabled="disabled"
    :readonly="readonly"
    :deletable="deletable"
    :before-read="handleBeforeRead"
    @oversize="$emit('oversize', $event)"
    @delete="handleDelete"
    @click-preview="handlePreview"
  >
    <!-- 传递预览覆盖插槽 -->
    <template #preview-cover="{ file, index }">
      <slot name="preview-cover" :file="file" :index="index" />
    </template>

    <!-- 传递其他所有插槽 -->
    <template v-for="name in computedSlots" :key="name" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </van-uploader>

  <!-- 错误信息 -->
  <div v-if="errorMsg" class="jname-upload-error">
    {{ errorMsg }}
  </div>
</template>

<script setup lang="ts">
import type { ImagePreviewOptions, UploaderFileListItem } from 'vant';
import type { UploaderProps } from './types';
import { showImagePreview, showToast } from 'vant';
import { computed, ref, useSlots, watch } from 'vue';

// 定义默认属性值
const props = withDefaults(defineProps<UploaderProps>(), {
  multiple: false,
  maxCount: Infinity,
  maxSize: Infinity,
  formats: () => ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  deletable: true,
  disabled: false,
  readonly: false,
  preview: true,
  uploadText: '上传图片',
  previewOptions: () => ({}),
  formatErrorMsg: ''
});

// 定义事件
const emit = defineEmits([
  'update:modelValue',
  'oversize',
  'delete',
  'error',
  'success',
  'preview'
]);

// 获取插槽
const slots = useSlots();

// 计算可用的插槽，排除已在模板中单独处理的插槽
const computedSlots = computed(() => {
  const slotNames = Object.keys(slots);
  return slotNames.filter(name => name !== 'default' && name !== 'preview-cover');
});

// 内部状态
const innerFileList = ref<UploaderFileListItem[]>([]);
const errorMsg = ref('');

// 格式化错误信息
const formattedFormatErrorMsg = computed(() => {
  if (props.formatErrorMsg) return props.formatErrorMsg;
  return `文件格式不正确，请上传${props.formats.join('/')}格式的图片`;
});

// 将字符串数组转换为文件列表对象数组
const convertToFileList = (value: (string | UploaderFileListItem)[]) => {
  return value.map((item) => {
    if (typeof item === 'string') {
      return { url: item };
    }
    return item;
  });
};

// 监听modelValue变化
watch(
  () => props.modelValue,
  (newVal) => {
    innerFileList.value = convertToFileList(newVal);
  },
  { immediate: true, deep: true }
);

// 监听内部文件列表变化，同步到父组件
watch(
  innerFileList,
  (newVal) => {
    // 避免循环更新：只在值真正不同时才emit
    const currentModelValue = convertToFileList(props.modelValue);
    if (JSON.stringify(newVal) !== JSON.stringify(currentModelValue)) {
      emit('update:modelValue', newVal);
    }
  },
  { deep: true }
);

/**
 * 在读取文件前验证格式
 * @param file 文件对象
 * @returns 是否通过验证
 */
const handleBeforeRead = (file: File | File[]) => {
  errorMsg.value = '';
  const files = Array.isArray(file) ? file : [file];

  // 验证文件格式
  for (const file of files) {
    // 获取文件扩展名
    const extension = file.name.split('.').pop()?.toLowerCase() || '';

    if (!props.formats.includes(extension)) {
      errorMsg.value = formattedFormatErrorMsg.value;
      showToast(errorMsg.value);
      emit('error', { file, message: errorMsg.value });
      return false;
    }
  }

  // 验证通过
  emit('success', files.length === 1 ? files[0] : files);
  return true;
};

/**
 * 处理文件删除
 * @param file 被删除的文件
 * @param detail 删除的详细信息
 * @param detail.index 被删除文件的索引
 */
const handleDelete = (file: UploaderFileListItem, detail: { index: number }) => {
  emit('delete', file, detail);
};

/**
 * 处理图片预览
 * @param file 被预览的文件
 * @param detail 预览的详细信息
 * @param detail.index 被预览文件的索引
 */
const handlePreview = (file: UploaderFileListItem, detail: { index: number }) => {
  if (!props.preview) return;

  // 获取所有预览图片URL
  const images = innerFileList.value.map(item => item.url || '');

  // 合并默认预览选项和用户自定义选项
  const options: ImagePreviewOptions = {
    images,
    startPosition: detail.index,
    showIndex: true,
    closeable: true,
    showIndicators: images.length > 1,
    // 允许图片旋转
    swipeDuration: 300,
    ...props.previewOptions
  };

  // 调用Vant图片预览组件
  showImagePreview(options);

  // 触发预览事件
  emit('preview', file, detail);
};

// 对外暴露方法
defineExpose({
  // 清空上传列表
  clear: () => {
    innerFileList.value = [];
  },
  // 手动触发图片预览
  preview: (index = 0) => {
    if (innerFileList.value[index]) {
      handlePreview(innerFileList.value[index], { index });
    }
  }
});
</script>

<style scoped lang="less">
.jname-upload-error {
  margin-top: 8px;
  font-size: 12px;
  color: #ee0a24;
}
</style>
