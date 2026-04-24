<template>
  <div class="dashboard">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon news">
          <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z" fill="currentColor"></path></svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">新闻总数</div>
          <div class="stat-value">{{ stats.newsCount }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon product">
          <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M832 312V120c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v192c0 4.4 3.6 8 8 8h624c4.4 0 8-3.6 8-8zm-512-80h-80v-40h80v40zm512 400V440c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v192c0 4.4 3.6 8 8 8h624c4.4 0 8-3.6 8-8zm-512-80h-80v-40h80v40zm512 400V760c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v192c0 4.4 3.6 8 8 8h624c4.4 0 8-3.6 8-8zm-512-80h-80v-40h80v40z" fill="currentColor"></path></svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">产品总数</div>
          <div class="stat-value">{{ stats.productCount }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon contact">
          <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8L512 512 136 270.8V232l376 242.7L888 232v38.8z" fill="currentColor"></path></svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">待处理联系</div>
          <div class="stat-value">{{ stats.pendingContacts }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon business">
          <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M896 160H128c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h768c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zM384 736h-64V640h64v96zm0-160h-64v-96h64v96zm0-160h-64v-96h64v96zm160 320h-64V672h64v64zm0-160h-64v-64h64v64zm0-160h-64v-64h64v64z" fill="currentColor"></path></svg>
        </div>
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
            <span class="btn-icon">
              <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z" fill="currentColor"></path></svg>
            </span>
            新闻管理
          </router-link>
          <router-link to="/admin/products" class="action-btn">
            <span class="btn-icon">
              <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M832 312V120c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v192c0 4.4 3.6 8 8 8h624c4.4 0 8-3.6 8-8zm-512-80h-80v-40h80v40zm512 400V440c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v192c0 4.4 3.6 8 8 8h624c4.4 0 8-3.6 8-8zm-512-80h-80v-40h80v40zm512 400V760c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v192c0 4.4 3.6 8 8 8h624c4.4 0 8-3.6 8-8zm-512-80h-80v-40h80v40z" fill="currentColor"></path></svg>
            </span>
            产品管理
          </router-link>
          <router-link to="/admin/contacts" class="action-btn">
            <span class="btn-icon">
              <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8L512 512 136 270.8V232l376 242.7L888 232v38.8z" fill="currentColor"></path></svg>
            </span>
            联系表单
          </router-link>
          <router-link to="/admin/business" class="action-btn">
            <span class="btn-icon">
              <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M896 160H128c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h768c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zM384 736h-64V640h64v96zm0-160h-64v-96h64v96zm0-160h-64v-96h64v96zm160 320h-64V672h64v64zm0-160h-64v-64h64v64zm0-160h-64v-64h64v64z" fill="currentColor"></path></svg>
            </span>
            业务信息
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
  padding: 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s;
  border: 1px solid #f0f0f0;
}

.stat-icon {
  font-size: 24px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.stat-icon.news {
  background: #e6f4ff;
  color: #1677ff;
}

.stat-icon.product {
  background: #f9f0ff;
  color: #722ed1;
}

.stat-icon.contact {
  background: #f6ffed;
  color: #52c41a;
}

.stat-icon.business {
  background: #fff7e6;
  color: #faad14;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #fafafa;
  color: var(--text-main);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s;
  border: 1px solid #f0f0f0;
  gap: 8px;
}

.action-btn:hover {
  background: white;
  border-color: var(--primary-color);
  color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(22, 119, 255, 0.1);
}

.btn-icon {
  font-size: 24px;
  color: var(--text-secondary);
  transition: all 0.3s;
}

.action-btn:hover .btn-icon {
  color: var(--primary-color);
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
