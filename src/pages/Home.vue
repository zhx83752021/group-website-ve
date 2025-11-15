<template>
  <div class="home">
    <!-- 英雄区 -->
    <section class="hero" ref="heroSection" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
      <div class="hero__spotlight" ref="spotlight"></div>
      <div class="hero__spotlight-glow" ref="spotlightGlow"></div>
      <div class="hero__container">
        <div class="hero__content">
          <h1 class="hero__title">云计算与数据安全解决方案领导者</h1>
          <p class="hero__subtitle">为全球企业提供可靠的云服务、数据分析和安全防护，助力数字化转型</p>
          <div class="hero__buttons">
            <router-link to="/products" class="btn btn--primary">查看产品</router-link>
            <router-link to="/contact" class="btn btn--secondary btn--secondary-light">立即咨询</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心业务 -->
    <section class="services">
      <div class="container">
        <h2>我们的强项</h2>
        <div class="services__grid">
          <div v-for="service in services" :key="service.id" class="service-card">
            <div class="service-card__icon">{{ service.icon }}</div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            <a href="#" class="service-card__link">了解更多 →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 数据展示 -->
    <section class="stats">
      <div class="container">
        <div class="stats__grid">
          <div v-for="stat in stats" :key="stat.id" class="stat-item">
            <div class="stat-item__number">{{ stat.number }}</div>
            <div class="stat-item__label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 最新新闻 -->
    <section class="news-section">
      <div class="container">
        <h2>最新动态</h2>
        <div class="news__grid">
          <router-link v-for="news in newsList.slice(0, 3)" :key="news.id" :to="`/news/${news.id}`" class="news-card">
            <img :src="news.image" :alt="news.title" class="news-card__image" />
            <div class="news-card__content">
              <span class="news-card__category">{{ news.category }}</span>
              <h3>{{ news.title }}</h3>
              <p>{{ news.summary }}</p>
              <span class="news-card__date">{{ news.date }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA 区域 -->
    <section class="cta">
      <div class="container">
        <h2>准备好开始了吗？</h2>
        <p>联系我们的专业团队，获取定制化解决方案</p>
        <router-link to="/contact" class="btn btn--primary btn--large">立即咨询</router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { newsAPI } from '../api/index'

const newsList = ref<any[]>([])

// 从后端获取新闻数据
const fetchNews = async () => {
  try {
    const response = await newsAPI.getList(3) // 只获取最新3条
    if (response.data.success) {
      newsList.value = response.data.data.map((news: any) => ({
        ...news,
        image: news.image_url || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop',
        summary: news.content ? news.content.substring(0, 100) + '...' : '',
        date: news.created_at
      }))
    }
  } catch (error) {
    console.error('获取新闻列表失败:', error)
    // 如果API失败，使用默认数据
    newsList.value = [
      {
        id: 1,
        title: '集团荣获行业最高奖项',
        summary: '在2024年行业评选中，我们集团凭借卓越的创新能力和服务质量荣获最高奖项。',
        date: '2024-11-12',
        category: '公司新闻',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop'
      }
    ]
  }
}

onMounted(() => {
  fetchNews()
})

// 英雄区鼠标跟随高光效果
const heroSection = ref<HTMLElement | null>(null)
const spotlight = ref<HTMLElement | null>(null)
const spotlightGlow = ref<HTMLElement | null>(null)

const handleMouseMove = (e: MouseEvent) => {
  if (!heroSection.value || !spotlight.value || !spotlightGlow.value) return

  const rect = heroSection.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  // 主高光
  spotlight.value.style.left = `${x}px`
  spotlight.value.style.top = `${y}px`
  spotlight.value.style.opacity = '1'

  // 外层光晕（稍微延迟跟随）
  setTimeout(() => {
    if (spotlightGlow.value) {
      spotlightGlow.value.style.left = `${x}px`
      spotlightGlow.value.style.top = `${y}px`
      spotlightGlow.value.style.opacity = '1'
    }
  }, 50)
}

const handleMouseLeave = () => {
  if (spotlight.value) spotlight.value.style.opacity = '0'
  if (spotlightGlow.value) spotlightGlow.value.style.opacity = '0'
}

const services = [
  {
    id: 1,
    icon: '☁️',
    title: '云建站平台',
    description: '一站式云建站解决方案，无需编程即可创建专业网站，支持拖拽编辑和自定义模板'
  },
  {
    id: 2,
    icon: '📊',
    title: '数据分析系统',
    description: '实时数据统计和可视化分析，帮助企业深度了解用户行为和业务趋势'
  },
  {
    id: 3,
    icon: '🔐',
    title: '安全防护系统',
    description: '企业级DDoS防护和数据加密，全天候监测威胁，保护您的数据安全'
  },
  {
    id: 4,
    icon: '📱',
    title: '内容管理系统',
    description: '灵活的CMS系统，支持多语言和多种内容类型，轻松管理海量内容'
  },
  {
    id: 5,
    icon: '🎯',
    title: '用户行为分析',
    description: '深度用户行为追踪，热力图分析，转化漏斗优化，提升用户体验'
  },
  {
    id: 6,
    icon: '⚡',
    title: '威胁情报平台',
    description: '实时威胁监测和风险预警，专业安全团队24/7应急响应支持'
  }
]

const stats = [
  { id: 1, number: '18+', label: '年技术积累' },
  { id: 2, number: '50万+', label: '企业客户' },
  { id: 3, number: '200+', label: '技术团队' },
  { id: 4, number: '99.99%', label: '服务可用性' }
]
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 英雄区 */
.hero {
  background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 4rem 0;
  width: 100%;
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  position: relative;
  overflow: hidden;
}

.hero__spotlight {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.08) 40%,
      transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease, left 0.1s ease, top 0.1s ease;
  z-index: 2;
  mix-blend-mode: overlay;
  filter: blur(2px);
}

