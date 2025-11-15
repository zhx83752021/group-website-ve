<template>
  <div class="contact-management">
    <div class="header">
      <h2>联系表单管理</h2>
    </div>

    <div class="filters">
      <input v-model="searchText" type="text" placeholder="搜索邮箱或名称..." class="search-input" />
      <select v-model="filterStatus" class="filter-select">
        <option value="">所有状态</option>
        <option value="pending">待处理</option>
        <option value="replied">已回复</option>
        <option value="resolved">已解决</option>
      </select>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th width="60">序号</th>
            <th>姓名</th>
            <th>邮箱</th>
            <th>主题</th>
            <th>状态</th>
            <th>提交时间</th>
            <th width="150">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(contact, index) in filteredContacts" :key="contact.id">
            <td>{{ index + 1 }}</td>
            <td>{{ contact.name }}</td>
            <td>{{ contact.email }}</td>
            <td>{{ contact.subject }}</td>
            <td>
              <span class="status" :class="contact.status">
                {{ statusText[contact.status] }}
              </span>
            </td>
            <td>{{ formatDate(contact.created_at) }}</td>
            <td class="actions">
              <button @click="viewContact(contact)" class="btn-view">查看</button>
              <button @click="deleteContact(contact.id)" class="btn-delete">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 查看详情对话框 -->
    <div v-if="showDetailDialog && selectedContact" class="modal-overlay" @click="showDetailDialog = false">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>联系表单详情</h3>
          <button type="button" @click="showDetailDialog = false" class="btn-close">✕</button>
        </div>
        <div class="detail-content">
          <div class="detail-item">
            <span class="label">姓名:</span>
            <span class="value">{{ selectedContact.name }}</span>
          </div>
          <div class="detail-item">
            <span class="label">邮箱:</span>
            <span class="value">{{ selectedContact.email }}</span>
          </div>
          <div class="detail-item">
            <span class="label">电话:</span>
            <span class="value">{{ selectedContact.phone || '未提供' }}</span>
          </div>
          <div class="detail-item">
            <span class="label">公司:</span>
            <span class="value">{{ selectedContact.company || '未提供' }}</span>
          </div>
          <div class="detail-item">
            <span class="label">主题:</span>
            <span class="value">{{ selectedContact.subject }}</span>
          </div>
          <div class="detail-item">
            <span class="label">消息:</span>
            <span class="value message">{{ selectedContact.message }}</span>
          </div>
          <div class="detail-item">
            <span class="label">状态:</span>
            <select v-model="selectedContact.status" class="status-select">
              <option value="pending">待处理</option>
              <option value="replied">已回复</option>
              <option value="resolved">已解决</option>
            </select>
          </div>
        </div>
        <div class="form-actions">
          <button @click="updateStatus" class="btn-primary">更新状态</button>
          <button @click="showDetailDialog = false" class="btn-secondary">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { contactAPI } from '../../api/index';
import { ElMessage } from 'element-plus';

const contacts = ref<any[]>([]);
const showDetailDialog = ref(false);
const selectedContact = ref<any>(null);
const searchText = ref('');
const filterStatus = ref('');

const statusText: Record<string, string> = {
  pending: '待处理',
  replied: '已回复',
  resolved: '已解决'
};

const filteredContacts = computed(() => {
  return contacts.value.filter(c => {
    const matchSearch = c.name.includes(searchText.value) || c.email.includes(searchText.value);
    const matchStatus = !filterStatus.value || c.status === filterStatus.value;
    return matchSearch && matchStatus;
  });
});

const fetchContacts = async () => {
  try {
    const response = await contactAPI.getList(100);
    contacts.value = response.data.data;
  } catch (error) {
    console.error('获取联系表单失败:', error);
  }
};

const viewContact = (contact: any) => {
  selectedContact.value = { ...contact };
  showDetailDialog.value = true;
};

const updateStatus = async () => {
  if (!selectedContact.value) return;
  try {
    await contactAPI.updateStatus(selectedContact.value.id, selectedContact.value.status);
    ElMessage.success('状态更新成功');
    showDetailDialog.value = false;
    await fetchContacts(); // 等待刷新完成
  } catch (error) {
    console.error('更新状态失败:', error);
    ElMessage.error('更新状态失败');
  }
};

const deleteContact = async (id: string) => {
  if (confirm('确定要删除这条联系表单吗？')) {
    try {
      await contactAPI.delete(id);
      ElMessage.success('联系表单删除成功');
      await fetchContacts(); // 等待刷新完成
    } catch (error) {
      console.error('删除联系表单失败:', error);
      ElMessage.error('删除联系表单失败');
    }
  }
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN');
};

onMounted(fetchContacts);
</script>

<style scoped>
/* 页面特有样式 - 公共样式已在 AdminLayout 中引入 */
.contact-management {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

.detail-content {
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item .label {
  min-width: 80px;
  font-weight: 500;
  color: #333;
}

.detail-item .value {
  flex: 1;
  color: #666;
  word-break: break-all;
}

.detail-item .value.message {
  white-space: pre-wrap;
}

.status-select {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}
</style>
