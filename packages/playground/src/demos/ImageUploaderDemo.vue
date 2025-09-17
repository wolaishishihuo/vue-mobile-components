<template>
  <MobilePage title="ImageUploader 图片上传">
    <DemoBlock title="基础上传">
      <div class="demo-tip">
        支持多图上传，点击选择图片
      </div>
      <JImageUploader
        v-model="fileList1"
        :max-count="6"
        :max-size="5 * 1024 * 1024"
        @oversize="handleOversize"
      />
      <div v-if="fileList1.length > 0" class="result">
        已选择 {{ fileList1.length }} 张图片
      </div>
    </DemoBlock>

    <DemoBlock title="图片压缩">
      <div class="demo-tip">
        自动压缩大图片，减少上传时间
      </div>
      <JImageUploader
        v-model="fileList2"
        :max-count="4"
        :compress="true"
        :compress-options="compressOptions"
        @oversize="handleOversize"
      />
      <div v-if="fileList2.length > 0" class="result">
        已压缩上传 {{ fileList2.length }} 张图片
      </div>
    </DemoBlock>

    <DemoBlock title="预设图片">
      <div class="demo-tip">
        展示已有图片，支持预览和删除
      </div>
      <JImageUploader
        v-model="fileList3"
        :max-count="4"
      />
    </DemoBlock>
  </MobilePage>
</template>

<script setup lang="ts">
import { JImageUploader } from '@jname/business';
import { showToast } from 'vant';
import { ref } from 'vue';
import DemoBlock from '../components/DemoBlock.vue';
import MobilePage from '../components/MobilePage.vue';

const fileList1 = ref([]);
const fileList2 = ref([]);
const fileList3 = ref([
  { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg' },
  { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg' },
  { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg' }
]);

// 压缩配置
const compressOptions = {
  quality: 0.8,
  maxWidth: 1000,
  maxHeight: 1000
};

const handleOversize = (_file: File) => {
  showToast('文件大小不能超过 5MB');
};
</script>

<style scoped>
.demo-tip {
  padding: 8px 12px;
  background: #e8f4fd;
  border: 1px solid #b3d8f2;
  border-radius: 4px;
  font-size: 12px;
  color: #0c5aa6;
  margin-bottom: 12px;
}

.result {
  margin-top: 16px;
  padding: 12px;
  background: #f2f3f5;
  border-radius: 4px;
  font-size: 14px;
  color: #646566;
}
</style>
