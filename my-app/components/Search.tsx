'use client'

import { useState } from 'react'

interface SearchProps {
  onSearch: (term: string) => void
}

export default function Search({ onSearch }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="搜索新闻..."
        className="flex-grow px-4 py-2 border rounded-lg"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        搜索
      </button>
    </form>
  )
}

