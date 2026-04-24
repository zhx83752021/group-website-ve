<template>
  <div class="search-results">
    <section class="page-header" :style="{ backgroundImage: `url(${bannerImg})` }">
      <div class="container">
        <h1>搜索结果</h1>
        <p v-if="keyword">关键词: <span class="highlight">"{{ keyword }}"</span></p>
      </div>
    </section>

    <div class="container">
      <div v-if="loading" class="loading-state">
        <div class="loader"></div>
        <p>正在为您搜索...</p>
      </div>

      <div v-else-if="results.length > 0" class="results-grid">
        <div v-for="item in results" :key="item.id + item.type" class="result-card" @click="navigateTo(item)">
          <div class="result-type">{{ item.typeLabel }}</div>
          <h3 class="result-title">{{ item.name }}</h3>
          <p class="result-excerpt">{{ item.description || item.content || '查看详情...' }}</p>
          <div class="result-footer">
            <span class="view-more">立即查看 →</span>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>未找到相关结果</h3>
        <p>尝试更换关键词或检查拼写是否正确</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { searchAPI } from '../api/index'
import bannerImg from '@/assets/about_bg.png'

const route = useRoute()
const router = useRouter()
const keyword = ref('')
const results = ref<any[]>([])
const loading = ref(false)

const handleSearch = async () => {
  const kw = route.query.keyword as string
  if (!kw) return
  
  keyword.value = kw
  loading.value = true
  try {
    const response = await searchAPI.search(kw)
    if (response.data.success) {
      results.value = response.data.data
    }
  } catch (error) {
    console.error('搜索出错:', error)
  } finally {
    loading.value = false
  }
}

const navigateTo = (item: any) => {
  if (item.type === 'news') {
    router.push(`/news/${item.id}`)
  } else if (item.type === 'products') {
    router.push('/products')
  } else if (item.type === 'business') {
    router.push('/business')
  }
}

onMounted(handleSearch)

// 监听路由参数变化（再次搜索）
watch(() => route.query.keyword, () => {
  handleSearch()
})
</script>

<style scoped>
.search-results {
  padding-top: 80px;
  min-height: 80vh;
  background: #fcfcfd;
}

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
  margin-bottom: 40px;
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

.highlight {
  color: #4f46e5;
  font-weight: bold;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.results-grid {
  display: grid;
  gap: 20px;
}

.result-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #edf2f7;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.result-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  border-color: #6366f1;
}

.result-type {
  display: inline-block;
  padding: 4px 12px;
  background: #eef2ff;
  color: #4f46e5;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 12px;
}

.result-title {
  margin: 0 0 10px 0;
  font-size: 20px;
  color: #1a1a2e;
}

.result-excerpt {
  color: #64748b;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.view-more {
  color: #4f46e5;
  font-weight: 500;
  font-size: 14px;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 60px 0;
}

.loader {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4f46e5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}
</style>
