<template>
  <div class="home">
    <!-- 英雄区 -->
    <section class="hero" :style="{ backgroundImage: `url(${bannerImg})` }">
      <div class="hero__container">
        <div class="hero__content">
          <h1 class="hero__title">云计算与数据安全<br />解决方案领导者</h1>
          <p class="hero__subtitle">为全球企业提供可靠的云服务、数据分析和安全防护，<br />助力数字化转型</p>
          <div class="hero__buttons">
            <router-link to="/products" class="btn btn--primary">查看产品</router-link>
            <router-link to="/contact" class="btn btn--secondary">立即咨询</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心业务 -->
    <section class="services">
      <div class="container">
        <!-- 标题通用组件 -->
        <div class="section-title">
          <div class="title-dot-left"></div>
          <h2>我们的强项</h2>
          <div class="title-dot-right"></div>
        </div>
        <div class="services__grid">
          <div v-for="service in services" :key="service.id" class="service-card">
            <!-- 左侧：圆形图标 -->
            <div class="service-card__icon">{{ service.icon }}</div>
            <!-- 右侧：标题 + 描述 + 链接 -->
            <div class="service-card__body">
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
              <a href="#" class="service-card__link">了解更多 →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 数据展示 -->
    <section class="stats">
      <div class="container">
        <div class="stats__card">
          <div v-for="stat in stats" :key="stat.id" class="stat-item">
            <!-- 左侧：小图标 -->
            <div class="stat-item__icon" v-html="stat.icon"></div>
            <!-- 右侧：数字 + 标签 -->
            <div class="stat-item__text">
              <div class="stat-item__number">{{ stat.number }}</div>
              <div class="stat-item__label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- 最新新闻 -->
    <section class="news-section">
      <div class="container">
        <!-- 标题通用组件 -->
        <div class="section-title">
          <div class="title-dot-left"></div>
          <h2>最新动态</h2>
          <div class="title-dot-right"></div>
        </div>
        <div class="news__grid">
          <router-link v-for="news in newsList.slice(0, 3)" :key="news.id" :to="`/news/${news.id}`" class="news-card">
            <!-- 图片区：分类标签叠在左下角 -->
            <div class="news-card__img-wrap">
              <img :src="news.image" :alt="news.title" class="news-card__image" loading="lazy" />
              <span class="news-card__category" :class="`category--${news.category}`">{{ news.category }}</span>
            </div>
            <!-- 文字内容区 -->
            <div class="news-card__content">
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
        <div class="cta__card" :style="{ backgroundImage: `url(${ctaBg})` }">
          <h2>准备好开始了吗？</h2>
          <p>联系我们的专业团队，获取定制化解决方案</p>
          <router-link to="/contact" class="btn btn--primary">立即咨询</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { newsAPI, siteAPI } from '../api/index'
import bannerImg from '@/assets/banner.png'
import ctaBg from '@/assets/bg1.png'

const newsList = ref<any[]>([])
const siteConfig = ref<Record<string, string>>({})

// 从后端获取新闻数据
const fetchNews = async () => {
  try {
    const response = await newsAPI.getList(3) // 只获取最新3条
    if (response.data.success) {
      newsList.value = response.data.data.map((news: any) => ({
        ...news,
        image: news.image_url || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop',
        summary: news.content ? news.content.substring(0, 100) + '...' : '',
        date: news.created_at ? news.created_at.split('T')[0] : ''
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
        date: '2025-11-13',
        category: '公司新闻',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop'
      }
    ]
  }
}

// 获取站点配置
const fetchConfig = async () => {
  try {
    const response = await siteAPI.getConfig()
    if (response.data.success) {
      siteConfig.value = response.data.data
      // 更新统计数据
      if (siteConfig.value.stats_years) stats.value[0].number = siteConfig.value.stats_years
      if (siteConfig.value.stats_clients) stats.value[1].number = siteConfig.value.stats_clients
      if (siteConfig.value.stats_team) stats.value[2].number = siteConfig.value.stats_team
      if (siteConfig.value.stats_availability) stats.value[3].number = siteConfig.value.stats_availability
    }
  } catch (error) {
    console.error('获取站点配置失败:', error)
  }
}

onMounted(() => {
  fetchNews()
  fetchConfig()
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

const stats = ref([
  {
    id: 1,
    number: '18+',
    label: '年技术积累',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
  },
  {
    id: 2,
    number: '50万+',
    label: '企业客户',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>'
  },
  {
    id: 3,
    number: '200+',
    label: '技术团队',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>'
  },
  {
    id: 4,
    number: '99.99%',
    label: '服务可用性',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>'
  }
])
</script>

<style scoped>
.home {
  min-height: 100vh;
  padding-top: 80px; /* 补偿固定 Header 的高度 */
  /* 全局柔和渐变背景 */
  background: 
    radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.04) 0%, transparent 40%),
    radial-gradient(circle at 90% 80%, rgba(192, 132, 252, 0.04) 0%, transparent 40%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 1) 0%, #f8f9ff 100%);
  background-attachment: fixed;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 英雄区 */
.hero {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  position: relative;
}

.hero__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 420px;
}

.hero__content {
  text-align: left;
  max-width: 520px;
  padding: 60px 0;
}

.hero__title {
  font-size: 2.6rem;
  margin: 0 0 1rem 0;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.25;
}

.hero__subtitle {
  font-size: 1rem;
  margin: 0 0 2rem 0;
  color: #4a5568;
  line-height: 1.7;
}

.hero__buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: flex-start;
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
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 按钮 */
.btn {
  display: inline-block;
  padding: 0.75rem 2.2rem;
  border-radius: 6px; /* 统一圆角 */
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 1.5px solid transparent;
}

.btn--primary {
  background: #3b82f6; /* 主题蓝 */
  color: white;
  border-color: #3b82f6;
  font-weight: 600;
}

.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.35);
  background: #2563eb;
  border-color: #2563eb;
}

