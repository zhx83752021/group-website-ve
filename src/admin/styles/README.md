# 管理后台公共样式说明

## 概述

为了提高代码复用性和维护性，我们将管理后台各页面中重复的样式提取到了公共样式文件中。

## 文件结构

```
src/admin/styles/
└── common.css          # 管理后台公共样式
```

## 使用方式

公共样式已在 `AdminLayout.vue` 中全局引入，所有管理页面都可以直接使用这些样式类，无需在各自的组件中重复定义。

```vue
<!-- AdminLayout.vue -->
<style>
@import '../styles/common.css';
</style>
```

## 公共样式类列表

### 1. 布局样式

- `.page-container` - 页面容器（白色背景，圆角，内边距）
- `.header` - 页面头部（标题和操作按钮的容器）
- `.filters` - 筛选器容器

### 2. 按钮样式

- `.btn-primary` - 主要按钮（渐变紫色背景）
- `.btn-secondary` - 次要按钮（灰色背景）
- `.btn-edit` - 编辑按钮（蓝色）
- `.btn-delete` - 删除按钮（红色）
- `.btn-view` - 查看按钮（蓝色）
- `.btn-close` - 关闭按钮（圆形，用于模态框）

### 3. 表单样式

- `.form-group` - 表单项容器
- `.form-group label` - 表单标签
- `.form-group input/textarea/select` - 表单输入框
- `.form-actions` - 表单操作按钮容器
- `.search-input` - 搜索输入框
- `.filter-select` - 筛选下拉框

### 4. 表格样式

- `.table-container` - 表格容器（支持横向滚动）
- `.data-table` - 数据表格
- `.data-table th` - 表头单元格
- `.data-table td` - 数据单元格
- `.actions` - 操作列容器

### 5. 模态框样式

- `.modal-overlay` - 模态框遮罩层
- `.modal` - 模态框主体
- `.modal-header` - 模态框头部

### 6. 状态标签样式

- `.status` - 状态标签基础样式
- `.status.active` - 激活状态（绿色）
- `.status.inactive` - 未激活状态（红色）
- `.status.pending` - 待处理状态（黄色）
- `.status.replied` - 已回复状态（蓝色）
- `.status.resolved` - 已解决状态（绿色）

### 7. 图片样式

- `.product-thumbnail` - 产品缩略图
- `.no-image` - 无图片占位符
- `.image-cell` - 图片单元格
- `.image-upload-container` - 图片上传容器
- `.image-preview` - 图片预览容器

## 页面特有样式

各页面组件中只保留该页面特有的样式，例如：

```vue
<style scoped>
/* 页面特有样式 - 公共样式已在 AdminLayout 中引入 */
.news-management {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
```

## 优势

1. **代码复用** - 避免在多个组件中重复定义相同的样式
2. **易于维护** - 样式修改只需在一个地方进行
3. **一致性** - 确保整个管理后台的视觉风格统一
4. **减小体积** - 减少重复代码，降低打包后的文件大小

## 注意事项

1. 如果需要覆盖公共样式，可以在组件的 `<style scoped>` 中重新定义
2. 新增通用样式时，应添加到 `common.css` 中
3. 页面特有的样式应保留在各自的组件中，不要添加到公共样式文件

## 已应用的页面

- ✅ NewsManagement.vue
- ✅ ProductManagement.vue
- ✅ ContactManagement.vue
- ✅ BusinessManagement.vue
- ✅ UserManagement.vue
- ✅ Dashboard.vue (使用部分公共样式)
- ✅ Login.vue (独立样式，不使用公共样式)

