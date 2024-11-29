'use client'

import { useState, useEffect } from 'react'
import { getUser, updateUser, deleteAd } from '../api/mockApi'
import { Advertiser, Ad, User } from '@/types'
import AdCard from '../../components/AdCard'
import AdvertiserProfile from '../../components/AdvertiserProfile'
import AdEditModal from '../../components/AdEditModal'

export default function AdvertiserPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAd, setEditingAd] = useState<Ad | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser('user1') // Hardcoded for demo
      if (userData) {
        setUser(userData)
      }
    }
    fetchData()
  }, [])

  const handleUpdateAdvertiser = async (updatedUser: User) => {
    const result = await updateUser(updatedUser)
    setUser(result)
  }

  const handleUpdateAd = (updatedAd: Ad) => {
    if (user) {
      const updatedAds = user.ads.map(ad => ad.id === updatedAd.id ? updatedAd : ad)
      const updatedUser = { ...user, ads: updatedAds }
      handleUpdateAdvertiser(updatedUser)
    }
  }

  const handleDeleteAd = async (adId: number) => {
    if (user) {
      await deleteAd(user.id, adId);
      const updatedUser = { ...user, ads: user.ads.filter(ad => ad.id !== adId) };
      setUser(updatedUser);
    }
  };

  const handleAddAd = (newAd: Ad) => {
    if (user) {
      const updatedAds = [...user.ads, { ...newAd, id: Date.now() }]
      const updatedUser = { ...user, ads: updatedAds }
      handleUpdateAdvertiser(updatedUser)
    }
    setIsModalOpen(false)
  }

  const handleAddNewAd = () => {
    setEditingAd(null)
    setIsModalOpen(true)
  }

  const handleSubmitToBackend = () => {
    // In a real application, this would send data to the backend
    alert('Advertiser profile and ads submitted to backend!')
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Advertiser Dashboard</h1>
      <AdvertiserProfile advertiser={user} onUpdate={handleUpdateAdvertiser} />
      <h2 className="text-2xl font-bold mt-8 mb-4">Your Ads</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.ads.map(ad => (
          <AdCard 
            key={ad.id} 
            ad={ad} 
            onUpdate={handleUpdateAd}
            onDelete={handleDeleteAd}
          />
        ))}
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-gray-50"
          onClick={handleAddNewAd}
        >
          <span className="text-2xl text-gray-500">+ Add New Ad</span>
        </div>
      </div>
      <div className="mt-8">
        <button
          onClick={handleSubmitToBackend}
          className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
        >
          Submit to Backend
        </button>
      </div>
      <AdEditModal
        ad={editingAd}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddAd}
      />
    </div>
  )
}

