export interface TabItem {
  label: string;
  value: string;
  count?: number;
}

export interface TabsProps {
  modelValue: string;
  tabOptions: TabItem[];
}

export interface TabsEmits {
  'change': (value: string) => void;
  'update:modelValue': (value: string) => void;
}
