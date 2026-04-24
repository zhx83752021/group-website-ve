<template>
  <div class="contact">
    <!-- 页面标题 -->
    <section class="page-header" :style="{ backgroundImage: `url(${bannerImg})` }">
      <div class="container">
        <h1>联系我们</h1>
        <p>我们随时准备为您服务</p>
      </div>
    </section>

    <!-- 联系方式 -->
    <section class="contact-info">
      <div class="container">
        <div class="info-grid">
          <div class="info-card">
            <div class="info-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <h3>电话</h3>
            <p>400-660-8066</p>
            <p class="info-card__desc">工作时间：周一至周五 9:00-17:45</p>
          </div>
          <div class="info-card">
            <div class="info-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <h3>邮箱</h3>
            <p>info@group.com</p>
            <p class="info-card__desc">我们会在24小时内回复您的邮件</p>
          </div>
          <div class="info-card">
            <div class="info-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <h3>地址</h3>
            <p>北京市经济技术开发区</p>
            <p class="info-card__desc">地盛西路1号 数码庄园A2座</p>
          </div>
          <div class="info-card">
            <div class="info-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </div>
            <h3>在线客服</h3>
            <p>7x24小时在线</p>
            <p class="info-card__desc">点击右下角客服按钮即可咨询</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系表单 -->
    <section class="contact-form-section">
      <div class="container">
        <div class="form-wrapper">
          <div class="form-content">
            <h2>发送消息</h2>
            <p>请填写下面的表单，我们会尽快与您联系</p>

            <form @submit.prevent="submitForm" class="contact-form">
              <div class="form-group">
                <label for="name">姓名 *</label>
                <input id="name" v-model="form.name" type="text" placeholder="请输入您的姓名" required />
              </div>

              <div class="form-group">
                <label for="email">邮箱 *</label>
                <input id="email" v-model="form.email" type="email" placeholder="请输入您的邮箱" required />
              </div>

              <div class="form-group">
                <label for="phone">电话 *</label>
                <input id="phone" v-model="form.phone" type="tel" placeholder="请输入您的电话" required />
              </div>

              <div class="form-group">
                <label for="company">公司名称</label>
                <input id="company" v-model="form.company" type="text" placeholder="请输入您的公司名称" />
              </div>

              <div class="form-group">
                <label for="subject">主题 *</label>
                <select id="subject" v-model="form.subject" required>
                  <option value="">请选择主题</option>
                  <option value="咨询">咨询</option>
                  <option value="合作">合作</option>
                  <option value="投诉">投诉</option>
                  <option value="其他">其他</option>
                </select>
              </div>

              <div class="form-group">
                <label for="message">消息 *</label>
                <textarea id="message" v-model="form.message" placeholder="请输入您的消息" rows="5" required></textarea>
              </div>

              <button type="submit" class="btn btn--primary btn--large" :disabled="isSubmitting">
                {{ isSubmitting ? '发送中...' : '发送消息' }}
              </button>
            </form>

            <div v-if="submitMessage" :class="['submit-message', submitMessage.type]">
              {{ submitMessage.text }}
            </div>
          </div>

          <div class="form-image">
            <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&h=600&fit=crop" alt="联系我们" />
          </div>
        </div>
      </div>
    </section>

    <!-- 分公司 -->
    <section class="branches">
      <div class="container">
        <!-- 标题通用组件 -->
        <div class="section-title">
          <div class="title-dot-left"></div>
          <h2>全国分公司</h2>
          <div class="title-dot-right"></div>
        </div>
        <div class="branches-grid">
          <div v-for="branch in branches" :key="branch.id" class="branch-card">
            <h3>{{ branch.city }}</h3>
            <p>{{ branch.address }}</p>
            <p class="branch-phone">{{ branch.phone }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { contactAPI } from '../api/index'

const form = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: ''
})

const submitMessage = ref<{ type: string; text: string } | null>(null)
const isSubmitting = ref(false)
import bannerImg from '@/assets/about_bg.png'

const branches = [
  { id: 1, city: '北京', address: '北京市经济技术开发区地盛西路1号', phone: '010-1234-5678' },
  { id: 2, city: '上海', address: '上海市浦东新区世纪大道1号', phone: '021-1234-5678' },
  { id: 3, city: '深圳', address: '深圳市南山区科技园路1号', phone: '0755-1234-5678' },
  { id: 4, city: '广州', address: '广州市天河区珠江新城1号', phone: '020-1234-5678' },
  { id: 5, city: '成都', address: '成都市高新区天府大道1号', phone: '028-1234-5678' },
  { id: 6, city: '武汉', address: '武汉市武昌区中山路1号', phone: '027-1234-5678' }
]

