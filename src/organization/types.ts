// 人员接口
export interface Personnel {
  id: string;
  xgh: string;
  xm: string;
  [key: string]: any;
}

/**
 * 组织架构数据类型
 */
export interface Organization {
  id: number;
  dwh?: string;
  name: string;
  isParent?: boolean;
  children?: Organization[];
  checked?: boolean;
}

/**
 * 扩展人员类型
 */
export interface PersonnelItem extends Personnel {
  checked?: boolean;
  dwh?: string; // 添加组织代码字段，用于组织结构项
  isParent?: boolean; // 添加是否为父节点标识
  name?: string; // 添加名称字段，组织结构项使用
  [key: string]: any;
}

/**
 * 组织架构和人员混合类型
 */
export type OrganizationPickerItem = Organization | PersonnelItem;
