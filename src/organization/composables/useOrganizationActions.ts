import type { Ref } from 'vue';
import type { PersonnelItem } from '../types';
import { showToast } from 'vant';
import { computed, ref } from 'vue';

interface UseOrganizationActionsOptions {
  multiple?: boolean;
  maxSelected?: number;
  organizationCache: Ref<Map<string, true>>;
  searchState: Ref<{
    xm: string;
    dwh: string;
  }>;
  onRefreshList?: () => void;
}

const useOrganizationActions = ({
  multiple = true,
  maxSelected = 10,
  organizationCache,
  searchState,
  onRefreshList
}: UseOrganizationActionsOptions) => {
  // 选中的人员列表
  const selectedPersonnel = ref<PersonnelItem[]>([]);

  // 已选择人员数量
  const selectedCount = computed(() => selectedPersonnel.value.length);

  // 处理人员选择/取消选择
  const handlePersonSelection = (person: PersonnelItem) => {
    if (isPersonDisabled(person)) return;

    const isAlreadySelected = selectedPersonnel.value.some(selected => selected.id === person.id);

    if (isAlreadySelected) {
      // 取消选择该人员
      selectedPersonnel.value = selectedPersonnel.value.filter(selected => selected.id !== person.id);
    } else {
      // 选择该人员
      if (multiple) {
        if (selectedPersonnel.value.length >= maxSelected) {
          showToast(`最多选择${maxSelected}人`);
          return;
        }
        selectedPersonnel.value.push({ ...person, checked: true });
      } else {
        selectedPersonnel.value = [{ ...person, checked: true }];
      }
    }
  };

  // 判断人员是否禁用选择
  const isPersonDisabled = (person: PersonnelItem) => {
    if (!multiple && selectedPersonnel.value.length > 0) {
      return !selectedPersonnel.value.some(item => item.id === person.id);
    }
    if (selectedPersonnel.value.length >= maxSelected) {
      return !selectedPersonnel.value.some(item => item.id === person.id);
    }
    return false;
  };

  // 处理搜索执行
  const executeSearch = (keyword?: string) => {
    if (keyword !== undefined) {
      searchState.value.xm = keyword;
    }
    if (!searchState.value.xm) {
      organizationCache.value.clear();
    }
    onRefreshList?.();
  };

  // 清空所有选中的人员
  const clearAllSelections = () => {
    selectedPersonnel.value = [];
  };

  // 同步列表中的选中状态
  const syncListSelectionState = (dataList: PersonnelItem[]) => {
    if (!dataList) return;

    dataList.forEach((item: PersonnelItem) => {
      if (!item.isParent) {
        item.checked = selectedPersonnel.value.some(selected => selected.id === item.id);
      }
    });
  };

  return {
    selectedCount,
    selectedPersonnel,
    handlePersonSelection,
    executeSearch,
    clearAllSelections,
    isPersonDisabled,
    syncListSelectionState
  };
};

export default useOrganizationActions;