.btn--secondary {
  background: transparent;
  color: #3b82f6; /* 边框与文字均为特定蓝 */
  border: 1.5px solid #818cf8; /* 轻柔的蓝紫色边线 */
  font-weight: 600;
}

.btn--secondary:hover {
  background: #eff6ff; /* 悬浮亮底 */
  border-color: #60a5fa;
}

.btn--large {
  padding: 1rem 3rem;
  font-size: 1.1rem;
}

/* 服务区 */
.services {
  padding: 5rem 0;
  background: transparent;
}


/* 标题通用系统 (同 About 页) */
.section-title {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 2.5rem;
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

.services__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
}

/* 卡片：横排（左图标 + 右文字） */
.service-card {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
  background: #fff;
  padding: 1.6rem;
  border-radius: 12px;
  border: 1px solid #e8eaf2;
  transition: all 0.3s ease;
  text-align: left;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(79, 70, 229, 0.08);
  border-color: #c7c9e8;
}

/* 图标基础样式（左侧固定尺寸圆形） */
.service-card__icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  flex-shrink: 0; /* 不受挤压 */
}

/* 右侧文字區域 */
.service-card__body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.service-card__body h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 0.5rem 0;
}

.service-card__body p {
  font-size: 0.88rem;
  color: #6b7280;
  line-height: 1.65;
  margin: 0 0 0.8rem 0;
  flex: 1;
}

.service-card__link {
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s;
}

.service-card__link:hover {
  opacity: 0.75;
}

