export interface PullToRefreshListProps {
  extraParams?: Record<string, unknown>;
  apiFn: (params: any) => Promise<any>;
  immediate?: boolean;
  disablePullRefresh?: boolean;
  [key: string]: any;
}

export interface PullToRefreshListEmits {
  loadSuccess: (data: any) => void;
  loadError: (error: any) => void;
  refresh: () => void;
  load: () => void;
}

// 保持向后兼容
export interface Props extends PullToRefreshListProps {}
