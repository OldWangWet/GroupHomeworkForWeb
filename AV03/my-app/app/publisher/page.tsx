'use client'

import { useState, useEffect } from 'react'
import { getUsersWithAds } from '../api/mockApi'
import { User } from '@/types'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'

export default function PublisherPage() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsersWithAds()
      setUsers(usersData.filter(user => user.role === 0)) // Only regular users
    }
    fetchUsers()
  }, [])

  return (
    <AppLayout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">获取api</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <Link href={`/publisher/${user.id}`} key={user.id}>
              <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
                <img src={user.image} alt={user.username} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{user.username}</h3>
                  <p className="text-gray-600 mb-2">利润分享: {user.profitShare}%</p>
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

