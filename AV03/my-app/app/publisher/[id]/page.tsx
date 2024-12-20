'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getUserWithAdsById, getAdApiEndpoint } from '../../api/mockApi'
import { User } from '@/types'
import AppLayout from '../../../components/AppLayout'

export default function UserAdsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [apiEndpoint, setApiEndpoint] = useState<string>('')
  const params = useParams()
  const id = typeof params.id === 'string' ? parseInt(params.id, 10) : null

  useEffect(() => {
    const fetchUser = async () => {
      if (id !== null) {
        const userData = await getUserWithAdsById(id)
        if (userData) {
          setUser(userData)
        }
      }
    }
    fetchUser()
  }, [id])

  const handleGetApi = async () => {
    if (id !== null) {
      const endpoint = await getAdApiEndpoint(id)
      setApiEndpoint(endpoint)
    }
  }

  if (!user) {
    return <AppLayout><div>Loading...</div></AppLayout>
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">{user.username} 的广告列表</h1>
        <div className="mb-6">
          <button
            onClick={handleGetApi}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
          >
            获取此api
          </button>
          {apiEndpoint && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <strong>API:</strong> {apiEndpoint}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.ads.map(ad => (
            <div key={ad.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={ad.image} alt={ad.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{ad.name}</h3>
                <p className="text-gray-600 mb-2">{ad.category}</p>
                <p className="text-sm text-gray-500 mb-4">{ad.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>显示: {ad.impressions}</span>
                  <span>点击: {ad.clicks}</span>
                  <span>获利: {ad.conversions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

