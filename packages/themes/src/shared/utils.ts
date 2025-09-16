import type { ThemeConfig } from './types';

export function createTheme(config: Partial<ThemeConfig>): ThemeConfig {
  return {
    name: 'custom',
    colors: {
      primary: '#1989fa',
      success: '#07c160',
      warning: '#ff976a',
      danger: '#ee0a24',
      ...config.colors
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      ...config.spacing
    },
    borderRadius: {
      sm: '2px',
      md: '4px',
      lg: '8px',
      ...config.borderRadius
    },
    ...config
  };
}

export function applyTheme(theme: ThemeConfig) {
  const root = document.documentElement;

  // Apply CSS custom properties
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--j-color-${key}`, value);
  });

  Object.entries(theme.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--j-spacing-${key}`, value);
  });

  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--j-border-radius-${key}`, value);
  });
}
