<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__section">
        <h3>关于CloudTech</h3>
        <p>专注于云计算、数据分析和网络安全的高科技企业，为全球企业提供可靠的云服务和安全防护解决方案。</p>
      </div>

      <div class="footer__section">
        <h3>快速链接</h3>
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/about">关于我们</router-link></li>
          <li><router-link to="/products">产品展示</router-link></li>
          <li><router-link to="/news">新闻中心</router-link></li>
        </ul>
      </div>

      <div class="footer__section">
        <h3>联系方式</h3>
        <p>电话：+86-10-8888-8888</p>
        <p>邮箱：contact@cloudtech.com</p>
        <p>地址：北京市朝阳区科技园区</p>
      </div>

      <div class="footer__section">
        <h3>关注我们</h3>
        <div class="social-links">
          <a href="#" class="social-link">微信</a>
          <a href="#" class="social-link">微博</a>
          <a href="#" class="social-link">LinkedIn</a>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <p>&copy; 2024 CloudTech. All rights reserved. | 云计算与数据安全解决方案领导者</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.footer {
  position: relative;
  background: #1a1a1a;
  color: #ccc;
  padding: 3rem 0 1rem;
  margin-top: 4rem;
  width: 100%;
  left: 0;
  right: 0;
}

.footer__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer__section h3 {
  color: white;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.footer__section p {
  margin: 0.5rem 0;
  line-height: 1.6;
}

.footer__section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__section li {
  margin: 0.5rem 0;
}

.footer__section a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer__section a:hover {
  color: #667eea;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: 1px solid #667eea;
  border-radius: 4px;
  color: #667eea;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #667eea;
  color: white;
}

.footer__bottom {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #333;
  color: #999;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 2rem;
  padding-right: 2rem;
}

@media (max-width: 768px) {
  .footer__container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
