/**
 * 基础人员信息接口
 */
export interface OrganizationPersonnel {
  id: string;
  xgh: string; // 学工号
  xm: string; // 姓名
  [key: string]: any;
}

/**
 * 组织架构节点数据类型
 */
export interface OrganizationNode {
  id: number;
  dwh?: string; // 单位号
  name: string;
  isParent?: boolean;
  children?: OrganizationNode[];
  checked?: boolean;
}

/**
 * 组织架构人员项（包含扩展字段）
 */
export interface OrganizationPersonnelItem extends OrganizationPersonnel {
  checked?: boolean;
  dwh?: string; // 组织代码字段
  isParent?: boolean; // 是否为父节点标识
  name?: string; // 名称字段，用于组织结构项
  [key: string]: any;
}

/**
 * 组织架构和人员混合类型
 */
export type OrganizationPickerItem = OrganizationNode | OrganizationPersonnelItem;

/**
 * API 配置接口
 */
export interface OrganizationApiConfig {
  baseUrl: string;
  getToken: () => string;
}

export interface OrganizationProps {
  /** 是否支持多选 */
  multiple?: boolean;
  /** 最大选择数量 */
  maxSelected?: number;
  /** API配置 */
  apiConfig: OrganizationApiConfig;
  /** 弹窗显示状态 */
  modelValue?: boolean;
  /** 弹窗标题 */
  popupTitle?: string;
  /** 弹窗高度 */
  popupHeight?: string;
}

export interface OrganizationEmits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'confirm', personnel: OrganizationPersonnelItem[]): void;
  (e: 'cancel'): void;
  (e: 'close'): void;
}

// 内部使用的简化类型别名
export type Props = OrganizationProps;
export type Emits = OrganizationEmits;
export type PersonnelItem = OrganizationPersonnelItem;
