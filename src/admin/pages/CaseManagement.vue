<template>
  <div class="case-management">
    <div class="header">
      <h2>成功案例管理</h2>
      <button @click="ElMessage.info('添加功能开发中')" class="btn-primary">+ 添加案例</button>
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
              <button @click="ElMessage.info('编辑功能开发中')" class="btn-edit">编辑</button>
              <button @click="ElMessage.info('删除功能开发中')" class="btn-delete">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { siteAPI } from '../../api/index'
import { ElMessage } from 'element-plus'

const caseList = ref<any[]>([])

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

onMounted(fetchCases)
</script>

<style scoped>
.case-management {
  background: white;
  padding: 24px;
  border-radius: 12px;
}

.case-thumb {
  width: 80px;
  height: 50px;
  object-fit: crop;
  border-radius: 4px;
}

.stats-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.stat-tag {
  background: #f0f4ff;
  color: #667eea;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
</style>
