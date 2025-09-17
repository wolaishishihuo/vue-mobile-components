// ImageUploader 组件完整代码示例和文档
export const imageUploaderExamples = {
  // 基础用法
  basic: `<template>
  <JImageUploader
    v-model="fileList"
    :max-count="6"
    :max-size="5 * 1024 * 1024"
    @oversize="handleOversize"
    @delete="handleDelete"
  />
</template>

<script setup>
import { JImageUploader } from '@jname/business';
import { showToast } from 'vant';
import { ref } from 'vue';

const fileList = ref([]);

const handleOversize = (file) => {
  showToast('文件大小不能超过 5MB');
};

const handleDelete = (file, index) => {
  showToast(\`删除第 \${index + 1} 张图片\`);
};
<\/script>`,

  // 图片压缩
  compress: `<template>
  <JImageUploader
    v-model="fileList"
    :max-count="4"
    :compress="true"
    :compress-options="compressOptions"
    @before-read="handleBeforeRead"
    @after-read="handleAfterRead"
  />
</template>

<script setup>
import { JImageUploader } from '@jname/business';
import { showToast } from 'vant';
import { ref } from 'vue';

const fileList = ref([]);

// 压缩配置
const compressOptions = {
  quality: 0.8,        // 图片质量 0-1
  maxWidth: 1000,      // 最大宽度
  maxHeight: 1000,     // 最大高度
  mimeType: 'image/jpeg'  // 输出格式
};

const handleBeforeRead = (file) => {
  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    showToast('请选择 jpg 或 png 格式的图片');
    return false;
  }
  return true;
};

const handleAfterRead = (file) => {
  console.log('压缩后的文件', file);
};
<\/script>`,

  // 自定义上传样式
  customStyle: `<template>
  <JImageUploader v-model="fileList" :max-count="4">
    <!-- 自定义上传按钮 -->
    <template #default>
      <div class="custom-upload">
        <van-icon name="photograph" size="32" />
        <div class="upload-text">点击上传</div>
        <div class="upload-desc">支持 jpg、png 格式</div>
      </div>
    </template>

    <!-- 自定义预览遮罩 -->
    <template #preview-cover="{ file, index }">
      <div class="preview-cover">
        <van-icon name="eye-o" @click="previewImage(file)" />
        <van-icon name="delete-o" @click="deleteImage(index)" />
      </div>
    </template>
  </JImageUploader>
</template>

<script setup>
import { JImageUploader } from '@jname/business';
import { Icon as VanIcon, showImagePreview } from 'vant';
import { ref } from 'vue';

const fileList = ref([]);

const previewImage = (file) => {
  showImagePreview([file.url || file.objectUrl]);
};

const deleteImage = (index) => {
  fileList.value.splice(index, 1);
};
<\/script>

<style scoped>
.custom-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: #f7f8fa;
  border: 2px dashed #c8c9cc;
  border-radius: 8px;
  color: #969799;
}

.upload-text {
  font-size: 14px;
  margin-top: 8px;
}

.upload-desc {
  font-size: 11px;
  margin-top: 4px;
}

.preview-cover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
}

.preview-cover .van-icon {
  color: #fff;
  font-size: 20px;
  margin: 0 8px;
}
</style>`,

  // 只读模式
  readonly: `<template>
  <JImageUploader
    v-model="fileList"
    :readonly="true"
    @image-click="handleImageClick"
  />
</template>

<script setup>
import { JImageUploader } from '@jname/business';
import { showImagePreview } from 'vant';
import { ref } from 'vue';

const fileList = ref([
  { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg' },
  { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg' }
]);

const handleImageClick = (file, index) => {
  showImagePreview(fileList.value.map(item => item.url), index);
};
<\/script>`,

  // API 接口
  api: `interface CompressOptions {
  /** 图片质量 0-1 */
  quality?: number;
  /** 最大宽度 */
  maxWidth?: number;
  /** 最大高度 */
  maxHeight?: number;
  /** 输出图片格式 */
  mimeType?: string;
}

interface FileItem {
  /** 文件 URL */
  url?: string;
  /** 文件对象 */
  file?: File;
  /** 本地预览 URL */
  objectUrl?: string;
  /** 上传状态 */
  status?: 'uploading' | 'success' | 'failed';
  /** 错误信息 */
  message?: string;
}

interface ImageUploaderProps {
  /** 文件列表 */
  modelValue: FileItem[];
  /** 最大上传数量 */
  maxCount?: number;
  /** 文件大小限制（字节） */
  maxSize?: number;
  /** 是否支持多选 */
  multiple?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 是否可删除 */
  deletable?: boolean;
  /** 是否启用压缩 */
  compress?: boolean;
  /** 压缩配置 */
  compressOptions?: CompressOptions;
  /** 接受的文件类型 */
  accept?: string;
  /** 上传前回调 */
  beforeRead?: (file: File | File[]) => boolean | Promise<boolean>;
  /** 上传后回调 */
  afterRead?: (file: FileItem | FileItem[]) => void;
}

interface ImageUploaderSlots {
  /** 自定义上传按钮 */
  default?: () => any;
  /** 自定义预览遮罩 */
  'preview-cover'?: (props: { file: FileItem; index: number }) => any;
}

interface ImageUploaderEmits {
  /** 文件列表更新 */
  'update:modelValue': [fileList: FileItem[]];
  /** 文件超出大小限制 */
  'oversize': [file: File];
  /** 文件删除 */
  'delete': [file: FileItem, index: number];
  /** 图片点击 */
  'image-click': [file: FileItem, index: number];
  /** 上传开始 */
  'upload-start': [file: File];
  /** 上传成功 */
  'upload-success': [response: any, file: FileItem];
  /** 上传失败 */
  'upload-error': [error: any, file: FileItem];
}`,

  // 完整示例
  fullExample: `<template>
  <div class="upload-demo">
    <!-- 头像上传 -->
    <div class="section">
      <h3>头像上传</h3>
      <JImageUploader
        v-model="avatarList"
        :max-count="1"
        :max-size="2 * 1024 * 1024"
        :compress="true"
        :compress-options="{ quality: 0.9, maxWidth: 300, maxHeight: 300 }"
        @oversize="() => showToast('头像大小不能超过 2MB')"
      >
        <template #default>
          <div class="avatar-upload">
            <van-icon name="user-circle-o" size="40" />
            <div>上传头像</div>
          </div>
        </template>
      </JImageUploader>
    </div>

    <!-- 相册上传 -->
    <div class="section">
      <h3>相册上传</h3>
      <JImageUploader
        v-model="albumList"
        :max-count="9"
        :compress="true"
        :before-read="beforeRead"
        @oversize="handleOversize"
      />
      <div class="upload-tips">
        <p>• 最多上传 9 张图片</p>
        <p>• 支持 jpg、png、webp 格式</p>
        <p>• 单张图片不超过 10MB</p>
      </div>
    </div>

    <!-- 证件照上传 -->
    <div class="section">
      <h3>证件照上传</h3>
      <JImageUploader
        v-model="idCardList"
        :max-count="2"
        :accept="'image/jpeg,image/png'"
        :compress="false"
      >
        <template #preview-cover="{ file, index }">
          <div class="id-card-cover">
            <div class="cover-text">
              {{ index === 0 ? '正面' : '背面' }}
            </div>
          </div>
        </template>
      </JImageUploader>
    </div>
  </div>
</template>

<script setup>
import { JImageUploader } from '@jname/business';
import { Icon as VanIcon, showToast } from 'vant';
import { ref } from 'vue';

const avatarList = ref([]);
const albumList = ref([]);
const idCardList = ref([]);

const beforeRead = (file) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    showToast('请选择正确的图片格式');
    return false;
  }
  return true;
};

const handleOversize = (file) => {
  showToast('图片大小不能超过 10MB');
};
<\/script>

<style scoped>
.upload-demo {
  padding: 16px;
}

.section {
  margin-bottom: 32px;
}

.section h3 {
  font-size: 16px;
  color: #323233;
  margin-bottom: 12px;
}

.avatar-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: #f7f8fa;
  border: 1px dashed #c8c9cc;
  border-radius: 50%;
  color: #969799;
  font-size: 12px;
}

.upload-tips {
  margin-top: 12px;
  padding: 12px;
  background: #f7f8fa;
  border-radius: 4px;
}

.upload-tips p {
  font-size: 12px;
  color: #646566;
  margin: 4px 0;
}

.id-card-cover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
}

.cover-text {
  color: #fff;
  font-size: 12px;
  font-weight: 500;
}
</style>`
};
