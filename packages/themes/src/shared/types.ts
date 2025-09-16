export interface ThemeColors {
  primary: string;
  success: string;
  warning: string;
  danger: string;
  info?: string;
}

export interface ThemeConfig {
  name: string;
  colors: ThemeColors;
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
}

export type ThemeName = 'default' | 'dark';
