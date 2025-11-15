<template>
  <div class="news">
    <!-- 页面标题 -->
    <section class="page-header">
      <div class="container">
        <h1>新闻中心</h1>
        <p>了解集团最新动态和行业资讯</p>
      </div>
    </section>
    <!-- 新闻列表 -->
    <section class="news-list">
      <div class="container">
        <!-- 分类过滤 -->
        <div class="news-filter">
          <button v-for="category in categories" :key="category"
            :class="['filter-btn', { 'filter-btn--active': activeCategory === category }]"
            @click="activeCategory = category">
            {{ category }}
          </button>
        </div>
        <!-- 新闻网格 -->
        <div class="news__grid">
          <router-link v-for="news in filteredNews" :key="news.id" :to="`/news/${news.id}`" class="news-card">
            <img :src="news.image" :alt="news.title" class="news-card__image" />
            <div class="news-card__content">
              <span class="news-card__category">{{ news.category }}</span>
              <h3>{{ news.title }}</h3>
              <p>{{ news.summary }}</p>
              <div class="news-card__footer">
                <span class="news-card__date">{{ formatDate(news.date) }}</span>
                <span class="news-card__read">阅读更多 →</span>
              </div>
            </div>
          </router-link>
        </div>
        <!-- 分页 -->
        <div class="pagination">
          <button class="pagination__btn">上一页</button>
          <button class="pagination__btn pagination__btn--active">1</button>
          <button class="pagination__btn">2</button>
          <button class="pagination__btn">3</button>
          <button class="pagination__btn">下一页</button>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { newsAPI } from '../api/index'

const activeCategory = ref('全部')
const categories = ['全部', '公司新闻', '产品发布', '合作动态', '行业资讯']
const allNews = ref<any[]>([])
const currentPage = ref(1)
const pageSize = ref(12)
const totalNews = ref(0)

// 从后端获取新闻数据
const fetchNews = async () => {
  try {
    const offset = (currentPage.value - 1) * pageSize.value
    const response = await newsAPI.getList(pageSize.value, offset)
    if (response.data.success) {
      allNews.value = response.data.data.map((news: any) => ({
        ...news,
        image: news.image_url || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop',
        summary: news.content ? news.content.substring(0, 120) + '...' : '',
        date: news.created_at
      }))
      totalNews.value = response.data.count || allNews.value.length
    }
  } catch (error) {
    console.error('获取新闻列表失败:', error)
    // 如果API失败，使用默认数据
    allNews.value = [
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

const filteredNews = computed(() => {
  if (activeCategory.value === '全部') {
    return allNews.value
  }
  return allNews.value.filter(news => news.category === activeCategory.value)
})

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN')
}

onMounted(() => {
  fetchNews()
})
</script>
<style scoped>
.news {
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

/* 新闻列表 */
.news-list {
  padding: 4rem 0;
}

/* 分类过滤 */
.news-filter {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1.5rem;
  border: 2px solid #ddd;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

.filter-btn--active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

/* 新闻网格 */
.news__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.news-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
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
  flex: 1;
  display: flex;
  flex-direction: column;
}

.news-card__category {
  display: inline-block;
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  width: fit-content;
}

.news-card h3 {
  margin: 0.5rem 0;
  color: #333;
  font-size: 1.1rem;
  line-height: 1.4;
}

.news-card p {
  color: #666;
  margin: 0.5rem 0;
  font-size: 0.95rem;
  flex: 1;
}

.news-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.news-card__date {
  color: #999;
  font-size: 0.85rem;
}

.news-card__read {
  color: #667eea;
  font-weight: 600;
  font-size: 0.9rem;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.pagination__btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination__btn:hover {
  border-color: #667eea;
  color: #667eea;
}

.pagination__btn--active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

/* 响应式 */
@media (max-width: 768px) {
  .page-header {
    padding: 2rem 1rem;
  }

  .page-header h1 {
    font-size: 1.8rem;
  }

  .news__grid {
    grid-template-columns: 1fr;
  }

  .news-filter {
    justify-content: center;
  }
}
</style>
