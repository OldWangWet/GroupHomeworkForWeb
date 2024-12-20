'use client'

import Link from 'next/link'
import { useAuth } from '../app/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.clear();
    logout()
    router.push('/login')
  }

  return (
    <div className="flex h-screen">
      <nav className="w-48 bg-gray-100 p-4 fixed h-full overflow-auto">
        <ul className="space-y-2">
          <li>
            <Link href="/" className="block py-2 px-4 hover:bg-gray-200 rounded">欢迎</Link>
          </li>
          <li>
            <Link href="/advertiser" className="block py-2 px-4 hover:bg-gray-200 rounded">主页</Link>
          </li>
          <li>
            <Link href="/publisher" className="block py-2 px-4 hover:bg-gray-200 rounded">加入</Link>
          </li>
          <li>
            <Link href="/admin" className="block py-2 px-4 hover:bg-gray-200 rounded">管理</Link>
          </li>
          <li>
            <Link href="/statistic" className="block py-2 px-4 hover:bg-gray-200 rounded">统计</Link>
          </li>
          {user && (
            <li>
              <button onClick={handleLogout} className="block w-full text-left py-2 px-4 hover:bg-gray-200 rounded">退出</button>
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

