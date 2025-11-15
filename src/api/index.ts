import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 添加认证令牌
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // 确保 Content-Type 正确
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

// 响应拦截器 - 处理错误
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API 错误:', {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
    });

    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// 新闻 API
export const newsAPI = {
  getList: (limit = 10, offset = 0, category?: string) =>
    api.get('/news', { params: { limit, offset, category } }),
  getDetail: (id: string) => api.get(`/news/${id}`),
  create: (data: any) => api.post('/news', data),
  update: (id: string, data: any) => api.put(`/news/${id}`, data),
  delete: (id: string) => api.delete(`/news/${id}`),
};

// 联系表单 API
export const contactAPI = {
  submit: (data: any) => api.post('/contact', data),
  getList: (limit = 20, offset = 0, status?: string) =>
    api.get('/contact', { params: { limit, offset, status } }),
  getDetail: (id: string) => api.get(`/contact/${id}`),
  updateStatus: (id: string, status: string) =>
    api.patch(`/contact/${id}/status`, { status }),
  delete: (id: string) => api.delete(`/contact/${id}`),
};

// 业务信息 API
export const businessAPI = {
  getList: (limit = 50) => api.get('/business', { params: { limit } }),
  getDetail: (id: string) => api.get(`/business/${id}`),
  create: (data: any) => api.post('/business', data),
  update: (id: string, data: any) => api.put(`/business/${id}`, data),
  delete: (id: string) => api.delete(`/business/${id}`),
};

// 产品 API
export const productAPI = {
  getList: (limit = 50, offset = 0, category?: string) =>
    api.get('/product', { params: { limit, offset, category } }),
  getDetail: (id: string) => api.get(`/product/${id}`),
  create: (data: any) => api.post('/product', data),
  update: (id: string, data: any) => api.put(`/product/${id}`, data),
  delete: (id: string) => api.delete(`/product/${id}`),
  getByCategory: (category: string) => api.get(`/product/category/${category}`),
  getCategories: () => api.get('/product/categories/list'),
};

// 认证 API
export const authAPI = {
  login: (username: string, password: string) =>
    api.post('/auth/login', { username, password }),
  register: (username: string, password: string, email?: string) =>
    api.post('/auth/register', { username, password, email }),
  getMe: () => api.get('/auth/me'),
  changePassword: (oldPassword: string, newPassword: string) =>
    api.post('/auth/change-password', { oldPassword, newPassword }),
};

export default api;

