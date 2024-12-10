'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getAdvertiser, updateAdvertiser } from '../../../api/mockApi'
import { Advertiser, Ad } from '@/types'
import AdCard from '../../../components/AdCard'

export default function AdminAdvertiserPage() {
  const [advertiser, setAdvertiser] = useState<Advertiser | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const params = useParams()
  const router = useRouter()
  const id = typeof params.id === 'string' ? parseInt(params.id, 10) : null

  useEffect(() => {
    const fetchAdvertiser = async () => {
      if (id !== null) {
        const advertiserData = await getAdvertiser(id)
        if (advertiserData) {
          setAdvertiser(advertiserData)
        }
      }
    }
    fetchAdvertiser()
  }, [id])

  const handleUpdateAdvertiser = async (updatedAdvertiser: Advertiser) => {
    const result = await updateAdvertiser(updatedAdvertiser)
    setAdvertiser(result)
    setIsEditing(false)
  }

  const handleUpdateAd = (updatedAd: Ad) => {
    if (advertiser) {
      const updatedAds = advertiser.ads.map(ad => ad.id === updatedAd.id ? updatedAd : ad)
      const updatedAdvertiser = { ...advertiser, ads: updatedAds }
      handleUpdateAdvertiser(updatedAdvertiser)
    }
  }

  const handleDeleteAd = (adId: number) => {
    if (advertiser) {
      const updatedAds = advertiser.ads.filter(ad => ad.id !== adId)
      const updatedAdvertiser = { ...advertiser, ads: updatedAds }
      handleUpdateAdvertiser(updatedAdvertiser)
    }
  }

  if (!advertiser) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Admin: {advertiser.name}</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        {isEditing ? (
          <form onSubmit={(e) => {
            e.preventDefault()
            handleUpdateAdvertiser(advertiser)
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  value={advertiser.name}
                  onChange={(e) => setAdvertiser({...advertiser, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  id="image"
                  value={advertiser.image}
                  onChange={(e) => setAdvertiser({...advertiser, image: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="apiEndpoint" className="block text-sm font-medium text-gray-700">API Endpoint</label>
                <input
                  type="text"
                  id="apiEndpoint"
                  value={advertiser.apiEndpoint}
                  onChange={(e) => setAdvertiser({...advertiser, apiEndpoint: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="profitShare" className="block text-sm font-medium text-gray-700">Profit Share (%)</label>
                <input
                  type="number"
                  id="profitShare"
                  value={advertiser.profitShare}
                  onChange={(e) => setAdvertiser({...advertiser, profitShare: Number(e.target.value)})}
                  min="0"
                  max="100"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                value={advertiser.description}
                onChange={(e) => setAdvertiser({...advertiser, description: e.target.value})}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
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
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{advertiser.name}</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit Advertiser
              </button>
            </div>
            <img src={advertiser.image} alt={advertiser.name} className="w-32 h-32 rounded-full mb-4" />
            <p className="text-gray-600 mb-2"><strong>API Endpoint:</strong> {advertiser.apiEndpoint}</p>
            <p className="text-gray-600 mb-2"><strong>Description:</strong> {advertiser.description}</p>
            <p className="text-gray-600"><strong>Profit Share:</strong> {advertiser.profitShare}%</p>
          </div>
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Ads</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advertiser.ads.map(ad => (
          <AdCard 
            key={ad.id} 
            ad={ad} 
            onUpdate={handleUpdateAd}
            onDelete={handleDeleteAd}
          />
        ))}
      </div>
    </div>
  )
}

