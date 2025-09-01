import { reactive, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

export interface RouteState {
  dwh: string;
  path: string;
  depth: number;
  multiple: string;
  maxSelected: number;
  customMap: Record<string, string>;
}

const useOrganizationRouteParams = () => {
  const route = useRoute();
  const routeState = reactive<RouteState> ({
    dwh: '',
    path: '',
    depth: 1,
    multiple: '1',
    maxSelected: 10,
    customMap: {}
  });

  watchEffect(() => {
    routeState.dwh = route.query.dwh as string;
    routeState.path = route.path;
    routeState.depth = Number(route.query.depth) || 1;
    routeState.multiple = (route.query.multiple as string) || '1';
    routeState.maxSelected = Number(route.query.maxSelected) || 10;
    routeState.customMap = JSON.parse(route.query.customMap as string || '{}');
  });
  return {
    routeState
  };
};

export default useOrganizationRouteParams;
