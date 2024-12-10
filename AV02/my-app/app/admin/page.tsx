'use client'

import { useState, useEffect } from 'react'
import { getUsers, getPlatformStats } from '../api/mockApi'
import { User, PlatformStats } from '@/types'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<PlatformStats | null>(null)
  const [isAuthorized, setIsAuthorized] = useState(true) // Set to true for now

  useEffect(() => {
    const fetchData = async () => {
      // In a real application, you would check the user's role here
      // For now, we're using the placeholder true value
      if (true) {
        setIsAuthorized(true)
        const [usersData, statsData] = await Promise.all([
          getUsers(),
          getPlatformStats()
        ])
        setUsers(usersData.filter(user => user.role === 0)) // Only regular users
        setStats(statsData)
      } else {
        setIsAuthorized(false)
      }
    }
    fetchData()
  }, [])

  if (!isAuthorized) {
    return <div>You are not authorized to view this page.</div>
  }

  return (
    <AppLayout>
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {stats && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Platform Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-sm text-blue-800">Total Users</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-sm text-green-800">Total Ads</p>
              <p className="text-2xl font-bold text-green-600">{stats.totalAds}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">Total Impressions</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.totalImpressions.toLocaleString()}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <p className="text-sm text-purple-800">Total Clicks</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalClicks.toLocaleString()}</p>
            </div>
            <div className="bg-pink-100 p-4 rounded-lg">
              <p className="text-sm text-pink-800">Total Conversions</p>
              <p className="text-2xl font-bold text-pink-600">{stats.totalConversions.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <Link href={`/admin/user/${user.id}`} key={user.id}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <img src={user.image} alt={user.username} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{user.username}</h3>
                <p className="text-gray-600 mb-2">Profit Share: {user.profitShare}%</p>
                <p className="text-sm text-gray-500 mb-2">Ads: {user.ads.length}</p>
                <p className="text-sm text-gray-500 truncate">{user.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </AppLayout>
  )
}

