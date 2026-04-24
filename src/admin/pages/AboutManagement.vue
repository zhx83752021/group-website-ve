<template>
  <div class="about-management">
    <div class="header">
      <h2>关于我们管理</h2>
      <div class="tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.value" 
          :class="['tab-btn', { active: activeTab === tab.value }]"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- 发展历程 -->
    <div v-if="activeTab === 'timeline'" class="content-section">
      <div class="section-header">
        <h3>发展历程</h3>
        <button class="btn-primary" @click="handleAdd('timeline')">+ 添加里程碑</button>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th width="100">年份</th>
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
              <button class="btn-edit" @click="handleEdit('timeline', item)">编辑</button>
              <button class="btn-delete" @click="handleDelete('timeline', item.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 荣誉资质 -->
    <div v-else class="content-section">
      <div class="section-header">
        <h3>荣誉资质</h3>
        <button class="btn-primary" @click="handleAdd('honors')">+ 添加荣誉</button>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th width="100">年份</th>
            <th>荣誉名称</th>
            <th>描述</th>
            <th width="80">排序</th>
            <th width="150">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in honorsList" :key="item.id">
            <td>{{ item.year }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.order_index }}</td>
            <td class="actions">
              <button class="btn-edit" @click="handleEdit('honors', item)">编辑</button>
              <button class="btn-delete" @click="handleDelete('honors', item.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 编辑/添加 弹窗 -->
    <div v-if="dialogVisible" class="modal-overlay" @click="dialogVisible = false">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>{{ (isEdit ? '编辑' : '添加') + (activeTab === 'timeline' ? '里程碑' : '荣誉') }}</h3>
          <button type="button" @click="dialogVisible = false" class="btn-close">✕</button>
        </div>
        <form @submit.prevent="handleSave">
          <div class="form-group">
            <label>年份 *</label>
            <input v-model="form.year" type="text" placeholder="如: 2024" required />
          </div>
          <div class="form-group">
            <label>标题 *</label>
            <input v-model="form.title" type="text" required />
          </div>
          <div class="form-group">
            <label>描述</label>
            <textarea v-model="form.description" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>排序权重</label>
            <input v-model.number="form.order_index" type="number" min="0" />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">保存</button>
            <button type="button" @click="dialogVisible = false" class="btn-secondary">取消</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { siteAPI } from '../../api/index'
import { ElMessage, ElMessageBox } from 'element-plus'

const tabs = [
  { label: '发展历程', value: 'timeline' },
  { label: '荣誉资质', value: 'honors' }
]
const activeTab = ref('timeline')
const timelineList = ref<any[]>([])
const honorsList = ref<any[]>([])

const dialogVisible = ref(false)
const isEdit = ref(false)
const form = ref({
  id: null,
  year: '',
  title: '',
  description: '',
  order_index: 0
})

const fetchData = async () => {
  try {
    const [tRes, hRes] = await Promise.all([
      siteAPI.getTimeline(),
      siteAPI.getHonors()
    ])
    if (tRes.data.success) timelineList.value = tRes.data.data
    if (hRes.data.success) honorsList.value = hRes.data.data
  } catch (error) {
    ElMessage.error('获取数据失败')
  }
}

const handleAdd = (type: string) => {
  isEdit.value = false
  form.value = { id: null, year: '', title: '', description: '', order_index: 0 }
  dialogVisible.value = true
}

const handleEdit = (type: string, item: any) => {
  isEdit.value = true
  form.value = { ...item }
  dialogVisible.value = true
}

const handleSave = async () => {
  try {
    let res
    if (activeTab.value === 'timeline') {
      if (isEdit.value) {
        res = await siteAPI.updateTimeline(form.value.id!, form.value)
      } else {
        res = await siteAPI.createTimeline(form.value)
      }
    } else {
      if (isEdit.value) {
        res = await siteAPI.updateHonors(form.value.id!, form.value)
      } else {
        res = await siteAPI.createHonors(form.value)
      }
    }

    if (res.data.success) {
      ElMessage.success('保存成功')
      dialogVisible.value = false
      fetchData()
    }
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

const handleDelete = async (type: string, id: number) => {
  try {
    await ElMessageBox.confirm('确定要删除此项吗？', '提示', { type: 'warning' })
    let res
    if (type === 'timeline') {
      res = await siteAPI.deleteTimeline(id)
    } else {
      res = await siteAPI.deleteHonors(id)
    }
    
    if (res.data.success) {
      ElMessage.success('已删除')
      fetchData()
    }
  } catch (error) {
    if (error !== 'cancel') ElMessage.error('删除失败')
  }
}

onMounted(fetchData)
</script>

<style scoped>
.about-management {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
}

.header {
  margin-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 16px;
}

.tabs {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.tab-btn {
  padding: 8px 20px;
  border: 1px solid #d9d9d9;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 400;
  transition: all 0.2s;
  color: var(--text-main);
}

.tab-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.tab-btn:hover:not(.active) {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-main);
}
</style>
