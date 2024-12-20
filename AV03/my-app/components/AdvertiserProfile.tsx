import { useState } from 'react'
import { Advertiser } from '@/types'
import ImageUploader from './ImageUploader'

interface AdvertiserProfileProps {
  advertiser: Advertiser
  onUpdate: (updatedAdvertiser: Advertiser) => void
}

export default function AdvertiserProfile({ advertiser, onUpdate }: AdvertiserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedAdvertiser, setEditedAdvertiser] = useState(advertiser)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedAdvertiser(prev => ({ ...prev, [name]: name === 'profitShare' ? Number(value) : value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(editedAdvertiser)
    setIsEditing(false)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">名称</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedAdvertiser.username}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">展示图片</label>
            <ImageUploader
              onImageUpload={(imageUrl) => setEditedAdvertiser(prev => ({ ...prev, image: imageUrl }))}
              currentImage={editedAdvertiser.image}
            />
          </div>
          <div>
            <label htmlFor="originurl" className="block text-sm font-medium text-gray-700">您的网站</label>
            <input
              type="text"
              id="originurl"
              name="originurl"
              value={editedAdvertiser.originurl}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">个人描述</label>
            <textarea
              id="description"
              name="description"
              value={editedAdvertiser.description}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="profitShare" className="block text-sm font-medium text-gray-700">利润分享 (%)</label>
            <input
              type="number"
              id="profitShare"
              name="profitShare"
              value={editedAdvertiser.profitShare}
              onChange={handleInputChange}
              min="0"
              max="10"
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
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{advertiser.username}</h2>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              信息修改
            </button>
          </div>
          <img src={advertiser.image} alt={advertiser.username} className="w-full h-48 object-cover mb-4" />
          <p className="text-gray-600 mb-2"><strong>您的网站:</strong> {advertiser.originurl}</p>
          <p className="text-gray-600 mb-2"><strong>个人描述:</strong> {advertiser.description}</p>
          <p className="text-gray-600"><strong>利润分享:</strong> {advertiser.profitShare}%</p>
        </div>
      )}
    </div>
  )
}

