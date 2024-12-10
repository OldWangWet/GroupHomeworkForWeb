'use client'

import { useAuth } from './contexts/AuthContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AppLayout from '../components/AppLayout'

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user === null) {
      router.push('/login')
    } else {
      setIsLoading(false)
    }
  }, [user, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user.username}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Traffic</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Received</p>
                <p className="text-2xl font-bold">{user.receivedTraffic.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Generated</p>
                <p className="text-2xl font-bold">{user.generatedTraffic.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Revenue</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Received</p>
                <p className="text-2xl font-bold">${user.receivedRevenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Generated</p>
                <p className="text-2xl font-bold">${user.generatedRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

