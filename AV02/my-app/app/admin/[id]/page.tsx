'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getAd } from '../../api/mockApi'
import { Ad } from '@/types'

export default function AdminAdDetails() {
  const [ad, setAd] = useState<Ad | null>(null)
  const params = useParams()
  const router = useRouter()
  const id = typeof params.id === 'string' ? parseInt(params.id, 10) : null

  useEffect(() => {
    const fetchAd = async () => {
      if (id !== null) {
        const adData = await getAd(id)
        if (adData) {
          setAd(adData)
        }
      }
    }
    fetchAd()
  }, [id])

  const handleUpdate = (updatedAd: Ad) => {
    // In a real application, you would call an API to update the ad
    setAd(updatedAd)
    alert('Ad updated successfully!')
  }

  const handleDelete = () => {
    // In a real application, you would call an API to delete the ad
    alert('Ad deleted successfully!')
    router.push('/admin')
  }

  if (!ad) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Ad: {ad.name}</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
        <img src={ad.image} alt={ad.name} className="w-full h-64 object-cover mb-6 rounded-lg" />
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={ad.name}
              onChange={(e) => setAd({...ad, name: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              value={ad.category}
              onChange={(e) => setAd({...ad, category: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={ad.description}
              onChange={(e) => setAd({...ad, description: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Redirect URL</label>
            <input
              type="text"
              value={ad.redirectUrl}
              onChange={(e) => setAd({...ad, redirectUrl: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button 
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            onClick={() => handleUpdate(ad)}
          >
            Update Ad
          </button>
          <button 
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors duration-300"
            onClick={handleDelete}
          >
            Delete Ad
          </button>
        </div>
      </div>
    </div>
  )
}

