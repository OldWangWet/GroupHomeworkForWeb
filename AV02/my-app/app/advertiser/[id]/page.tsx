'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getAd, submitAd } from '../../api/mockApi'
import { Ad } from '@/types'

export default function AdDetails() {
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

  const handleSubmit = async () => {
    if (ad) {
      await submitAd(ad)
      alert('Ad submitted successfully!')
      router.push('/advertiser')
    }
  }

  if (!ad) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{ad.name}</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
        <img src={ad.image} alt={ad.name} className="w-full h-64 object-cover mb-6 rounded-lg" />
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-2"><strong>Category:</strong> {ad.category}</p>
            <p className="text-gray-600 mb-2"><strong>Description:</strong> {ad.description}</p>
            <p className="text-gray-600 mb-2"><strong>Redirect URL:</strong> {ad.redirectUrl}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-2"><strong>Impressions:</strong> {ad.impressions}</p>
            <p className="text-gray-600 mb-2"><strong>Clicks:</strong> {ad.clicks}</p>
            <p className="text-gray-600 mb-2"><strong>Conversions:</strong> {ad.conversions}</p>
            <p className="text-gray-600 mb-2"><strong>Status:</strong> {ad.isActive ? 'Active' : 'Inactive'}</p>
          </div>
        </div>
        <button 
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
          onClick={handleSubmit}
        >
          Submit to Backend
        </button>
      </div>
    </div>
  )
}

