import { createRouter, createWebHistory } from 'vue-router'

// 页面组件
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Business from '../pages/Business.vue'
import Products from '../pages/Products.vue'
import News from '../pages/News.vue'
import NewsDetail from '../pages/NewsDetail.vue'
import Contact from '../pages/Contact.vue'

// 后台管理组件
import AdminLayout from '../admin/layout/AdminLayout.vue'
import AdminLogin from '../admin/pages/Login.vue'
import AdminDashboard from '../admin/pages/Dashboard.vue'
import NewsManagement from '../admin/pages/NewsManagement.vue'
import ProductManagement from '../admin/pages/ProductManagement.vue'
import ContactManagement from '../admin/pages/ContactManagement.vue'
import BusinessManagement from '../admin/pages/BusinessManagement.vue'
import UserManagement from '../admin/pages/UserManagement.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '首页 - CloudTech | 云计算与数据安全解决方案' }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: '关于我们 - CloudTech' }
  },
  {
    path: '/business',
    name: 'Business',
    component: Business,
    meta: { title: '业务布局 - CloudTech' }
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    meta: { title: '产品展示 - CloudTech' }
  },
  {
    path: '/news',
    name: 'News',
    component: News,
    meta: { title: '新闻中心 - CloudTech' }
  },
  {
    path: '/news/:id',
    name: 'NewsDetail',
    component: NewsDetail,
    meta: { title: '新闻详情 - CloudTech' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { title: '联系我们 - CloudTech' }
  },
  // 后台管理路由
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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// 路由守卫 - 更新页面标题和认证检查
router.beforeEach((to, _from, next) => {
  const title = to.meta.title as string
  if (title) {
    document.title = title
  }

  // 检查是否需要认证
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('auth_token')
    if (!token) {
      next('/admin/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router

