import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ad Management',
  description: 'Advertising management platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
            </ul>
          </nav>
          <main className="flex-1 p-8 ml-48 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

