import { ref } from 'vue';

const useOrganizationState = () => {
  const searchState = ref({
    xm: '',
    dwh: ''
  });

  // 面包屑导航状态
  const breadcrumbs = ref<Array<{ id?: string; name: string; dwh?: string }>>([
    { name: '全部' }
  ]);

  // 设置当前组织
  const setCurrentOrg = (dwh?: string) => {
    searchState.value.dwh = dwh || '';
  };

  // 添加面包屑
  const addBreadcrumb = (item: { id?: string; name: string; dwh?: string }) => {
    breadcrumbs.value.push(item);
    setCurrentOrg(item.dwh);
  };

  // 导航到指定层级
  const navigateToBreadcrumb = (index: number) => {
    if (index >= breadcrumbs.value.length) return;

    breadcrumbs.value = breadcrumbs.value.slice(0, index + 1);
    const current = breadcrumbs.value[index];
    setCurrentOrg(current.dwh);
  };

  // 重置状态
  const resetState = () => {
    searchState.value = { xm: '', dwh: '' };
    breadcrumbs.value = [{ name: '全部' }];
  };

  return {
    searchState,
    breadcrumbs,
    setCurrentOrg,
    addBreadcrumb,
    navigateToBreadcrumb,
    resetState
  };
};

export default useOrganizationState;
