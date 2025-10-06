import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppProvider } from '../context/AppContext'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Threads Auto Reply - 自動返信下書きアプリ',
  description: 'ThreadsのリプライをAIが自動で下書きを生成するアプリ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <AppProvider>
          <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-lg font-bold">Threads Auto Reply</h1>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Cog6ToothIcon className="w-6 h-6" />
            </button>
          </header>
          <main className="container mx-auto p-4">{children}</main>
          <footer className="bg-gray-100 text-center p-4 mt-4">
            <p className="text-sm">&copy; 2025 Threads Auto Reply</p>
          </footer>
        </AppProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}