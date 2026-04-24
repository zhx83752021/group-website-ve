<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h1>CloudTech 管理后台</h1>
        <p>管理员登录</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            placeholder="请输入用户名"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            required
          />
        </div>

        <button type="submit" class="login-btn" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div class="login-footer">
        <p>默认账号: admin / admin123</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authAPI } from '../../api/index';

const router = useRouter();
const form = ref({
  username: '',
  password: ''
});
const loading = ref(false);
const error = ref('');

const handleLogin = async () => {
  if (!form.value.username || !form.value.password) {
    error.value = '请输入用户名和密码';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    const response = await authAPI.login(form.value.username, form.value.password);
    const token = response.data.data.token;
    localStorage.setItem('auth_token', token);
    router.push('/admin');
  } catch (err: any) {
    console.error('登录错误:', err);
    const errorMsg = err.response?.data?.message || err.response?.data?.error || err.message || '登录失败，请检查用户名和密码';
    error.value = errorMsg;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #f0f7ff;
  /* 科技光晕层 */
  background-image: 
    radial-gradient(circle at 50% 50%, rgba(22, 119, 255, 0.12) 0%, transparent 50%),
    radial-gradient(circle at 20% 20%, rgba(118, 75, 162, 0.1) 0%, transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(22, 119, 255, 0.08) 0%, transparent 40%);
  position: relative;
  overflow: hidden;
}

/* 模拟 3D 云计算背景元素 - 使用更可靠的官方插图链接 */
.login-container::before {
  content: '';
  position: absolute;
  width: 900px;
  height: 900px;
  background-image: url('https://gw.alipayobjects.com/zos/antfincdn/Z5c7vY8noJ/210661b9-a03b-4790-814d-70f07449fd7e.png');
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.9;
  top: 50%;
  left: 50%;
  transform: translate(-95%, -50%); 
  z-index: 1;
  pointer-events: none;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translate(-95%, -50%); }
  50% { transform: translate(-95%, -52%); }
}

.login-container::after {
  content: '';
  position: absolute;
  width: 1200px;
  height: 1200px;
  background: radial-gradient(circle, rgba(22, 119, 255, 0.15) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
}

.login-box {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  padding: 48px 40px;
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  z-index: 10;
}

.login-header h1 {
  margin: 0 0 8px 0;
  font-size: 28px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
}

.login-header p {
  margin: 0;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  background: #fff;
  color: rgba(0, 0, 0, 0.85);
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
  box-sizing: border-box;
}

.form-group input:hover {
  border-color: #4096ff;
}

.form-group input:focus {
  outline: none;
  border-color: #1677ff;
  box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.1);
}

.login-btn {
  width: 100%;
  padding: 8px 15px;
  background: #1677ff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s;
  height: 40px;
}

.login-btn:hover:not(:disabled) {
  background: #4096ff;
}

.error-message {
  background: #fff2f0;
  color: #ff4d4f;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 24px;
  border: 1px solid #ffccc7;
  display: flex;
  align-items: center;
}

.login-footer {
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}
</style>

