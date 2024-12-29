'use client'

import { useState, useEffect } from 'react'
import { getNews, getCategories } from '../lib/api'
import NewsList from '../components/NewsList'
import Search from '../components/Search'
import CategoryFilter from '../components/CategoryFilter'
import { News, Category } from '../types'

export default function Home() {
  const [news, setNews] = useState<News[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const [newsData, categoriesData] = await Promise.all([getNews(), getCategories()])
      setNews(newsData)
      setCategories(categoriesData)
    }
    fetchData()
  }, [])

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId)
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">新闻网站</h1>
      <div className="mb-8">
        <Search onSearch={handleSearch} />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <CategoryFilter categories={categories} onCategoryChange={handleCategoryChange} />
        </aside>
        <section className="w-full md:w-3/4">
          <NewsList initialNews={news} selectedCategory={selectedCategory} searchTerm={searchTerm} />
        </section>
      </div>
    </main>
  )
}

