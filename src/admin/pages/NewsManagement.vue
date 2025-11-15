<template>
  <div class="news-management">
    <div class="header">
      <h2>新闻管理</h2>
      <button @click="showAddDialog = true" class="btn-primary">+ 添加新闻</button>
    </div>
    <div class="filters">
      <input v-model="searchText" type="text" placeholder="搜索新闻标题..." class="search-input" />
      <select v-model="filterCategory" class="filter-select">
        <option value="">所有分类</option>
        <option value="公司新闻">公司新闻</option>
        <option value="行业动态">行业动态</option>
        <option value="技术分享">技术分享</option>
      </select>
    </div>
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th width="60">序号</th>
            <th>标题</th>
            <th>分类</th>
            <th>浏览次数</th>
            <th>作者</th>
            <th>创建时间</th>
            <th width="150">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(news, index) in filteredNews" :key="news.id">
            <td>{{ index + 1 }}</td>
            <td>{{ news.title }}</td>
            <td>{{ news.category }}</td>
            <td>{{ news.views }}</td>
            <td>{{ news.author }}</td>
            <td>{{ formatDate(news.created_at) }}</td>
            <td class="actions">
              <button @click="editNews(news)" class="btn-edit">编辑</button>
              <button @click="deleteNews(news.id)" class="btn-delete">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 添加/编辑对话框 -->
    <div v-if="showAddDialog" class="modal-overlay" @click="showAddDialog = false">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>{{ editingNews ? '编辑新闻' : '添加新闻' }}</h3>
          <button type="button" @click="showAddDialog = false" class="btn-close">✕</button>
        </div>
        <form @submit.prevent="saveNews">
          <div class="form-group">
            <label>标题 *</label>
            <input v-model="form.title" type="text" required />
          </div>
          <div class="form-group">
            <label>分类</label>
            <select v-model="form.category">
              <option value="公司新闻">公司新闻</option>
              <option value="产品发布">产品发布</option>
              <option value="合作动态">合作动态</option>
              <option value="行业资讯">行业资讯</option>
            </select>
          </div>
          <div class="form-group">
            <label>作者</label>
            <input v-model="form.author" type="text" />
          </div>
          <div class="form-group">
            <label>内容 *</label>
            <textarea v-model="form.content" rows="6" required></textarea>
          </div>
          <div class="form-group">
            <label>新闻图片</label>
            <div class="image-upload-container">
              <div v-if="form.image_url" class="image-preview">
                <img :src="form.image_url" alt="新闻图片预览" />
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
import { newsAPI } from '../../api/index';
import { ElMessage } from 'element-plus';
const newsList = ref<any[]>([]);
const showAddDialog = ref(false);
const editingNews = ref<any>(null);
const searchText = ref('');
const filterCategory = ref('');
const fileInput = ref<HTMLInputElement | null>(null);
const form = ref({
  title: '',
  content: '',
  category: '公司新闻',
  author: '',
  image_url: ''
});
const filteredNews = computed(() => {
  return newsList.value.filter(n => {
    const matchSearch = n.title.includes(searchText.value);
    const matchCategory = !filterCategory.value || n.category === filterCategory.value;
    return matchSearch && matchCategory;
  });
});
const fetchNews = async () => {
  try {
    const response = await newsAPI.getList(100);
    newsList.value = response.data.data;
  } catch (error) {
    console.error('获取新闻列表失败:', error);
  }
};
const editNews = (news: any) => {
  editingNews.value = news;
  form.value = { ...news };
  showAddDialog.value = true;
};
const saveNews = async () => {
  try {
    console.log('📝 准备保存新闻:', {
      title: form.value.title,
      category: form.value.category,
      author: form.value.author,
      contentLength: form.value.content?.length || 0,
      hasImage: !!form.value.image_url,
      imageLength: form.value.image_url?.length || 0,
      isEdit: !!editingNews.value
    });

    if (editingNews.value) {
      await newsAPI.update(editingNews.value.id, form.value);
      ElMessage.success('新闻更新成功');
    } else {
      await newsAPI.create(form.value);
      ElMessage.success('新闻创建成功');
    }
    showAddDialog.value = false;
    editingNews.value = null;
    form.value = { title: '', content: '', category: '公司新闻', author: '', image_url: '' };
    await fetchNews(); // 等待刷新完成
  } catch (error: any) {
    console.error('❌ 保存新闻失败:', error);
    console.error('错误详情:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });

    const errorMsg = error.response?.data?.error || error.message || '保存新闻失败';
    ElMessage.error(`保存失败: ${errorMsg}`);
  }
};
const deleteNews = async (id: string) => {
  if (confirm('确定要删除这条新闻吗？')) {
    try {
      await newsAPI.delete(id);
      ElMessage.success('新闻删除成功');
      await fetchNews(); // 等待刷新完成
    } catch (error) {
      console.error('删除新闻失败:', error);
      ElMessage.error('删除新闻失败');
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
onMounted(fetchNews);
</script>
<style scoped>
/* 页面特有样式 - 公共样式已在 AdminLayout 中引入 */
.news-management {
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
