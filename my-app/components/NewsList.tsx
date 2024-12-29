'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { News } from '../types'

interface NewsListProps {
  initialNews: News[]
  selectedCategory: string | null
  searchTerm: string
}

export default function NewsList({ initialNews, selectedCategory, searchTerm }: NewsListProps) {
  const [news, setNews] = useState(initialNews)

  useEffect(() => {
    const filteredNews = initialNews.filter((item) => {
      const matchesCategory = !selectedCategory || item.category === selectedCategory
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
    setNews(filteredNews)
  }, [initialNews, selectedCategory, searchTerm])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item) => (
        <Link href={`/news/${item.id}`} key={item.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
          <Image src={item.image} alt={item.name} width={300} height={200} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-2">{item.category}</p>
            <p className="text-gray-800">{item.description.substring(0, 100)}...</p>
            <p className="text-blue-600 mt-2">点赞数: {item.price}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

