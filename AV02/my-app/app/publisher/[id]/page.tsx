'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getUserById, getAdApiEndpoint } from '../../api/mockApi'
import { User } from '@/types'

export default function UserAdsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [apiEndpoint, setApiEndpoint] = useState<string>('')
  const params = useParams()
  const id = typeof params.id === 'string' ? parseInt(params.id, 10) : null

  useEffect(() => {
    const fetchUser = async () => {
      if (id !== null) {
        const userData = await getUserById(id)
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
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">{user.username} - Ads</h1>
      <div className="mb-6">
        <button
          onClick={handleGetApi}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Join Program and Get API
        </button>
        {apiEndpoint && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <strong>API Endpoint:</strong> {apiEndpoint}
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
                <span>Impressions: {ad.impressions}</span>
                <span>Clicks: {ad.clicks}</span>
                <span>Conversions: {ad.conversions}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

