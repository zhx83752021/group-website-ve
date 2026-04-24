<template>
  <div class="admin-layout">
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <div class="logo">
        <h2>CloudTech 管理后台</h2>
      </div>
      <nav class="menu">
        <router-link
          to="/admin"
          class="menu-item"
          :class="{ active: $route.path === '/admin' }"
        >
          <span class="icon">📊</span>
          <span>仪表板</span>
        </router-link>
        <router-link
          to="/admin/news"
          class="menu-item"
          :class="{ active: $route.path.includes('news') }"
        >
          <span class="icon">📰</span>
          <span>新闻管理</span>
        </router-link>
        <router-link
          to="/admin/products"
          class="menu-item"
          :class="{ active: $route.path.includes('products') }"
        >
          <span class="icon">📦</span>
          <span>产品管理</span>
        </router-link>
        <router-link
          to="/admin/contacts"
          class="menu-item"
          :class="{ active: $route.path.includes('contacts') }"
        >
          <span class="icon">📧</span>
          <span>联系表单</span>
        </router-link>
        <router-link
          to="/admin/business"
          class="menu-item"
          :class="{ active: $route.path.includes('business') }"
        >
          <span class="icon">🏢</span>
          <span>业务信息</span>
        </router-link>
        <router-link
          to="/admin/users"
          class="menu-item"
          :class="{ active: $route.path.includes('users') }"
        >
          <span class="icon">👥</span>
          <span>用户管理</span>
        </router-link>
        <router-link
          to="/admin/cases"
          class="menu-item"
          :class="{ active: $route.path.includes('cases') }"
        >
          <span class="icon">💼</span>
          <span>案例管理</span>
        </router-link>
        <router-link
          to="/admin/about"
          class="menu-item"
          :class="{ active: $route.path.includes('about') }"
        >
          <span class="icon">📜</span>
          <span>关于我们</span>
        </router-link>
        <router-link
          to="/admin/settings"
          class="menu-item"
          :class="{ active: $route.path.includes('settings') }"
        >
          <span class="icon">⚙️</span>
          <span>站点配置</span>
        </router-link>
      </nav>
      <div class="user-info">
        <div class="user-name">{{ currentUser?.username }}</div>
        <button @click="logout" class="logout-btn">退出登录</button>
      </div>
    </aside>

    <!-- 主内容区 -->
    <main class="main-content-admin">
      <header class="header">
        <h1>{{ pageTitle }}</h1>
        <div class="header-right">
          <span class="time">{{ currentTime }}</span>
        </div>
      </header>
      <div class="content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { authAPI } from "../../api/index";

const router = useRouter();
const currentUser = ref<any>(null);
const currentTime = ref("");

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    "/admin": "仪表板",
    "/admin/news": "新闻管理",
    "/admin/products": "产品管理",
    "/admin/contacts": "联系表单",
    "/admin/business": "业务信息",
    "/admin/users": "用户管理",
    "/admin/cases": "成功案例管理",
    "/admin/about": "关于我们管理",
    "/admin/settings": "站点全局配置",
  };
  return titles[router.currentRoute.value.path] || "后台管理";
});

// 获取当前用户信息
const fetchCurrentUser = async () => {
  try {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      console.error("没有找到认证令牌");
      router.push("/admin/login");
      return;
    }

    const response = await authAPI.getMe();
    currentUser.value = response.data.data;
    console.log("✅ 用户信息获取成功:", currentUser.value);
  } catch (error: any) {
    console.error("获取用户信息失败:", error);
    console.error("错误详情:", {
      status: error.response?.status,
      message: error.response?.data?.message,
      url: error.config?.url,
    });

    // 只有在真正的认证错误时才跳转到登录页
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      router.push("/admin/login");
    } else {
      // 其他错误，设置默认用户信息，避免立即退出
      console.warn("⚠️ 使用默认用户信息");
      currentUser.value = {
        id: "1",
        username: "admin",
        email: "admin@example.com",
      };
    }
  }
};

// 更新时间
const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleString("zh-CN");
};

// 退出登录
const logout = () => {
  localStorage.removeItem("auth_token");
  router.push("/admin/login");
};

onMounted(() => {
  fetchCurrentUser();
  updateTime();
  const timer = setInterval(updateTime, 1000);
  onUnmounted(() => clearInterval(timer));
});
</script>

<style>
/* 引入公共样式 */
@import "../styles/common.css";
</style>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  background: #f5f7fa;
}

.sidebar {
  width: 250px;
  background: #1a1a1a;
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
}

.logo {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.menu {
  flex: 1;
  padding: 20px 0;
  overflow-y: auto;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s;
  border-left: 3px solid transparent;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.menu-item.active {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-left-color: #667eea;
}

.menu-item .icon {
  margin-right: 10px;
  font-size: 18px;
}

.user-info {
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-name {
  margin-bottom: 10px;
  font-size: 14px;
  opacity: 0.9;
}

.logout-btn {
  width: 100%;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

.main-content-admin {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  background: white;
  padding: 20px;
  border-bottom: 1px solid #e0e6ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.time {
  color: #666;
  font-size: 14px;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

@media (max-width: 768px) {
  .admin-layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
  }

  .menu {
    display: flex;
    flex-direction: row;
    padding: 10px 0;
  }

  .menu-item {
    flex: 1;
    justify-content: center;
    border-left: none;
    border-bottom: 3px solid transparent;
  }

  .menu-item.active {
    border-left: none;
    border-bottom-color: white;
  }
}
</style>
