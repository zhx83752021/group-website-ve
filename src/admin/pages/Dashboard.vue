<template>
  <div class="dashboard">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon news">📰</div>
        <div class="stat-content">
          <div class="stat-label">新闻总数</div>
          <div class="stat-value">{{ stats.newsCount }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon product">📦</div>
        <div class="stat-content">
          <div class="stat-label">产品总数</div>
          <div class="stat-value">{{ stats.productCount }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon contact">📧</div>
        <div class="stat-content">
          <div class="stat-label">待处理联系</div>
          <div class="stat-value">{{ stats.pendingContacts }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon business">🏢</div>
        <div class="stat-content">
          <div class="stat-label">业务信息</div>
          <div class="stat-value">{{ stats.businessCount }}</div>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="card">
        <h3>快速操作</h3>
        <div class="quick-actions">
          <router-link to="/admin/news" class="action-btn">
            <span>📰</span> 新闻管理
          </router-link>
          <router-link to="/admin/products" class="action-btn">
            <span>📦</span> 产品管理
          </router-link>
          <router-link to="/admin/contacts" class="action-btn">
            <span>📧</span> 联系表单
          </router-link>
          <router-link to="/admin/business" class="action-btn">
            <span>🏢</span> 业务信息
          </router-link>
        </div>
      </div>

      <div class="card">
        <h3>系统信息</h3>
        <div class="system-info">
          <div class="info-item">
            <span class="label">系统版本</span>
            <span class="value">1.0.0</span>
          </div>
          <div class="info-item">
            <span class="label">当前时间</span>
            <span class="value">{{ currentTime }}</span>
          </div>
          <div class="info-item">
            <span class="label">API 状态</span>
            <span class="value" :class="{ online: apiStatus === 'online' }">
              {{ apiStatus === 'online' ? '✅ 在线' : '❌ 离线' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { newsAPI, productAPI, contactAPI, businessAPI } from '../../api/index';

const stats = ref({
  newsCount: 0,
  productCount: 0,
  pendingContacts: 0,
  businessCount: 0
});

const currentTime = ref('');
const apiStatus = ref('online');

const fetchStats = async () => {
  try {
    const [newsRes, productRes, contactRes, businessRes] = await Promise.all([
      newsAPI.getList(100),
      productAPI.getList(100),
      contactAPI.getList(100, 0, 'pending'),
      businessAPI.getList(100)
    ]);

    // 使用 count 字段或 data.length
    stats.value.newsCount = newsRes.data.count || newsRes.data.data?.length || 0;
    stats.value.productCount = productRes.data.pagination?.total || productRes.data.data?.length || 0;
    stats.value.pendingContacts = contactRes.data.count || contactRes.data.data?.length || 0;
    stats.value.businessCount = businessRes.data.count || businessRes.data.data?.length || 0;
    apiStatus.value = 'online';
  } catch (error) {
    console.error('获取统计数据失败:', error);
    apiStatus.value = 'offline';
  }
};

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleString('zh-CN');
};

onMounted(() => {
  fetchStats();
  updateTime();
  const timer = setInterval(updateTime, 1000);
  onUnmounted(() => clearInterval(timer));
});
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 32px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.stat-icon.news {
  background: #e3f2fd;
}

.stat-icon.product {
  background: #f3e5f5;
}

.stat-icon.contact {
  background: #e8f5e9;
}

.stat-icon.business {
  background: #fff3e0;
}

.stat-content {
  flex: 1;
}

.stat-label {
  color: #666;
  font-size: 14px;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.card h3 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s;
  font-size: 14px;
  font-weight: 500;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.action-btn span {
  font-size: 24px;
  margin-bottom: 5px;
}

.system-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item .label {
  color: #666;
  font-size: 14px;
}

.info-item .value {
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.info-item .value.online {
  color: #4caf50;
}
</style>
