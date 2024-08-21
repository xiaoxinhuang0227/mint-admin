//  src/utils/request.ts
import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { useUserStore } from '@/store/modules/user';
import { ElMessage, ElMessageBox } from 'element-plus';
import mockData from '../../mock/index';

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_PATH,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore();
    if (userStore.tokenVal) {
      config.headers.Authorization = userStore.tokenVal;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data;
    // 登录成功
    if (code === 0) {
      return response.data.data;
    }

    ElMessage.error(msg || '系统出错');
    return Promise.reject(new Error(msg || 'Error'));
  },
  (error: any) => {
    if (error.response.data) {
      const { data, status } = error.response;
      const { msg } = data;
      // 如果不支持mock，直接筛选返回数据
      if (status == 405) {
        const url = error.config.url;
        const mockRes = mockData.find(v => v.url === url);
        console.log(mockRes.response());
        return mockRes.response().data;
      }
      
      switch (status) {
        case 404:
          
          break;
        case 401:
          // token 过期，跳转登录页
          ElMessageBox.confirm('当前页面已失效，请重新登录', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            localStorage.clear(); // @vueuse/core 自动导入
            window.location.href = '/';
          });
        default:
          ElMessage.error(msg || '系统出错');
          break;
      }
    }
    return Promise.reject(error.message);
  }
);

// 导出 axios 实例
export default service;

