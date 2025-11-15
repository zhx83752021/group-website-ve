<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const route = useRoute()

// 判断是否是后台管理页面
const isAdminPage = computed(() => {
  return route.path.startsWith('/admin')
})

// 判断是否是登录页面
const isLoginPage = computed(() => {
  return route.path === '/admin/login'
})
</script>
<template>
  <div id="app" :class="{ 'admin-page': isAdminPage }">
    <Header v-if="!isAdminPage" />
    <main class="main-content" :class="{ 'admin-main': isAdminPage, 'login-main': isLoginPage }">
      <RouterView />
    </main>
    <Footer v-if="!isAdminPage" />
  </div>
</template>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  position: relative;
}

#app.admin-page {
  background: #f5f7fa;
}

.main-content {
  flex: 1;
  padding-top: 70px;
  width: 100%;
}

.main-content.admin-main {
  padding-top: 0;
}

.main-content.login-main {
  padding-top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* 全局样式 */
a {
  color: inherit;
  text-decoration: none;
}
button {
  font-family: inherit;
}
input,
textarea,
select {
  font-family: inherit;
}
/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #667eea;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #764ba2;
}
</style>
