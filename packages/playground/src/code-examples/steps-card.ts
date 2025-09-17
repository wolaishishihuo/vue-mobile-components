// StepsCard 组件完整代码示例和文档
export const stepsCardExamples = {
  // 基础用法
  basic: `<template>
  <JStepsCard
    title="订单处理流程"
    :steps="basicSteps"
    :current="currentStep"
  />
</template>

<script setup>
import { JStepsCard } from '@jname/components';
import { ref } from 'vue';

const currentStep = ref(1);

const basicSteps = ref([
  { title: '提交订单', description: '用户提交订单信息' },
  { title: '支付确认', description: '确认支付信息' },
  { title: '商家发货', description: '商家准备并发送商品' },
  { title: '确认收货', description: '用户确认收到商品' }
]);
<\/script>`,

  // 不同状态
  statuses: `<template>
  <div class="steps-demo">
    <!-- 进行中 -->
    <JStepsCard
      title="审批流程（进行中）"
      :steps="approvalSteps"
      :current="1"
      status="process"
    />

    <!-- 已完成 -->
    <JStepsCard
      title="项目进度（已完成）"
      :steps="projectSteps"
      :current="3"
      status="finish"
    />

    <!-- 错误状态 -->
    <JStepsCard
      title="部署流程（失败）"
      :steps="deploySteps"
      :current="2"
      status="error"
    />

    <!-- 等待状态 -->
    <JStepsCard
      title="审核流程（等待中）"
      :steps="reviewSteps"
      :current="0"
      status="wait"
    />
  </div>
</template>

<script setup>
import { JStepsCard } from '@jname/components';
import { ref } from 'vue';

const approvalSteps = ref([
  { title: '提交申请', description: '员工提交请假申请' },
  { title: '主管审批', description: '直属主管审批中...' },
  { title: 'HR 确认', description: '人事部门最终确认' }
]);

const projectSteps = ref([
  { title: '需求分析', description: '完成产品需求梳理' },
  { title: '设计开发', description: '完成UI设计和功能开发' },
  { title: '测试上线', description: '完成测试并成功上线' }
]);

const deploySteps = ref([
  { title: '代码构建', description: '构建生产版本代码' },
  { title: '服务部署', description: '部署到生产服务器失败' },
  { title: '服务验证', description: '验证服务可用性' }
]);

const reviewSteps = ref([
  { title: '内容审核', description: '等待内容审核...' },
  { title: '质量检查', description: '质量团队检查' },
  { title: '发布上线', description: '正式发布内容' }
]);
<\/script>`,

  // 动态步骤
  dynamic: `<template>
  <div>
    <JStepsCard
      :title="processTitle"
      :steps="dynamicSteps"
      :current="currentStep"
      :status="stepStatus"
    />

    <div class="controls">
      <van-button @click="prevStep" :disabled="currentStep <= 0">
        上一步
      </van-button>
      <van-button @click="nextStep" :disabled="currentStep >= dynamicSteps.length - 1">
        下一步
      </van-button>
      <van-button @click="markError" type="danger">
        标记错误
      </van-button>
      <van-button @click="reset">
        重置
      </van-button>
    </div>

    <div class="step-info">
      <p>当前步骤: {{ currentStep + 1 }} / {{ dynamicSteps.length }}</p>
      <p>状态: {{ stepStatus }}</p>
      <p>描述: {{ currentStepDesc }}</p>
    </div>
  </div>
</template>

<script setup>
import { JStepsCard } from '@jname/components';
import { Button as VanButton } from 'vant';
import { ref, computed } from 'vue';

const currentStep = ref(0);
const stepStatus = ref('process');

const processTitle = ref('动态流程演示');

const dynamicSteps = ref([
  { title: '初始化', description: '准备环境和资源' },
  { title: '数据处理', description: '处理业务数据' },
  { title: '结果验证', description: '验证处理结果' },
  { title: '完成', description: '流程执行完毕' }
]);

const currentStepDesc = computed(() => {
  return dynamicSteps.value[currentStep.value]?.description || '';
});

const nextStep = () => {
  if (currentStep.value < dynamicSteps.value.length - 1) {
    currentStep.value++;
    stepStatus.value = currentStep.value === dynamicSteps.value.length - 1 ? 'finish' : 'process';
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
    stepStatus.value = 'process';
  }
};

const markError = () => {
  stepStatus.value = 'error';
};

const reset = () => {
  currentStep.value = 0;
  stepStatus.value = 'process';
};
<\/script>`,

  // 插槽用法
  slots: `<template>
  <JStepsCard title="自定义步骤卡片">
    <!-- 自定义步骤内容 -->
    <template #steps>
      <div class="custom-steps">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="custom-step"
          :class="{ active: index === current, completed: index < current }"
        >
          <div class="step-icon">
            <van-icon v-if="index < current" name="passed" />
            <van-icon v-else-if="index === current" name="clock-o" />
            <span v-else>{{ index + 1 }}</span>
          </div>
          <div class="step-content">
            <div class="step-title">{{ step.title }}</div>
            <div class="step-desc">{{ step.description }}</div>
            <div v-if="step.time" class="step-time">{{ step.time }}</div>
          </div>
        </div>
      </div>
    </template>

    <!-- 自定义操作区域 -->
    <template #actions>
      <div class="step-actions">
        <van-button size="small" @click="prevStep">上一步</van-button>
        <van-button size="small" type="primary" @click="nextStep">下一步</van-button>
      </div>
    </template>
  </JStepsCard>
</template>

<script setup>
import { JStepsCard } from '@jname/components';
import { Button as VanButton, Icon as VanIcon } from 'vant';
import { ref } from 'vue';

const current = ref(1);

const steps = ref([
  { title: '开始', description: '流程启动', time: '09:00' },
  { title: '处理中', description: '正在处理...', time: '' },
  { title: '完成', description: '流程结束', time: '' }
]);

const nextStep = () => {
  if (current.value < steps.value.length - 1) {
    current.value++;
    steps.value[current.value - 1].time = new Date().toLocaleTimeString();
  }
};

const prevStep = () => {
  if (current.value > 0) {
    current.value--;
  }
};
<\/script>`,

  // API 接口
  api: `interface StepItem {
  /** 步骤标题 */
  title: string;
  /** 步骤描述 */
  description?: string;
  /** 步骤图标 */
  icon?: string;
  /** 步骤时间 */
  time?: string;
  /** 步骤状态 */
  status?: 'wait' | 'process' | 'finish' | 'error';
}

interface StepsCardProps {
  /** 卡片标题 */
  title?: string;
  /** 步骤列表 */
  steps: StepItem[];
  /** 当前步骤索引 */
  current?: number;
  /** 整体状态 */
  status?: 'wait' | 'process' | 'finish' | 'error';
  /** 步骤方向 */
  direction?: 'horizontal' | 'vertical';
  /** 是否显示步骤图标 */
  showIcon?: boolean;
  /** 是否显示步骤描述 */
  showDescription?: boolean;
}

interface StepsCardSlots {
  /** 默认插槽 - 替换整个步骤区域 */
  default?: () => any;
  /** 步骤区域插槽 */
  steps?: () => any;
  /** 操作区域插槽 */
  actions?: () => any;
  /** 标题插槽 */
  title?: () => any;
}

interface StepsCardEmits {
  /** 步骤点击事件 */
  'step-click': [index: number, step: StepItem];
  /** 当前步骤变更 */
  'current-change': [current: number];
  /** 状态变更 */
  'status-change': [status: string];
}`
};
