<template>
  <div class="image-uploader-demo">
    <h3>基础用法</h3>
    <div class="demo-section">
      <p class="desc">
        最基础的图片上传功能
      </p>
      <ImgUploader
        v-model="basicFiles"
        @success="handleSuccess"
        @error="handleError"
      />
      <div v-if="basicFiles.length" class="result">
        <p>已上传文件：{{ basicFiles.length }} 张</p>
      </div>
    </div>

    <h3>多选模式</h3>
    <div class="demo-section">
      <p class="desc">
        开启多选，一次可以选择多张图片
      </p>
      <ImgUploader
        v-model="multipleFiles"
        :multiple="true"
        :max-count="6"
        upload-text="选择多张图片"
      />
    </div>

    <h3>限制数量</h3>
    <div class="demo-section">
      <p class="desc">
        限制最多上传3张图片
      </p>
      <ImgUploader
        v-model="limitFiles"
        :multiple="true"
        :max-count="3"
        upload-text="最多3张"
        @oversize="handleOversize"
      />
    </div>

    <h3>文件大小限制</h3>
    <div class="demo-section">
      <p class="desc">
        限制单个文件最大500KB
      </p>
      <ImgUploader
        v-model="sizeFiles"
        :max-size="500 * 1024"
        upload-text="限制500KB"
        @oversize="handleOversize"
      />
    </div>

    <h3>文件格式限制</h3>
    <div class="demo-section">
      <p class="desc">
        只允许上传 JPG 和 PNG 格式图片
      </p>
      <ImgUploader
        v-model="formatFiles"
        :formats="['jpg', 'jpeg', 'png']"
        upload-text="仅支持JPG/PNG"
        @error="handleError"
      />
    </div>

    <h3>禁用状态</h3>
    <div class="demo-section">
      <p class="desc">
        禁用上传功能
      </p>
      <ImgUploader
        v-model="disabledFiles"
        :disabled="true"
        upload-text="已禁用"
      />
    </div>

    <h3>只读模式</h3>
    <div class="demo-section">
      <p class="desc">
        只读模式，不显示删除按钮和上传区域
      </p>
      <ImgUploader
        v-model="readonlyFiles"
        :readonly="true"
        :deletable="false"
      />
    </div>

    <h3>自定义预览</h3>
    <div class="demo-section">
      <p class="desc">
        自定义预览覆盖层
      </p>
      <ImgUploader
        v-model="customPreviewFiles"
        :multiple="true"
        :max-count="4"
      >
        <template #preview-cover>
          <div class="custom-preview-cover">
            <van-icon name="eye-o" />
            <span>预览</span>
          </div>
        </template>
      </ImgUploader>
    </div>

    <h3>自定义上传区域</h3>
    <div class="demo-section">
      <p class="desc">
        通过默认插槽自定义上传区域
      </p>
      <ImgUploader
        v-model="customUploadFiles"
        :multiple="true"
      >
        <div class="custom-upload-area">
          <van-icon name="plus" size="32" color="#1989fa" />
          <div class="custom-upload-text">
            点击选择图片
          </div>
          <div class="custom-upload-desc">
            支持 JPG、PNG 格式
          </div>
        </div>
      </ImgUploader>
    </div>

    <h3>预设图片</h3>
    <div class="demo-section">
      <p class="desc">
        组件加载时预设一些图片
      </p>
      <ImgUploader
        v-model="presetFiles"
        :multiple="true"
        :max-count="5"
        @delete="handleDelete"
      />
    </div>

    <h3>自定义预览尺寸</h3>
    <div class="demo-section">
      <p class="desc">
        设置预览图片尺寸为 200x200 像素
      </p>
      <ImgUploader
        v-model="customSizeFiles"
        :multiple="true"
        :max-count="4"
        :preview-size="[200, 200]"
        upload-text="200x200预览"
      />
    </div>

    <h3>自定义删除按钮</h3>
    <div class="demo-section">
      <p class="desc">
        使用自定义删除按钮样式
      </p>
      <ImgUploader
        v-model="customDeleteFiles"
        :multiple="true"
        :max-count="4"
        :preview-width="120"
        :preview-height="120"
        upload-text="自定义删除"
      >
        <template #preview-delete>
          <div class="custom-delete-btn">
            <van-icon name="delete" size="14" color="white" />
          </div>
        </template>
      </ImgUploader>
    </div>

    <h3>完整示例</h3>
    <div class="demo-section">
      <p class="desc">
        展示所有功能的完整示例
      </p>
      <ImgUploader
        v-model="fullFeatureFiles"
        :multiple="true"
        :max-count="9"
        :max-size="2 * 1024 * 1024"
        :formats="['jpg', 'jpeg', 'png', 'webp']"
        :deletable="true"
        :preview="true"
        upload-text="选择图片"
        format-error-msg="仅支持 JPG、PNG、WebP 格式"
        :preview-options="{ showIndex: true, closeable: true }"
        @success="handleSuccess"
        @error="handleError"
        @delete="handleDelete"
        @oversize="handleOversize"
        @preview="handlePreview"
      />

      <div class="operation-buttons">
        <van-button
          type="primary"
          size="small"
          @click="clearAll"
        >
          清空全部
        </van-button>

        <van-button
          type="success"
          size="small"
          :disabled="!fullFeatureFiles.length"
          @click="previewFirst"
        >
          预览首张
        </van-button>
      </div>
    </div>

    <h3>事件监听</h3>
    <div class="demo-section">
      <p class="desc">
        监听各种事件
      </p>
      <div class="event-logs">
        <div
          v-for="(log, index) in eventLogs"
          :key="index"
          class="event-log"
          :class="log.type"
        >
          <span class="timestamp">{{ log.timestamp }}</span>
          <span class="event-type">{{ log.event }}</span>
          <span class="message">{{ log.message }}</span>
        </div>
      </div>

      <van-button
        type="default"
        size="small"
        :disabled="!eventLogs.length"
        @click="clearLogs"
      >
        清空日志
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UploaderFileListItem } from 'vant';
import { ref } from 'vue';
import ImgUploader from '../index.vue';

