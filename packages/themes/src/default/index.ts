import type { ThemeConfig } from '../shared/types';

// 默认主题配置
export const defaultTheme: ThemeConfig = {
  name: 'default',
  colors: {
    primary: '#4873c1',
    success: '#4caf50',
    warning: '#ff9800',
    danger: '#f44336',
    info: '#2196f3'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px'
  }
};

export default defaultTheme;
