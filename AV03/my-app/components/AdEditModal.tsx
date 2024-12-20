import { useState } from 'react'
import { Ad } from '@/types'
import ImageUploader from './ImageUploader'

interface AdEditModalProps {
  ad: Ad | null
  isOpen: boolean
  onClose: () => void
  onSave: (ad: Ad) => void
}

export default function AdEditModal({ ad, isOpen, onClose, onSave }: AdEditModalProps) {
  const [editedAd, setEditedAd] = useState<Ad>(ad || {
    id: 0,
    name: '',
    category: '',
    image: '',
    description: '',
    jumpurl: '',
    impressions: 0,
    clicks: 0,
    conversions: 0,
    isActive: true,
  })

  if (!isOpen) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditedAd(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedAd)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{ad ? 'Edit Ad' : 'Add New Ad'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">名称</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedAd.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">分类</label>
            <select
              id="category"
              name="category"
              value={editedAd.category}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="electronics">科技</option>
              <option value="entertainment">娱乐</option>
              <option value="dailygoods">日常</option>
              <option value="food">食物</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">广告图片</label>
            <ImageUploader
              onImageUpload={(imageUrl) => setEditedAd(prev => ({ ...prev, image: imageUrl }))}
              currentImage={editedAd.image}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">描述</label>
            <textarea
              id="description"
              name="description"
              value={editedAd.description}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="jumpurl" className="block text-sm font-medium text-gray-700">跳转url</label>
            <input
              type="text"
              id="jumpurl"
              name="jumpurl"
              value={editedAd.jumpurl}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