.hero__spotlight-glow {
  position: absolute;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.08) 30%,
      rgba(255, 255, 255, 0.03) 50%,
      transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.4s ease, left 0.15s ease, top 0.15s ease;
  z-index: 1;
  mix-blend-mode: screen;
  filter: blur(20px);
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  animation: float 6s ease-in-out infinite;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  animation: float 8s ease-in-out infinite reverse;
}

.hero__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  position: relative;
  z-index: 10;
}

.hero__content {
  animation: fadeInUp 1s ease;
  text-align: center;
  max-width: 900px;
}

.hero__title {
  font-size: 3rem;
  margin: 0 0 1rem 0;
  font-weight: 700;
  color: white;
  white-space: nowrap;
  animation: slideInDown 0.8s ease;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.hero__subtitle {
  font-size: 1.3rem;
  margin: 0 0 2rem 0;
  opacity: 0.95;
  color: white;
  animation: fadeIn 1.2s ease;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.hero__buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  animation: fadeInUp 1.4s ease;
}



@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* 按钮 */
.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.btn--primary {
  background: white;
  color: #4f46e5;
  font-weight: 600;
}

.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.3);
  background: #f3f4f6;
}

.btn--secondary {
  background: transparent;
  color: white;
  border-color: white;
  font-weight: 600;
}

.btn--secondary:hover {
  background: white;
  color: #4f46e5;
}

.btn--secondary-light {
  color: white;
  border-color: white;
  font-weight: 600;
}

.btn--secondary-light:hover {
  background: white;
  color: #4f46e5;
}

.btn--large {
  padding: 1rem 3rem;
  font-size: 1.1rem;
}

/* 服务区 */
.services {
  padding: 4rem 0;
  background: #f8f9fa;
}

