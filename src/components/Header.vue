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
import { computed, onMounted, onUnmounted } from 'vue'
import { useNavStore, useAppStore } from '../stores'

const navStore = useNavStore()
const appStore = useAppStore()

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
  color: #333;
  padding: 1rem 0;
  transition: all 0.3s ease;
  z-index: 1000;
  height: 70px;
  display: flex;
  align-items: center;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.header--sticky {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  padding: 0.5rem 0;
  height: 60px;
}

.header__container {
  max-width: 1200px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__logo h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.header__nav--desktop {
  display: flex;
  gap: 1.5rem;
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
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
}

.nav-link:hover {
  opacity: 0.8;
  transform: translateY(-2px);
}

.nav-link--active {
  border-bottom: 2px solid #ffd700;
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
