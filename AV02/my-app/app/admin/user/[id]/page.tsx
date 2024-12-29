'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getUserById, updateUser } from '../../../api/mockApi' // Update 1: Updated import statement
import { User, Ad } from '@/types'
import AdCard from '../../../../components/AdCard'

export default function AdminUserPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const params = useParams()
  const router = useRouter()
  const id = typeof params.id === 'string' ? parseInt(params.id, 10) : null

  useEffect(() => {
    const fetchUser = async () => {
      if (id !== null) {
        const userData = await getUserById(id) // Update 2: Using getUserById
        if (userData) {
          setUser(userData)
        }
      }
    }
    fetchUser()
  }, [id])

  const handleUpdateUser = async (updatedUser: User) => {
    const result = await updateUser(updatedUser)
    setUser(result)
    setIsEditing(false)
  }

  const handleUpdateAd = (updatedAd: Ad) => {
    if (user) {
      const updatedAds = user.ads.map(ad => ad.id === updatedAd.id ? updatedAd : ad)
      const updatedUser = { ...user, ads: updatedAds }
      handleUpdateUser(updatedUser)
    }
  }

  const handleDeleteAd = (adId: number) => {
    if (user) {
      const updatedAds = user.ads.filter(ad => ad.id !== adId)
      const updatedUser = { ...user, ads: updatedAds }
      handleUpdateUser(updatedUser)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Admin: {user.username}</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        {isEditing ? (
          <form onSubmit={(e) => {
            e.preventDefault()
            handleUpdateUser(user)
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  id="username"
                  value={user.username}
                  onChange={(e) => setUser({...user, username: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  id="image"
                  value={user.image}
                  onChange={(e) => setUser({...user, image: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="apiEndpoint" className="block text-sm font-medium text-gray-700">API Endpoint</label>
                <input
                  type="text"
                  id="apiEndpoint"
                  value={user.apiEndpoint}
                  onChange={(e) => setUser({...user, apiEndpoint: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="profitShare" className="block text-sm font-medium text-gray-700">Profit Share (%)</label>
                <input
                  type="number"
                  id="profitShare"
                  value={user.profitShare}
                  onChange={(e) => setUser({...user, profitShare: Number(e.target.value)})}
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
                value={user.description}
                onChange={(e) => setUser({...user, description: e.target.value})}
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
              <h2 className="text-2xl font-bold">{user.username}</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit User
              </button>
            </div>
            <img src={user.image} alt={user.username} className="w-32 h-32 rounded-full mb-4" />
            <p className="text-gray-600 mb-2"><strong>API Endpoint:</strong> {user.apiEndpoint}</p>
            <p className="text-gray-600 mb-2"><strong>Description:</strong> {user.description}</p>
            <p className="text-gray-600"><strong>Profit Share:</strong> {user.profitShare}%</p>
          </div>
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Ads</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.ads.map(ad => (
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