.services h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.service-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  border-left: 4px solid #667eea;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* 第1个卡片 - 绿色 */
.service-card:nth-child(1) {
  background: linear-gradient(135deg, #f0fdf4 0%, #f0fdf4 100%);
  border-left-color: #22c55e;
}

.service-card:nth-child(1) .service-card__icon {
  background: #22c55e;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.8rem;
}

/* 第2个卡片 - 蓝色 */
.service-card:nth-child(2) {
  background: linear-gradient(135deg, #eff6ff 0%, #eff6ff 100%);
  border-left-color: #3b82f6;
}

.service-card:nth-child(2) .service-card__icon {
  background: #3b82f6;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.8rem;
}

/* 第3个卡片 - 紫色 */
.service-card:nth-child(3) {
  background: linear-gradient(135deg, #faf5ff 0%, #faf5ff 100%);
  border-left-color: #a855f7;
}

.service-card:nth-child(3) .service-card__icon {
  background: #a855f7;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.8rem;
}

/* 第4个卡片 - 橙色 */
.service-card:nth-child(4) {
  background: linear-gradient(135deg, #fff7ed 0%, #fff7ed 100%);
  border-left-color: #f97316;
}

.service-card:nth-child(4) .service-card__icon {
  background: #f97316;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.8rem;
}

/* 第5个卡片 - 红色 */
.service-card:nth-child(5) {
  background: linear-gradient(135deg, #fef2f2 0%, #fef2f2 100%);
  border-left-color: #ef4444;
}

.service-card:nth-child(5) .service-card__icon {
  background: #ef4444;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.8rem;
}

/* 第6个卡片 - 青色 */
.service-card:nth-child(6) {
  background: linear-gradient(135deg, #f0fdfa 0%, #f0fdfa 100%);
  border-left-color: #06b6d4;
}

.service-card:nth-child(6) .service-card__icon {
  background: #06b6d4;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.8rem;
}

.service-card h3 {
  margin: 1rem 0;
  color: #333;
}

.service-card p {
  color: #666;
  margin-bottom: 1rem;
}

.service-card__link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.service-card__link:hover {
  color: #764ba2;
}

/* 数据展示 */
.stats {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f0e8ff 0%, #e8f0ff 50%, #f5f7ff 100%);
  color: #333;
  position: relative;
  overflow: hidden;
}

.stats::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.stats::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(118, 75, 162, 0.06) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.stats__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.stat-item__number {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-item__label {
  font-size: 1.1rem;
  opacity: 0.8;
  color: #555;
}

/* 新闻区 */
.news-section {
  padding: 4rem 0;
}

.news-section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
}

.news__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.news-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.news-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.news-card__content {
  padding: 1.5rem;
}

.news-card__category {
  display: inline-block;
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.news-card h3 {
  margin: 0.5rem 0;
  color: #333;
}

.news-card p {
  color: #666;
  margin: 0.5rem 0;
  font-size: 0.95rem;
}

.news-card__date {
  display: block;
  color: #999;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

/* CTA 区域 */
.cta {
  background: linear-gradient(135deg, #f5f7ff 0%, #e8f0ff 50%, #f0e8ff 100%);
  color: #333;
  padding: 4rem 1rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.cta::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(118, 75, 162, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.cta h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1;
}

.cta p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.8;
  color: #555;
  position: relative;
  z-index: 1;
}

.cta .btn {
  position: relative;
  z-index: 1;
}

/* 响应式 */
@media (max-width: 768px) {
  .hero {
    padding: 2rem 0;
  }

  .hero__container {
    padding: 0 1rem;
    min-height: auto;
  }

  .hero__title {
    font-size: 2rem;
    color: white;
    white-space: normal;
  }

  .hero__subtitle {
    font-size: 1rem;
    color: white;
  }

  .services h2,
  .news-section h2,
  .cta h2 {
    font-size: 1.8rem;
  }

  .services__grid,
  .news__grid {
    grid-template-columns: 1fr;
  }
}
</style>
