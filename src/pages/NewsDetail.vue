<template>
  <div class="news-detail" v-if="news">
    <!-- 文章头部 -->
    <section class="article-header">
      <div class="container">
        <h1>{{ news.title }}</h1>
        <div class="article-meta">
          <span class="meta-item">
            <span class="meta-label">分类：</span>
            <span class="meta-value">{{ news.category }}</span>
          </span>
          <span class="meta-item">
            <span class="meta-label">发布时间：</span>
            <span class="meta-value">{{ formatDate(news.date) }}</span>
          </span>
        </div>
      </div>
    </section>

    <!-- 文章内容 -->
    <section class="article-content">
      <div class="container">
        <div class="article-main">
          <!-- 文章图片 -->
          <img :src="news.image" :alt="news.title" class="article-image" />

          <!-- 文章正文 -->
          <div class="article-body">
            <h2>{{ news.title }}</h2>
            <p>{{ news.summary }}</p>

            <h3>项目背景</h3>
            <p>
              本项目是一个重要的战略举措，旨在进一步提升我们的服务质量和市场竞争力。
              通过这个项目，我们将能够更好地满足客户的需求，并为他们提供更加优质的产品和服务。
            </p>

            <h3>主要成果</h3>
            <ul>
              <li>成功完成项目目标，超额完成预期指标</li>
              <li>获得客户高度认可和好评</li>
              <li>为公司带来显著的经济效益</li>
              <li>积累了宝贵的行业经验</li>
            </ul>

            <h3>未来展望</h3>
            <p>
              我们将继续深化这一领域的研究和开发，不断创新和完善我们的产品和服务。
              同时，我们也欢迎更多的合作伙伴加入我们，共同推动行业的发展和进步。
            </p>
          </div>

          <!-- 分享按钮 -->
          <div class="article-share">
            <span>分享到：</span>
            <a href="#" class="share-btn">微信</a>
            <a href="#" class="share-btn">微博</a>
            <a href="#" class="share-btn">QQ</a>
          </div>
        </div>

        <!-- 侧边栏 -->
        <aside class="article-sidebar">
          <!-- 相关新闻 -->
          <div class="sidebar-widget">
            <h3>相关新闻</h3>
            <ul class="related-news">
              <li v-for="relatedNews in relatedNewsList" :key="relatedNews.id">
                <router-link :to="`/news/${relatedNews.id}`">
                  {{ relatedNews.title }}
                </router-link>
              </li>
            </ul>
          </div>

          <!-- 联系我们 -->
          <div class="sidebar-widget contact-widget">
            <h3>联系我们</h3>
            <p>如有任何问题或建议，欢迎与我们联系</p>
            <router-link to="/contact" class="btn btn--primary">立即咨询</router-link>
          </div>
        </aside>
      </div>
    </section>

    <!-- 相关推荐 -->
    <section class="related-articles">
      <div class="container">
        <h2>相关推荐</h2>
        <div class="articles-grid">
          <router-link v-for="article in relatedNewsList" :key="article.id" :to="`/news/${article.id}`"
            class="article-card">
            <img :src="article.image" :alt="article.title" />
            <h4>{{ article.title }}</h4>
            <p>{{ article.summary }}</p>
          </router-link>
        </div>
      </div>
    </section>
  </div>
  <div v-else class="not-found">
    <p>新闻不存在</p>
    <router-link to="/news">返回新闻列表</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { newsAPI } from '../api/index'

const route = useRoute()
const news = ref<any>(null)
const relatedNewsList = ref<any[]>([])

const newsId = route.params.id as string

// 从后端获取新闻详情
const fetchNewsDetail = async () => {
  try {
    const response = await newsAPI.getDetail(newsId)
    if (response.data.success) {
      news.value = {
        ...response.data.data,
        image: response.data.data.image_url || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
        summary: response.data.data.content ? response.data.data.content.substring(0, 200) + '...' : '',
        date: response.data.data.created_at
      }
    }
  } catch (error) {
    console.error('获取新闻详情失败:', error)
  }
}

// 获取相关新闻
const fetchRelatedNews = async () => {
  try {
    const response = await newsAPI.getList(4)
    if (response.data.success) {
      relatedNewsList.value = response.data.data
        .filter((n: any) => n.id !== parseInt(newsId))
        .slice(0, 3)
        .map((n: any) => ({
          ...n,
          image: n.image_url || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop',
          summary: n.content ? n.content.substring(0, 100) + '...' : ''
        }))
    }
  } catch (error) {
    console.error('获取相关新闻失败:', error)
  }
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN')
}

onMounted(() => {
  fetchNewsDetail()
  fetchRelatedNews()
})
</script>

<style scoped>
.news-detail {
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 文章头部 */
.article-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 1rem;
  text-align: center;
  margin-top: 60px;
}

.article-header h1 {
  font-size: 2rem;
  margin: 0 0 1rem 0;
}

.article-meta {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  gap: 0.5rem;
}

.meta-label {
  opacity: 0.8;
}

/* 文章内容 */
.article-content {
  padding: 3rem 0;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

.article-main {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.article-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.article-body h2 {
  font-size: 1.8rem;
  margin: 1.5rem 0 1rem 0;
  color: #333;
}

.article-body h3 {
  font-size: 1.3rem;
  margin: 1.5rem 0 0.5rem 0;
  color: #333;
}

.article-body p {
  color: #666;
  line-height: 1.8;
  margin: 0.5rem 0 1rem 0;
}

.article-body ul {
  color: #666;
  line-height: 1.8;
  margin: 1rem 0;
  padding-left: 2rem;
}

.article-body li {
  margin: 0.5rem 0;
}

/* 分享按钮 */
.article-share {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.share-btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.share-btn:hover {
  background: #667eea;
  color: white;
}

/* 侧边栏 */
.article-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-widget {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sidebar-widget h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
}

.related-news {
  list-style: none;
  padding: 0;
  margin: 0;
}

.related-news li {
  margin: 0.5rem 0;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.related-news li:last-child {
  border-bottom: none;
}

.related-news a {
  color: #667eea;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;
}

.related-news a:hover {
  color: #764ba2;
}

.contact-widget p {
  color: #666;
  margin: 0 0 1rem 0;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
  text-align: center;
}

.btn--primary {
  background: #667eea;
  color: white;
}

.btn--primary:hover {
  background: #764ba2;
}

/* 相关推荐 */
.related-articles {
  background: #f8f9fa;
  padding: 4rem 0;
}

.related-articles h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #333;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.article-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.article-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.article-card h4 {
  margin: 1rem;
  color: #333;
}

.article-card p {
  margin: 0 1rem 1rem 1rem;
  color: #666;
  font-size: 0.9rem;
}

/* 未找到 */
.not-found {
  text-align: center;
  padding: 4rem 1rem;
  margin-top: 60px;
}

.not-found p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1rem;
}

.not-found a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

/* 响应式 */
@media (max-width: 768px) {
  .article-header {
    margin-top: 0;
    padding: 2rem 1rem;
  }

  .article-header h1 {
    font-size: 1.5rem;
  }

  .article-content {
    grid-template-columns: 1fr;
  }

  .article-image {
    height: 250px;
  }

  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .article-sidebar {
    order: -1;
  }
}
</style>
