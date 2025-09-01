/** 标签状态类型 */
export type TagStatus = 'success' | 'info' | 'warning' | 'error';

/** 元信息接口 */
export interface MetaInfo {
  /** 标签文本 */
  tagText?: string;
  /** 标签状态 */
  tagStatus?: TagStatus;
  /** 时间文本 */
  timeText?: string;
}

/** 组件 Props 接口 */
export interface ContentCardProps {
  /** 标题 */
  title: string;
  /** 描述 */
  desc?: string;
  /** 图片数组 */
  images?: string[];
  /** 元信息 */
  meta?: MetaInfo;
  /** 最大显示图片数量 */
  maxImages?: number;
}
