<template>
  <div class="case-management">
    <div class="header">
      <h2>成功案例管理</h2>
      <button @click="handleAdd" class="btn-primary">+ 添加案例</button>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th width="100">预览图</th>
            <th>案例名称</th>
            <th>所属公司</th>
            <th>成果数据</th>
            <th width="80">排序</th>
            <th width="150">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in caseList" :key="item.id">
            <td>
              <img :src="item.image" alt="预览" class="case-thumb" />
            </td>
            <td>{{ item.title }}</td>
            <td>{{ item.company }}</td>
            <td>
              <div class="stats-tags">
                <span v-for="tag in item.stats" :key="tag" class="stat-tag">{{ tag }}</span>
              </div>
            </td>
            <td>{{ item.order_index }}</td>
            <td class="actions">
              <button @click="handleEdit(item)" class="btn-edit">编辑</button>
              <button @click="handleDelete(item.id)" class="btn-delete">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 编辑/添加 弹窗 -->
    <div v-if="dialogVisible" class="modal-overlay" @click="dialogVisible = false">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>{{ isEdit ? '编辑案例' : '添加案例' }}</h3>
          <button type="button" @click="dialogVisible = false" class="btn-close">✕</button>
        </div>
        <form @submit.prevent="handleSave">
          <div class="form-group">
            <label>案例名称 *</label>
            <input v-model="form.title" type="text" required />
          </div>
          <div class="form-group">
            <label>所属公司</label>
            <input v-model="form.company" type="text" />
          </div>
          <div class="form-group">
            <label>封面图片URL</label>
            <input v-model="form.image_url" type="text" placeholder="请输入图片链接" />
          </div>
          <div class="form-group">
            <label>成果数据</label>
            <input 
              v-model="statsInput" 
              type="text"
              placeholder="用英文逗号分隔，如: 性能提升50%,成本降低30%" 
            />
            <div class="help-text">多个数据请用逗号隔开</div>
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

const caseList = ref<any[]>([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const statsInput = ref('')
const form = ref({
  id: null,
  title: '',
  company: '',
  image_url: '',
  stats: [] as string[],
  order_index: 0
})

const fetchCases = async () => {
  try {
    const response = await siteAPI.getCases()
    if (response.data.success) {
      caseList.value = response.data.data
    }
  } catch (error) {
    console.error('获取案例失败:', error)
  }
}

const handleAdd = () => {
  isEdit.value = false
  statsInput.value = ''
  form.value = {
    id: null,
    title: '',
    company: '',
    image_url: '',
    stats: [],
    order_index: 0
  }
  dialogVisible.value = true
}

const handleEdit = (item: any) => {
  isEdit.value = true
  form.value = { ...item, image_url: item.image }
  statsInput.value = item.stats.join(',')
  dialogVisible.value = true
}

const handleSave = async () => {
  // 处理数据格式
  const statsArray = statsInput.value.split(',').map(s => s.trim()).filter(s => s !== '')
  form.value.stats = statsArray

  try {
    let res
    if (isEdit.value) {
      res = await siteAPI.updateCase(form.value.id!, form.value)
    } else {
      res = await siteAPI.createCase(form.value)
    }

    if (res.data.success) {
      ElMessage.success('保存成功')
      dialogVisible.value = false
      fetchCases()
    }
  } catch (error) {
    ElMessage.error('保存失败')
  }
}

const handleDelete = async (id: number) => {
  try {
    await ElMessageBox.confirm('确定要删除此案例吗？', '提示', { type: 'warning' })
    const res = await siteAPI.deleteCase(id)
    if (res.data.success) {
      ElMessage.success('已删除')
      fetchCases()
    }
  } catch (error) {
    if (error !== 'cancel') ElMessage.error('删除失败')
  }
}

onMounted(fetchCases)
</script>

<style scoped>
.case-management {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
}

.case-thumb {
  width: 80px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #f0f0f0;
}

.stats-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.stat-tag {
  background: #e6f4ff;
  color: var(--primary-color);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid #91caff;
}

.help-text {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 4px;
}
</style>
