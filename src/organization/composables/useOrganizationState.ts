import { nextTick, ref, watch } from 'vue';

const useOrganizationState = () => {
  const searchState = ref({
    xm: '',
    dwh: ''
  });
  // 面包屑容器引用
  const breadcrumbRef = ref<HTMLElement>();
  // 面包屑导航状态
  const breadcrumbs = ref<Array<{ id?: string; name: string; dwh?: string }>>([
    { name: '全部' }
  ]);

  // 添加面包屑
  const addBreadcrumb = (item: { id?: string; name: string; dwh?: string }) => {
    breadcrumbs.value.push(item);
    searchState.value.dwh = item.dwh || '';
  };

  // 导航到指定层级
  const navigateToBreadcrumb = (index: number) => {
    if (index >= breadcrumbs.value.length) return;

    breadcrumbs.value = breadcrumbs.value.slice(0, index + 1);
    const current = breadcrumbs.value[index];
    searchState.value.dwh = current.dwh || '';
  };

  // 面包屑自动滚动
  const scrollBreadcrumbToEnd = async () => {
    await nextTick();
    if (breadcrumbRef.value) {
      breadcrumbRef.value.scrollLeft = breadcrumbRef.value.scrollWidth;
    }
  };

  // 监听面包屑变化
  watch(breadcrumbs, scrollBreadcrumbToEnd, { deep: true });

  // 重置状态
  const resetState = () => {
    searchState.value = { xm: '', dwh: '' };
    breadcrumbs.value = [{ name: '全部' }];
  };

  return {
    searchState,
    breadcrumbs,
    breadcrumbRef,
    addBreadcrumb,
    navigateToBreadcrumb,
    resetState
  };
};

export default useOrganizationState;