const submitForm = async () => {
  // 验证表单
  if (!form.value.name || !form.value.email || !form.value.phone || !form.value.subject || !form.value.message) {
    submitMessage.value = {
      type: 'error',
      text: '请填写所有必填项'
    }
    return
  }

  // 提交到后端
  isSubmitting.value = true
  try {
    const response = await contactAPI.submit(form.value)
    if (response.data.success) {
      submitMessage.value = {
        type: 'success',
        text: response.data.message || '感谢您的消息，我们会尽快与您联系！'
      }

      // 重置表单
      setTimeout(() => {
        form.value = {
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: ''
        }
        submitMessage.value = null
      }, 3000)
    } else {
      submitMessage.value = {
        type: 'error',
        text: '提交失败，请稍后重试'
      }
    }
  } catch (error) {
    console.error('提交联系表单失败:', error)
    submitMessage.value = {
      type: 'error',
      text: '提交失败，请检查网络连接后重试'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact {
  min-height: 100vh;
  padding-top: 80px; /* 增加顶部内边距，防止被全局固定头部遮挡 */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 页面标题 (同步 About 页) */
.page-header {
  background-size: cover;
  background-position: center;
  padding: 5rem 1rem;
  text-align: center;
  margin-top: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.page-header h1 {
  font-size: 3rem;
  margin: 0 0 1rem 0;
  color: #1e3a8a;
  font-weight: 800;
  letter-spacing: 2px;
}

.page-header p {
  font-size: 1.2rem;
  margin: 0;
  color: #4b5563;
  font-weight: 500;
}

/* 联系方式 */
.contact-info {
  padding: 2rem 0;
  background: #f8f9fa;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.info-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.info-card__icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  background: #eff6ff; /* 浅蓝圆形背景 */
  color: #3b82f6; /* 主题蓝图标颜色 */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.info-card:hover .info-card__icon {
  background: #3b82f6;
  color: white;
  transform: rotate(10deg);
}

.info-card h3 {
  margin: 0.5rem 0;
  color: #333;
}

.info-card p {
  margin: 0.5rem 0;
  color: #666;
}

.info-card__desc {
  font-size: 0.9rem;
  color: #999;
}

/* 联系表单 */
.contact-form-section {
  padding: 2rem 0;
}

.form-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.form-content h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.form-content>p {
  color: #666;
  margin-bottom: 2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn {
  display: inline-block;
  padding: 0.75rem 2.2rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 1.5px solid transparent;
  cursor: pointer;
}

.btn--primary {
  background: #3b82f6; /* 主题蓝 */
  color: white;
  border-color: #3b82f6;
}

.btn--primary:hover {
  background: #2563eb;
  border-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.35);
}

.btn--large {
  padding: 1rem 3rem;
  font-size: 1.1rem;
}

.submit-message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  font-weight: 600;
}

.submit-message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.submit-message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.form-image {
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.form-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 分公司 */
.branches {
  background: #f8f9fa;
  padding: 2rem 0;
}

/* 标题通用系统 (同主题规范) */
.section-title {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 3.5rem;
}
.section-title h2 {
  font-size: 2.2rem;
  font-weight: 800;
  color: #1e3a8a; /* 深蓝色 */
  margin: 0;
  letter-spacing: 1px;
}
.title-dot-left, .title-dot-right {
  display: flex;
  align-items: center;
  gap: 6px;
}
.title-dot-left::before, .title-dot-right::after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #bfdbfe; /* 淡蓝小点 */
}
.title-dot-left::after, .title-dot-right::before {
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #60a5fa; /* 实心蓝大点 */
}

.branches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.branch-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.branch-card h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.branch-card p {
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.95rem;
}

.branch-phone {
  color: #667eea;
  font-weight: 600;
}

/* 响应式 */
@media (max-width: 768px) {
  .page-header {
    padding: 2rem 1rem;
  }

  .page-header h1 {
    font-size: 1.8rem;
  }

  .form-wrapper {
    grid-template-columns: 1fr;
  }

  .form-image {
    height: 250px;
  }

  .branches-grid {
    grid-template-columns: 1fr;
  }
}
</style>
