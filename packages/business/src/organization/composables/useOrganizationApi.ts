import type { OrganizationApiConfig } from '../types';
import { ref } from 'vue';
import { createOrganizationApi } from '../api';

const useOrganizationApi = ({
  apiConfig
}: {
  apiConfig: OrganizationApiConfig;
}) => {
  const api = createOrganizationApi(apiConfig);
  const organizationCatch = ref(new Map<string, true>());

  const getOrganizationList = async (params: any) => {
    if (params.xm) {
      return await getPersonnelBySearch(params);
    }

    // 获取顶级组织架构
    if (!params.dwh) {
      return await getTopLevelOrganizations();
    }

    // 获取子组织架构和人员
    return await getSubOrganizationsAndPersonnel(params);
  };

  // 获取顶级组织架构
  const getTopLevelOrganizations = async () => {
    const { data } = await api.getOrganizations();

    return {
      data: {
        records: data,
        total: data.length
      }
    };
  };

  // 根据搜索条件获取人员
  const getPersonnelBySearch = async (searchParams: Record<string, any>) => {
    const personRecords = await api.getPersonnelList(searchParams);

    return {
      data: {
        records: personRecords.data.list || [],
        total: personRecords.data.total
      }
    };
  };

  // 获取子组织架构和人员
  const getSubOrganizationsAndPersonnel = async (params: any) => {
    let orgList = [];
    if (!organizationCatch.value.has(params.dwh)) {
      const { data } = await api.getOrganizationsSubNodes(params);
      orgList = data || [];
      organizationCatch.value.set(params.dwh, true);
    }

    const { data: personRecords } = await api.getPersonnelList(params);
    const personnelList = personRecords.list || [];

    return {
      data: {
        records: [...orgList, ...personnelList],
        total: orgList.length + personRecords.total
      }
    };
  };

  return {
    organizationCatch,
    getOrganizationList
  };
};

export default useOrganizationApi;
