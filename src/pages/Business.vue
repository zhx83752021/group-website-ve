<template>
  <div class="business">
    <!-- 页面标题 -->
    <section class="page-header" :style="{ backgroundImage: `url(${bannerImg})` }">
      <div class="container">
        <h1>业务布局</h1>
        <p>我们的核心业务和解决方案</p>
      </div>
    </section>
    <!-- 业务板块 -->
    <section class="business-sections">
      <div class="container">
        <div v-for="(business, index) in businesses" :key="business.id" class="business-item"
          :class="{ 'business-item--reverse': index % 2 === 1 }">
          <div class="business-item__image">
            <img :src="business.image" :alt="business.title" loading="lazy" />
          </div>
          <div class="business-item__content">
            <h2>{{ business.title }}</h2>
            <p>{{ business.description }}</p>
            <ul class="business-item__features">
              <li v-for="feature in business.features" :key="feature">{{ feature }}</li>
            </ul>
            <a href="#" class="btn btn--primary">了解更多</a>
          </div>
        </div>
      </div>
    </section>
    <!-- 成功案例 -->
    <section class="cases">
      <div class="container">
        <!-- 标题通用组件 -->
        <div class="section-title">
          <div class="title-dot-left"></div>
          <h2>成功案例</h2>
          <div class="title-dot-right"></div>
        </div>
        <div class="cases__grid">
          <div v-for="caseItem in cases" :key="caseItem.id" class="case-card">
            <img :src="caseItem.image" :alt="caseItem.title" class="case-card__image" />
            <div class="case-card__content">
              <h3>{{ caseItem.title }}</h3>
              <p class="case-card__company">{{ caseItem.company }}</p>
              <p>{{ caseItem.description }}</p>
              <div class="case-card__stats">
                <span v-for="stat in caseItem.stats" :key="stat">{{ stat }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 服务流程 -->
    <section class="process">
      <div class="container">
        <!-- 标题通用组件 -->
        <div class="section-title">
          <div class="title-dot-left"></div>
          <h2>服务流程</h2>
          <div class="title-dot-right"></div>
        </div>
        <div class="process__steps">
          <div v-for="(step, index) in processSteps" :key="step.id" class="process__step">
            <div class="process__step-number">{{ index + 1 }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { businessAPI, siteAPI } from '../api/index'

const businesses = ref<any[]>([])
const cases = ref<any[]>([])
import bannerImg from '@/assets/about_bg.png'

// 从后端获取业务数据
const fetchBusinesses = async () => {
  try {
    const response = await businessAPI.getList(50)
    if (response.data.success) {
      businesses.value = response.data.data.map((business: any) => ({
        ...business,
        title: business.name,
        features: ['响应式设计', '高性能优化', 'SEO友好', '安全可靠', '易于维护'],
        image: business.icon_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'
      }))
    }
  } catch (error) {
    console.error('获取业务信息失败:', error)
    // 如果API失败，使用默认数据
    businesses.value = [
      {
        id: 1,
        title: '集团官网建设',
        description: '为大型企业集团提供专业的官网设计和开发服务，展示企业形象和实力。',
        features: ['响应式设计', '高性能优化', 'SEO友好', '安全可靠', '易于维护'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'
      },
      {
        id: 2,
        title: '营销型网站',
        description: '专注于转化率的网站设计，帮助企业获取更多商机和客户。',
        features: ['转化率优化', '用户体验设计', '数据分析', '营销工具集成', '多渠道推广'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
      }
    ]
  }
}

// 获取成功案例
const fetchCases = async () => {
  try {
    const response = await siteAPI.getCases()
    if (response.data.success) {
      cases.value = response.data.data
    }
  } catch (error) {
    console.error('获取成功案例失败:', error)
    // 降级使用 Mock
    cases.value = [
      {
        id: 1,
        title: '大型集团官网改版',
        company: '某上市集团',
        description: '完成集团官网的全面改版，提升品牌形象和用户体验。',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop',
        stats: ['提升访问量 150%', '转化率提高 45%', '用户满意度 98%']
      }
    ]
  }
}

onMounted(() => {
  fetchBusinesses()
  fetchCases()
})
const processSteps = [
  {
    id: 1,
    title: '需求沟通',
    description: '与客户深入沟通，了解业务需求和目标'
  },
  {
    id: 2,
    title: '方案设计',
    description: '根据需求制定详细的解决方案和设计稿'
  },
  {
    id: 3,
    title: '开发实现',
    description: '按照方案进行开发，确保代码质量和性能'
  },
  {
    id: 4,
    title: '测试验收',
    description: '进行全面的功能和兼容性测试'
  },
  {
    id: 5,
    title: '上线部署',
    description: '将项目部署到生产环境'
  },
  {
    id: 6,
    title: '运维支持',
    description: '提供长期的技术支持和维护服务'
  }
]
</script>
<style scoped>
.business {
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

/* 业务板块 */
.business-sections {
  padding: 2rem 0;
}

.business-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  margin-bottom: 4rem;
}

.business-item--reverse {
  direction: rtl;
}

.business-item--reverse>* {
  direction: ltr;
}

.business-item__image {
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.business-item__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.business-item:hover .business-item__image img {
  transform: scale(1.05);
}

.business-item__content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.business-item__content p {
  color: #666;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.business-item__features {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.business-item__features li {
  color: #666;
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.business-item__features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
  font-size: 1.2rem;
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

/* 成功案例 */
.cases {
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

.cases__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.case-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.case-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.case-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.case-card__content {
  padding: 1.5rem;
}

.case-card__content h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.case-card__company {
  color: #667eea;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.case-card__content p {
  color: #666;
  margin: 0.5rem 0;
}

.case-card__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.case-card__stats span {
  background: #f0f0f0;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #666;
}

/* 服务流程 */
.process {
  padding: 2rem 0;
}

.process__steps {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2rem;
}

.process__step {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.process__step-number {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
}

.process__step h3 {
  margin: 1.5rem 0 0.5rem 0;
  color: #333;
}

.process__step p {
  color: #666;
  margin: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .page-header {
    padding: 2rem 1rem;
  }

  .page-header h1 {
    font-size: 1.8rem;
  }

  .business-item {
    grid-template-columns: 1fr;
    direction: ltr !important;
  }

  .business-item>* {
    direction: ltr !important;
  }

  .business-item__image {
    height: 250px;
  }

  .process__steps {
    grid-template-columns: 1fr;
  }
}
</style>
