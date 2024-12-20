import { useState } from 'react'
import { Ad } from '@/types'
import ImageUploader from './ImageUploader'

interface AdCardProps {
  ad: Ad
  onUpdate: (updatedAd: Ad) => void
  onDelete: (adId: number) => void
}
const categoryMap = {
  electronics: "科技",
  entertainment: "娱乐",
  dailygoods: "日常",
  food: "食物",
};
export default function AdCard({ ad, onUpdate, onDelete }: AdCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedAd, setEditedAd] = useState(ad)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditedAd(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(editedAd)
    setIsEditing(false)
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">名称</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedAd.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
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
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">图片</label>
            <ImageUploader
              onImageUpload={(imageUrl) => setEditedAd(prev => ({ ...prev, image: imageUrl }))}
              currentImage={editedAd.image}
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">描述</label>
            <textarea
              id="description"
              name="description"
              value={editedAd.description}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="jumpurl" className="block text-sm font-medium text-gray-700">跳转url</label>
            <input
              type="text"
              id="jumpurl"
              name="jumpurl"
              value={editedAd.jumpurl}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              保存
            </button>
          </div>
        </form>
      ) : (
        <>
          <img src={ad.image} alt={ad.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{ad.name}</h3>
            <p className="text-gray-600 mb-2">{categoryMap[ad.category]}</p>
            <p className="text-sm text-gray-500 mb-4">{ad.description}</p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                编辑
              </button>
              <button
                onClick={() => onDelete(ad.id)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                删除
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
