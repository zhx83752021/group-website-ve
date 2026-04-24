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
                  <svg viewBox="0 0 1024 1024" width="16" height="16" style="margin-right: 8px"><path d="M864 248H728l-32.4-90.8c-2.1-6-7.7-10-14.1-10H342.5c-6.4 0-12 4-14.1 10L296 248H160c-44.2 0-80 35.8-80 80v456c0 44.2 35.8 80 80 80h704c44.2 0 80-35.8 80-80V328c0-44.2-35.8-80-80-80zM512 712c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160zm160-256a48 48 0 1 0 96 0 48 48 0 1 0-96 0z" fill="currentColor"></path></svg>
                  选择图片
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
      console.error('保存新闻失败:', error);
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
      if (!file.type.startsWith('image/')) {
        ElMessage.error('请选择图片文件');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        ElMessage.error('图片大小不能超过10MB');
        return;
      }
      compressImage(file, (compressedDataUrl) => {
        form.value.image_url = compressedDataUrl;
      });
    }
  };
  const compressImage = (file: File, callback: (dataUrl: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxWidth = 1200;
        const maxHeight = 1200;
        let width = img.width;
        let height = img.height;
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
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        callback(compressedDataUrl);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    form.value.image_url = '';
    if (fileInput.value) fileInput.value.value = '';
  };
  onMounted(fetchNews);
  </script>
  
  <style scoped>
  .news-management {
    background: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: var(--shadow-sm);
  }
  
  .btn-remove-image {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.45);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
  }
  
  .btn-remove-image:hover {
    background: rgba(0, 0, 0, 0.65);
  }
  
  .upload-placeholder {
    text-align: center;
    padding: 24px;
    border: 1px dashed #d9d9d9;
    border-radius: 8px;
    background: #fafafa;
  }
  
  .btn-upload {
    padding: 8px 16px;
    background: white;
    color: var(--text-main);
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    margin-bottom: 12px;
  }
  
  .btn-upload:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
  
  .upload-hint {
    color: var(--text-secondary);
    font-size: 12px;
    margin-bottom: 8px;
  }
  </style>
