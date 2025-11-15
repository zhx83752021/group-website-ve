<template>
  <div class="about">
    <!-- 页面标题 -->
    <section class="page-header">
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
            <h3>🎯 使命</h3>
            <p>通过先进的云计算技术和全面的安全防护，赋能企业数字化转型，让每个企业都能安全、高效地拥抱云时代。</p>
          </div>
          <div class="mission__item">
            <h3>🌟 愿景</h3>
            <p>成为全球领先的云计算和数据安全服务提供商，为企业创造可持续的竞争优势和商业价值。</p>
          </div>
          <div class="mission__item">
            <h3>💡 核心价值观</h3>
            <p>安全第一、技术领先、客户成功、持续创新。我们以客户需求为中心，以技术创新为驱动，以安全可靠为基石。</p>
          </div>
        </div>
      </div>
    </section>
    <!-- 发展历程 -->
    <section class="timeline">
      <div class="container">
        <h2>发展历程</h2>
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
        <h2>荣誉资质</h2>
        <div class="honors__grid">
          <div v-for="honor in honors" :key="honor.id" class="honor-card">
            <div class="honor-card__icon">{{ honor.icon }}</div>
            <h4>{{ honor.title }}</h4>
            <p>{{ honor.year }}</p>
          </div>
        </div>
      </div>
    </section>
    <!-- 团队 -->
    <section class="team">
      <div class="container">
        <h2>我们的实力</h2>
        <p class="team__intro">拥有200+名资深技术专家，包括云计算架构师、安全专家和数据科学家</p>
        <div class="team__stats">
          <div class="team__stat">
            <div class="team__stat-number">200+</div>
            <div class="team__stat-label">技术团队</div>
          </div>
          <div class="team__stat">
            <div class="team__stat-number">50万+</div>
            <div class="team__stat-label">企业客户</div>
          </div>
          <div class="team__stat">
            <div class="team__stat-number">99.99%</div>
            <div class="team__stat-label">服务可用性</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
const timeline = [
  {
    year: '2006',
    title: '公司成立',
    description: '在北京成立，专注于企业级网络安全和数据保护解决方案'
  },
  {
    year: '2010',
    title: '云平台上线',
    description: '推出第一代云建站平台，为中小企业提供低成本的数字化解决方案'
  },
  {
    year: '2015',
    title: '数据分析平台',
    description: '发布数据分析和可视化平台，帮助企业深度挖掘数据价值'
  },
  {
    year: '2019',
    title: '国际扩展',
    description: '在美国、欧洲、亚太地区建立分支机构，服务全球企业客户'
  },
  {
    year: '2024',
    title: 'AI智能升级',
    description: '推出AI驱动的安全防护和数据分析引擎，提升服务智能化水平'
  }
]
const honors = [
  { id: 1, icon: '🏆', title: '云计算创新企业奖', year: '2024' },
  { id: 2, icon: '🔐', title: 'ISO 27001信息安全认证', year: '2023' },
  { id: 3, icon: '⭐', title: '国家高新技术企业', year: '2023' },
  { id: 4, icon: '🎖️', title: '数据安全先进单位', year: '2022' },
  { id: 5, icon: '✅', title: 'SOC 2 Type II认证', year: '2022' },
  { id: 6, icon: '📜', title: '中国云计算产业联盟会员', year: '2021' }
]
</script>
<style scoped>
.about {
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 页面标题 */
.page-header {
  background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 4rem 1rem;
  text-align: center;
  margin-top: 0;
}

.page-header h1 {
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
}

.page-header p {
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
}

/* 简介 */
.intro {
  padding: 4rem 0;
}

.intro__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.intro__text h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.intro__text p {
  color: #666;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.intro__image {
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.intro__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 使命与愿景 */
.mission {
  background: #f8f9fa;
  padding: 4rem 0;
}

.mission__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.mission__item {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.mission__item h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
}

.mission__item p {
  color: #666;
  line-height: 1.6;
}

/* 发展历程 */
.timeline {
  padding: 4rem 0;
}

.timeline h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #333;
}

.timeline__items {
  position: relative;
  padding: 2rem 0;
}

.timeline__items::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #667eea;
  transform: translateX(-50%);
}

.timeline__item {
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}

.timeline__item:nth-child(even) {
  direction: rtl;
}

.timeline__item:nth-child(even)>* {
  direction: ltr;
}

.timeline__year {
  text-align: right;
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
}

.timeline__item:nth-child(even) .timeline__year {
  text-align: left;
}

.timeline__content {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.timeline__content h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.timeline__content p {
  margin: 0;
  color: #666;
}

/* 荣誉资质 */
.honors {
  background: #f8f9fa;
  padding: 4rem 0;
}

.honors h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #333;
}

.honors__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2rem;
  justify-content: center;
}

.honor-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.honor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.honor-card__icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.honor-card h4 {
  margin: 0.5rem 0;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.honor-card p {
  margin: 0;
  color: #999;
  font-size: 0.9rem;
}

/* 团队 */
.team {
  padding: 4rem 0;
  text-align: center;
}

.team h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.team__intro {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.team__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.team__stat {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 8px;
}

.team__stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.team__stat-label {
  font-size: 1rem;
  opacity: 0.9;
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
