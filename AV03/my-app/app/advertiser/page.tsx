'use client'

import { useState, useEffect } from 'react'
import { updateUser, deleteAd ,updateUserAndAds } from '../api/mockApi'
import { Ad, User } from '@/types'
import AdCard from '../../components/AdCard'
import AdvertiserProfile from '../../components/AdvertiserProfile'
import AdEditModal from '../../components/AdEditModal'
import { useAuth } from '../contexts/AuthContext'
import AppLayout from '../../components/AppLayout'

export default function AdvertiserPage() {
  const { user: authUser, login } = useAuth()
  const [user, setUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAd, setEditingAd] = useState<Ad | null>(null)

  useEffect(() => {
    if (authUser) {
      setUser(authUser)
    }
  }, [authUser])

  const handleUpdateAdvertiser = async (updatedUser: User) => {
    const result = await updateUser(updatedUser)
    setUser(result)
    login(result.username, result.password) // Update the user in AuthContext
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
      login(updatedUser.username, updatedUser.password) // Update the user in AuthContext
    }
  };

  const handleAddAd = (newAd: Ad) => {
    if (user) {
      const updatedAds = [...user.ads, newAd]
      const updatedUser = { ...user, ads: updatedAds }
      handleUpdateAdvertiser(updatedUser)
    }
    setIsModalOpen(false)
  }

  const handleAddNewAd = () => {
    setEditingAd(null)
    setIsModalOpen(true)
  }

  const handleSubmitToBackend =async () => {
    if(user){
      const result = await updateUserAndAds(user)
      console.log(result)
    }
    alert('Advertiser profile and ads submitted to backend!')
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">用户信息</h1>
        <AdvertiserProfile advertiser={user} onUpdate={handleUpdateAdvertiser} />
        <h2 className="text-2xl font-bold mt-8 mb-4">您的广告</h2>
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
            <span className="text-2xl text-gray-500">+ 添加广告</span>
          </div>
        </div>
        <div className="mt-8">
          <button
            onClick={handleSubmitToBackend}
            className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
          >
            提交
          </button>
        </div>
        <AdEditModal
          ad={editingAd}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddAd}
        />
      </div>
    </AppLayout>
  )
}

