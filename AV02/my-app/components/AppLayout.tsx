'use client'

import Link from 'next/link'
import { useAuth } from '../app/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="flex h-screen">
      <nav className="w-48 bg-gray-100 p-4 fixed h-full overflow-auto">
        <ul className="space-y-2">
          <li>
            <Link href="/" className="block py-2 px-4 hover:bg-gray-200 rounded">Home</Link>
          </li>
          <li>
            <Link href="/advertiser" className="block py-2 px-4 hover:bg-gray-200 rounded">Advertiser</Link>
          </li>
          <li>
            <Link href="/publisher" className="block py-2 px-4 hover:bg-gray-200 rounded">Publisher</Link>
          </li>
          <li>
            <Link href="/admin" className="block py-2 px-4 hover:bg-gray-200 rounded">Admin</Link>
          </li>
          {user && (
            <li>
              <button onClick={handleLogout} className="block w-full text-left py-2 px-4 hover:bg-gray-200 rounded">Logout</button>
            </li>
          )}
        </ul>
      </nav>
      <main className="flex-1 p-8 ml-48 overflow-auto">
        {children}
      </main>
    </div>
  )
}
