import type { PersonnelItem } from '@/organization/types';
import { useRouter } from 'vue-router';
import { useOrganizationSelection } from '@/hooks/useOrganizationSelection';

/**
 * 组织架构人员选择器
 */
const useOrganizationPicker = () => {
  const router = useRouter();
  const { setCallback, clearCallback } = useOrganizationSelection();

  /**
   * 打开人员选择页面
   * @param callback 选择完成后的回调函数
   */
  const openPersonnelPicker = (
    callback: (personnel: PersonnelItem[]) => Promise<void>
  ) => {
    clearCallback();

    // 存储回调函数
    setCallback(callback);

    // 跳转到选择页面，把标识传过去
    router.push({
      path: '/organization',
      query: {
      }
    });
  };

  return {
    openPersonnelPicker
  };
};

export default useOrganizationPicker;
