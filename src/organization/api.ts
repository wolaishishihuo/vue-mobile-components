import type { Organization, Personnel } from './types';

export interface ApiConfig {
  baseUrl: string;
  getToken: () => string;
}

/**
 * 创建 API 实例
 */
export const createOrganizationApi = (config: ApiConfig) => {
  const { baseUrl, getToken } = config;

  // 通用fetch请求方法
  const fetchData = async <T>(url: string, params?: Record<string, any>): Promise<{ data: T }> => {
    let fullUrl = `${baseUrl}${url}`;

    // 构建查询参数
    if (params) {
      const searchParams = new URLSearchParams();
      Object.keys(params).forEach((key) => {
        const value = params[key];
        if (value !== null && value !== undefined && value !== '') {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        fullUrl += `?${queryString}`;
      }
    }

    // 构建请求头
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    // 添加认证token
    try {
      const token = getToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('获取token失败:', error);
    }

    try {
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('请求失败:', error);
      throw error;
    }
  };

  return {
    // 获取组织架构接口
    getOrganizations: () => {
      return fetchData<Organization[]>('/sfzt/select/dept/topNodes');
    },

    // 获取人员列表接口
    getPersonnelList: (params: Record<string, any>) => {
      return fetchData<{ list: Personnel[]; total: number }>('/sfzt/select/dept/user/list', params);
    },

    // 获取组织架构子节点接口
    getOrganizationsSubNodes: (params: { dwh: string }) => {
      return fetchData<Organization[]>('/sfzt/select/dept/subNodes', params);
    },

    // 测试 - 获取区域树
    getAreaTree: () => {
      return fetchData('/school/area/tree');
    }
  };
};
