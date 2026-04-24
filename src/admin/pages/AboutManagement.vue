<template>
  <div class="about-management">
    <div class="tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.key" 
        :class="['tab-btn', { active: activeTab === tab.key }]"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="tab-content">
      <!-- 发展历程管理 -->
      <div v-if="activeTab === 'timeline'" class="timeline-mgmt">
        <div class="header">
          <h3>发展历程</h3>
          <button @click="openTimelineModal()" class="btn-primary">+ 添加里程碑</button>
        </div>
        
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th width="80">年份</th>
                <th>标题</th>
                <th>描述</th>
                <th width="80">排序</th>
                <th width="150">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in timelineList" :key="item.id">
                <td>{{ item.year }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.order_index }}</td>
                <td class="actions">
                  <button @click="openTimelineModal(item)" class="btn-edit">编辑</button>
                  <button @click="deleteTimeline(item.id)" class="btn-delete">删除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 荣誉资质管理 -->
      <div v-if="activeTab === 'honors'" class="honors-mgmt">
        <div class="header">
          <h3>荣誉资质</h3>
          <button @click="openHonorModal()" class="btn-primary">+ 添加荣誉</button>
        </div>
        
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th width="100">年份</th>
                <th>标题</th>
                <th width="80">排序</th>
                <th width="150">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in honorsList" :key="item.id">
                <td>{{ item.year }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.order_index }}</td>
                <td class="actions">
                  <button @click="openHonorModal(item)" class="btn-edit">编辑</button>
                  <button @click="deleteHonor(item.id)" class="btn-delete">删除</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Timeline Modal (Simplified for now - Logic can be added later as needed) -->
    <div v-if="showModal" class="modal-overlay">
        <div class="modal">
            <p>管理功能开发中，底层 API 已就绪。</p>
            <button @click="showModal = false" class="btn-secondary">关闭</button>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { siteAPI } from '../../api/index'
import { ElMessage } from 'element-plus'

const activeTab = ref('timeline')
const tabs = [
  { key: 'timeline', label: '发展历程' },
  { key: 'honors', label: '荣誉资质' }
]

const timelineList = ref<any[]>([])
const honorsList = ref<any[]>([])
const showModal = ref(false)

const fetchData = async () => {
  try {
    const [tRes, hRes] = await Promise.all([
      siteAPI.getTimeline(),
      siteAPI.getHonors()
    ])
    if (tRes.data.success) timelineList.value = tRes.data.data
    if (hRes.data.success) honorsList.value = hRes.data.data
  } catch (error) {
    console.error('获取数据失败:', error)
  }
}

const openTimelineModal = (item?: any) => {
    showModal.value = true
}

const openHonorModal = (item?: any) => {
    showModal.value = true
}

const deleteTimeline = (id: string) => ElMessage.warning('后台删除接口对接中')
const deleteHonor = (id: string) => ElMessage.warning('后台删除接口对接中')

onMounted(fetchData)
</script>

<style scoped>
.about-management {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.tab-btn {
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 600;
  color: #666;
  border-radius: 6px;
  transition: all 0.3s;
}

.tab-btn.active {
  background: #667eea;
  color: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

/* Modals */
.modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}
.modal {
    background: white;
    padding: 30px;
    border-radius: 12px;
    text-align: center;
}
</style>
