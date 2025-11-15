<template>
  <div class="business-management">
    <div class="header">
      <h2>业务信息管理</h2>
      <button @click="showAddDialog = true" class="btn-primary">+ 添加业务</button>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th width="60">序号</th>
            <th>业务名称</th>
            <th>描述</th>
            <th>排序</th>
            <th>创建时间</th>
            <th width="150">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(business, index) in businessList" :key="business.id">
            <td>{{ index + 1 }}</td>
            <td>{{ business.name }}</td>
            <td>{{ business.description?.substring(0, 50) }}...</td>
            <td>{{ business.order_index }}</td>
            <td>{{ formatDate(business.created_at) }}</td>
            <td class="actions">
              <button @click="editBusiness(business)" class="btn-edit">编辑</button>
              <button @click="deleteBusiness(business.id)" class="btn-delete">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 添加/编辑对话框 -->
    <div v-if="showAddDialog" class="modal-overlay" @click="showAddDialog = false">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>{{ editingBusiness ? '编辑业务' : '添加业务' }}</h3>
          <button type="button" @click="showAddDialog = false" class="btn-close">✕</button>
        </div>
        <form @submit.prevent="saveBusiness">
          <div class="form-group">
            <label>业务名称 *</label>
            <input v-model="form.name" type="text" required />
          </div>
          <div class="form-group">
            <label>描述</label>
            <textarea v-model="form.description" rows="4"></textarea>
          </div>
          <div class="form-group">
            <label>图标 URL</label>
            <input v-model="form.icon_url" type="url" />
          </div>
          <div class="form-group">
            <label>排序</label>
            <input v-model.number="form.order_index" type="number" />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">保存</button>
            <button type="button" @click="showAddDialog = false" class="btn-secondary">取消</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { businessAPI } from '../../api/index';
import { ElMessage } from 'element-plus';

const businessList = ref<any[]>([]);
const showAddDialog = ref(false);
const editingBusiness = ref<any>(null);

const form = ref({
  name: '',
  description: '',
  icon_url: '',
  order_index: 0
});

const fetchBusiness = async () => {
  try {
    const response = await businessAPI.getList(100);
    businessList.value = response.data.data;
  } catch (error) {
    console.error('获取业务信息失败:', error);
  }
};

const editBusiness = (business: any) => {
  editingBusiness.value = business;
  form.value = { ...business };
  showAddDialog.value = true;
};

const saveBusiness = async () => {
  try {
    if (editingBusiness.value) {
      await businessAPI.update(editingBusiness.value.id, form.value);
      ElMessage.success('业务信息更新成功');
    } else {
      await businessAPI.create(form.value);
      ElMessage.success('业务信息创建成功');
    }
    showAddDialog.value = false;
    editingBusiness.value = null;
    form.value = { name: '', description: '', icon_url: '', order_index: 0 };
    await fetchBusiness(); // 等待刷新完成
  } catch (error) {
    console.error('保存业务信息失败:', error);
    ElMessage.error('保存业务信息失败');
  }
};

const deleteBusiness = async (id: string) => {
  if (confirm('确定要删除这个业务吗？')) {
    try {
      await businessAPI.delete(id);
      ElMessage.success('业务删除成功');
      await fetchBusiness(); // 等待刷新完成
    } catch (error) {
      console.error('删除业务失败:', error);
      ElMessage.error('删除业务失败');
    }
  }
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN');
};

onMounted(fetchBusiness);
</script>

<style scoped>
/* 页面特有样式 - 公共样式已在 AdminLayout 中引入 */
.business-management {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
