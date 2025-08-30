// 导出所有组件的类型定义
// TODO: 在添加组件时，在这里导出组件的类型定义
// export * from '../components/core/ArticleCard/types'
// export * from '../components/core/TableTree/interface'

// 公共类型定义
export interface ComponentOptions {
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
}

export interface BaseProps {
  id?: string
  className?: string
  style?: Record<string, any>
}

// 主题类型
export interface ThemeConfig {
  primaryColor?: string
  successColor?: string
  warningColor?: string
  errorColor?: string
  infoColor?: string
}

// 上传组件类型
export interface UploadFile {
  id: string
  name: string
  url?: string
  status: 'pending' | 'uploading' | 'success' | 'error'
  percent?: number
}

// 列表刷新组件类型
export interface RefreshListConfig {
  enablePullRefresh?: boolean
  enableLoadMore?: boolean
  finishedText?: string
  loadingText?: string
  errorText?: string
}

// 表格树组件类型
export interface TreeNode {
  id: string | number
  label: string
  children?: TreeNode[]
  disabled?: boolean
  level?: number
  expanded?: boolean
}
