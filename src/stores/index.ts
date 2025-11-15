import { defineStore } from 'pinia'
import { ref } from 'vue'

// 导航状态
export const useNavStore = defineStore('nav', () => {
  const activeMenu = ref('home')
  const isMenuOpen = ref(false)

  const setActiveMenu = (menu: string) => {
    activeMenu.value = menu
  }

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const closeMenu = () => {
    isMenuOpen.value = false
  }

  return {
    activeMenu,
    isMenuOpen,
    setActiveMenu,
    toggleMenu,
    closeMenu
  }
})

// 应用全局状态
export const useAppStore = defineStore('app', () => {
  const isScrolled = ref(false)
  const scrollY = ref(0)

  const updateScroll = (y: number) => {
    scrollY.value = y
    isScrolled.value = y > 50
  }

  return {
    isScrolled,
    scrollY,
    updateScroll
  }
})

// 新闻数据状态
export const useNewsStore = defineStore('news', () => {
  const newsList = ref([
    {
      id: 1,
      title: '集团荣获行业最高奖项',
      summary: '在2024年行业评选中，我们集团凭借卓越的创新能力和服务质量荣获最高奖项。',
      date: '2024-11-12',
      category: '公司新闻',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      title: '新产品线正式上市',
      summary: '经过两年的研发，我们推出了全新的产品线，为市场带来革新性的解决方案。',
      date: '2024-11-10',
      category: '产品发布',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      title: '集团与国际企业达成战略合作',
      summary: '我们与全球领先的企业签署战略合作协议，共同开拓国际市场。',
      date: '2024-11-08',
      category: '合作动态',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop'
    },
    {
      id: 4,
      title: '2024年云计算行业发展趋势报告',
      summary: '最新行业报告显示，云计算市场持续增长，预计未来三年将保持30%以上的年增长率。',
      date: '2024-11-05',
      category: '行业资讯',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop'
    }
  ])

  const getNewsById = (id: number) => {
    return newsList.value.find(news => news.id === id)
  }

  return {
    newsList,
    getNewsById
  }
})

