'use client'

import Link from 'next/link'
import { useCart } from '../components/CartContext'

export default function Header() {
  const { cart } = useCart()

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-800">
            电商商城
          </Link>
          <div className="flex items-center">
            <Link href="/" className="text-gray-800 hover:text-gray-600 mx-4">
              首页
            </Link>
            <Link href="/cart" className="text-gray-800 hover:text-gray-600">
              购物车 ({cart.reduce((total, item) => total + item.quantity, 0)})
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

