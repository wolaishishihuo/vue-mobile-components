<template>
  <div class="steps-card-demo">
    <h3>基础用法</h3>
    <div class="demo-section">
      <StepsCard>
        <template #header>
          <div class="step-header">
            <span class="step-title">第一步</span>
            <span class="step-time">2024-01-15 09:00</span>
          </div>
        </template>
        <div class="step-content">
          订单已创建，等待付款确认
        </div>
      </StepsCard>

      <StepsCard>
        <template #header>
          <div class="step-header">
            <span class="step-title">第二步</span>
            <span class="step-time">2024-01-15 09:30</span>
          </div>
        </template>
        <div class="step-content">
          付款成功，商家正在准备发货
        </div>
      </StepsCard>

      <StepsCard>
        <template #header>
          <div class="step-header">
            <span class="step-title">第三步</span>
            <span class="step-time">2024-01-15 14:00</span>
          </div>
        </template>
      </StepsCard>
    </div>

    <h3>详细内容</h3>
    <div class="demo-section">
      <StepsCard>
        <template #header>
          <div class="step-header">
            <span class="step-title">订单确认</span>
            <span class="step-status success">已完成</span>
          </div>
        </template>
        <div class="step-detail">
          <p>订单号：SO2024011500001</p>
          <p>下单时间：2024-01-15 08:45:32</p>
          <p>商品：iPhone 15 Pro Max 256GB</p>
          <p>数量：1件</p>
          <p>金额：￥9,999.00</p>
        </div>
      </StepsCard>

      <StepsCard>
        <template #header>
          <div class="step-header">
            <span class="step-title">支付成功</span>
            <span class="step-status success">已完成</span>
          </div>
        </template>
        <div class="step-detail">
          <p>支付方式：微信支付</p>
          <p>支付时间：2024-01-15 08:47:15</p>
          <p>交易流水：WX20240115084715001</p>
        </div>
      </StepsCard>

      <StepsCard>
        <template #header>
          <div class="step-header">
            <span class="step-title">商品出库</span>
            <span class="step-status processing">进行中</span>
          </div>
        </template>
        <div class="step-detail">
          <p>仓库：上海仓库</p>
          <p>预计出库时间：2024-01-15 16:00</p>
          <div class="progress-info">
            <span>出库进度</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 60%" />
            </div>
            <span>60%</span>
          </div>
        </div>
      </StepsCard>

      <StepsCard>
        <template #header>
          <div class="step-header">
            <span class="step-title">物流配送</span>
            <span class="step-status pending">待处理</span>
          </div>
        </template>
      </StepsCard>
    </div>

    <h3>时间轴样式</h3>
    <div class="demo-section">
      <StepsCard>
        <template #header>
          <div class="timeline-header">
            <h4>项目启动</h4>
            <span class="date">2024年1月</span>
          </div>
        </template>
        <div class="timeline-content">
          <ul class="task-list">
            <li>✅ 需求分析完成</li>
            <li>✅ 技术方案确定</li>
            <li>✅ 团队组建完毕</li>
          </ul>
        </div>
      </StepsCard>

      <StepsCard>
        <template #header>
          <div class="timeline-header">
            <h4>开发阶段</h4>
            <span class="date">2024年2-3月</span>
          </div>
        </template>
        <div class="timeline-content">
          <ul class="task-list">
            <li>✅ 前端框架搭建</li>
            <li>✅ 后端API开发</li>
            <li>🔄 UI界面实现中</li>
            <li>⏳ 功能测试待开始</li>
          </ul>
        </div>
      </StepsCard>

      <StepsCard>
        <template #header>
          <div class="timeline-header">
            <h4>上线部署</h4>
            <span class="date">2024年4月</span>
          </div>
        </template>
      </StepsCard>
    </div>

    <h3>不同内容类型</h3>
    <div class="demo-section">
      <!-- 纯文字 -->
      <StepsCard>
        <template #header>
          <span class="simple-title">用户注册</span>
        </template>
        <div>用户已成功注册账号</div>
      </StepsCard>

      <!-- 只有标题 -->
      <StepsCard>
        <template #header>
          <span class="simple-title">邮箱验证</span>
        </template>
      </StepsCard>

      <!-- 图文内容 -->
      <StepsCard>
        <template #header>
          <div class="step-header">
            <span class="step-title">上传头像</span>
            <span class="step-status success">已完成</span>
          </div>
        </template>
        <div class="media-content">
          <div class="avatar-preview">
            <div class="avatar-placeholder">
              👤
            </div>
            <p>头像已上传</p>
          </div>
          <div class="upload-info">
            <p>文件名：avatar.jpg</p>
            <p>大小：156KB</p>
            <p>上传时间：2024-01-15 10:30</p>
          </div>
        </div>
      </StepsCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import StepsCard from '../index.vue';
</script>

<style scoped>
.steps-card-demo {
  width: 100%;
  padding: 0;
  background: transparent;
}

h3 {
  margin: 20px 0 15px 0;
  color: #323233;
  font-size: 16px;
  font-weight: 600;
  padding: 0 5px;
}

.demo-section {
  margin-bottom: 25px;
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

/* 步骤头部样式 */
.step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.step-title {
  font-size: 16px;
  font-weight: 600;
  color: #323233;
}

.step-time {
  font-size: 12px;
  color: #969799;
}

.step-status {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.step-status.success {
  background: #e8f5e8;
  color: #52c41a;
}

.step-status.processing {
  background: #e6f7ff;
  color: #1890ff;
}

.step-status.pending {
  background: #f6f6f6;
  color: #969799;
}

/* 步骤内容样式 */
.step-content {
  color: #646566;
  font-size: 14px;
  line-height: 1.5;
}

.step-detail {
  color: #646566;
  font-size: 14px;
}

.step-detail p {
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
}

.progress-info {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #1890ff;
  transition: width 0.3s ease;
}

/* 时间轴样式 */
.timeline-header {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.timeline-header h4 {
  margin: 0;
  font-size: 16px;
  color: #323233;
  font-weight: 600;
}

.date {
  font-size: 12px;
  color: #969799;
}

.timeline-content {
  margin-top: 5px;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-list li {
  padding: 4px 0;
  font-size: 14px;
  color: #646566;
}

/* 简单标题样式 */
.simple-title {
  font-size: 16px;
  font-weight: 600;
  color: #323233;
}

/* 媒体内容样式 */
.media-content {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.avatar-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.avatar-placeholder {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.avatar-preview p {
  font-size: 12px;
  color: #646566;
  margin: 0;
}

.upload-info {
  flex: 1;
}

.upload-info p {
  margin: 4px 0;
  font-size: 13px;
  color: #646566;
  display: flex;
  justify-content: space-between;
}
</style>
