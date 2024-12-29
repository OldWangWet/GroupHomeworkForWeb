'use client'

import { useState } from 'react'
import { Category } from '../types'

interface CategoryFilterProps {
  categories: Category[]
  onCategoryChange: (categoryId: string | null) => void
}

export default function CategoryFilter({ categories, onCategoryChange }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategoryChange = (categoryId: string) => {
    const newCategory = categoryId === 'all' ? null : categoryId
    setSelectedCategory(newCategory)
    onCategoryChange(newCategory)
  }

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-4">分类</h2>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.id)}
          className={`block w-full text-left px-4 py-2 rounded-lg ${
            (selectedCategory === category.id || (selectedCategory === null && category.id === 'all'))
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

