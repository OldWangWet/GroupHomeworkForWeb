'use client'

import { useState, useEffect } from 'react'
import { getUsersWithAds, getPlatformStats } from '../api/mockApi'
import { User, PlatformStats } from '@/types'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import { useAuth } from '../contexts/AuthContext'

export default function AdminPage() {
  const { user: authUser, login } = useAuth()
  const [user, setUser] = useState<User | null>(null)
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
          getUsersWithAds(),
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

  useEffect(() => {
    if (authUser) {
      setUser(authUser)
    }
  }, [authUser])

  if (!user||user.role===0) {
    return (
      <AppLayout>
<div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">并非管理员</h1>
          <p className="text-gray-600">您没有访问此页面的权限。</p>
        </div>
      </div>
      </AppLayout>
      
    )
  }

  return (
    <AppLayout>
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">管理员</h1>
      
      {stats && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">平台总览</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-sm text-blue-800">用户数量</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-sm text-green-800">广告数量</p>
              <p className="text-2xl font-bold text-green-600">{stats.totalAds}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">显示数量</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.totalImpressions.toLocaleString()}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <p className="text-sm text-purple-800">点击数量</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalClicks.toLocaleString()}</p>
            </div>
            <div className="bg-pink-100 p-4 rounded-lg">
              <p className="text-sm text-pink-800">收益总额</p>
              <p className="text-2xl font-bold text-pink-600">{stats.totalConversions.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">用户总览</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <Link href={`/admin/user/${user.id}`} key={user.id}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <img src={user.image} alt={user.username} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{user.username}</h3>
                <p className="text-gray-600 mb-2">利润分享: {user.profitShare}%</p>
                <p className="text-sm text-gray-500 mb-2">广告数量: {user.ads.length}</p>
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