/* 主题色定义（各卡片）*/
.service-card:nth-child(1) .service-card__icon {
  background: #22c55e;
  color: white;
  box-shadow: 0 0 0 8px rgba(34, 197, 94, 0.15); /* 外层浅色光晕 */
}
.service-card:nth-child(1) .service-card__link { color: #16a34a; }

.service-card:nth-child(2) .service-card__icon {
  background: #3b82f6;
  color: white;
  box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.15);
}
.service-card:nth-child(2) .service-card__link { color: #2563eb; }

.service-card:nth-child(3) .service-card__icon {
  background: #a855f7;
  color: white;
  box-shadow: 0 0 0 8px rgba(168, 85, 247, 0.15);
}
.service-card:nth-child(3) .service-card__link { color: #7c3aed; }

.service-card:nth-child(4) .service-card__icon {
  background: #f97316;
  color: white;
  box-shadow: 0 0 0 8px rgba(249, 115, 22, 0.15);
}
.service-card:nth-child(4) .service-card__link { color: #ea580c; }

.service-card:nth-child(5) .service-card__icon {
  background: #ef4444;
  color: white;
  box-shadow: 0 0 0 8px rgba(239, 68, 68, 0.15);
}
.service-card:nth-child(5) .service-card__link { color: #dc2626; }

.service-card:nth-child(6) .service-card__icon {
  background: #06b6d4;
  color: white;
  box-shadow: 0 0 0 8px rgba(6, 182, 212, 0.15);
}
.service-card:nth-child(6) .service-card__link { color: #0891b2; }


/* 数据展示 */
.stats {
  padding: 1rem 0;
  background: transparent; /* 透出全局渐变 */
}

/* 白色卡片条 */
.stats__card {
  background: #fff;
  border-radius: 32px; /* 更大的圆角 */
  border: 1px solid rgba(232, 234, 242, 0.8);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 3rem 1rem; /* 增加高度 */
  box-shadow: 0 10px 40px rgba(99, 102, 241, 0.08); /* 增强阴影 */
  max-width: 1200px;
  margin: 0 auto;
}

/* 单个统计项 */
.stat-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.2rem;
  flex: 1;
  justify-content: center;
  position: relative;
}

/* 垂直分割线 */
.stat-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 40px;
  width: 1px;
  background: #f0f0f5;
}

/* 图标圆形底面 */
.stat-item__icon {
  width: 68px;
  height: 68px;
  background: #f1f4ff; /* 浅蓝底 */
  border-radius: 50%; /* 圆形 */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.stat-item__icon :deep(svg) {
  width: 30px; /* 增大图标 */
  height: 30px;
  stroke-width: 2px; /* 略微加深线条 */
}

.stat-item:hover .stat-item__icon {
  transform: scale(1.05);
}

.stat-item__text {
  display: flex;
  flex-direction: column;
}

.stat-item__number {
  font-size: 1.85rem; /* 更大的数字 */
  font-weight: 800;
  color: #4f46e5;
  line-height: 1.1;
  margin-bottom: 4px;
}

.stat-item__label {
  font-size: 0.95rem;
  color: #94a3b8; /* 灰色字 */
  font-weight: 500;
  white-space: nowrap;
}

/* 最新动态 */
.news-section {
  padding: 3rem 0;
  background: transparent; /* 透出全局渐变 */
}

/* 标题：与服务区风格一致 */
.news__title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 2.5rem;
  text-align: center;
}

.news__title-dots {
  color: #4f46e5;
  font-size: 1rem;
  letter-spacing: 4px;
  opacity: 0.6;
}

.news__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.news-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 2px 12px rgba(99, 102, 241, 0.06);
  border: 1px solid #e8eaf2;
  display: flex;
  flex-direction: column;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 28px rgba(99, 102, 241, 0.12);
}

/* 图片包裹层：容纳图片和叠加分类标签 */
.news-card__img-wrap {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.news-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.news-card:hover .news-card__image {
  transform: scale(1.05);
}

/* 分类标签：叠在图片左下角 */
.news-card__category {
  position: absolute;
  bottom: 12px;
  left: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  color: white;
  background: #4f46e5;
  white-space: nowrap;
  z-index: 2;
}

/* 根据分类名称匹配颜色 */
.category--合作动态 { background: #ec4899 !important; }
.category--产品发布 { background: #3b82f6 !important; }
.category--公司新闻 { background: #10b981 !important; }

/* 文字内容区 */
.news-card__content {
  padding: 1.2rem 1.4rem 1.4rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.news-card__content h3 {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 0.6rem 0;
  line-height: 1.5;
  /* 标题最多显两行 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card__content p {
  color: #6b7280;
  font-size: 0.88rem;
  line-height: 1.65;
  flex: 1;
  margin: 0 0 0.8rem 0;
  /* 摘要最多显3行 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card__date {
  display: block;
  color: #9ca3af;
  font-size: 0.8rem;
  margin-top: auto;
  padding-top: 0.6rem;
  border-top: 1px solid #f0f0f5;
}


/* CTA 区域 */
.cta {
  padding: 2rem 0 5rem;
}

.cta__card {
  position: relative;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  padding: 3rem 2rem; /* 减小高度 */
  text-align: center;
  overflow: hidden;
  border: 1px solid #e8eaf2;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.05);
}

.cta__card h2 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #4f46e5;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
  letter-spacing: -0.5px;
}

.cta__card p {
  font-size: 1.15rem;
  color: #64748b;
  margin-bottom: 2.2rem;
  position: relative;
  z-index: 2;
}

.cta__card .btn {
  position: relative;
  z-index: 2;
  padding: 0.9rem 3rem;
  font-size: 1.1rem;
  border-radius: 8px;
}

.cta__glow {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  pointer-events: none;
}

.cta__glow--1 {
  background: #6366f1;
  top: -150px;
  left: -100px;
}

.cta__glow--2 {
  background: #c084fc;
  bottom: -150px;
  right: -100px;
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
