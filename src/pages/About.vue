<template>
  <div class="about">
    <!-- 页面标题 -->
    <section class="page-header" :style="{ backgroundImage: `url(${bannerImg})` }">
      <div class="container">
        <h1>关于我们</h1>
        <p>了解我们的故事、使命和愿景</p>
      </div>
    </section>
    <!-- 公司简介 -->
    <section class="intro">
      <div class="container">
        <div class="intro__content">
          <div class="intro__text">
            <h2>关于我们</h2>
            <p>我们是一家专注于云计算、数据分析和网络安全的高科技企业，拥有18年的技术积累和行业经验。</p>
            <p>公司拥有200+名资深技术专家和产品设计师，为全球50万+企业客户提供可靠的云服务和安全防护解决方案。</p>
            <p>我们致力于通过创新的技术和优质的服务，帮助企业实现数字化转型，提升竞争力。每年投入营收的25%用于技术研发和产品创新。</p>
          </div>
          <div class="intro__image">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
              alt="现代化办公环境" />
          </div>
        </div>
      </div>
    </section>
    <!-- 使命与愿景 -->
    <section class="mission">
      <div class="container">
        <div class="mission__grid">
          <div class="mission__item">
            <div class="mission__header">
              <div class="mission__icon blue">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              </div>
              <h3>使命</h3>
            </div>
            <p>通过先进的云计算技术和全面的安全防护，赋能企业数字化转型，让每个企业都能安全、高效地拥抱云时代。</p>
          </div>
          <div class="mission__item">
            <div class="mission__header">
              <div class="mission__icon purple">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </div>
              <h3>愿景</h3>
            </div>
            <p>成为全球领先的云计算和数据安全服务提供商，为企业创造可持续的竞争优势和商业价值。</p>
          </div>
          <div class="mission__item">
            <div class="mission__header">
              <div class="mission__icon green">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              </div>
              <h3>核心价值观</h3>
            </div>
            <p>安全第一、技术领先、客户成功、持续创新。我们以客户需求为中心，以技术创新为驱动，以安全可靠为基石。</p>
          </div>
        </div>
      </div>
    </section>
    <!-- 发展历程 -->
    <section class="timeline">
      <div class="container">
        <div class="section-title">
          <div class="title-dot-left"></div>
          <h2>发展历程</h2>
          <div class="title-dot-right"></div>
        </div>
        <div class="timeline__items">
          <div v-for="item in timeline" :key="item.year" class="timeline__item">
            <div class="timeline__year">{{ item.year }}</div>
            <div class="timeline__content">
              <h4>{{ item.title }}</h4>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 荣誉资质 -->
    <section class="honors">
      <div class="container">
        <div class="section-title">
          <div class="title-dot-left"></div>
          <h2>荣誉资质</h2>
          <div class="title-dot-right"></div>
        </div>
        <div class="honors__grid">
          <div v-for="honor in honors" :key="honor.id" class="honor-card">
            <div class="honor-card__icon" v-html="honor.icon"></div>
            <h4>{{ honor.title }}</h4>
            <p>{{ honor.year }}</p>
          </div>
        </div>
      </div>
    </section>
    <!-- 团队 -->
    <section class="team">
      <div class="container">
        <div class="section-title">
          <div class="title-dot-left"></div>
          <h2>我们的实力</h2>
          <div class="title-dot-right"></div>
        </div>
        <p class="team__intro">拥有200+名资深技术专家，包括云计算架构师、安全专家和数据科学家</p>
        <div class="team__stats">
          <div v-for="stat in teamStats" :key="stat.id" class="team__stat">
            <div class="team__stat-icon" v-html="stat.icon"></div>
            <div class="team__stat-text">
              <div class="team__stat-number">{{ stat.number }}</div>
              <div class="team__stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { siteAPI } from '../api/index'
import bannerImg from '@/assets/about_bg.png'

const timeline = ref<any[]>([])
const honors = ref<any[]>([])

