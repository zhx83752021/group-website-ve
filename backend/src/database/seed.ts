import { query } from './config.js';
import * as adminDao from '../dao/adminDao.js';

export async function seedDatabase() {
  try {
    console.log('开始填充示例数据...');

    // 创建默认管理员
    const existingAdmin = await adminDao.getAdminByUsername('admin');
    if (!existingAdmin) {
      await adminDao.createAdmin('admin', 'admin123', 'admin@group.com');
      console.log('✅ 创建默认管理员: admin / admin123');
    }

    // 插入示例新闻
    const newsCount = await query('SELECT COUNT(*) FROM news');
    if (newsCount.rows[0].count === '0') {
      const newsData = [
        {
          title: '集团荣获行业最佳创新奖',
          content: '在2024年行业峰会上，我们集团因在技术创新方面的突出表现，荣获"行业最佳创新奖"。这是对我们团队多年来不懈努力的认可。',
          category: '公司新闻',
          author: '新闻部',
          image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
        },
        {
          title: '新产品线正式上市',
          content: '经过18个月的研发，我们的新产品线今天正式上市。该产品线包含5个创新产品，预计将为市场带来新的解决方案。',
          category: '产品发布',
          author: '产品部',
          image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
        },
        {
          title: '集团与国际合作伙伴签署战略协议',
          content: '今日，我们集团与全球领先的技术公司签署了战略合作协议，双方将在多个领域展开深度合作。',
          category: '合作动态',
          author: '战略部',
          image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
        },
        {
          title: '2024年云计算行业发展趋势报告',
          content: '最新行业报告显示，云计算市场持续增长，预计未来三年将保持30%以上的年增长率。人工智能和边缘计算成为新的增长点。',
          category: '行业资讯',
          author: '研究部',
          image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
        },
      ];

      for (const news of newsData) {
        await query(
          `INSERT INTO news (title, content, category, author, image_url)
           VALUES ($1, $2, $3, $4, $5)`,
          [news.title, news.content, news.category, news.author, news.image_url]
        );
      }
      console.log('✅ 插入示例新闻数据');
    }

    // 插入示例业务信息
    const businessCount = await query('SELECT COUNT(*) FROM business');
    if (businessCount.rows[0].count === '0') {
      const businessData = [
        { name: '云计算服务', description: '提供企业级云计算解决方案', order_index: 1 },
        { name: '大数据分析', description: '专业的数据分析和挖掘服务', order_index: 2 },
        { name: '人工智能', description: 'AI驱动的智能化解决方案', order_index: 3 },
        { name: '网络安全', description: '全面的网络安全防护体系', order_index: 4 },
      ];

      for (const business of businessData) {
        await query(
          `INSERT INTO business (name, description, order_index)
           VALUES ($1, $2, $3)`,
          [business.name, business.description, business.order_index]
        );
      }
      console.log('✅ 插入示例业务数据');
    }

    // 插入示例产品数据
    const productCount = await query('SELECT COUNT(*) FROM products');
    if (productCount.rows[0].count === '0') {
      const productData = [
        {
          name: '云建站平台',
          description: '一站式云建站解决方案，无需编程即可创建专业网站，支持拖拽编辑和自定义模板',
          category: '云服务',
          price: 299,
          image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
          features: '拖拽式编辑,响应式设计,SEO优化,免费SSL证书,24/7技术支持',
          order_index: 1,
          status: 'active'
        },
        {
          name: '数据分析平台',
          description: '实时数据统计和可视化分析，帮助企业深度了解用户行为和业务趋势',
          category: '数据分析',
          price: 599,
          image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
          features: '实时数据,自定义报表,数据导出,API接口,权限管理',
          order_index: 2,
          status: 'active'
        },
        {
          name: '安全防护系统',
          description: '企业级DDoS防护和数据加密，全天候监测威胁，保护您的数据安全',
          category: '安全防护',
          price: 899,
          image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
          features: 'DDoS防护,数据加密,入侵检测,安全审计,应急响应',
          order_index: 3,
          status: 'active'
        },
        {
          name: '内容管理系统',
          description: '灵活的CMS系统，支持多语言和多种内容类型，轻松管理海量内容',
          category: '云服务',
          price: 399,
          image_url: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&h=600&fit=crop',
          features: '多语言支持,版本控制,工作流管理,权限控制,插件扩展',
          order_index: 4,
          status: 'active'
        },
        {
          name: '用户行为分析',
          description: '深度用户行为追踪，热力图分析，转化漏斗优化，提升用户体验',
          category: '数据分析',
          price: 699,
          image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
          features: '热力图分析,用户路径,转化漏斗,事件追踪,用户分群',
          order_index: 5,
          status: 'active'
        },
        {
          name: '威胁情报平台',
          description: '实时威胁监测和风险预警，专业安全团队24/7应急响应支持',
          category: '安全防护',
          price: 1299,
          image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
          features: '威胁监测,风险评分,应急预案,情报共享,专家支持',
          order_index: 6,
          status: 'active'
        }
      ];

      for (const product of productData) {
        await query(
          `INSERT INTO products (name, description, category, price, image_url, features, order_index, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [product.name, product.description, product.category, product.price, product.image_url, product.features, product.order_index, product.status]
        );
      }
      console.log('✅ 插入示例产品数据');
    }

    // 插入示例发展历程
    const timelineCount = await query('SELECT COUNT(*) FROM timeline');
    if (timelineCount.rows[0].count === '0') {
      const timelineData = [
        { year: '2006', title: '公司成立', description: '在北京成立，专注于企业级网络安全和数据保护解决方案', order_index: 1 },
        { year: '2010', title: '云平台上线', description: '推出第一代云建站平台，为中小企业提供低成本的数字化解决方案', order_index: 2 },
        { year: '2015', title: '数据分析平台', description: '发布数据分析和可视化平台，帮助企业深度挖掘数据价值', order_index: 3 },
        { year: '2019', title: '国际扩展', description: '在美国、欧洲、亚太地区建立分支机构，服务全球企业客户', order_index: 4 },
        { year: '2024', title: 'AI智能升级', description: '推出AI驱动的安全防护和数据分析引擎，提升服务智能化水平', order_index: 5 }
      ];
      for (const item of timelineData) {
        await query(
          `INSERT INTO timeline (year, title, description, order_index) VALUES ($1, $2, $3, $4)`,
          [item.year, item.title, item.description, item.order_index]
        );
      }
      console.log('✅ 插入示例发展历程数据');
    }

    // 插入示例荣誉资质
    const honorsCount = await query('SELECT COUNT(*) FROM honors');
    if (honorsCount.rows[0].count === '0') {
      const honorsData = [
        { title: '云计算创新企业奖', year: '2024', order_index: 1 },
        { title: 'ISO 27001信息安全认证', year: '2023', order_index: 2 },
        { title: '国家高新技术企业', year: '2023', order_index: 3 },
        { title: '数据安全先进单位', year: '2022', order_index: 4 },
        { title: '中国云计算产业联盟会员', year: '2021', order_index: 5 }
      ];
      for (const honor of honorsData) {
        await query(
          `INSERT INTO honors (title, year, order_index) VALUES ($1, $2, $3)`,
          [honor.title, honor.year, honor.order_index]
        );
      }
      console.log('✅ 插入示例荣誉资质数据');
    }

    // 插入站点配置
    const configCount = await query('SELECT COUNT(*) FROM site_config');
    if (configCount.rows[0].count === '0') {
      const configData = [
        { key: 'stats_years', value: '18+', description: '年技术积累' },
        { key: 'stats_clients', value: '50万+', description: '企业客户' },
        { key: 'stats_team', value: '200+', description: '技术团队' },
        { key: 'stats_availability', value: '99.99%', description: '服务可用性' },
        { key: 'site_icp', value: '京ICP备12345678号', description: '网站备案号' },
        { key: 'site_phone', value: '400-660-8066', description: '联系电话' }
      ];
      for (const config of configData) {
        await query(
          `INSERT INTO site_config (key, value, description) VALUES ($1, $2, $3)`,
          [config.key, config.value, config.description]
        );
      }
      console.log('✅ 插入示例站点配置数据');
    }

    // 插入示例成功案例
    const casesCount = await query('SELECT COUNT(*) FROM cases');
    if (casesCount.rows[0].count === '0') {
      const casesData = [
        {
          title: '大型集团官网改版',
          company: '某上市集团',
          description: '完成集团官网的全面改版，提升品牌形象和用户体验。',
          image_url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop',
          stats: '提升访问量 150%,转化率提高 45%,用户满意度 98%',
          order_index: 1
        },
        {
          title: '电商平台建设',
          company: '知名电商企业',
          description: '从零开始构建完整的电商平台，支持日均10万+订单。',
          image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
          stats: '日均订单 10万+,系统可用性 99.9%,客户满意度 96%',
          order_index: 2
        }
      ];
      for (const item of casesData) {
        await query(
          `INSERT INTO cases (title, company, description, image_url, stats, order_index) VALUES ($1, $2, $3, $4, $5, $6)`,
          [item.title, item.company, item.description, item.image_url, item.stats, item.order_index]
        );
      }
      console.log('✅ 插入示例成功案例数据');
    }

    console.log('✅ 数据库填充完成');
  } catch (error) {
    console.error('❌ 数据库填充失败:', error);
    throw error;
  }
}