// 各种演示用的文件列表
const basicFiles = ref<(string | UploaderFileListItem)[]>([]);
const multipleFiles = ref<(string | UploaderFileListItem)[]>([]);
const limitFiles = ref<(string | UploaderFileListItem)[]>([]);
const sizeFiles = ref<(string | UploaderFileListItem)[]>([]);
const formatFiles = ref<(string | UploaderFileListItem)[]>([]);
const disabledFiles = ref<(string | UploaderFileListItem)[]>([
  'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
]);
const readonlyFiles = ref<(string | UploaderFileListItem)[]>([
  'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
]);
const customPreviewFiles = ref<(string | UploaderFileListItem)[]>([]);
const customUploadFiles = ref<(string | UploaderFileListItem)[]>([]);
const presetFiles = ref<(string | UploaderFileListItem)[]>([
  'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
  { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg' }
]);
const customSizeFiles = ref<(string | UploaderFileListItem)[]>([]);
const customDeleteFiles = ref<(string | UploaderFileListItem)[]>([]);
const fullFeatureFiles = ref<(string | UploaderFileListItem)[]>([]);

// 事件日志
interface EventLog {
  timestamp: string;
  event: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

const eventLogs = ref<EventLog[]>([]);

const addLog = (event: string, message: string, type: EventLog['type'] = 'info') => {
  const timestamp = new Date().toLocaleTimeString();
  eventLogs.value.unshift({
    timestamp,
    event,
    message,
    type
  });

  // 只保留最近20条日志
  if (eventLogs.value.length > 20) {
    eventLogs.value = eventLogs.value.slice(0, 20);
  }
};

// 事件处理函数
const handleSuccess = (files: File | File[]) => {
  const fileCount = Array.isArray(files) ? files.length : 1;
  const fileName = Array.isArray(files) ? files.map(f => f.name).join(', ') : files.name;
  addLog('success', `上传成功：${fileName}（${fileCount}个文件）`, 'success');
};

const handleError = (error: { file: File; message: string }) => {
  addLog('error', `上传失败：${error.file.name} - ${error.message}`, 'error');
};

const handleDelete = (_file: UploaderFileListItem, detail: { index: number }) => {
  addLog('delete', `删除文件：索引${detail.index}`, 'warning');
};

const handleOversize = (files: File | File[]) => {
  const fileName = Array.isArray(files) ? files.map(f => f.name).join(', ') : files.name;
  addLog('oversize', `文件过大：${fileName}`, 'error');
};

const handlePreview = (_file: UploaderFileListItem, detail: { index: number }) => {
  addLog('preview', `预览文件：索引${detail.index}`, 'info');
};

// 引用实例进行操作
const uploaderRef = ref();

// 操作方法
const clearAll = () => {
  fullFeatureFiles.value = [];
  addLog('operation', '清空全部文件', 'info');
};

const previewFirst = () => {
  if (uploaderRef.value && fullFeatureFiles.value.length > 0) {
    uploaderRef.value.preview(0);
    addLog('operation', '手动预览首张图片', 'info');
  }
};

const clearLogs = () => {
  eventLogs.value = [];
};
</script>

<style lang="less" scoped>
.image-uploader-demo {
  width: 100%;
  padding: 16px;

  h3 {
    margin: 30px 0 15px 0;
    font-size: 18px;
    color: #333;
    font-weight: 600;

    &:first-child {
      margin-top: 0;
    }
  }

  .demo-section {
    background: white;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .desc {
      margin: 0 0 16px 0;
      font-size: 14px;
      color: #666;
      line-height: 1.4;
    }

    .result {
      margin-top: 16px;
      padding: 12px;
      background: #f7f8fa;
      border-radius: 8px;
      font-size: 14px;
      color: #666;
    }
  }

  // 自定义预览覆盖层
  .custom-preview-cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;

    .van-icon {
      margin-bottom: 4px;
    }
  }

  // 自定义上传区域
  .custom-upload-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 20px;
    border: 2px dashed #dcdee0;
    border-radius: 8px;
    background: #fafafa;
    transition: all 0.3s;

    &:hover {
      border-color: #1989fa;
      background: #f0f8ff;
    }

    .custom-upload-text {
      margin-top: 8px;
      font-size: 14px;
      color: #1989fa;
      font-weight: 500;
    }

    .custom-upload-desc {
      margin-top: 4px;
      font-size: 12px;
      color: #969799;
    }
  }

  // 自定义删除按钮
  .custom-delete-btn {
    width: 24px;
    height: 24px;
    background: #ee0a24;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    position: absolute;
    top: -8px;
    right: -8px;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    &:hover {
      background: #c8102e;
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  // 操作按钮
  .operation-buttons {
    margin-top: 16px;
    display: flex;
    gap: 12px;
  }

  // 事件日志
  .event-logs {
    max-height: 300px;
    overflow-y: auto;
    background: #f7f8fa;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 16px;
    font-family: 'Monaco', 'Consolas', 'Courier New', monospace;

    .event-log {
      display: flex;
      gap: 8px;
      padding: 6px 0;
      border-bottom: 1px solid #ebedf0;
      font-size: 12px;
      line-height: 1.4;

      &:last-child {
        border-bottom: none;
      }

      .timestamp {
        color: #969799;
        min-width: 80px;
        flex-shrink: 0;
      }

      .event-type {
        color: #323233;
        font-weight: 500;
        min-width: 60px;
        flex-shrink: 0;
      }

      .message {
        color: #646566;
        word-break: break-all;
      }

      &.success {
        .event-type {
          color: #07c160;
        }
      }

      &.error {
        .event-type {
          color: #ee0a24;
        }
      }

      &.warning {
        .event-type {
          color: #ff976a;
        }
      }

      &.info {
        .event-type {
          color: #1989fa;
        }
      }
    }

    &:empty::before {
      content: '暂无事件日志';
      color: #969799;
      font-style: italic;
    }
  }
}

// 响应式处理
@media (max-width: 375px) {
  .image-uploader-demo {
    padding: 12px;

    .demo-section {
      padding: 12px;
    }
  }
}
</style>