const fetchAboutData = async () => {
  try {
    const [timelineRes, honorsRes] = await Promise.all([
      siteAPI.getTimeline(),
      siteAPI.getHonors()
    ])
    
    if (timelineRes.data.success) {
      timeline.value = timelineRes.data.data
    }
    
    if (honorsRes.data.success) {
      honors.value = honorsRes.data.data
    }
  } catch (error) {
    console.error('获取关于我们数据失败:', error)
    // 降级回退到 Mock 数据 (保留原有逻辑作为保险)
    timeline.value = [
      { year: '2006', title: '公司成立', description: '在北京成立，专注于企业级网络安全和数据保护解决方案' },
      { year: '2010', title: '云平台上线', description: '推出第一代云建站平台' },
      { year: '2015', title: '数据分析平台', description: '发布数据分析和可视化平台' },
      { year: '2019', title: '国际扩展', description: '在多地建立分支机构' },
      { year: '2024', title: 'AI智能升级', description: '推出AI驱动的安全防护引擎' }
    ]
    honors.value = [
      { id: 1, title: '云计算创新企业奖', year: '2024', icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>' }
    ]
  }
}

const teamStats = [
  { id: 1, number: '200+', label: '技术团队', icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
  { id: 2, number: '50万+', label: '企业客户', icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><rect x="9" y="9" width="6" height="6"/></svg>' },
  { id: 3, number: '99.99%', label: '服务可用性', icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' }
]

onMounted(() => {
  fetchAboutData()
})
</script>
<style scoped>
.about {
  min-height: 100vh;
  padding-top: 80px; /* 增加顶部内边距，防止被全局固定头部遮挡 */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 页面标题 */
.page-header {
  background-size: cover;
  background-position: center;
  padding: 5rem 1rem; /* 稍微增加内边距，让背景图展示更多 */
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
  color: #1e3a8a; /* 品牌深蓝，提高对比度 */
  font-weight: 800;
  letter-spacing: 2px;
}

.page-header p {
  font-size: 1.2rem;
  margin: 0;
  color: #4b5563; /* 深灰色 */
  font-weight: 500;
}

/* 简介 */
.intro {
  padding: 2rem 0; /* 调小上下留白 */
  background: transparent;
}

.intro__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem; /* 调小图文之间的间距 */
  align-items: center;
}

.intro__text h2 {
  font-size: 2.2rem;
  margin-bottom: 2rem;
  color: #1e3a8a; /* 深蓝色标题 */
  font-weight: 800;
}

.intro__text p {
  color: #4b5563;
  line-height: 2.2; /* 增大行高 */
  margin-bottom: 2rem; /* 增大段落间距 */
  font-size: 1rem;
}

.intro__image {
  height: 320px; /* 调小图片高度 */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); /* 柔和阴影 */
}

.intro__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 使命与愿景 */
.mission {
  background: transparent;
  padding: 1rem 0 2rem; /* 再次调小底部留白 */
}

.mission__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.mission__item {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
}

.mission__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.mission__icon {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.mission__icon.blue { background: #eff6ff; color: #3b82f6; }
.mission__icon.purple { background: #faf5ff; color: #a855f7; }
.mission__icon.green { background: #ecfdf5; color: #10b981; }

.mission__item h3 {
  font-size: 1.4rem;
  margin: 0;
  color: #1e3a8a;
  font-weight: 700;
}

.mission__item p {
  color: #64748b;
  line-height: 1.8;
  margin: 0;
  font-size: 0.95rem;
}

/* 发展历程 */
.timeline {
  padding: 1rem 0 3rem; /* 大幅调小上方留白 */
  background: transparent;
}

.timeline__items {
  position: relative;
  padding: 2rem 0;
  max-width: 1000px; /* 限制最大宽度使卡片不要过长 */
  margin: 0 auto;
}

.timeline__items::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #bfdbfe; /* 淡蓝色轴线 */
  transform: translateX(-50%);
}

.timeline__item {
  position: relative;
  margin-bottom: 1.5rem; /* 调小节点之间的垂直间距 */
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem; /* 卡片与时间年份的距离 */
  align-items: center;
}

/* 时间轴圆点 */
.timeline__item::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background: white;
  border: 4px solid #60a5fa; /* 蓝边白心 */
  border-radius: 50%;
  z-index: 2;
}

.timeline__item:nth-child(even) {
  direction: rtl;
}

.timeline__item:nth-child(even)>* {
  direction: ltr;
}

.timeline__year {
  text-align: right;
  font-size: 1.4rem;
  font-weight: 700;
  color: #3b82f6; /* 主品牌蓝 */
}

.timeline__item:nth-child(even) .timeline__year {
  text-align: left;
}

.timeline__content {
  background: white;
  padding: 1.2rem 2rem; /* 调小卡片内部的上下左右间距 */
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
}

.timeline__content:hover {
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.08); /* 悬浮阴影增强 */
}

.timeline__content h4 {
  margin: 0 0 0.4rem 0; /* 调小标题下方留白 */
  color: #1e3a8a;
  font-size: 1.15rem;
  font-weight: 700;
}

.timeline__content p {
  margin: 0;
  color: #64748b;
  line-height: 1.5; /* 调小段落行高 */
  font-size: 0.95rem;
}

/* 标题通用系统 */
.section-title {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 2.5rem; /* 减小标题与下方内容的间距 */
}
.section-title h2 {
  font-size: 2.2rem;
  font-weight: 800;
  color: #1e3a8a;
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

/* 荣誉资质 */
.honors {
  background: transparent;
  padding: 1rem 0 3rem; /* 大幅调小上方留白 */
}

.honors__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
  justify-content: center;
}

.honor-card {
  background: white;
  padding: 2.5rem 1rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
}

.honor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.08);
}

.honor-card__icon {
  width: 80px;
  height: 80px;
  background: #eff6ff;
  color: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;
}

.honor-card__icon :deep(svg) {
  width: 44px;
  height: 44px;
}

.honor-card h4 {
  margin: 0 0 0.5rem 0;
  color: #4b5563;
  font-size: 0.95rem;
  line-height: 1.4;
}

.honor-card p {
  margin: 0;
  color: #94a3b8;
  font-size: 0.9rem;
}

/* 团队 */
.team {
  padding: 1rem 0 4rem; /* 大幅调小上方留白 */
  text-align: center;
}

.team__intro {
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 4rem;
}

.team__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.team__stat {
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 10px; /* 对齐截图稍小的圆角 */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02); /* 减弱阴影 */
  border: 2.5px solid #dbeafe; /* 添加对应的浅蓝边框线 */
  transition: transform 0.3s ease;
}

.team__stat:hover {
  transform: translateY(-4px);
}

.team__stat-icon {
  width: 64px;
  height: 64px;
  background: #eff6ff;
  color: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.team__stat-text {
  text-align: left;
}

.team__stat-number {
  font-size: 2.2rem;
  font-weight: 800;
  color: #3b82f6;
  margin-bottom: 0.2rem;
  line-height: 1;
}

.team__stat-label {
  font-size: 0.95rem;
  color: #64748b;
  font-weight: 500;
}

/* 响应式 */
@media (max-width: 768px) {
  .page-header {
    padding: 2rem 1rem;
  }

  .page-header h1 {
    font-size: 1.8rem;
  }

  .intro__content {
    grid-template-columns: 1fr;
  }

  .intro__image {
    height: 250px;
  }

  .timeline__items::before {
    left: 0;
  }

  .timeline__item {
    grid-template-columns: 1fr;
    direction: ltr !important;
  }

  .timeline__item>* {
    direction: ltr !important;
  }

  .timeline__year {
    text-align: left !important;
  }

  .honors__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}
</style>
