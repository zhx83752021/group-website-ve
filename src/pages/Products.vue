<template>
  <div class="products">
    <!-- 页面标题 -->
    <section class="page-header">
      <div class="container">
        <h1>产品展示</h1>
        <p>我们的核心产品和解决方案</p>
      </div>
    </section>

    <!-- 产品分类 -->
    <section class="products-section">
      <div class="container">
        <div class="filter-tabs">
          <button v-for="category in categories" :key="category"
            :class="['filter-tab', { 'filter-tab--active': activeCategory === category }]"
            @click="activeCategory = category">
            {{ category }}
          </button>
        </div>

        <!-- 产品网格 -->
        <div class="products__grid">
          <div v-for="product in filteredProducts" :key="product.id" class="product-card">
            <div class="product-card__image">
              <img :src="product.image_url" :alt="product.name" />
              <div class="product-card__badge">{{ product.category }}</div>
            </div>
            <div class="product-card__content">
              <h3>{{ product.name }}</h3>
              <p class="product-card__description">{{ product.description }}</p>
              <ul class="product-card__features">
                <li v-for="feature in product.features" :key="feature">✓ {{ feature }}</li>
              </ul>
              <div class="product-card__footer">
                <span class="product-card__price">{{ product.price }}</span>
                <a href="#" class="btn btn--primary btn--small">了解详情</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 产品对比 -->
    <section class="comparison">
      <div class="container">
        <h2>产品对比</h2>
        <div class="comparison__table">
          <table>
            <thead>
              <tr>
                <th>功能特性</th>
                <th v-for="product in comparisonProducts" :key="product.id">{{ product.name }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="feature in comparisonFeatures" :key="feature">
                <td class="feature-name">{{ feature }}</td>
                <td v-for="product in comparisonProducts" :key="product.id" class="feature-value">
                  <span v-if="product.features.includes(feature)" class="check">✓</span>
                  <span v-else class="cross">✗</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { productAPI } from '../api/index'

const activeCategory = ref('全部')
const categories = ref(['全部'])
const products = ref<any[]>([])

// 从后端获取产品数据
const fetchProducts = async () => {
  try {
    const response = await productAPI.getList(100)
    if (response.data.success) {
      products.value = response.data.data.map((p: any) => ({
        ...p,
        price: p.price ? `¥${p.price}/月起` : '联系我们',
        features: p.features ? (typeof p.features === 'string' ? p.features.split(',') : p.features) : [],
        image_url: p.image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
      }))

      // 提取分类
      const cats = new Set(['全部'])
      products.value.forEach(p => {
        if (p.category) cats.add(p.category)
      })
      categories.value = Array.from(cats)
    }
  } catch (error) {
    console.error('获取产品列表失败:', error)
  }
}

const filteredProducts = computed(() => {
  if (activeCategory.value === '全部') {
    return products.value
  }
  return products.value.filter(p => p.category === activeCategory.value)
})

const comparisonProducts = computed(() => products.value.slice(0, 3))
const comparisonFeatures = ['拖拽式编辑', '实时数据', 'API接口', '权限管理', '24/7支持']

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.products {
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

/* 产品区域 */
.products-section {
  padding: 4rem 0;
}

.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-tab:hover {
  border-color: #4f46e5;
  color: #4f46e5;
}

.filter-tab--active {
  background: #4f46e5;
  color: white;
  border-color: #4f46e5;
}

.products__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.product-card__image {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: #f5f7fa;
}

.product-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-card__image img {
  transform: scale(1.1);
}

.product-card__badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #4f46e5;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.product-card__content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-card__content h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.3rem;
}

.product-card__description {
  color: #666;
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
}

.product-card__features {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
  flex: 1;
}

.product-card__features li {
  color: #666;
  padding: 0.4rem 0;
  font-size: 0.9rem;
}

.product-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.product-card__price {
  font-size: 1.2rem;
  font-weight: 700;
  color: #4f46e5;
}

/* 产品对比 */
.comparison {
  background: #f8f9fa;
  padding: 4rem 0;
}

.comparison h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #333;
}

.comparison__table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

thead {
  background: #4f46e5;
  color: white;
}

th {
  padding: 1.5rem;
  text-align: left;
  font-weight: 600;
}

td {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.feature-name {
  font-weight: 600;
  color: #333;
  background: #f8f9fa;
}

.feature-value {
  text-align: center;
}

.check {
  color: #22c55e;
  font-weight: 700;
  font-size: 1.2rem;
}

.cross {
  color: #ef4444;
  font-weight: 700;
  font-size: 1.2rem;
}

/* 按钮样式 */
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #4f46e5;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.btn:hover {
  background: #4338ca;
  transform: translateY(-2px);
}

.btn--small {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

/* 响应式 */
@media (max-width: 768px) {
  .page-header {
    padding: 2rem 1rem;
  }

  .page-header h1 {
    font-size: 1.8rem;
  }

  .products__grid {
    grid-template-columns: 1fr;
  }

  table {
    font-size: 0.9rem;
  }

  th, td {
    padding: 1rem;
  }
}
</style>

