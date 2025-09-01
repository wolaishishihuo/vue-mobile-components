import type { Ref } from 'vue';
import type { PersonnelItem } from '../types';
import { showToast } from 'vant';
import { computed, ref } from 'vue';

const useOrganizationActions = ({
  multiple = true,
  maxSelected = 10,
  organizationCatch,
  searchState,
  onOrgClick,
  onRefresh
}: {
  multiple?: boolean;
  maxSelected?: number;
  organizationCatch: Ref<Map<string, true>>;
  searchState: Ref<{
    xm: string;
    dwh: string;
  }>;
  onOrgClick?: (item: PersonnelItem) => void;
  onRefresh?: () => void;
}) => {
  // 选择状态
  const selectedItems = ref<PersonnelItem[]>([]);

  // 已选择人数
  const selectedCount = computed(() => selectedItems.value.length);

  // 处理人员点击选择
  const handlePersonClick = (item: PersonnelItem) => {
    if (isPersonDisabled(item)) return;

    const isSelected = selectedItems.value.some(selected => selected.id === item.id);

    if (isSelected) {
      // 取消选择
      selectedItems.value = selectedItems.value.filter(selected => selected.id !== item.id);
    } else {
      // 选择人员
      if (multiple) {
        if (selectedItems.value.length >= maxSelected) {
          showToast(`最多选择${maxSelected}人`);
          return;
        }
        selectedItems.value.push({ ...item, checked: true });
      } else {
        selectedItems.value = [{ ...item, checked: true }];
      }
    }

    // 这里不需要同步，由外部组件处理
  };

  // 判断人员是否禁用
  const isPersonDisabled = (person: PersonnelItem) => {
    if (!multiple && selectedItems.value.length > 0) {
      return !selectedItems.value.some(item => item.id === person.id);
    }
    if (selectedItems.value.length >= maxSelected) {
      return !selectedItems.value.some(item => item.id === person.id);
    }
    return false;
  };

  // 处理组织架构项点击事件
  const handleOrgClick = (item: PersonnelItem) => {
    if (!item.isParent) return;
    onOrgClick?.(item);
  };

  const handleSearch = (keyword?: string) => {
    if (keyword !== undefined) {
      searchState.value.xm = keyword;
    }
    if (!searchState.value.xm) {
      organizationCatch.value.clear();
    }
    onRefresh?.();
  };

  const handleClear = () => {
    selectedItems.value = [];
  };

  return {
    selectedCount,
    selectedItems,
    handlePersonClick,
    handleOrgClick,
    handleSearch,
    handleClear,
    isPersonDisabled
  };
};

export default useOrganizationActions;
