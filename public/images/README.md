# 图片资源说明

## 当前使用的图片

本项目目前使用 Unsplash 提供的免费高质量图片。所有图片均通过 CDN 链接引用。

### 首页 (Home.vue)
- **英雄区图片**: 现代化办公大楼
  - URL: `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab`
  
### 新闻图片 (stores/index.ts)
1. **公司新闻**: 团队协作场景
   - URL: `https://images.unsplash.com/photo-1557804506-669a67965ba0`
   
2. **产品发布**: 数据分析图表
   - URL: `https://images.unsplash.com/photo-1460925895917-afdab827c52f`
   
3. **合作动态**: 商务握手
   - URL: `https://images.unsplash.com/photo-1521737711867-e3b97375f902`

### 关于我们 (About.vue)
- **公司介绍图片**: 现代化办公环境
  - URL: `https://images.unsplash.com/photo-1497366216548-37526070297c`

### 业务布局 (Business.vue)

#### 业务项目图片
1. **集团官网建设**: 数据分析
   - URL: `https://images.unsplash.com/photo-1460925895917-afdab827c52f`
   
2. **营销型网站**: 数据图表
   - URL: `https://images.unsplash.com/photo-1551288049-bebda4e38f71`
   
3. **电商平台**: 在线购物
   - URL: `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d`
   
4. **移动应用开发**: 手机应用
   - URL: `https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c`

#### 成功案例图片
1. **大型集团官网改版**: 办公场景
   - URL: `https://images.unsplash.com/photo-1497366811353-6870744d04b2`
   
2. **电商平台建设**: 电商场景
   - URL: `https://images.unsplash.com/photo-1563013544-824ae1b704d3`
   
3. **小程序开发**: 移动设备
   - URL: `https://images.unsplash.com/photo-1551650975-87deedd944c3`

## 如何替换为本地图片

如果您想使用本地图片，请按以下步骤操作：

1. 将图片文件放入 `public/images/` 目录
2. 在代码中将图片 URL 替换为本地路径，例如：
   ```javascript
   image: '/images/your-image.jpg'
   ```

## 图片规格建议

- **英雄区图片**: 1600x900px (16:9)
- **新闻卡片图片**: 800x500px (16:10)
- **业务项目图片**: 1200x800px (3:2)
- **案例图片**: 800x600px (4:3)

## 图片优化建议

1. 使用 WebP 格式以获得更好的压缩率
2. 为不同设备提供不同尺寸的图片（响应式图片）
3. 使用懒加载提升页面加载速度
4. 压缩图片文件大小，建议单张图片不超过 200KB

## 版权说明

当前使用的 Unsplash 图片均为免费商用图片，无需署名。如果您替换为其他图片，请确保拥有相应的使用权限。

