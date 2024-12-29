import { News, Category } from '../types'

export const categories: Category[] = [
  { id: 'all', name: '全部' },
  { id: 'electronics', name: '电子产品' },
  { id: 'clothing', name: '服装' },
  { id: 'entertainment', name: '娱乐' },
  { id: 'food', name: '美食' },
]

export const news: News[] = [
  {
    id: '1',
    name: '新智能手机发布',
    price: 50,
    category: 'electronics',
    image: '/placeholder.svg?height=300&width=400',
    description: '最新的智能手机，配备尖端功能，刚刚发布。',
  },
  {
    id: '2',
    name: '夏季时尚趋势',
    price: 30,
    category: 'clothing',
    image: '/placeholder.svg?height=300&width=400',
    description: '探索今年夏季最热门的时尚趋势。',
  },
  {
    id: '3',
    name: '大片首映',
    price: 80,
    category: 'entertainment',
    image: '/placeholder.svg?height=300&width=400',
    description: '今年最受期待的电影本周末将在影院上映。',
  },
  {
    id: '4',
    name: '健康饮食指南',
    price: 40,
    category: 'food',
    image: '/placeholder.svg?height=300&width=400',
    description: '了解为更健康的生活方式应该食用的最佳食物。',
  },
  {
    id: '5',
    name: '新款笔记本电脑系列',
    price: 60,
    category: 'electronics',
    image: '/placeholder.svg?height=300&width=400',
    description: '一系列新的高性能笔记本电脑已经宣布推出。',
  },
  {
    id: '6',
    name: '冬季系列预览',
    price: 25,
    category: 'clothing',
    image: '/placeholder.svg?height=300&width=400',
    description: '抢先一睹即将到来的冬季时装系列。',
  },
  {
    id: '7',
    name: '音乐节阵容公布',
    price: 70,
    category: 'entertainment',
    image: '/placeholder.svg?height=300&width=400',
    description: '今年最大音乐节的完整阵容已经公布。',
  },
  {
    id: '8',
    name: '高级餐厅开业',
    price: 35,
    category: 'food',
    image: '/placeholder.svg?height=300&width=400',
    description: '一家新的高级餐厅本周将在市中心开业。',
  },
]

