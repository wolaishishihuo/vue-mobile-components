import type { Ref } from 'vue';
import type { PersonnelItem } from '../types';
import type { RouteState } from './useOrganizationRouteParams';
import type RefreshList from '@/pullToRefreshList/index.vue';
import { showToast } from 'vant';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const useOrganizationActions = ({
  routeState,
  organizationCatch,
  refreshListRef,
  searchState
}: {
  routeState: RouteState;
  organizationCatch: Ref<Map<string, true>>;
  refreshListRef: Ref<InstanceType<typeof RefreshList>>;
  searchState: Ref<{
    xm: string;
    dwh: string;
  }>;
}) => {
  const router = useRouter();
  // 数据源
  const dataSource = computed(() => refreshListRef.value?.dataSource);

  // 已选择人数
  const selectedCount = computed(() => {
    if (!dataSource.value) return 0;
    return dataSource.value.filter((item: PersonnelItem) => item.checked).length || 0;
  });

  // 已选择人员
  const selectedItems = computed(() => {
    if (!dataSource.value) return [];
    return dataSource.value.filter((item: PersonnelItem) => !item.isParent && item.checked);
  });

  // 处理下拉刷新事件
  const handleRefreshChange = ({ status, distance }: { status: string; distance: number }) => {
    if (status === 'pulling' && distance !== 100) {
      organizationCatch.value.clear();
    }
  };

  // 处理复选框变更事件
  const handleCheckChange = (item: PersonnelItem) => {
    const currentId = item.id;

    // 单选
    if (!routeState.multiple && item.checked) {
      dataSource.value.forEach((dataItem: PersonnelItem) => {
        if (dataItem.id !== currentId) {
          dataItem.checked = false;
        }
      });
    }

    // 检查是否超过最大选择数量
    if (routeState.maxSelected && selectedCount.value > routeState.maxSelected && item.checked) {
      item.checked = false;
      showToast('最多选择10人');
    }
  };

  // 处理组织架构项点击事件
  const handleCellClick = (item: PersonnelItem) => {
    if (!item.isParent) return;

    const { path, depth, customMap, dwh, ...rest } = routeState;
    router.push({
      path: routeState.path,
      query: {
        dwh: item.dwh,
        depth: (depth + 1).toString(),
        customMap: JSON.stringify(customMap),
        ...rest
      }
    });
  };

  const handleSearch = () => {
    if (!searchState.value.xm) {
      organizationCatch.value.clear();
    }
    refreshListRef.value?.onSearch({
      xm: searchState.value.xm
    });
  };

  const handleClear = () => {
    if (!dataSource.value) return;

    dataSource.value.forEach((item: PersonnelItem) => {
      item.checked = false;
    });
  };

  return {
    selectedCount,
    selectedItems,
    handleRefreshChange,
    handleCheckChange,
    handleCellClick,
    handleSearch,
    handleClear
  };
};

export default useOrganizationActions;
