<template>
  <header :class="['header', { 'header--sticky': isScrolled }]">
    <div class="header__container">
      <div class="header__logo">
        <h1>CloudTech</h1>
      </div>

      <!-- 桌面导航 -->
      <nav class="header__nav header__nav--desktop">
        <router-link v-for="item in menuItems" :key="item.path" :to="item.path"
          :class="['nav-link', { 'nav-link--active': activeMenu === item.name }]" @click="setActiveMenu(item.name)">
          {{ item.label }}
        </router-link>
        
        <!-- 搜索框 -->
        <div class="search-box">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="搜索..." 
            @keyup.enter="performSearch"
          />
          <button @click="performSearch" class="search-btn">🔍</button>
        </div>
      </nav>

      <!-- 移动端菜单按钮 -->
      <button class="header__menu-btn header__menu-btn--mobile" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- 移动端导航 -->
      <nav v-if="isMenuOpen" class="header__nav header__nav--mobile">
        <router-link v-for="item in menuItems" :key="item.path" :to="item.path" class="nav-link" @click="closeMenu">
          {{ item.label }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNavStore, useAppStore } from '../stores'

const router = useRouter()
const navStore = useNavStore()
const appStore = useAppStore()
const searchQuery = ref('')

const performSearch = () => {
  if (!searchQuery.value.trim()) return
  router.push({
    path: '/search',
    query: { keyword: searchQuery.value.trim() }
  })
  searchQuery.value = ''
  closeMenu()
}

const activeMenu = computed(() => navStore.activeMenu)
const isMenuOpen = computed(() => navStore.isMenuOpen)
const isScrolled = computed(() => appStore.isScrolled)

const menuItems = [
  { path: '/', name: 'home', label: '首页' },
  { path: '/about', name: 'about', label: '关于我们' },
  { path: '/business', name: 'business', label: '业务布局' },
  { path: '/products', name: 'products', label: '产品展示' },
  { path: '/news', name: 'news', label: '新闻中心' },
  { path: '/contact', name: 'contact', label: '联系我们' }
]

const setActiveMenu = (name: string) => {
  navStore.setActiveMenu(name)
}

const toggleMenu = () => {
  navStore.toggleMenu()
}

const closeMenu = () => {
  navStore.closeMenu()
}

// 监听滚动事件
const handleScroll = () => {
  appStore.updateScroll(window.scrollY)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  color: #1a1a2e;
  transition: all 0.3s ease;
  z-index: 1000;
  height: 80px;
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #f0f0f5;
}

.header--sticky {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  height: 70px;
}

.header__container {
  max-width: 1200px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__logo h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 800;
  color: #4f46e5; /* 品牌蓝 */
  letter-spacing: -0.5px;
}

.header__nav--desktop {
  display: flex;
  gap: 2.2rem; /* 增加间距 */
  align-items: center;
}

.header__nav--mobile {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
  animation: slideDown 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav-link {
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
  padding: 0.5rem 0;
  font-size: 1.05rem;
}

.nav-link:hover {
  color: #4f46e5;
}

.nav-link--active {
  color: #4f46e5;
}

.nav-link--active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 3px;
  background: #4f46e5;
  border-radius: 2px;
}

.search-box {
  display: flex;
  align-items: center;
  background: #f3f4f6;
  border-radius: 20px;
  padding: 4px 12px;
  margin-left: 1rem;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.search-box:focus-within {
  background: white;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.search-box input {
  border: none;
  background: transparent;
  outline: none;
  padding: 4px;
  width: 120px;
  font-size: 0.9rem;
  transition: width 0.3s ease;
}

.search-box input:focus {
  width: 180px;
}

.search-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__menu-btn--mobile {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  gap: 0.4rem;
}

.header__menu-btn--mobile span {
  width: 25px;
  height: 3px;
  background: #333;
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header__nav--desktop {
    display: none;
  }

  .header__menu-btn--mobile {
    display: flex;
  }

  .header__logo h1 {
    font-size: 1.2rem;
  }
}
</style>
