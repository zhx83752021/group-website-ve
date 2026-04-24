<template>
  <div class="admin-layout">
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <div class="logo">
        <svg class="logo-icon" viewBox="0 0 1024 1024" width="24" height="24">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 371.9-372 371.9z" fill="currentColor"></path>
          <path d="M512 192c-176.7 0-320 143.3-320 320s143.3 320 320 320 320-143.3 320-320-143.3-320-320-320zm0 512c-106 0-192-86-192-192s86-192 192-192 192 86 192 192-86 192-192 192z" fill="currentColor"></path>
        </svg>
        <h2>CloudTech Admin</h2>
      </div>
      <nav class="menu">
        <router-link to="/admin" class="menu-item" :class="{ active: $route.path === '/admin' }">
          <span class="icon">
            <svg viewBox="0 0 1024 1024" width="16" height="16"><path d="M924.8 385.6a446.7 446.7 0 0 0-96-142.4 446.7 446.7 0 0 0-142.4-96C631.1 123.8 572.5 112 512 112s-119.1 11.8-174.4 35.2a446.7 446.7 0 0 0-142.4 96 446.7 446.7 0 0 0-96 142.4C75.8 440.9 64 499.5 64 512s11.8 119.1 35.2 174.4c22.5 53 54.9 101.3 96 142.4s89.4 73.5 142.4 96c55.3 23.4 113.9 35.2 174.4 35.2s119.1-11.8 174.4-35.2c53-22.5 101.3-54.9 142.4-96s73.5-89.4 96-142.4c23.4-55.3 35.2-113.9 35.2-174.4s-11.8-119.1-35.2-174.4zM512 834c-177.8 0-322-144.2-322-322s144.2-322 322-322 322 144.2 322 322-144.2 322-322 322z" fill="currentColor"></path></svg>
          </span>
          <span>仪表板</span>
        </router-link>
        <router-link to="/admin/news" class="menu-item" :class="{ active: $route.path.includes('news') }">
          <span class="icon">
            <svg viewBox="0 0 1024 1024" width="16" height="16"><path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z" fill="currentColor"></path></svg>
          </span>
          <span>新闻管理</span>
        </router-link>
        <router-link to="/admin/products" class="menu-item" :class="{ active: $route.path.includes('products') }">
          <span class="icon">
            <svg viewBox="0 0 1024 1024" width="16" height="16"><path d="M832 312V120c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v192c0 4.4 3.6 8 8 8h624c4.4 0 8-3.6 8-8zm-512-80h-80v-40h80v40zm512 400V440c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v192c0 4.4 3.6 8 8 8h624c4.4 0 8-3.6 8-8zm-512-80h-80v-40h80v40zm512 400V760c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v192c0 4.4 3.6 8 8 8h624c4.4 0 8-3.6 8-8zm-512-80h-80v-40h80v40z" fill="currentColor"></path></svg>
          </span>
          <span>产品管理</span>
        </router-link>
        <router-link to="/admin/contacts" class="menu-item" :class="{ active: $route.path.includes('contacts') }">
          <span class="icon">
            <svg viewBox="0 0 1024 1024" width="16" height="16"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8L512 512 136 270.8V232l376 242.7L888 232v38.8z" fill="currentColor"></path></svg>
          </span>
          <span>联系表单</span>
        </router-link>
        <router-link to="/admin/business" class="menu-item" :class="{ active: $route.path.includes('business') }">
          <span class="icon">
            <svg viewBox="0 0 1024 1024" width="16" height="16"><path d="M896 160H128c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h768c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zM384 736h-64V640h64v96zm0-160h-64v-96h64v96zm0-160h-64v-96h64v96zm160 320h-64V672h64v64zm0-160h-64v-64h64v64zm0-160h-64v-64h64v64z" fill="currentColor"></path></svg>
          </span>
          <span>业务信息</span>
        </router-link>
        <router-link to="/admin/users" class="menu-item" :class="{ active: $route.path.includes('users') }">
          <span class="icon">
            <svg viewBox="0 0 1024 1024" width="16" height="16"><path d="M858.5 763.6l-48.9-58.8c-12.7-15.3-32.3-24.3-53-24.3H267.4c-20.7 0-40.3 9-53 24.3l-48.9 58.8c-12.7 15.3-12.7 38.6 0 53.9L214.4 876c12.7 15.3 32.3 24.3 53 24.3h489.2c20.7 0 40.3-9 53-24.3l48.9-58.8c12.7-15.3 12.7-38.6 0-53.6zM512 608c114.9 0 208-93.1 208-208S626.9 192 512 192s-208 93.1-208 208 93.1 208 208 208z" fill="currentColor"></path></svg>
          </span>
          <span>用户管理</span>
        </router-link>
        <router-link to="/admin/cases" class="menu-item" :class="{ active: $route.path.includes('cases') }">
          <span class="icon">
            <svg viewBox="0 0 1024 1024" width="16" height="16"><path d="M880 324H144c-17.7 0-32 14.3-32 32v448c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V356c0-17.7-14.3-32-32-32zM320 220h384V160h-384v60z" fill="currentColor"></path></svg>
          </span>
          <span>案例管理</span>
        </router-link>
        <router-link to="/admin/about" class="menu-item" :class="{ active: $route.path.includes('about') }">
          <span class="icon">
            <svg viewBox="0 0 1024 1024" width="16" height="16"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM320 736H256V672h64v64zm0-160H256v-64h64v64zm0-160H256v-64h64v64zm448 320H448v-64h320v64zm0-160H448v-64h320v64zm0-160H448v-64h320v64z" fill="currentColor"></path></svg>
          </span>
          <span>关于我们</span>
        </router-link>
        <router-link to="/admin/settings" class="menu-item" :class="{ active: $route.path.includes('settings') }">
          <span class="icon">
            <svg viewBox="0 0 1024 1024" width="16" height="16"><path d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.7s-1.6-38.8-4.7-57.7l65.5-56c5.4-4.6 6.1-12.4 1.5-17.8L826 211.2c-4.6-5.4-12.4-6.1-17.8-1.5l-78.5 54.1c-15.6-11.4-32.4-21.1-50.1-28.7l-15.5-84c-1.1-7-7.1-12.1-14.1-12.1h-132c-7 0-13 5.1-14.1 12.1l-15.5 84c-17.7 7.6-34.5 17.3-50.1 28.7L211.2 192.6c-5.4-4.6-13.2-3.9-17.8 1.5l-92.3 107.5c-4.6 5.4-3.9 13.2 1.5 17.8l65.5 56c-3.1 19-4.7 38.4-4.7 57.7s1.6 38.8 4.7 57.7l-65.5 56c-5.4 4.6-6.1 12.4-1.5 17.8L204 812.8c4.6 5.4 12.4 6.1 17.8 1.5l78.5-54.1c15.6 11.4 32.4 21.1 50.1 28.7l15.5 84c1.1 7 7.1 12.1 14.1 12.1h132c7 0 13-5.1 14.1-12.1l15.5-84c17.7-7.6 34.5-17.3 50.1-28.7l78.5 54.1c5.4 4.6 13.2 3.9 17.8-1.5l92.3-107.5c4.7-5.4 4-13.2-1.4-17.8zM512 652c-77.3 0-140-62.7-140-140s62.7-140 140-140 140 62.7 140 140-62.7 140-140 140z" fill="currentColor"></path></svg>
          </span>
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
  width: 208px;
  background: #001529;
  color: rgba(255, 255, 255, 0.65);
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  z-index: 10;
  transition: all 0.2s;
}

.logo {
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
}

.logo h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
}

.menu {
  flex: 1;
  padding: 16px 0;
  overflow-y: auto;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  transition: all 0.2s;
  font-size: 14px;
}

.menu-item:hover {
  color: white;
}

.menu-item.active {
  background: var(--primary-color);
  color: white;
}

.menu-item .icon {
  margin-right: 12px;
  display: flex;
  align-items: center;
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
