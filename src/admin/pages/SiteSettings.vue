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
        <h3>📊 首页统计数字</h3>
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
        <h3>📞 备案与联系方式</h3>
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
        <h3>🔍 SEO 设置 (功能开发中)</h3>
        <div class="settings-grid">
          <div class="form-group">
            <label>全局 Keywords</label>
            <input type="text" placeholder="云计算, 数据安全, 数字化转型" disabled />
          </div>
          <div class="form-group">
            <label>全局 Description</label>
            <textarea rows="3" placeholder="专业的云计算与数据安全解决方案领导者" disabled></textarea>
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
  site_phone: ''
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
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.settings-container {
  max-width: 800px;
}

.settings-section {
  margin-bottom: 40px;
}

.settings-section h3 {
  font-size: 18px;
  color: #1a1a1a;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
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
  font-weight: 600;
  color: #4a5568;
  font-size: 14px;
}

.form-group input, .form-group textarea {
  padding: 10px 14px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s;
}

.form-group input:focus {
  border-color: #667eea;
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input:disabled {
  background: #f8fafc;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}
</style>
