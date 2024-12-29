'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getProduct } from '../../../lib/api'
import { Product } from '../../../types'
import { useCart } from '../../../components/CartContext'
import Header from '../../../components/Header'
import { Button } from '@/components/ui/button'

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProduct(id as string)
      setProduct(productData || null)
    }
    fetchProduct()
  }, [id])

  if (!product) {
    return <div>加载中...</div>
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleAddToCart = () => {
    addToCart(product)
  }

  const handleBuyNow = () => {
    addToCart(product)
    // 重定向到购物车页面
    window.location.href = '/cart'
  }

  const getCategoryName = (categoryId: string): string => {
    switch (categoryId) {
      case 'electronics':
        return '电子产品'
      case 'entertainment':
        return '娱乐'
      case 'dailygoods':
        return '日用品'
      case 'food':
        return '食品'
      default:
        return categoryId
    }
  }

  return (
    <div className="min-h-screen bg-gray-100" style={{ whiteSpace: 'pre-wrap' }}>
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-xl font-semibold mb-4">￥{product.price.toFixed(2)}</p>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <div className="flex gap-4 mb-6">
                <Button onClick={handleAddToCart}>加入购物车</Button>
                <Button onClick={handleBuyNow} variant="outline">立即购买</Button>
                <Button onClick={handleLike} variant="outline">
                  {isLiked ? '❤️ 已喜欢' : '🤍 喜欢'}
                </Button>
              </div>
              <p className="text-sm text-gray-500">分类: {getCategoryName(product.category)}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

