// 后台页面组件
import AdminLayout from './layout/AdminLayout.vue';
import AdminLogin from './pages/Login.vue';
import AdminDashboard from './pages/Dashboard.vue';
import NewsManagement from './pages/NewsManagement.vue';
import ProductManagement from './pages/ProductManagement.vue';
import ContactManagement from './pages/ContactManagement.vue';
import BusinessManagement from './pages/BusinessManagement.vue';
import UserManagement from './pages/UserManagement.vue';

const adminRoutes = [
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
    meta: { title: '管理员登录 - CloudTech' }
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: { title: '仪表板 - 后台管理' }
      },
      {
        path: 'news',
        name: 'NewsManagement',
        component: NewsManagement,
        meta: { title: '新闻管理 - 后台管理' }
      },
      {
        path: 'products',
        name: 'ProductManagement',
        component: ProductManagement,
        meta: { title: '产品管理 - 后台管理' }
      },
      {
        path: 'contacts',
        name: 'ContactManagement',
        component: ContactManagement,
        meta: { title: '联系表单 - 后台管理' }
      },
      {
        path: 'business',
        name: 'BusinessManagement',
        component: BusinessManagement,
        meta: { title: '业务信息 - 后台管理' }
      },
      {
        path: 'users',
        name: 'UserManagement',
        component: UserManagement,
        meta: { title: '用户管理 - 后台管理' }
      }
    ]
  }
];

export default adminRoutes;

