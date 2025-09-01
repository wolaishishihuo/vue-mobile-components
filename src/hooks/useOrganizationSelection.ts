import type { PersonnelItem } from '../organization/types';
import { closeToast, showLoadingToast } from 'vant';

let selectionCallbacks = null;

/**
 * 组织架构选择管理
 */
export const useOrganizationSelection = () => {
  /**
   * 设置选择完成的回调
   */
  const setCallback = (callback: (personnel: PersonnelItem[]) => Promise<void>) => {
    selectionCallbacks = callback;
  };

  /**
   * 执行选择完成的回调
   */
  const executeCallback = async (selectedPersonnel: PersonnelItem[]) => {
    if (!selectionCallbacks) {
      return;
    }
    showLoadingToast({
      message: '确认中...',
      forbidClick: true,
      duration: 0
    });

    await selectionCallbacks(selectedPersonnel);
    selectionCallbacks = null;
    closeToast();
  };

  /**
   * 清除回调（取消选择时使用）
   */
  const clearCallback = () => {
    selectionCallbacks = null;
  };

  return {
    setCallback,
    executeCallback,
    clearCallback
  };
};
