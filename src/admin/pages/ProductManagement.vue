<template>
  <div class="product-management">
    <div class="header">
      <h2>产品管理</h2>
      <button @click="showAddDialog = true" class="btn-primary">+ 添加产品</button>
    </div>
    <div class="filters">
      <input v-model="searchText" type="text" placeholder="搜索产品名称..." class="search-input" />
      <select v-model="filterCategory" class="filter-select">
        <option value="">所有分类</option>
        <option value="cloud">云计算</option>
        <option value="security">数据安全</option>
        <option value="ai">人工智能</option>
      </select>
    </div>
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th width="60">序号</th>
            <th>图片</th>
            <th>产品名称</th>
            <th>分类</th>
            <th>价格</th>
            <th>状态</th>
            <th>创建时间</th>
            <th width="150">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in filteredProducts" :key="product.id">
            <td>{{ index + 1 }}</td>
            <td class="image-cell">
              <img v-if="product.image_url && !imageErrors[product.id]" :src="product.image_url" :alt="product.name"
                class="product-thumbnail" @error="() => handleImageError(product.id)" />
              <div v-else class="no-image">无图片</div>
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>¥{{ product.price }}</td>
            <td>
              <span class="status" :class="product.status">
                {{ product.status === 'active' ? '活跃' : '停用' }}
              </span>
            </td>
            <td>{{ formatDate(product.created_at) }}</td>
            <td class="actions">
              <button @click="editProduct(product)" class="btn-edit">编辑</button>
              <button @click="deleteProduct(product.id)" class="btn-delete">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 添加/编辑对话框 -->
    <div v-if="showAddDialog" class="modal-overlay" @click="showAddDialog = false">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>{{ editingProduct ? '编辑产品' : '添加产品' }}</h3>
          <button type="button" @click="showAddDialog = false" class="btn-close">✕</button>
        </div>
        <form @submit.prevent="saveProduct">
          <div class="form-group">
            <label>产品名称 *</label>
            <input v-model="form.name" type="text" required />
          </div>
          <div class="form-group">
            <label>分类</label>
            <input v-model="form.category" type="text" />
          </div>
          <div class="form-group">
            <label>价格</label>
            <input v-model.number="form.price" type="number" step="0.01" />
          </div>
          <div class="form-group">
            <label>描述</label>
            <textarea v-model="form.description" rows="4"></textarea>
          </div>
          <div class="form-group">
            <label>产品图片</label>
            <div class="image-upload-container">
              <div v-if="form.image_url" class="image-preview">
                <img :src="form.image_url" alt="产品图片预览" />
                <button type="button" @click="removeImage" class="btn-remove-image">✕</button>
              </div>
              <div v-else class="upload-placeholder">
                <input type="file" ref="fileInput" @change="handleFileSelect" accept="image/*" style="display: none" />
                <button type="button" @click="triggerFileInput" class="btn-upload">
                  📷 选择图片
                </button>
                <p class="upload-hint">或输入图片URL</p>
                <input v-model="form.image_url" type="url" placeholder="https://example.com/image.jpg" />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>状态</label>
            <select v-model="form.status">
              <option value="active">活跃</option>
              <option value="inactive">停用</option>
            </select>
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
import { productAPI } from '../../api/index';
import { ElMessage } from 'element-plus';
const products = ref<any[]>([]);
const showAddDialog = ref(false);
const editingProduct = ref<any>(null);
const searchText = ref('');
const filterCategory = ref('');
const fileInput = ref<HTMLInputElement | null>(null);
const imageErrors = ref<Record<string, boolean>>({});
const form = ref({
  name: '',
  description: '',
  category: '',
  price: 0,
  image_url: '',
  features: '',
  status: 'active'
});
const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchSearch = p.name.includes(searchText.value);
    const matchCategory = !filterCategory.value || p.category === filterCategory.value;
    return matchSearch && matchCategory;
  });
});
const fetchProducts = async () => {
  try {
    const response = await productAPI.getList(100);
    products.value = response.data.data;
  } catch (error) {
    console.error('获取产品列表失败:', error);
  }
};
const editProduct = (product: any) => {
  editingProduct.value = product;
  form.value = { ...product };
  showAddDialog.value = true;
};
const saveProduct = async () => {
  try {
    if (editingProduct.value) {
      await productAPI.update(editingProduct.value.id, form.value);
      ElMessage.success('产品更新成功');
    } else {
      await productAPI.create(form.value);
      ElMessage.success('产品创建成功');
    }
    showAddDialog.value = false;
    editingProduct.value = null;
    form.value = { name: '', description: '', category: '', price: 0, image_url: '', features: '', status: 'active' };
    await fetchProducts(); // 等待刷新完成
  } catch (error) {
    console.error('保存产品失败:', error);
    ElMessage.error('保存产品失败');
  }
};
const deleteProduct = async (id: string) => {
  if (confirm('确定要删除这个产品吗？')) {
    try {
      await productAPI.delete(id);
      ElMessage.success('产品删除成功');
      await fetchProducts(); // 等待刷新完成
    } catch (error) {
      console.error('删除产品失败:', error);
      ElMessage.error('删除产品失败');
    }
  }
};
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN');
};
// 图片上传相关
const triggerFileInput = () => {
  fileInput.value?.click();
};
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      ElMessage.error('请选择图片文件');
      return;
    }
    // 验证文件大小 (最大10MB)
    if (file.size > 10 * 1024 * 1024) {
      ElMessage.error('图片大小不能超过10MB');
      return;
    }
    // 压缩并转换为Base64
    compressImage(file, (compressedDataUrl) => {
      form.value.image_url = compressedDataUrl;
    });
  }
};
// 图片压缩函数
const compressImage = (file: File, callback: (dataUrl: string) => void) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      // 设置最大宽度和高度
      const maxWidth = 1200;
      const maxHeight = 1200;
      let width = img.width;
      let height = img.height;
      // 计算缩放比例
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
      // 压缩质量设置为0.7
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
      callback(compressedDataUrl);
    };
    img.src = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};
const removeImage = () => {
  form.value.image_url = '';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};
const handleImageError = (productId: string) => {
  imageErrors.value[productId] = true;
};
onMounted(fetchProducts);
</script>
<style scoped>
/* 页面特有样式 - 公共样式已在 AdminLayout 中引入 */
.product-management {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

.btn-remove-image {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255, 0, 0, 0.8);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.btn-remove-image:hover {
  background: rgba(255, 0, 0, 1);
  transform: scale(1.1);
}

.upload-placeholder {
  text-align: center;
  padding: 20px;
}

.btn-upload {
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
  margin-bottom: 15px;
}

.btn-upload:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.upload-hint {
  color: #999;
  font-size: 13px;
  margin: 10px 0;
}

.upload-placeholder input[type="url"] {
  margin-top: 10px;
}
</style>
