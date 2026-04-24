<template>
  <div class="site-settings">
    <div class="header">
      <h2>站点全局配置</h2>
      <button @click="saveSettings" class="btn-primary" :disabled="saving">
        {{ saving ? '保存中...' : '保存修改' }}
      </button>
    </div>

    <div class="settings-container">
      <!-- 统计数据配置 -->
      <section class="settings-section">
        <h3>
          <svg viewBox="0 0 1024 1024" width="20" height="20" class="section-icon"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM704 736h-64V448h64v288zm-160 0h-64V320h64v416zm-160 0h-64V512h64v224z" fill="currentColor"></path></svg>
          首页统计数字
        </h3>
        <div class="settings-grid">
          <div class="form-group">
            <label>年技术积累</label>
            <input v-model="settings.stats_years" type="text" placeholder="例如: 18+" />
          </div>
          <div class="form-group">
            <label>企业客户</label>
            <input v-model="settings.stats_clients" type="text" placeholder="例如: 50万+" />
          </div>
          <div class="form-group">
            <label>技术团队</label>
            <input v-model="settings.stats_team" type="text" placeholder="例如: 200+" />
          </div>
          <div class="form-group">
            <label>服务可用性</label>
            <input v-model="settings.stats_availability" type="text" placeholder="例如: 99.99%" />
          </div>
        </div>
      </section>

      <!-- 备案与联系方式 -->
      <section class="settings-section">
        <h3>
          <svg viewBox="0 0 1024 1024" width="20" height="20" class="section-icon"><path d="M896 160H128c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h768c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zM384 736h-64V640h64v96zm0-160h-64v-96h64v96zm0-160h-64v-96h64v96zm160 320h-64V672h64v64zm0-160h-64v-64h64v64zm0-160h-64v-64h64v64z" fill="currentColor"></path></svg>
          备案与联系方式
        </h3>
        <div class="settings-grid">
          <div class="form-group">
            <label>网站备案号</label>
            <input v-model="settings.site_icp" type="text" />
          </div>
          <div class="form-group">
            <label>服务热线</label>
            <input v-model="settings.site_phone" type="text" />
          </div>
        </div>
      </section>

      <!-- SEO 相关 -->
      <section class="settings-section">
        <h3>
          <svg viewBox="0 0 1024 1024" width="20" height="20" class="section-icon"><path d="M924.8 385.6C822.1 223.4 611 156 512 156s-310.1 67.4-412.8 229.6a44.64 44.64 0 0 0 0 44.8C201.9 592.6 413 660 512 660s310.1-67.4 412.8-229.6a44.64 44.64 0 0 0 0-44.8zM512 596c-103.8 0-251.6-96-322-201 70.4-105 218.2-201 322-201s251.6 96 322 201c-70.4 105-218.2 201-322 201z" fill="currentColor"></path><path d="M512 300c-60.8 0-110 49.2-110 110s49.2 110 110 110 110-49.2 110-110-49.2-110-110-110zm0 180c-38.7 0-70-31.3-70-70s31.3-70 70-70 70 31.3 70 70-31.3 70-70 70z" fill="currentColor"></path></svg>
          SEO 设置
        </h3>
        <div class="settings-grid">
          <div class="form-group">
            <label>全局 Keywords</label>
            <input v-model="settings.seo_keywords" type="text" placeholder="云计算, 数据安全, 数字化转型" />
          </div>
          <div class="form-group">
            <label>全局 Description</label>
            <textarea v-model="settings.seo_description" rows="3" placeholder="专业的云计算与数据安全解决方案领导者"></textarea>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { siteAPI } from '../../api/index'
import { ElMessage } from 'element-plus'

const settings = ref<Record<string, string>>({
  stats_years: '',
  stats_clients: '',
  stats_team: '',
  stats_availability: '',
  site_icp: '',
  site_phone: '',
  seo_keywords: '',
  seo_description: ''
})

const saving = ref(false)

const fetchSettings = async () => {
  try {
    const response = await siteAPI.getConfig()
    if (response.data.success) {
      // 合并数据
      Object.assign(settings.value, response.data.data)
    }
  } catch (error) {
    console.error('获取站点配置失败:', error)
    ElMessage.error('获取站点配置失败')
  }
}

const saveSettings = async () => {
  saving.value = true
  try {
    const response = await siteAPI.updateConfig(settings.value)
    if (response.data.success) {
      ElMessage.success('站点配置更新成功')
    }
  } catch (error) {
    console.error('更新站点配置失败:', error)
    ElMessage.error('更新站点配置失败')
  } finally {
    saving.value = false
  }
}

onMounted(fetchSettings)
</script>

<style scoped>
.site-settings {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.settings-container {
  max-width: 800px;
}

.settings-section {
  margin-bottom: 32px;
}

.settings-section h3 {
  font-size: 16px;
  color: var(--text-main);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.section-icon {
  color: var(--primary-color);
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 500;
  color: var(--text-main);
  font-size: 14px;
}

.form-group input, .form-group textarea {
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.2s;
}

.form-group input:focus, .form-group textarea:focus {
  border-color: var(--primary-color);
  outline: none;
  box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.1);
}

.form-group input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
  color: rgba(0, 0, 0, 0.25);
}

@media (max-width: 640px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}
</style>
