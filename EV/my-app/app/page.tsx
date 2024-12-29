'use client'

import { useState, useEffect } from 'react'
import { getProducts, getCategories } from '../lib/api'
import { Product, Category } from '../types'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import ProductCard from '../components/ProductCard'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const [productsData, categoriesData] = await Promise.all([getProducts(), getCategories()])
      setProducts(productsData)
      setFilteredProducts(productsData)
      setCategories(categoriesData)
    }
    fetchData()
  }, [])

  const handleSearch = (query: string) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredProducts(filtered)
    setSelectedCategory(null)
  }

  const handleCategoryFilter = (categoryId: string | null) => {
    if (categoryId === null) {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter(product => product.category === categoryId)
      setFilteredProducts(filtered)
    }
    setSelectedCategory(categoryId)
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
        <SearchBar onSearch={handleSearch} />
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">分类</h2>
          <div className="flex gap-2 mb-4">
            <Button
              onClick={() => handleCategoryFilter(null)}
              variant={selectedCategory === null ? 'default' : 'outline'}
            >
              全部
            </Button>
            {categories.map(category => (
              <Button
                key={category.id}
                onClick={() => handleCategoryFilter(category.id)}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
              >
                {getCategoryName(category.name)}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={{...product, category: getCategoryName(product.category)}} />
          ))}
        </div>
      </main>
    </div>
  )
}

