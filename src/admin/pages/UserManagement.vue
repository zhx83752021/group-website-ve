<template>
  <div class="user-management">
    <div class="header">
      <h2>用户管理</h2>
      <button @click="showAddDialog = true" class="btn-primary">+ 添加用户</button>
    </div>

    <div class="filters">
      <input v-model="searchText" type="text" placeholder="搜索用户名或邮箱..." class="search-input" />
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th width="60">序号</th>
            <th>用户名</th>
            <th>邮箱</th>
            <th>创建时间</th>
            <th width="150">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filteredUsers" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email || '未设置' }}</td>
            <td>{{ formatDate(user.created_at) }}</td>
            <td class="actions">
              <button @click="editUser(user)" class="btn-edit">编辑</button>
              <button @click="deleteUser(user.id)" class="btn-delete">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 添加/编辑对话框 -->
    <div v-if="showAddDialog" class="modal-overlay" @click="showAddDialog = false">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>{{ editingUser ? '编辑用户' : '添加用户' }}</h3>
          <button type="button" @click="showAddDialog = false" class="btn-close">✕</button>
        </div>
        <form @submit.prevent="saveUser">
          <div class="form-group">
            <label>用户名 *</label>
            <input v-model="form.username" type="text" required :disabled="!!editingUser" />
          </div>
          <div class="form-group">
            <label>邮箱</label>
            <input v-model="form.email" type="email" />
          </div>
          <div v-if="!editingUser" class="form-group">
            <label>密码 *</label>
            <input v-model="form.password" type="password" required />
          </div>
          <div v-if="editingUser" class="form-group">
            <label>新密码 (留空则不修改)</label>
            <input v-model="form.newPassword" type="password" />
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
import { ref, computed, onMounted } from 'vue';
import { authAPI } from '../../api/index';
import { ElMessage } from 'element-plus';

const users = ref<any[]>([]);
const showAddDialog = ref(false);
const editingUser = ref<any>(null);
const searchText = ref('');

const form = ref({
  username: '',
  email: '',
  password: '',
  newPassword: ''
});

const filteredUsers = computed(() => {
  return users.value.filter(u => {
    const matchSearch = u.username.includes(searchText.value) || (u.email?.includes(searchText.value) || false);
    return matchSearch;
  });
});

const fetchUsers = async () => {
  try {
    // 这里需要后端提供获取所有用户的 API
    // 暂时使用模拟数据
    const response = await authAPI.getMe();
    users.value = [response.data.data];
  } catch (error) {
    console.error('获取用户列表失败:', error);
  }
};

const editUser = (user: any) => {
  editingUser.value = user;
  form.value = { username: user.username, email: user.email || '', password: '', newPassword: '' };
  showAddDialog.value = true;
};

const saveUser = async () => {
  try {
    if (editingUser.value) {
      if (form.value.newPassword) {
        await authAPI.changePassword(form.value.password, form.value.newPassword);
        ElMessage.success('密码修改成功');
      }
    } else {
      await authAPI.register(form.value.username, form.value.password, form.value.email);
      ElMessage.success('用户创建成功');
    }
    showAddDialog.value = false;
    editingUser.value = null;
    form.value = { username: '', email: '', password: '', newPassword: '' };
    await fetchUsers(); // 等待刷新完成
  } catch (error) {
    console.error('保存用户失败:', error);
    ElMessage.error('保存用户失败，请检查输入');
  }
};

const deleteUser = async (_id: string) => {
  if (confirm('确定要删除这个用户吗？')) {
    // 这里需要后端提供删除用户的 API
    alert('删除用户功能需要后端支持');
  }
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN');
};

onMounted(fetchUsers);
</script>

<style scoped>
/* 页面特有样式 - 公共样式已在 AdminLayout 中引入 */
.user-management {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

.form-group input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}
</style>
