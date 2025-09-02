export interface Props {
  extraParams?: Record<string, unknown>;
  apiFn: (params: any) => Promise<any>;
  immediate?: boolean;
  disablePullRefresh?: boolean;
  [key: string]: any;
}
