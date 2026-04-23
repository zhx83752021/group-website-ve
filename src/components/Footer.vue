<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__section">
        <h3 class="footer__title">关于CloudTech</h3>
        <p>专注于云计算、数据分析和网络安全的高科技企业，为全球企业提供可靠的云服务和安全防护解决方案。</p>
      </div>

      <div class="footer__section">
        <h3 class="footer__title">快速链接</h3>
        <ul class="footer__links">
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/about">关于我们</router-link></li>
          <li><router-link to="/products">产品展示</router-link></li>
          <li><router-link to="/news">新闻中心</router-link></li>
        </ul>
      </div>

      <div class="footer__section">
        <h3 class="footer__title">联系方式</h3>
        <p>电话：86-10-8888-8888</p>
        <p>邮箱：contact@cloudtech.com</p>
        <p>地址：北京市朝阳区科技园区</p>
      </div>
    </div>

    <div class="footer__bottom">
      <p>&copy; 2024 CloudTech. All rights reserved. | 云计算与数据安全解决方案</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.footer {
  background: #f3f6fd; /* 更新为用户要求的浅灰蓝色背景 */
  color: #6b7280;
  padding: 2.5rem 0 1.5rem; /* 大幅减小上下内边距 */
  border-top: 1px solid #e2e8f0; /* 将顶部边框颜色稍微加深以适应新背景 */
  width: 100%;
}

.footer__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 调整为3列以适应精简版块 */
  gap: 2rem; /* 减小列间距 */
  margin-bottom: 2rem; /* 减小底部元素的外边距 */
}

.footer__title {
  color: #4f46e5;
  margin-bottom: 1rem; /* 减小标题下方留空 */
  font-size: 1.05rem;
  font-weight: 700;
}

.footer__section p {
  font-size: 0.9rem;
  line-height: 1.6; /* 行距紧缩 */
  margin: 0.5rem 0;
}

.footer__links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__links li {
  margin: 0.5rem 0; /* 减小列表项垂直间距 */
}

.footer__links a {
  color: #6b7280;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.footer__links a:hover {
  color: #4f46e5;
}

/* 移除了无用的社交图标区及其悬停动画 CSS */

.footer__bottom {
  text-align: center;
  padding-top: 1.5rem;
  /* 同步上面的颜色 */
  border-top: 1px solid #e2e8f0; 
  color: #9ca3af;
  font-size: 0.85rem;
}

@media (max-width: 992px) {
  .footer__container {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }
}

@media (max-width: 576px) {
  .footer__container {
    grid-template-columns: 1fr;
    text-align: left;
  }
}
</style>
