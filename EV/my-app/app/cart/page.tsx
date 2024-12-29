'use client'

import { useCart } from '../../components/CartContext'
import Header from '../../components/Header'
import { Button } from '@/components/ui/button'

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    alert('这里将实现结账功能。')
    clearCart()
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
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">您的购物车</h1>
        {cart.length === 0 ? (
          <p>您的购物车是空的。</p>
        ) : (
          <>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b py-4 last:border-b-0">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">￥{item.price.toFixed(2)} x {item.quantity}</p>
                      <p className="text-sm text-gray-500">分类: {getCategoryName(item.category)}</p>
                    </div>
                  </div>
                  <Button onClick={() => removeFromCart(item.id)} variant="outline" size="sm">
                    删除
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">总计: ￥{total.toFixed(2)}</h2>
              <div>
                <Button onClick={handleCheckout} className="mr-4">
                  结算
                </Button>
                <Button onClick={clearCart} variant="outline">
                  清空购物车
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

