// Component prefixes
export const COMPONENT_PREFIX = 'J';

// Theme constants
export const THEME_COLORS = {
  primary: '#1989fa',
  success: '#07c160',
  danger: '#ee0a24',
  warning: '#ff976a'
} as const;

// CSS class prefixes
export const CSS_PREFIX = 'j-';

// Common component sizes
export const COMPONENT_SIZES = ['small', 'medium', 'large'] as const;

// Export types
export type ComponentSize = typeof COMPONENT_SIZES[number];
export type ThemeColor = keyof typeof THEME_COLORS;
