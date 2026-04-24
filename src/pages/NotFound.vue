<template>
  <div class="not-found">
    <div class="container">
      <div class="error-code">404</div>
      <h1 class="error-title">页面未找到</h1>
      <p class="error-desc">抱歉，您访问的页面不存在或已被移动。</p>
      <div class="actions">
        <router-link to="/" class="btn-primary">返回首页</router-link>
        <button @click="$router.back()" class="btn-secondary">返回上一页</button>
      </div>
      
      <!-- 装饰性元素 -->
      <div class="glow shadow-1"></div>
      <div class="glow shadow-2"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 无需逻辑
</script>

<style scoped>
.not-found {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #f8fafc;
  overflow: hidden;
  position: relative;
}

.container {
  position: relative;
  z-index: 10;
}

.error-code {
  font-size: 160px;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  letter-spacing: -5px;
}

.error-title {
  font-size: 32px;
  color: #1e293b;
  margin-bottom: 16px;
}

.error-desc {
  color: #64748b;
  font-size: 18px;
  margin-bottom: 40px;
}

.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.btn-primary {
  padding: 12px 32px;
  background: #4f46e5;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-primary:hover {
  background: #4338ca;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.btn-secondary {
  padding: 12px 32px;
  background: white;
  color: #4f46e5;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: #f1f5f9;
}

/* 装饰性光晕 */
.glow {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.2;
  z-index: 1;
}

.shadow-1 {
  background: #4f46e5;
  top: -100px;
  right: -100px;
}

.shadow-2 {
  background: #7c3aed;
  bottom: -100px;
  left: -100px;
}
</style>
